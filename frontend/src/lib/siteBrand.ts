/** Canonical brand assets live in `/public/brand` as transparent PNGs. */

export const COMMITERS_BRAND_DIR = "/brand" as const;

/** Variant 02 — compact horizontal (mascot left, wordmark right). Header / nav. */
export const COMMITERS_LOGO_HORIZONTAL_SRC = `${COMMITERS_BRAND_DIR}/logo-horizontal.png` as const;

/** Variant 01 — primary full mark. Footer and hero watermarks. */
export const COMMITERS_LOGO_PRIMARY_SRC = `${COMMITERS_BRAND_DIR}/logo-primary.png` as const;

/** Variant 03 — stacked/constrained. Mobile drawer. */
export const COMMITERS_LOGO_STACKED_SRC = `${COMMITERS_BRAND_DIR}/logo-stacked.png` as const;

/** Variant 05 — eagle mark only. Favicon source and decorative mark. */
export const COMMITERS_LOGO_MARK_SRC = `${COMMITERS_BRAND_DIR}/logo-mark.png` as const;

/** Header default — Variant 02. */
export const COMMITERS_HEADER_LOGO_SRC = COMMITERS_LOGO_HORIZONTAL_SRC;

/** Footer default — Variant 01. */
export const COMMITERS_FOOTER_LOGO_SRC = COMMITERS_LOGO_HORIZONTAL_SRC;

export const COMMITERS_HEADER_LOGO_ALT = "Commiters — Enterprise AI & Cloud Systems" as const;
export const COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX = 548 as const;
export const COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX = 151 as const;

/** Tagline text embedded in the logo artwork. */
export const COMMITERS_TAGLINE = "Commit. Code. Connect." as const;

/** Positioning line paired with the logo in the footer and marketing chrome. */
export const COMMITERS_POSITIONING_TAGLINE = "Enterprise AI Products & Cloud-Native Web Systems" as const;

/** Retired GoDaddy-hosted marketing PNGs — must not be referenced in the app. */
export const RETIRED_GODADDY_IMAGE_PATHS = ["/assets/premium-hero.png", "/assets/premium-contact.png"] as const;
