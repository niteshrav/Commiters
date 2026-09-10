/** Design tokens for the AI Summarizer case study detail page. */
export const AI_SUMMARIZER_CASE_STUDY_STITCH_PREVIEW_NODE_ID = "f1fb8914d45146f9aa9d41b5a4712054" as const;
export const AI_SUMMARIZER_CASE_STUDY_STITCH_PREVIEW_URL =
  "https://stitch.withgoogle.com/preview/15498726935719082035?node-id=f1fb8914d45146f9aa9d41b5a4712054&raw=1" as const;

export const AI_SUMMARIZER_CASE_STUDY_DESIGN = {
  colors: {
    pageBackground: "#ffffff",
    primary: "#0f3d91",
    title: "#0f172a",
    body: "#64748b",
    label: "#94a3b8",
    divider: "#e5e7eb",
    sectionHeading: "#111827",
    sectionBody: "#6b7280",
    accentBlue: "#0066ff",
    badgeDarkBackground: "#111827",
    badgeLightBackground: "#f3f4f6",
    badgeLightText: "#374151",
  },
  typography: {
    kickerWeight: 600,
    titleWeight: 800,
    titleLetterSpacing: "-0.03em",
    sectionHeadingWeight: 800,
    badgeFontSize: "11px",
  },
  layout: {
    heroSplit: "1fr",
    heroAspectRatio: "3 / 1",
    metadataColumns: "repeat(3, minmax(0, 1fr))",
    architectureColumns: "repeat(3, minmax(0, 1fr))",
    techStackSplit: "1fr",
    techStackGridColumns: "repeat(4, minmax(0, 1fr))",
    cardPadding: "20px",
    cardRadius: "16px",
    executionItemGap: "32px",
  },
} as const;
