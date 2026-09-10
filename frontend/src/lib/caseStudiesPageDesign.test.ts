import { describe, expect, it } from "vitest";
import { CASE_STUDY_PROJECTS } from "./caseStudiesPageContent";
import {
  CASE_STUDIES_PAGE_DESIGN,
  workPageMatchesFilter,
  workPageTags,
} from "./caseStudiesPageDesign";
import { ROUTES } from "./routes";

describe("caseStudiesPageDesign", () => {
  it("keeps Work page display copy short and outcome-focused", () => {
    expect(CASE_STUDIES_PAGE_DESIGN.hero.kicker).toBe("SELECTED WORK");
    expect(CASE_STUDIES_PAGE_DESIGN.hero.titleAccent).toBe("real operations.");
    expect(CASE_STUDIES_PAGE_DESIGN.detailsCta).toBe("View Case Study");
    expect(CASE_STUDIES_PAGE_DESIGN.cta.primaryTo).toBe(ROUTES.contact);
    expect(CASE_STUDIES_PAGE_DESIGN.filters.map((item) => item.id)).toEqual(["all", "ai", "cloud", "saas", "web"]);
  });

  it("limits compact technology tags and matches project filters", () => {
    const commiters = CASE_STUDY_PROJECTS.find((project) => project.id === "commiters")!;
    expect(workPageTags(commiters, 3)).toEqual(["React", "Vite", "Tailwind CSS"]);
    expect(workPageTags(commiters, 4)).toEqual(["React", "Vite", "Tailwind CSS", "Cloud"]);
    expect(workPageMatchesFilter("commiters", "cloud")).toBe(true);
    expect(workPageMatchesFilter("neardrop-mvp", "ai")).toBe(false);
    expect(workPageMatchesFilter("governed-ai", "all")).toBe(true);
  });
});
