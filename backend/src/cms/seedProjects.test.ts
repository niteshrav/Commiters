import { describe, expect, it } from "vitest";
import { CMS_CASE_STUDY_PROJECTS, missingCmsProjects } from "./seedProjects";

describe("cms seed projects", () => {
  it("includes ProspectIQ AI and EcoRoute Intelligence in the curated case-study seed", () => {
    expect(CMS_CASE_STUDY_PROJECTS.map((project) => project.slug)).toEqual([
      "commiters",
      "ai-summarizer",
      "multi-role-crm",
      "neardrop-mvp",
      "browse-my-vacation",
      "prospectiq-ai",
      "ecoroute-intelligence",
    ]);
    expect(CMS_CASE_STUDY_PROJECTS.find((project) => project.slug === "prospectiq-ai")?.projectUrl).toBe(
      "/work/prospectiq-ai",
    );
    expect(CMS_CASE_STUDY_PROJECTS.find((project) => project.slug === "ecoroute-intelligence")?.projectUrl).toBe(
      "/work/ecoroute-intelligence",
    );
  });

  it("inserts only case studies the CMS collection does not already have", () => {
    expect(
      missingCmsProjects([
        { slug: "commiters", projectUrl: "/work/commiters" },
        { slug: "neardrop-mvp", projectUrl: "/work/neardrop-mvp" },
      ]).map((project) => project.slug),
    ).toEqual(["ai-summarizer", "multi-role-crm", "browse-my-vacation", "prospectiq-ai", "ecoroute-intelligence"]);
    expect(missingCmsProjects(CMS_CASE_STUDY_PROJECTS)).toEqual([]);
  });
});
