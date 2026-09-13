import {
  COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX,
  COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX,
} from "./siteBrand";

/** Header logo — 48px (h-12) so the lockup stays sharp in the sticky bar. */
export const BRAND_LOGO_HEADER_HEIGHT_PX = 48;
/** Footer lockup matches the header at 48px (h-12). */
export const BRAND_LOGO_FOOTER_HEIGHT_PX = 48;
export const BRAND_LOGO_HEADER_MAX_HEIGHT_PX = 48;

export function brandLogoWidthPx(heightPx: number): number {
  return Math.round((heightPx * COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX) / COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX);
}
