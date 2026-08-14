import { describe, expect, it } from "vitest";
import { buildOrganizationSchema, SITE_SEO_KEYWORDS } from "./siteSeo";
import { homePageSeo } from "./sitePageSeo";

describe("siteSeo", () => {
  it("includes target keyword phrases", () => {
    expect(SITE_SEO_KEYWORDS).toMatch(/Committers Softwares/);
    expect(SITE_SEO_KEYWORDS).toMatch(/Software Development Company/);
    expect(SITE_SEO_KEYWORDS).toMatch(/Web Development/);
    expect(SITE_SEO_KEYWORDS).toMatch(/Mobile App Development/);
    expect(SITE_SEO_KEYWORDS).toMatch(/SaaS Development/);
  });

  it("builds Organization schema with legal name and contact", () => {
    const org = buildOrganizationSchema();
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("Commiters");
    expect(org.url).toBe("https://www.commiters.com");
    expect(org.email).toBe("hello@commiters.com");
  });

  it("sets home page meta with keywords and canonical path", () => {
    const seo = homePageSeo();
    expect(seo.path).toBe("/");
    expect(seo.keywords).toBe(SITE_SEO_KEYWORDS);
    expect(seo.description).toMatch(/software development company/i);
  });
});
