/** Shared viewport breakpoints — keep in sync with styles.css @media rules. */
export const BREAKPOINT_STACK_PX = 960;
export const BREAKPOINT_TABLET_PX = 1090;
export const BREAKPOINT_COMPACT_PX = 620;

export const BREAKPOINT_STACK_MQ = `(max-width: ${BREAKPOINT_STACK_PX}px)` as const;
export const BREAKPOINT_TABLET_MQ = `(max-width: ${BREAKPOINT_TABLET_PX}px)` as const;
export const BREAKPOINT_COMPACT_MQ = `(max-width: ${BREAKPOINT_COMPACT_PX}px)` as const;

/** Selectors that stack to a single column at the stack breakpoint. */
export const RESPONSIVE_STACK_GRID_SELECTORS = [
  ".stitch-home-hero-grid",
  ".stitch-contact-grid",
  ".stitch-join-us-grid",
  ".stitch-services-grid",
  ".about-principles-grid",
  ".home-built-for-scale-grid",
  ".footer-columns--mockup.footer-mockup-grid",
] as const;

/** Selectors that use a two-column tablet layout before stacking. */
export const RESPONSIVE_TABLET_GRID_SELECTORS = [
  ".stitch-services-grid",
  ".about-principles-grid",
] as const;
