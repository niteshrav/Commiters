import { describe, expect, it } from "vitest";
import { BROWSE_MY_VACATION_LIVE_URL } from "./browseMyVacationCaseStudyContent";
import { ECOROUTE_LIVE_URL } from "./ecoRouteCaseStudyContent";
import { MULTI_ROLE_CRM_LIVE_URL } from "./multiRoleCrmCaseStudyContent";
import { PROSPECTIQ_LIVE_URL } from "./prospectIqCaseStudyContent";
import { ROUTES } from "./routes";
import { WORK_CASE_STUDY_FINAL_CTA, WORK_CASE_STUDY_SECTIONS } from "./workCaseStudy";
import { WORK_CASE_STUDIES, getWorkCaseStudy, relatedWorkCaseStudies } from "./workCaseStudyProjects";

const REQUIRED_BLOCKS = ["overview", "problem", "solution", "usp", "journey", "details", "flow", "stack", "outcome"] as const;

describe("workCaseStudyProjects", () => {
  it("covers every Work detail route with the demo section arrangement", () => {
    expect(WORK_CASE_STUDIES.map((study) => study.route).sort()).toEqual(
      [
        ROUTES.commitersCaseStudy,
        ROUTES.aiSummarizerCaseStudy,
        ROUTES.neardropCaseStudy,
        ROUTES.multiRoleCrmCaseStudy,
        ROUTES.browseMyVacationCaseStudy,
        ROUTES.prospectIqCaseStudy,
        ROUTES.ecoRouteCaseStudy,
      ].sort(),
    );

    for (const study of WORK_CASE_STUDIES) {
      for (const key of REQUIRED_BLOCKS) {
        expect(study[key].items.length, `${study.id}.${key}`).toBeGreaterThan(0);
      }
      expect(study.headline.length).toBeGreaterThan(0);
      expect(study.relatedIds).toHaveLength(3);
      expect(relatedWorkCaseStudies(study)).toHaveLength(3);
      expect(study.discussCta).toEqual({ kind: "internal", label: "Discuss a similar idea", to: ROUTES.contact });
      expect(study.problem.title).toBe(WORK_CASE_STUDY_SECTIONS.problem.title);
      expect(study.solution.title).toBe(WORK_CASE_STUDY_SECTIONS.solution.title);
      expect(study.usp.title).toBe(WORK_CASE_STUDY_SECTIONS.usp.title);
      expect(study.stack.title).toBe(WORK_CASE_STUDY_SECTIONS.stack.title);
      expect(study.outcome.title).toBe(WORK_CASE_STUDY_SECTIONS.outcome.title);
    }

    expect(getWorkCaseStudy("neardrop-mvp").headline).toBe("Closer to what's next.");
    expect(WORK_CASE_STUDY_FINAL_CTA.title).toBe("Let's build what's next.");
  });

  it("keeps only verified public demo URLs", () => {
    expect(getWorkCaseStudy("browse-my-vacation").liveDemo).toEqual({
      kind: "external",
      label: "Live Demo",
      href: BROWSE_MY_VACATION_LIVE_URL,
    });
    expect(getWorkCaseStudy("prospectiq-ai").liveDemo).toEqual({
      kind: "external",
      label: "Live Demo",
      href: PROSPECTIQ_LIVE_URL,
    });
    expect(getWorkCaseStudy("ecoroute-intelligence").liveDemo).toEqual({
      kind: "external",
      label: "Live Demo",
      href: ECOROUTE_LIVE_URL,
    });
    expect(getWorkCaseStudy("multi-role-crm").liveDemo).toEqual({
      kind: "external",
      label: "Live Demo",
      href: MULTI_ROLE_CRM_LIVE_URL,
    });
    expect(getWorkCaseStudy("commiters").liveDemo).toEqual({
      kind: "internal",
      label: "Open live site",
      to: ROUTES.home,
    });
    expect(getWorkCaseStudy("neardrop-mvp").liveDemo).toBeUndefined();
  });
});
