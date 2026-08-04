/** Services grid band below the intro separator (Stitch screenshot). */
export const SERVICES_GRID_CLASS = "stitch-services-grid" as const;
export const SERVICES_GRID_SECTION_CLASS = "stitch-services-grid-section" as const;
export const SERVICE_CARD_CLASS = "stitch-service-card" as const;
export const SERVICE_CARD_ICON_CLASS = "stitch-service-card-icon" as const;
export const SERVICE_CARD_TITLE_CLASS = "stitch-service-card-title" as const;
export const SERVICE_CARD_COPY_CLASS = "stitch-service-card-copy" as const;
export const SERVICE_CARD_HOVER_CLASS = "stitch-service-card-hover" as const;
export const SERVICE_CARD_HOVER_ALWAYS_CLASS = "stitch-service-card-hover--always" as const;
export const SERVICE_CARD_MAIN_CLASS = "stitch-service-card-main" as const;
export const SERVICE_CARD_LINK_CLASS = "stitch-service-card-link" as const;
export const SERVICE_CARD_ACTION_CLASS = "stitch-service-card-action" as const;
export const SERVICE_CARD_LINK_WRAP_CLASS = "stitch-service-card-link-wrap" as const;

export const SERVICE_CARD_SPAN_CLASS = {
  1: "stitch-service-card--span-1",
  2: "stitch-service-card--span-2",
  3: "stitch-service-card--span-3",
} as const;

export const SERVICE_CARD_LAYOUT_CLASS = {
  standard: "stitch-service-card--standard",
  split: "stitch-service-card--split",
} as const;

export const SERVICES_GRID_COLUMNS = "repeat(auto-fill, minmax(min(100%, 300px), 1fr))";
export const SERVICES_GRID_GAP = "20px";
export const SERVICES_GRID_SECTION_PADDING = "clamp(24px, 4vw, 40px) 0 clamp(48px, 6vw, 72px)";
export const SERVICE_CARD_BORDER = "#e5e7eb";
export const SERVICE_CARD_BORDER_HOVER = "rgba(var(--primary-rgb), 0.35)";
export const SERVICE_CARD_PADDING = "clamp(24px, 3vw, 32px)";
export const SERVICE_CARD_BORDER_RADIUS = "16px";
