import { describe, expect, it } from "vitest";
import {
  aboutPageSeo,
  contactPageSeo,
  cookiePolicyPageSeo,
  homePageSeo,
  joinUsPageSeo,
  opsFlowPageSeo,
  privacyPolicyPageSeo,
  termsPageSeo,
  trustTapPageSeo,
} from "./sitePageSeo";
import { SITE_ORIGIN } from "../hooks/usePageSeo";
import { ROUTES } from "./routes";

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

  it("uses canonical URLs for the product and privacy page metadata", () => {
    expect(`${SITE_ORIGIN}${opsFlowPageSeo().path}`).toBe(`${SITE_ORIGIN}${ROUTES.opsFlow}`);
    expect(`${SITE_ORIGIN}${trustTapPageSeo().path}`).toBe(`${SITE_ORIGIN}${ROUTES.trustTap}`);
    expect(`${SITE_ORIGIN}${privacyPolicyPageSeo().path}`).toBe(`${SITE_ORIGIN}${ROUTES.privacyPolicy}`);
  });
});
