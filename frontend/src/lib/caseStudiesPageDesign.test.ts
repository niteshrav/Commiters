import { describe, expect, it } from "vitest";
import { CASE_STUDY_PROJECTS } from "./caseStudiesPageContent";
import {
  CASE_STUDIES_PAGE_DESIGN,
  workPageFiltersWithProjects,
  workPageLiveHref,
  workPageMatchesFilter,
  workPageTags,
} from "./caseStudiesPageDesign";
import { ROUTES } from "./routes";
import { SYNAPSE_LIVE_URL, TERMINAL_LIVE_URL } from "./studioProducts";
import { TRUSTTAP_LIVE_URL } from "./trustTapPageContent";

describe("caseStudiesPageDesign", () => {
  it("keeps Work page display copy short and outcome-focused", () => {
    expect(CASE_STUDIES_PAGE_DESIGN.hero.kicker).toBe("OUR WORK");
    expect(CASE_STUDIES_PAGE_DESIGN.hero.titleAccent).toBe("in production.");
    expect(CASE_STUDIES_PAGE_DESIGN.detailsCta).toBe("View Case Study");
    expect(CASE_STUDIES_PAGE_DESIGN.cta.primaryTo).toBe(ROUTES.contact);
    expect(CASE_STUDIES_PAGE_DESIGN.filters.map((item) => item.id)).toEqual([
      "all",
      "ai",
      "cloud",
      "saas",
      "web",
      "business",
      "travel",
      "enterprise",
    ]);
    expect(CASE_STUDIES_PAGE_DESIGN.cta.primaryLabel).toBe("Start a brief");
    expect(CASE_STUDIES_PAGE_DESIGN.cta.secondaryLabel).toBe("Book Operational Audit");
    expect(CASE_STUDIES_PAGE_DESIGN.hero.secondaryTo).toBe(`${ROUTES.about}#delivery-journey`);
  });

  it("limits compact technology tags and matches project filters", () => {
    const commiters = CASE_STUDY_PROJECTS.find((project) => project.id === "commiters")!;
    expect(workPageTags(commiters, 3)).toEqual(["React", "Vite", "Tailwind CSS"]);
    expect(workPageTags(commiters, 4)).toEqual(["React", "Vite", "Tailwind CSS", "Cloud"]);
    expect(workPageMatchesFilter("commiters", "cloud")).toBe(true);
    expect(workPageMatchesFilter("neardrop-mvp", "ai")).toBe(false);
    expect(workPageMatchesFilter("governed-ai", "all")).toBe(true);
    expect(workPageMatchesFilter("browse-my-vacation", "travel")).toBe(true);
    expect(workPageMatchesFilter("browse-my-vacation", "saas")).toBe(false);
    expect(workPageMatchesFilter("terminal", "enterprise")).toBe(true);
    expect(workPageMatchesFilter("synapse", "enterprise")).toBe(true);
    expect(workPageMatchesFilter("terminal", "travel")).toBe(false);
    expect(workPageLiveHref("terminal")).toBe(TERMINAL_LIVE_URL);
    expect(workPageLiveHref("synapse")).toBe(SYNAPSE_LIVE_URL);
    expect(workPageMatchesFilter("prooflyn", "saas")).toBe(true);
    expect(workPageMatchesFilter("prooflyn", "enterprise")).toBe(false);
    expect(workPageLiveHref("prooflyn")).toBe(TRUSTTAP_LIVE_URL);
    expect(workPageFiltersWithProjects(["commiters", "browse-my-vacation"]).map((item) => item.id)).toEqual([
      "all",
      "cloud",
      "web",
      "travel",
    ]);
  });
});
