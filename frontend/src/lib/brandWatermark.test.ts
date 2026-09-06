import { describe, expect, it } from "vitest";
import { COMMITERS_LOGO_PRIMARY_SRC } from "./siteBrand";
import { BRAND_WATERMARK_CLASS, BRAND_WATERMARK_OPACITY, BRAND_WATERMARK_SRC } from "./brandWatermark";

describe("brandWatermark", () => {
  it("uses the primary logo at muted opacity so headings stay readable", () => {
    expect(BRAND_WATERMARK_SRC).toBe(COMMITERS_LOGO_PRIMARY_SRC);
    expect(BRAND_WATERMARK_CLASS).toBe("brand-watermark");
    expect(BRAND_WATERMARK_OPACITY).toBe("0.1");
  });
});
