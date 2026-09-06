import { describe, expect, it } from "vitest";
import {
  BRAND_LOGO_FOOTER_HEIGHT_PX,
  BRAND_LOGO_HEADER_HEIGHT_PX,
  BRAND_LOGO_HEADER_MAX_HEIGHT_PX,
  brandLogoWidthPx,
} from "./brandDisplay";

describe("brandDisplay", () => {
  it("keeps the header lockup at or below 40px", () => {
    expect(BRAND_LOGO_HEADER_HEIGHT_PX).toBeLessThanOrEqual(40);
    expect(BRAND_LOGO_HEADER_MAX_HEIGHT_PX).toBe(40);
    expect(BRAND_LOGO_FOOTER_HEIGHT_PX).toBeGreaterThanOrEqual(44);
    expect(BRAND_LOGO_FOOTER_HEIGHT_PX).toBeGreaterThan(BRAND_LOGO_HEADER_HEIGHT_PX);
  });

  it("derives logo width from the regenerated asset aspect ratio", () => {
    expect(brandLogoWidthPx(BRAND_LOGO_HEADER_HEIGHT_PX)).toBe(145);
    expect(brandLogoWidthPx(BRAND_LOGO_FOOTER_HEIGHT_PX)).toBe(203);
  });
});
