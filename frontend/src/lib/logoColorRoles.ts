/**
 * Semantic roles for Stitch light UI (screenshots May 2026).
 */
export const LOGO_COLOR_ROLE_SELECTORS = {
  bodyText: { selector: ".stitch-home-subtext {", property: "color: var(--muted)" },
  headingText: { selector: ".stitch-home-title {", property: "color: var(--text)" },
  sectionKicker: { selector: ".stitch-page-kicker {", property: "var(--stitch-blue" },
  primaryCta: { selector: ".btn-primary {", property: "var(--site-btn-primary-bg" },
  navUnderline: { selector: ".nav-primary-link.active::after {", property: "var(--stitch-blue" },
  quoteLink: { selector: ".quote-link {", property: "var(--stitch-blue" },
  footerStitch: { selector: ".footer--stitch {", property: "var(--surface-soft)" },
  pageCanvas: { selector: ".site-shell {", property: "var(--page-background)" },
} as const;
