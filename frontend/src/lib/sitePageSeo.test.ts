import { describe, expect, it } from "vitest";
import {
  aboutPageSeo,
  contactPageSeo,
  cookiePolicyPageSeo,
  homePageSeo,
  joinUsPageSeo,
  privacyPolicyPageSeo,
  termsPageSeo,
} from "./sitePageSeo";

const SOFTWARES_NAME = /Commiters Softwares/;
const MISSPELLED_BRAND = /Committers/;

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
    expect(joinUsPageSeo().title).toMatch(/Careers at Commiters/);
    expect(joinUsPageSeo().title).not.toMatch(MISSPELLED_BRAND);
  });

  it("keeps the Softwares legal name on privacy, cookie, and terms pages", () => {
    expect(privacyPolicyPageSeo().description).toMatch(SOFTWARES_NAME);
    expect(privacyPolicyPageSeo().description).not.toMatch(MISSPELLED_BRAND);
    expect(cookiePolicyPageSeo().description).toMatch(SOFTWARES_NAME);
    expect(cookiePolicyPageSeo().description).not.toMatch(MISSPELLED_BRAND);
    expect(termsPageSeo().description).toMatch(SOFTWARES_NAME);
    expect(termsPageSeo().description).not.toMatch(MISSPELLED_BRAND);
    expect(contactPageSeo().description).not.toMatch(MISSPELLED_BRAND);
    expect(contactPageSeo().description).toMatch(/Contact Commiters/);
  });
});
