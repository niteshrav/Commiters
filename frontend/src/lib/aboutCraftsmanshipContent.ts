/** About page craftsmanship band (Stitch screenshot). */
export const ABOUT_CRAFTSMANSHIP_SECTION_CLASS = "about-craftsmanship-section" as const;
export const ABOUT_CRAFTSMANSHIP_RULE_CLASS = "about-craftsmanship-rule" as const;
export const ABOUT_CRAFTSMANSHIP_RULE_BOTTOM_CLASS = "about-craftsmanship-rule--bottom" as const;
export const ABOUT_CRAFTSMANSHIP_INNER_CLASS = "about-craftsmanship-inner" as const;
export const ABOUT_CRAFTSMANSHIP_GRID_CLASS = "about-craftsmanship-grid" as const;
export const ABOUT_CRAFTSMANSHIP_COPY_CLASS = "about-craftsmanship-copy" as const;
export const ABOUT_CRAFTSMANSHIP_COPY_START_CLASS = "about-craftsmanship-copy-start" as const;
export const ABOUT_CRAFTSMANSHIP_HEADING_CLASS = "about-craftsmanship-heading" as const;
export const ABOUT_CRAFTSMANSHIP_BODY_CLASS = "about-craftsmanship-body" as const;
export const ABOUT_CRAFTSMANSHIP_STAT_CLASS = "about-craftsmanship-stat" as const;
export const ABOUT_CRAFTSMANSHIP_STAT_VALUE_CLASS = "about-craftsmanship-stat-value" as const;
export const ABOUT_CRAFTSMANSHIP_STAT_LABEL_CLASS = "about-craftsmanship-stat-label" as const;
export const ABOUT_CRAFTSMANSHIP_VISUAL_CLASS = "about-craftsmanship-visual" as const;
export const ABOUT_FOUNDER_PHOTO_PLACEHOLDER_CLASS = "about-founder-photo-placeholder" as const;
export const ABOUT_FOUNDER_PHOTO_WRAP_CLASS = "about-founder-photo-wrap" as const;
export const ABOUT_FOUNDER_QUOTE_CLASS = "about-founder-quote" as const;
export const ABOUT_FOUNDER_QUOTE_TEXT_CLASS = "about-founder-quote-text" as const;
export const ABOUT_FOUNDER_QUOTE_ATTRIBUTION_CLASS = "about-founder-quote-attribution" as const;

export const ABOUT_CRAFTSMANSHIP_STAT_COUNT = 1;
export const ABOUT_CRAFTSMANSHIP_INNER_PADDING_INLINE = "0";
export const ABOUT_CRAFTSMANSHIP_RULE_COLOR = "#e5e7eb";
export const ABOUT_CRAFTSMANSHIP_HEADING_SIZE = "clamp(1.75rem, 3vw, 2.25rem)";
export const ABOUT_CRAFTSMANSHIP_BODY_SIZE = "1rem";
export const ABOUT_CRAFTSMANSHIP_BODY_LINE_HEIGHT = "1.65";
export const ABOUT_CRAFTSMANSHIP_STAT_VALUE_SIZE = "1.5rem";
export const ABOUT_CRAFTSMANSHIP_STAT_GAP = "16px";
export const ABOUT_CRAFTSMANSHIP_STAT_RADIUS = "8px";

/** Stitch mockup: balanced copy + compact portrait with quote overlay. */
export const ABOUT_CRAFTSMANSHIP_GRID_COLUMNS = "1fr 1fr";
export {
  ABOUT_CRAFTSMANSHIP_BODY_MARGIN_BOTTOM,
  ABOUT_CRAFTSMANSHIP_COPY_JUSTIFY,
  ABOUT_CRAFTSMANSHIP_GRID_GAP,
  ABOUT_CRAFTSMANSHIP_HEADING_MARGIN_BOTTOM,
  ABOUT_CRAFTSMANSHIP_INNER_PADDING_TOP,
  ABOUT_CRAFTSMANSHIP_SECTION_PADDING_BOTTOM,
  ABOUT_CRAFTSMANSHIP_SECTION_PADDING_TOP,
} from "./aboutPageSpacing";
export const ABOUT_CRAFTSMANSHIP_GRID_ALIGN = "stretch";
export const ABOUT_CRAFTSMANSHIP_VISUAL_JUSTIFY = "start";
export const ABOUT_FOUNDER_PHOTO_MAX_WIDTH = "420px";
export const ABOUT_FOUNDER_PHOTO_ASPECT_RATIO = "4 / 5";
export const ABOUT_FOUNDER_PHOTO_OBJECT_POSITION = "center top";
export const ABOUT_FOUNDER_PHOTO_FILTER = "none";
export const ABOUT_FOUNDER_PHOTO_WIDTH_PX = 420;
export const ABOUT_FOUNDER_PHOTO_HEIGHT_PX = 525;
/** 80% of quote height sits on the portrait; 20% hangs below the photo bottom edge. */
export const ABOUT_FOUNDER_QUOTE_OVERHANG = "20%";
export const ABOUT_FOUNDER_QUOTE_TRANSFORM = `translateY(${ABOUT_FOUNDER_QUOTE_OVERHANG})`;
export const ABOUT_FOUNDER_QUOTE_BOTTOM = "0";
export const ABOUT_FOUNDER_QUOTE_RIGHT = "-24px";
export const ABOUT_FOUNDER_QUOTE_Z_INDEX = "2";

export const ABOUT_CRAFTSMANSHIP_YEARS_STAT = {
  value: "13+ Years",
  label: "INDUSTRY EXCELLENCE",
  valueClassName: ABOUT_CRAFTSMANSHIP_STAT_VALUE_CLASS,
} as const;

export const ABOUT_FOUNDER_PHOTO_SRC = "/assets/about/nitesh-rav-founder.png" as const;
export const ABOUT_FOUNDER_PHOTO_ALT = "Nitesh Rav — Founder, Commiters" as const;

export const ABOUT_FOUNDER_QUOTE = {
  text: '"Code is temporary. Architecture is forever."',
  attribution: "— NITESH RAV",
} as const;

export const ABOUT_CRAFTSMANSHIP_STATS = [ABOUT_CRAFTSMANSHIP_YEARS_STAT] as const;

/** Retired from the about page — must not render. */
export const ABOUT_CRAFTSMANSHIP_REMOVED_STAT = {
  value: "50+ Ships",
  label: "PROJECTS DELIVERED",
} as const;

export const ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS = {
  top: "about-craftsmanship-rule-top",
  bottom: "about-craftsmanship-rule-bottom",
} as const;

export const ABOUT_CRAFTSMANSHIP_COPY_START_TEST_ID = "about-craftsmanship-copy-start" as const;
