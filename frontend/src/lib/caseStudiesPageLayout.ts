/** Case studies page layout tokens (OUR WORK mosaic). */
export const CASE_STUDIES_PAGE_CLASS = "case-studies-page" as const;
export const CASE_STUDIES_INTRO_SECTION_CLASS = "case-studies-intro-section" as const;
export const CASE_STUDIES_INTRO_INNER_CLASS = "case-studies-intro-inner" as const;
export const CASE_STUDIES_INTRO_KICKER_CLASS = "case-studies-intro-kicker" as const;
export const CASE_STUDIES_INTRO_TITLE_CLASS = "case-studies-intro-title" as const;
export const CASE_STUDIES_INTRO_SUBTEXT_CLASS = "case-studies-intro-subtext" as const;
export const CASE_STUDIES_GRID_SECTION_CLASS = "case-studies-grid-section" as const;
export const CASE_STUDIES_GRID_CLASS = "case-studies-grid" as const;
export const CASE_STUDY_CARD_CLASS = "case-study-card" as const;
export const CASE_STUDY_CARD_GRID_WIDE_CLASS = "case-study-card--grid-wide" as const;
export const CASE_STUDY_CARD_GRID_NARROW_CLASS = "case-study-card--grid-narrow" as const;
export const CASE_STUDY_CARD_HORIZONTAL_CLASS = "case-study-card--horizontal" as const;
export const CASE_STUDY_CARD_NO_MEDIA_CLASS = "case-study-card--no-media" as const;
export const CASE_STUDY_CARD_STACKED_CLASS = "case-study-card--stacked" as const;
export const CASE_STUDY_CARD_COPY_CLASS = "case-study-card-copy" as const;
export const CASE_STUDY_CARD_COPY_SHOWCASE_CLASS = "case-study-card-copy--showcase" as const;
export const CASE_STUDY_CARD_COPY_LEAD_CLASS = "case-study-card-copy-lead" as const;
export const CASE_STUDY_CARD_COPY_BODY_CLASS = "case-study-card-copy-body" as const;
export const CASE_STUDY_CARD_MEDIA_CLASS = "case-study-card-media" as const;
export const CASE_STUDY_CARD_MEDIA_SHOWCASE_CLASS = "case-study-card-media--showcase" as const;
export const CASE_STUDY_CARD_CTA_ROW_CLASS = "case-study-card-cta-row" as const;
export const CASE_STUDY_CARD_SHOWCASE_CLASS = "case-study-card--showcase" as const;
export const CASE_STUDY_SHOWCASE_CARD_IDS = ["commiters"] as const;
export type CaseStudyShowcaseCardId = (typeof CASE_STUDY_SHOWCASE_CARD_IDS)[number];
export const CASE_STUDY_SHOWCASE_COMMITERS_ID = "commiters" as const;
export const CASE_STUDY_SHOWCASE_AI_ID = "ai-summarizer" as const;

export function isShowcaseHorizontalCard(projectId: string): projectId is CaseStudyShowcaseCardId {
  return (CASE_STUDY_SHOWCASE_CARD_IDS as readonly string[]).includes(projectId);
}
export {
  CASE_STUDY_CARD_BORDER_VAR,
  CASE_STUDY_AI_COPY_GAP,
  CASE_STUDY_AI_IMAGE_ASPECT_RATIO,
  CASE_STUDY_AI_IMAGE_BORDER_RADIUS,
  CASE_STUDY_AI_IMAGE_HEIGHT,
  CASE_STUDY_AI_IMAGE_MAX_HEIGHT,
  CASE_STUDY_AI_INNER_PADDING,
  CASE_STUDY_AI_MEDIA_OVERFLOW,
  CASE_STUDY_AI_MEDIA_PADDING,
  CASE_STUDY_AI_MEDIA_PADDING_BLOCK_END,
  CASE_STUDY_AI_MEDIA_PADDING_BLOCK_START,
  CASE_STUDY_AI_MEDIA_PADDING_INLINE,
  CASE_STUDY_CARD_INNER_PADDING,
  CASE_STUDY_COMMITERS_COPY_PADDING,
  CASE_STUDY_COMMITERS_COPY_PADDING_INLINE_END,
  CASE_STUDY_COMMITERS_COPY_GAP,
  CASE_STUDY_COMMITERS_COPY_GRID_GAP,
  CASE_STUDY_COMMITERS_IMAGE_BORDER_RADIUS,
  CASE_STUDY_COMMITERS_MEDIA_PADDING,
  CASE_STUDY_COMMITERS_MEDIA_PADDING_BLOCK,
  CASE_STUDY_COMMITERS_MEDIA_PADDING_INLINE,
  CASE_STUDY_COMMITERS_MEDIA_PADDING_INLINE_END,
  CASE_STUDY_COMMITERS_MEDIA_PADDING_INLINE_START,
  CASE_STUDY_COMMITERS_CARD_GRID_ROWS,
  CASE_STUDY_COMMITERS_COLUMN_GAP,
  CASE_STUDY_COMMITERS_COPY_PADDING_BLOCK_END,
  CASE_STUDY_COMMITERS_EDGE_INSET,
  CASE_STUDY_COMMITERS_GUTTER,
  CASE_STUDY_COMMITERS_IMAGE_INSET,
  CASE_STUDY_COMMITERS_CTA_PADDING_BLOCK_END,
  CASE_STUDY_COMMITERS_CTA_PADDING_INLINE_START,
  CASE_STUDY_COMMITERS_MEDIA_PADDING_BLOCK_END,
  CASE_STUDY_COMMITERS_PROBLEM_SOLUTION_FLEX,
  CASE_STUDY_COMMITERS_PROBLEM_SOLUTION_GAP,
  CASE_STUDY_CARD_SQUARE_IMAGE_ASPECT_RATIO,
  CASE_STUDY_NEARDROP_IMAGE_ASPECT_RATIO,
  CASE_STUDY_NEARDROP_IMAGE_BORDER_RADIUS,
  CASE_STUDY_NEARDROP_MEDIA_OVERFLOW,
  CASE_STUDY_NEARDROP_PROBLEM_SOLUTION_FLEX,
  CASE_STUDY_PROBLEM_SOLUTION_ALIGN_CONTENT,
  CASE_STUDY_PROBLEM_SOLUTION_FLEX,
  CASE_STUDY_PROBLEM_SOLUTION_GAP,
  CASE_STUDY_STACKED_IMAGE_MAX_HEIGHT,
} from "./caseStudiesPageSurface";
export const CASE_STUDY_PROBLEM_SOLUTION_CLASS = "case-study-problem-solution" as const;
export const CASE_STUDY_PROBLEM_LABEL_CLASS = "case-study-problem-label" as const;
export const CASE_STUDY_SOLUTION_LABEL_CLASS = "case-study-solution-label" as const;
export const CASE_STUDY_CARD_IMAGE_CLASS = "case-study-card-image" as const;
export const CASE_STUDY_TAG_CLASS = "case-study-tag" as const;
export const CASE_STUDY_TAG_PILL_CLASS = "case-study-tag--pill" as const;
export const CASE_STUDY_TAG_OUTLINE_CLASS = "case-study-tag--outline" as const;
export const CASE_STUDY_TAG_ACCENT_CLASS = "case-study-tag--accent" as const;
export const CASE_STUDY_TITLE_CLASS = "case-study-card-title" as const;
export const CASE_STUDY_BODY_CLASS = "case-study-card-body" as const;
export const CASE_STUDY_DETAILS_LINK_CLASS = "case-study-details-link" as const;
export const CASE_STUDIES_BOTTOM_CTA_SECTION_CLASS = "case-studies-bottom-cta" as const;
export const CASE_STUDIES_BOTTOM_CTA_TITLE_CLASS = "case-studies-bottom-cta-title" as const;
export const CASE_STUDIES_BOTTOM_CTA_ACTIONS_CLASS = "case-studies-bottom-cta-actions" as const;
export const CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS = "case-studies-bottom-cta-btn--primary" as const;
export const CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS = "case-studies-bottom-cta-btn--secondary" as const;
export const CASE_STUDIES_GRID_COLUMNS = "repeat(3, minmax(0, 1fr))";
export const CASE_STUDIES_GRID_GAP = "20px";
