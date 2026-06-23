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
    goldIcon: "#c9a227",
    goldIconSurface: "rgba(201, 162, 39, 0.14)",
    iconBlueSurface: "rgba(0, 102, 255, 0.1)",
    highlightText: "#ffffff",
    highlightIconSurface: "rgba(255, 255, 255, 0.16)",
    kickerSurface: "#f3f4f6",
    accentSurface: "#f3f3f4",
    cardBorder: "#e5e7eb",
    divider: "#e5e7eb",
    numberAccent: "#9ca3af",
    executionSurface: "#f8f9fb",
    bottomCtaText: "#ffffff",
    bottomCtaPrimaryBackground: "#ffffff",
    bottomCtaPrimaryText: "#0066ff",
    bottomCtaSecondaryBackground: "rgba(255, 255, 255, 0.14)",
    bottomCtaSecondaryBorder: "rgba(255, 255, 255, 0.22)",
  },
  typography: {
    kickerWeight: 600,
    titleWeight: 800,
    titleLetterSpacing: "-0.03em",
  },
  layout: {
    introStackColumns: "repeat(3, minmax(0, 1fr))",
    featureColumns: "repeat(2, minmax(0, 1fr))",
    introInnerMaxWidth: "960px",
    executionSplit: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
    bottomCtaRadius: "20px",
    bottomCtaGradient: "linear-gradient(135deg, #0052cc 0%, #0066ff 52%, #1a7dff 100%)",
    stackGap: "clamp(24px, 4vw, 48px)",
  },
} as const;
