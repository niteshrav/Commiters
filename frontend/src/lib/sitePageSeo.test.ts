import { describe, expect, it } from "vitest";
import {
  aboutPageSeo,
  contactPageSeo,
  cookiePolicyPageSeo,
  homePageSeo,
  privacyPolicyPageSeo,
  termsPageSeo,
} from "./sitePageSeo";

const SOFTWARES_NAME = /Committers Softwares|Commiters Softwares/;

describe("sitePageSeo brand naming", () => {
  it("uses Commiters on non-legal pages instead of Commiters Softwares", () => {
    expect(homePageSeo().description).toMatch(/Commiters/);
    expect(homePageSeo().description).not.toMatch(SOFTWARES_NAME);
    expect(aboutPageSeo().title).toMatch(/About Commiters/);
    expect(aboutPageSeo().title).not.toMatch(SOFTWARES_NAME);
    expect(aboutPageSeo().description).not.toMatch(SOFTWARES_NAME);
    expect(contactPageSeo().title).toMatch(/Contact Commiters/);
    expect(contactPageSeo().title).not.toMatch(SOFTWARES_NAME);
    expect(contactPageSeo().description).not.toMatch(SOFTWARES_NAME);
  });

  it("keeps the Softwares legal name on privacy, cookie, and terms pages", () => {
    expect(privacyPolicyPageSeo().description).toMatch(/Committers Softwares/);
    expect(cookiePolicyPageSeo().description).toMatch(/Committers Softwares/);
    expect(termsPageSeo().description).toMatch(/Committers Softwares/);
  });
});
