import { PRECISION_MINIMALIST_DESIGN } from "./precisionMinimalistDesign";

/** Site-wide typography — Inter from the Commiters Brand Book. */
export const SITE_TYPOGRAPHY = {
  fontFamily: PRECISION_MINIMALIST_DESIGN.typography.fontFamily,
  sectionTitleWeight: PRECISION_MINIMALIST_DESIGN.typography.sectionTitleWeight,
  bodyWeight: PRECISION_MINIMALIST_DESIGN.typography.bodyWeight,
  bodySize: PRECISION_MINIMALIST_DESIGN.typography.bodySize,
  mutedSize: PRECISION_MINIMALIST_DESIGN.typography.bodySize,
  labelSize: "0.72rem",
  labelTracking: PRECISION_MINIMALIST_DESIGN.typography.labelTracking,
  displayWeight: PRECISION_MINIMALIST_DESIGN.typography.displayWeight,
  displayTracking: PRECISION_MINIMALIST_DESIGN.typography.displayTracking,
} as const;
