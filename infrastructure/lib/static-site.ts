import * as cdk from "@aws-cdk/core";
import * as route53 from "@aws-cdk/aws-route53";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudFront from "@aws-cdk/aws-cloudfront";
import * as targets from "@aws-cdk/aws-route53-targets/lib";

export interface StaticSiteProps extends cdk.StackProps {
  domainName: string;
}

export class StaticSiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StaticSiteProps) {
    super(scope, id, props);
    const { domainName } = props;

    const zone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName: domainName,
    });
    new cdk.CfnOutput(this, "Site", { value: "https://" + domainName });

    // Add S3 Bucket
    const s3Site = new s3.Bucket(this, `reddit-tc-bucket`, {
      bucketName: domainName,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });
    this.enableCorsOnBucket(s3Site);

    new cdk.CfnOutput(this, "Bucket Name", { value: s3Site.bucketName });

    // TLS certificate
    const certificateArn = new acm.DnsValidatedCertificate(
      this,
      "reddit-tc-site-certificate",
      {
        domainName: domainName,
        hostedZone: zone,
        region: "us-east-1", // Cloudfront only checks this region for certificates.
      }
    ).certificateArn;

    // Create a new CloudFront Distribution
    const distribution = new cloudFront.CloudFrontWebDistribution(
      this,
      `reddit-tc-cf-distribution`,
      {
        aliasConfiguration: {
          acmCertRef: certificateArn,
          names: [domainName],
          sslMethod: cloudFront.SSLMethod.SNI,
          securityPolicy: cloudFront.SecurityPolicyProtocol.TLS_V1_1_2016,
        },
        originConfigs: [
          {
            customOriginSource: {
              domainName: s3Site.bucketWebsiteDomainName,
              originProtocolPolicy: cloudFront.OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                compress: true,
                allowedMethods: cloudFront.CloudFrontAllowedMethods.ALL,
                cachedMethods:
                  cloudFront.CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
                forwardedValues: {
                  queryString: true,
                  cookies: {
                    forward: "none",
                  },
                  headers: [
                    "Access-Control-Request-Headers",
                    "Access-Control-Request-Method",
                    "Origin",
                  ],
                },
              },
            ],
          },
        ],
        viewerProtocolPolicy: cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      }
    );

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, "SiteAliasRecord", {
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
      zone,
    });

    // Setup Bucket Deployment to automatically deploy new assets and invalidate cache
    new s3deploy.BucketDeployment(this, `reddit-tc-s3bucketdeployment`, {
      sources: [s3deploy.Source.asset("../build")],
      destinationBucket: s3Site,
      distribution: distribution,
      distributionPaths: ["/*"],
    });
  }

  /**
   * Enables CORS access on the given bucket
   *
   * @memberof CxpInfrastructureStack
   */
  enableCorsOnBucket = (bucket: s3.IBucket) => {
    const cfnBucket = bucket.node.findChild("Resource") as s3.CfnBucket;
    cfnBucket.addPropertyOverride("CorsConfiguration", {
      CorsRules: [
        {
          AllowedOrigins: ["*"],
          AllowedMethods: ["HEAD", "GET", "PUT", "POST", "DELETE"],
          ExposedHeaders: [
            "x-amz-server-side-encryption",
            "x-amz-request-id",
            "x-amz-id-2",
          ],
          AllowedHeaders: ["*"],
        },
      ],
    });
  };
}
