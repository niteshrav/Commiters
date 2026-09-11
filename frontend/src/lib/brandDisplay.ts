import {
  COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX,
  COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX,
} from "./siteBrand";

/** Header logo — 48px so the sticky bar reads a bit taller. */
export const BRAND_LOGO_HEADER_HEIGHT_PX = 48;
/** Footer / primary mark — slightly taller than the header lockup. */
export const BRAND_LOGO_FOOTER_HEIGHT_PX = 56;
export const BRAND_LOGO_HEADER_MAX_HEIGHT_PX = 48;

export function brandLogoWidthPx(heightPx: number): number {
  return Math.round((heightPx * COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX) / COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX);
}
