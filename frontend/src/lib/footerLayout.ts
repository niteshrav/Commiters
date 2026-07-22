export const FOOTER_MOCKUP_GRID_CLASS = "footer-mockup-grid" as const;
export const FOOTER_MOCKUP_COMPACT_CLASS = "footer-mockup-compact" as const;
export const FOOTER_LOGO_CELL_CLASS = "footer-mockup-logo-cell" as const;
export const FOOTER_COPYRIGHT_CELL_CLASS = "footer-mockup-copyright-cell" as const;
export const FOOTER_NAV_GROUP_CLASS = "footer-nav-group--mockup" as const;
export const FOOTER_NAV_COLUMNS_CLASS = "footer-nav-group--columns" as const;
export const FOOTER_COLUMN_CLASS = "footer-column--mockup" as const;

/** Stitch preview footer spacing (logo-aligned headers, compact height). */
export const FOOTER_MOCKUP_PADDING_BLOCK = "clamp(20px, 2.5vw, 28px)";
export const FOOTER_MOCKUP_PADDING_BLOCK_MIN_PX = 20;
export const FOOTER_MOCKUP_PADDING_BLOCK_MAX_PX = 28;
/** Home mockup sits flush under the dark CTA (no default footer top margin). */
export const FOOTER_HOME_MOCKUP_MARGIN_TOP = "0";
export const FOOTER_MOCKUP_ROW_GAP = "4px";
export const FOOTER_MOCKUP_HEADING_MARGIN = "0 0 4px";
export const FOOTER_MOCKUP_LINK_GAP = "4px";
export const FOOTER_MOCKUP_COPYRIGHT_LINE2_MARGIN = "2px";
export const FOOTER_LINK_LIST_SPLIT_CLASS = "footer-link-list--split" as const;
export const FOOTER_LINK_LIST_SOCIAL_CLASS = "footer-link-list--social" as const;
/** Home mockup uses grid padding only; avoid stacking `.footer-rich` vertical padding. */
export const FOOTER_HOME_MOCKUP_RICH_PADDING = "0";
