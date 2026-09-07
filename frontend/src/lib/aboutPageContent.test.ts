import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { ABOUT_PAGE_COPY, ABOUT_OPERATING_PRINCIPLES, ABOUT_REJECTED_CTA_SUBTEXT } from "./aboutPageContent";

describe("aboutPageContent", () => {
  it("defines the four enterprise operating pillars and work CTA", () => {
    expect(ABOUT_PAGE_COPY.principles.title).toBe("Core Operating Principles");
    expect(ABOUT_PAGE_COPY.principles.viewAllLabel).toBe("VIEW ALL WORK");
    expect(ABOUT_PAGE_COPY.principles.viewAllTo).toBe(ROUTES.caseStudies);
    expect(ABOUT_OPERATING_PRINCIPLES).toHaveLength(4);
    expect(ABOUT_OPERATING_PRINCIPLES.map((item) => item.title)).toEqual([
      "Governed AI Integration",
      "Zero Ambient Authority",
      "Spec-Driven Development",
      "Async-First & Transparent",
    ]);
    expect(ABOUT_OPERATING_PRINCIPLES[0].body).toMatch(/Model Context Protocol/);
    expect(ABOUT_OPERATING_PRINCIPLES[1].body).toMatch(/Row-Level Security/);
  });

  it("omits the Q3 2024 acceptance line from the about CTA subtext", () => {
    expect(ABOUT_PAGE_COPY.bottomCta.title).toBe("Ready to build something monumental?");
    expect(ABOUT_PAGE_COPY.bottomCta.subtext).toBe("Let's discuss your technical roadmap.");
    expect(ABOUT_PAGE_COPY.bottomCta.subtext).not.toContain(ABOUT_REJECTED_CTA_SUBTEXT);
    expect(ABOUT_PAGE_COPY.bottomCta.primaryLabel).toBe("Book Operational Audit");
    expect(ABOUT_PAGE_COPY.bottomCta.secondaryLabel).toBe("Try OpsFlow AI");
    expect(ABOUT_PAGE_COPY.bottomCta.primaryTo).toBe(ROUTES.aiOperationalAudit);
    expect(ABOUT_PAGE_COPY.bottomCta.secondaryTo).toBe("/#opsflow-ai");
  });
});
