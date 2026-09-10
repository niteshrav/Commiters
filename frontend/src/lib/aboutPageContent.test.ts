import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { ABOUT_PAGE_COPY, ABOUT_OPERATING_PRINCIPLES, ABOUT_DELIVERY_JOURNEY, ABOUT_REJECTED_CTA_SUBTEXT } from "./aboutPageContent";

describe("aboutPageContent", () => {
  it("defines the four enterprise operating pillars and work CTA", () => {
    expect(ABOUT_PAGE_COPY.principles.kicker).toBe("OUR VALUES");
    expect(ABOUT_PAGE_COPY.principles.titleAccent).toBe("Stand For");
    expect(ABOUT_PAGE_COPY.principles.viewAllLabel).toBe("VIEW ALL PRINCIPLES");
    expect(ABOUT_PAGE_COPY.principles.viewAllTo).toBe(ROUTES.services);
    expect(ABOUT_OPERATING_PRINCIPLES).toHaveLength(4);
    expect(ABOUT_OPERATING_PRINCIPLES.map((item) => item.title)).toEqual([
      "AI With Guardrails",
      "Security by Default",
      "Build From Specs",
      "Transparent Delivery",
    ]);
    expect(ABOUT_OPERATING_PRINCIPLES[0].body).toMatch(/Governed AI/);
    expect(ABOUT_OPERATING_PRINCIPLES[1].body).toMatch(/RLS/);
    expect(ABOUT_DELIVERY_JOURNEY.titleAccent).toBe("Production");
    expect(ABOUT_DELIVERY_JOURNEY.stages.map((stage) => stage.title)).toEqual([
      "Discover",
      "Architect",
      "Build",
      "Launch",
    ]);
    expect(ABOUT_DELIVERY_JOURNEY.stages[0].href).toBe(ROUTES.aiOperationalAudit);
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
