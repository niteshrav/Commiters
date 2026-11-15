/** Stitch mockup tokens for the NextSaas QA case study detail page. */
export const NEXTSAAS_CASE_STUDY_DESIGN = {
  colors: {
    pageBackground: "#ffffff",
    primary: "#0066ff",
    kicker: "#9b8a5d",
    title: "#121317",
    body: "#4b5563",
    accentSurface: "#f3f3f4",
    cardBorder: "#e5e7eb",
    checklistIndicator: "#9b8a5d",
    infrastructureSurface: "#f3f3f4",
    scopeCardTopBorder: "#0066ff",
    pipelinesMediaSurface: "#ffffff",
    visualBreakFrameSurface: "#ffffff",
  },
  typography: {
    kickerWeight: 600,
    titleWeight: 800,
    titleLetterSpacing: "-0.03em",
  },
  layout: {
    scopePipelinesSplit: "minmax(0, 1fr) minmax(0, 2fr)",
    pipelinesSplit: "minmax(0, 1fr) minmax(0, 2fr)",
    scopePipelinesMediaHeight: "clamp(315px, 47.25vw, 405px)",
    scopePipelinesGridMaxHeight: "clamp(495px, 72vw, 630px)",
    scopeCardPadding: "clamp(14px, 2vw, 18px)",
    capabilityColumns: "repeat(3, minmax(0, 1fr))",
    infrastructureSplit: "minmax(0, 1fr) minmax(0, 1fr)",
    stackGap: "clamp(24px, 4vw, 48px)",
    pipelinesHeroObjectFit: "cover",
    visualBreakImageAspect: "1 / 1",
  },
} as const;
