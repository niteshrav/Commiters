import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { ABOUT_PAGE_COPY, ABOUT_OPERATING_PRINCIPLES, ABOUT_REJECTED_CTA_SUBTEXT } from "./aboutPageContent";

describe("aboutPageContent", () => {
  it("defines operating principles and bottom CTA from the Stitch about mockup", () => {
    expect(ABOUT_PAGE_COPY.principles.title).toBe("Our Core Operating Principles");
    expect(ABOUT_PAGE_COPY.principles.viewAllLabel).toBe("VIEW ALL WORK");
    expect(ABOUT_PAGE_COPY.principles.viewAllTo).toBe(ROUTES.caseStudies);
    expect(ABOUT_OPERATING_PRINCIPLES).toHaveLength(4);
    expect(ABOUT_OPERATING_PRINCIPLES.map((item) => item.title)).toEqual([
      "Innovation First",
      "Quality Delivered",
      "Client Focused",
      "Async-Friendly",
    ]);
  });

  it("omits the Q3 2024 acceptance line from the about CTA subtext", () => {
    expect(ABOUT_PAGE_COPY.bottomCta.title).toBe("Ready to build something monumental?");
    expect(ABOUT_PAGE_COPY.bottomCta.subtext).toBe("Let's discuss your technical roadmap.");
    expect(ABOUT_PAGE_COPY.bottomCta.subtext).not.toContain(ABOUT_REJECTED_CTA_SUBTEXT);
    expect(ABOUT_PAGE_COPY.bottomCta.primaryLabel).toBe("Start a Project");
    expect(ABOUT_PAGE_COPY.bottomCta.secondaryLabel).toBe("View the Portfolio");
    expect(ABOUT_PAGE_COPY.bottomCta.primaryTo).toBe(ROUTES.contact);
    expect(ABOUT_PAGE_COPY.bottomCta.secondaryTo).toBe(ROUTES.services);
  });
});
