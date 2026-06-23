/** Site photography and raster images stay full color (no grayscale filters). */
export const SITE_IMAGE_FULL_COLOR_CLASS = "site-image-full-color" as const;

/** @deprecated Use SITE_IMAGE_FULL_COLOR_CLASS — kept for existing home components. */
export const HOME_IMAGE_FULL_COLOR_CLASS = SITE_IMAGE_FULL_COLOR_CLASS;

export const HOME_PAGE_PHOTO_SELECTORS = [
  ".stitch-home-hero-photo",
  ".home-built-for-scale-image",
] as const;

export const SITE_IMAGE_SELECTORS = [
  ...HOME_PAGE_PHOTO_SELECTORS,
  ".about-founder-photo",
  ".case-study-card-image",
  ".ai-summarizer-case-study-hero-image",
  ".ai-summarizer-case-study-footer-image",
  ".multi-role-crm-case-study-hero-image",
  ".nextsaas-case-study-intro-hero-image",
  ".nextsaas-case-study-visual-break-image",
  ".technical-ledger-article-image",
  ".home-tech-logo-img",
  ".stitch-founder-photo",
] as const;
