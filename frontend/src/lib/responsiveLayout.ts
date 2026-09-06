/** Shared viewport breakpoints — keep in sync with styles.css @media rules. */
export const BREAKPOINT_MOBILE_PX = 768;
export const BREAKPOINT_STACK_PX = 960;
export const BREAKPOINT_TABLET_PX = 1090;
export const BREAKPOINT_NAV_PX = 1180;
export const BREAKPOINT_COMPACT_PX = 620;

export const BREAKPOINT_MOBILE_MQ = `(max-width: ${BREAKPOINT_MOBILE_PX}px)` as const;
export const BREAKPOINT_STACK_MQ = `(max-width: ${BREAKPOINT_STACK_PX}px)` as const;
export const BREAKPOINT_TABLET_MQ = `(max-width: ${BREAKPOINT_TABLET_PX}px)` as const;
export const BREAKPOINT_NAV_MQ = `(max-width: ${BREAKPOINT_NAV_PX}px)` as const;
export const BREAKPOINT_TABLET_MIN_MQ = `(min-width: ${BREAKPOINT_MOBILE_PX}px)` as const;
export const BREAKPOINT_DESKTOP_MIN_MQ = `(min-width: ${BREAKPOINT_TABLET_PX}px)` as const;

/** Landing-page stylesheets that must share the same adaptive breakpoints. */
export const PAGE_STYLE_FILES = [
  "styles/servicesOverview.css",
  "styles/utilities.css",
  "styles/aiSolutions.css",
  "styles/aiOperationalAudit.css",
  "styles/webApplications.css",
  "styles/workflowAutomation.css",
  "styles/opsFlow.css",
  "styles/homeLeadMagnet.css",
  "styles/trustTap.css",
  "styles/serviceDetail.css",
] as const;

/** Full-bleed page wrappers — must not use 100vw, which causes horizontal scroll. */
export const FULL_BLEED_PAGE_SELECTORS = [
  ".utilities-page",
  ".aisol-page",
  ".webapp-page",
  ".wflow-page",
  ".audit-page",
  ".trusttap-page",
  ".opsflow-page",
] as const;

/** Two-column from the mobile/tablet min-width. */
export const RESPONSIVE_LANDING_TWO_COL_SELECTORS = [
  ".services-overview-standards-grid",
  ".services-overview-capabilities-grid",
  ".services-overview-products-grid",
  ".utilities-tools-grid",
  ".aisol-arch-grid",
  ".audit-cards",
  ".webapp-cards",
  ".svc-detail-hero-grid",
  ".svc-detail-features-grid",
  ".svc-detail-portfolio-grid",
  ".svc-detail-plan-grid",
] as const;

/** Three-column from the desktop min-width. */
export const RESPONSIVE_LANDING_THREE_COL_SELECTORS = [
  ".services-overview-offerings-grid",
  ".aisol-cards",
  ".audit-cards",
  ".audit-timeline",
  ".wflow-solutions",
  ".svc-detail-about-grid",
  ".svc-detail-pricing-grid",
  ".svc-detail-why-grid",
] as const;

/** Four-column from the desktop min-width. */
export const RESPONSIVE_LANDING_FOUR_COL_SELECTORS = [".webapp-cards"] as const;

/** Compact-phone CTAs that should fill the row. */
export const COMPACT_FULL_WIDTH_CTA_SELECTORS = [
  ".services-overview-hero-actions .btn",
  ".webapp-hero-cta",
  ".wflow-hero-cta",
  ".aisol-hero-cta",
  ".svc-detail-hero-actions .btn",
] as const;

/** Selectors that stack to a single column at the stack breakpoint. */
export const RESPONSIVE_STACK_GRID_SELECTORS = [
  ".stitch-home-hero-grid",
  ".stitch-contact-grid",
  ".stitch-join-us-grid",
  ".stitch-services-grid",
  ".about-principles-grid",
  ".home-built-for-scale-grid",
  ".footer-columns--mockup.footer-mockup-grid",
  ".case-studies-grid",
] as const;

/** Selectors that use a two-column tablet layout before stacking. */
export const RESPONSIVE_TABLET_GRID_SELECTORS = [
  ".stitch-services-grid",
  ".about-principles-grid",
  ".case-studies-grid",
] as const;

export const LEGACY_LAYOUT_MEDIA_QUERIES = [
  "@media (min-width: 720px)",
  "@media (min-width: 800px)",
  "@media (min-width: 801px)",
  "@media (min-width: 1080px)",
  "@media (max-width: 479px)",
  "@media (max-width: 640px)",
  "@media (max-width: 800px)",
] as const;
