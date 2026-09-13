import { describe, expect, it } from "vitest";
import {
  BRAND_LOGO_FOOTER_HEIGHT_PX,
  BRAND_LOGO_HEADER_HEIGHT_PX,
  BRAND_LOGO_HEADER_MAX_HEIGHT_PX,
  brandLogoWidthPx,
} from "./brandDisplay";

describe("brandDisplay", () => {
  it("renders header and footer lockups at a sharp 48px (h-12)", () => {
    expect(BRAND_LOGO_HEADER_HEIGHT_PX).toBe(48);
    expect(BRAND_LOGO_HEADER_MAX_HEIGHT_PX).toBe(48);
    expect(BRAND_LOGO_FOOTER_HEIGHT_PX).toBe(48);
  });

  it("derives logo width from the regenerated asset aspect ratio", () => {
    expect(brandLogoWidthPx(BRAND_LOGO_HEADER_HEIGHT_PX)).toBe(174);
    expect(brandLogoWidthPx(BRAND_LOGO_FOOTER_HEIGHT_PX)).toBe(174);
  });
});
