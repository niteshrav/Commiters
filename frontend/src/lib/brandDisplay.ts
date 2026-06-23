import {
  COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX,
  COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX,
} from "./siteBrand";

/** Prominent logo sizes — tagline lives inside the logo artwork only. */
export const BRAND_LOGO_HEADER_HEIGHT_PX = 68;
export const BRAND_LOGO_FOOTER_HEIGHT_PX = 48;

export function brandLogoWidthPx(heightPx: number): number {
  return Math.round((heightPx * COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX) / COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX);
}
