import {
  COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX,
  COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX,
} from "./siteBrand";

/** Header logo — h-10 / 40px max so the sticky bar stays compact. */
export const BRAND_LOGO_HEADER_HEIGHT_PX = 40;
/** Footer / primary mark — slightly taller than the header lockup. */
export const BRAND_LOGO_FOOTER_HEIGHT_PX = 56;
export const BRAND_LOGO_HEADER_MAX_HEIGHT_PX = 40;

export function brandLogoWidthPx(heightPx: number): number {
  return Math.round((heightPx * COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX) / COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX);
}
