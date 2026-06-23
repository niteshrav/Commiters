import { PRECISION_MINIMALIST_DESIGN } from "./precisionMinimalistDesign";

/** Palette aligned with Precision Minimalist / Void-First global design. */
export const STITCH_LIGHT_PALETTE = {
  stitchBlue: PRECISION_MINIMALIST_DESIGN.colors.primary,
  stitchBlueHover: PRECISION_MINIMALIST_DESIGN.colors.primaryHover,
  stitchBlueRgb: PRECISION_MINIMALIST_DESIGN.colors.primaryRgb,
  ink: PRECISION_MINIMALIST_DESIGN.colors.heading,
  muted: PRECISION_MINIMALIST_DESIGN.colors.body,
  border: PRECISION_MINIMALIST_DESIGN.colors.borderOutline,
  borderSubtle: PRECISION_MINIMALIST_DESIGN.colors.borderSubtle,
  surface: PRECISION_MINIMALIST_DESIGN.colors.background,
  surfaceMuted: PRECISION_MINIMALIST_DESIGN.colors.surfaceContainerLow,
  kickerTan: "#9a7b4f",
  white: PRECISION_MINIMALIST_DESIGN.colors.background,
} as const;
