import { PRECISION_MINIMALIST_DESIGN } from "./precisionMinimalistDesign";

/** Stitch preview node for the Commiters technical case study screen. */
export const COMMITERS_CASE_STUDY_STITCH_PREVIEW_NODE_ID = "9c5a098357224deba640da56a7622e8f" as const;

/** Stitch mockup tokens for the Commiters technical case study detail page. */
export const COMMITERS_CASE_STUDY_DESIGN = {
  colors: {
    pageBackground: PRECISION_MINIMALIST_DESIGN.colors.surfaceContainerLow,
    title: "#0a0a0a",
    subtitle: "#64748b",
    body: "#475569",
    goldLabel: "#9a7b4f",
    cardLabel: PRECISION_MINIMALIST_DESIGN.colors.primary,
    cardBorder: "#e5e7eb",
    sidebarBackground: "#f3f4f6",
    divider: "#e5e7eb",
    featureIconSurface: "rgba(0, 102, 255, 0.08)",
  },
  typography: {
    kickerWeight: 500,
    titleWeight: 700,
    titleLetterSpacing: "-0.04em",
  },
  layout: {
    mainColumnRatio: "minmax(0, 7fr) minmax(0, 3fr)",
    architectureColumnRatio: "minmax(0, 1fr) minmax(0, 2fr)",
    featureColumns: "repeat(3, minmax(0, 1fr))",
    highlightCardPadding: "24px",
  },
} as const;
