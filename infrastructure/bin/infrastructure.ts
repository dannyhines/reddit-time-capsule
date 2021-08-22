#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { StaticSiteStack } from "../lib/static-site";

const app = new cdk.App();
new StaticSiteStack(app, "RedditTimeCapsule", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  domainName: "reddit-time-capsule.com",
});
