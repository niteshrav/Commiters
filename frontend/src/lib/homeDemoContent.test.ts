import { describe, expect, it } from "vitest";
import { HOME_LEAD_MAGNET_FORM_ID } from "./homeLeadMagnetContent";
import { HOME_DEMO_COPY } from "./homeDemoContent";
import { ROUTES } from "./routes";
import { buildServiceDetailPath } from "./services";
import { EMPTY_PLANNER_STATE, focusText, resetForType, stepValid } from "./homePlanner";

describe("homeDemoContent", () => {
  it("keeps demo hero CTAs on in-page sections and production service routes", () => {
    expect(HOME_DEMO_COPY.hero.title).toBe("Technology that solves real business problems.");
    expect(HOME_DEMO_COPY.hero.primaryHref).toBe("#solutions");
    expect(HOME_DEMO_COPY.hero.secondaryHref).toBe("#work");
    expect(HOME_DEMO_COPY.servicesCarousel.items).toHaveLength(6);
    expect(HOME_DEMO_COPY.servicesCarousel.items[0].to).toBe(buildServiceDetailPath("website-development"));
    expect(HOME_DEMO_COPY.servicesCarousel.items.map((item) => item.title)).toEqual([
      "Websites & E-commerce",
      "Custom Software & SaaS",
      "AI & Automation",
      "Cloud & DevOps",
      "Mobile Applications",
      "Enterprise & Business Solutions",
    ]);
    expect(HOME_DEMO_COPY.cta.to).toBe(ROUTES.contact);
    expect(HOME_DEMO_COPY.finder.legacyId).toBe(HOME_LEAD_MAGNET_FORM_ID);
  });

  it("shows BrowseMyVacation, OpsFlow AI, and Prooflyn from the Work portfolio", () => {
    expect(HOME_DEMO_COPY.work.items.map((item) => item.title)).toEqual([
      "BrowseMyVacation",
      "OpsFlow AI",
      "Prooflyn",
    ]);
    expect(HOME_DEMO_COPY.work.items.map((item) => item.to)).toEqual([
      ROUTES.browseMyVacationCaseStudy,
      ROUTES.opsFlow,
      ROUTES.trustTap,
    ]);
    expect(HOME_DEMO_COPY.work.allWorkTo).toBe(ROUTES.caseStudies);
  });
});

describe("homePlanner", () => {
  it("requires a project type before continuing from step 0", () => {
    expect(stepValid(EMPTY_PLANNER_STATE, 0)).toBe(false);
    const withType = resetForType(EMPTY_PLANNER_STATE, "software");
    expect(stepValid(withType, 0)).toBe(true);
    expect(focusText(withType)).toContain("custom application");
  });
});
