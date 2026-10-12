import { describe, expect, it } from "vitest";
import { buildFaqPageSchema, buildLocalBusinessSchema, buildOrganizationSchema, SITE_SEO_KEYWORDS } from "./siteSeo";
import { contactPageSeo, faqPageSeo, homePageSeo } from "./sitePageSeo";

describe("siteSeo", () => {
  it("includes target keyword phrases", () => {
    expect(SITE_SEO_KEYWORDS).toMatch(/Commiters Softwares/);
    expect(SITE_SEO_KEYWORDS).not.toMatch(/Committers/);
    expect(SITE_SEO_KEYWORDS).toMatch(/Software Development Company/);
    expect(SITE_SEO_KEYWORDS).toMatch(/Web Development/);
    expect(SITE_SEO_KEYWORDS).toMatch(/Mobile App Development/);
    expect(SITE_SEO_KEYWORDS).toMatch(/SaaS Development/);
    expect(SITE_SEO_KEYWORDS).toMatch(/Enterprise AI/);
    expect(SITE_SEO_KEYWORDS).toMatch(/Cloud Systems/);
  });

  it("builds Organization schema with legal name, NAP, and public social URLs", () => {
    const org = buildOrganizationSchema();
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("Commiters");
    expect(org.alternateName).toEqual(["Commiters Softwares"]);
    expect(org.url).toBe("https://www.commiters.com");
    expect(org.email).toBe("hello@commiters.com");
    expect(org.address.addressLocality).toBe("Udaipur");
    expect(org.sameAs.join(" ")).not.toMatch(/viewAsMember/);
    expect(org.description).toMatch(/Enterprise AI & Cloud Systems/);
  });

  it("sets home page meta with keywords and canonical path", () => {
    const seo = homePageSeo();
    expect(seo.path).toBe("/");
    expect(seo.keywords).toBe(SITE_SEO_KEYWORDS);
    expect(seo.description).toMatch(/Enterprise AI & Cloud Systems/);
    expect(seo.description).toMatch(/Spec-driven engineering/);
  });

  it("exposes FAQ and Udaipur local business JSON-LD", () => {
    const faq = faqPageSeo().structuredData as { "@type": string; mainEntity: unknown[] };
    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity.length).toBeGreaterThan(0);

    const local = buildLocalBusinessSchema();
    expect(local["@type"]).toBe("ProfessionalService");
    expect(local.address.addressLocality).toBe("Udaipur");
    expect(contactPageSeo().structuredData).toEqual(local);

    const faqSchema = buildFaqPageSchema([{ question: "Q?", answer: "A." }]);
    expect(faqSchema.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: "Q?",
      acceptedAnswer: { "@type": "Answer", text: "A." },
    });
  });
});
