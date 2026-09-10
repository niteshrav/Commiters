/** Stitch mockup tokens for the NearDrop logistics case study detail page. */
export const NEARDROP_CASE_STUDY_STITCH_PREVIEW_NODE_ID = "6c35857a6c354ba19a97932548330845" as const;
export const NEARDROP_CASE_STUDY_STITCH_PREVIEW_URL =
  "https://stitch.withgoogle.com/preview/15498726935719082035?node-id=6c35857a6c354ba19a97932548330845&raw=1" as const;

export const NEARDROP_CASE_STUDY_DESIGN = {
  colors: {
    pageBackground: "#ffffff",
    primary: "#0066ff",
    title: "#000000",
    titleLead: "#000000",
    body: "#4b5563",
    stackRole: "#9ca3af",
    featureCount: "#9ca3af",
    goldLabel: "#9a7b4f",
    goldIcon: "#c9a227",
    goldIconSurface: "rgba(201, 162, 39, 0.14)",
    kickerSurface: "#e8f1ff",
    accentSurface: "#f3f3f4",
    cardBorder: "#e5e7eb",
    divider: "#e5e7eb",
    numberAccent: "#9ca3af",
    executionSurface: "#ffffff",
    bottomCtaText: "#ffffff",
    bottomCtaPrimaryBackground: "#ffffff",
    bottomCtaPrimaryText: "#0066ff",
    bottomCtaSecondaryBackground: "#ffffff",
    bottomCtaSecondaryBorder: "#e5e7eb",
  },
  typography: {
    kickerWeight: 600,
    titleWeight: 800,
    titleLetterSpacing: "-0.03em",
  },
  layout: {
    architectureColumns: "repeat(4, minmax(0, 1fr))",
    featureColumns: "repeat(4, minmax(0, 1fr))",
    introInnerMaxWidth: "1120px",
    executionSplit: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
    bottomCtaRadius: "28px",
    bottomCtaGradient: "linear-gradient(135deg, #2563eb 0%, #0066ff 48%, #3b82f6 100%)",
    stackGap: "clamp(24px, 4vw, 48px)",
  },
} as const;
