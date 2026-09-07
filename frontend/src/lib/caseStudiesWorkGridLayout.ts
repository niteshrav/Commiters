import type { CaseStudyGridSpan, CaseStudyLayout } from "./caseStudiesPageContent";
import { ROUTES } from "./routes";

export type WorkPageCaseStudyLayout = {
  gridSpan: CaseStudyGridSpan;
  layout: CaseStudyLayout;
};

/** Canonical Work page card layout — wide rows avoid tall narrow + short wide gaps in the grid. */
export const WORK_PAGE_CASE_STUDY_LAYOUT: Record<string, WorkPageCaseStudyLayout> = {
  commiters: { gridSpan: "wide", layout: "horizontal" },
  "ai-summarizer": { gridSpan: "wide", layout: "horizontal" },
  "multi-role-crm": { gridSpan: "narrow", layout: "stacked" },
  "browse-my-vacation": { gridSpan: "narrow", layout: "stacked" },
  "neardrop-mvp": { gridSpan: "wide", layout: "horizontal" },
  "prospectiq-ai": { gridSpan: "wide", layout: "horizontal" },
  "ecoroute-intelligence": { gridSpan: "wide", layout: "horizontal" },
};

const WORK_PAGE_CASE_STUDY_ID_BY_HREF: Record<string, string> = {
  [ROUTES.commitersCaseStudy]: "commiters",
  [ROUTES.aiSummarizerCaseStudy]: "ai-summarizer",
  [ROUTES.multiRoleCrmCaseStudy]: "multi-role-crm",
  [ROUTES.browseMyVacationCaseStudy]: "browse-my-vacation",
  [ROUTES.neardropCaseStudy]: "neardrop-mvp",
  [ROUTES.prospectIqCaseStudy]: "prospectiq-ai",
  [ROUTES.ecoRouteCaseStudy]: "ecoroute-intelligence",
};

export function isWorkPagePortfolioProjectId(projectId: string): boolean {
  return projectId in WORK_PAGE_CASE_STUDY_LAYOUT;
}

export function resolveWorkPageCaseStudyLayout(projectId: string): WorkPageCaseStudyLayout | undefined {
  return WORK_PAGE_CASE_STUDY_LAYOUT[projectId];
}

export function resolveWorkPagePortfolioProjectId(
  slug: string,
  projectUrl: string,
  fallbackId?: string,
): string {
  if (fallbackId) return fallbackId;

  const normalizedHref = projectUrl.trim();
  if (normalizedHref && WORK_PAGE_CASE_STUDY_ID_BY_HREF[normalizedHref]) {
    return WORK_PAGE_CASE_STUDY_ID_BY_HREF[normalizedHref];
  }

  if (slug in WORK_PAGE_CASE_STUDY_LAYOUT) return slug;

  return slug;
}

export function applyWorkPageCaseStudyLayout<T extends { id: string; gridSpan: CaseStudyGridSpan; layout: CaseStudyLayout }>(
  project: T,
): T {
  const workLayout = resolveWorkPageCaseStudyLayout(project.id);
  if (!workLayout) return project;

  return {
    ...project,
    gridSpan: workLayout.gridSpan,
    layout: workLayout.layout,
  };
}
