/** Precision Minimalist / Void-First global design tokens (site-wide). */
export const PRECISION_MINIMALIST_DESIGN = {
  colors: {
    background: "#ffffff",
    primary: "#0066ff",
    primaryHover: "#0052cc",
    primaryRgb: "0, 102, 255",
    heading: "#111827",
    body: "#4b5563",
    muted: "#64748b",
    surfaceContainerLow: "#f8f9fa",
    borderSubtle: "#f1f5f9",
    borderOutline: "#e5e7eb",
    borderOutlineVariant: "#e5e7eb",
  },
  typography: {
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    displayWeight: 800,
    sectionTitleWeight: 700,
    bodyWeight: 400,
    labelWeight: 700,
    displayTracking: "-0.03em",
    sectionTracking: "-0.02em",
    labelTracking: "0.12em",
    bodySize: "1rem",
    pageTitleMin: "2.25rem",
    pageTitleMax: "3rem",
  },
  spacing: {
    stackLg: "3rem",
    cardPadding: "clamp(24px, 3vw, 32px)",
  },
  radius: {
    card: "16px",
    button: "8px",
  },
} as const;

export const PRECISION_MINIMALIST_CSS_CLASS = "precision-minimalist" as const;
