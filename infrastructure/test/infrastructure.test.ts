import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as StaticSite from "../lib/static-site";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new StaticSite.StaticSiteStack(app, "MyTestStack", {
    domainName: "whatever.com",
  });
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
