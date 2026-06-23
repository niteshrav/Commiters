import { describe, expect, it } from "vitest";
import { BRAND_REVIEW_PALETTE, BRAND_REVIEW_REFERENCE } from "./brandReviewPalette";

describe("brandReviewPalette", () => {
  it("matches the v2 review document recommended colours", () => {
    expect(BRAND_REVIEW_REFERENCE).toBe("Commiters_Website_Review_v2");
    expect(BRAND_REVIEW_PALETTE.brandGold).toBe("#c8973a");
    expect(BRAND_REVIEW_PALETTE.darkNavy).toBe("#1a1d2e");
    expect(BRAND_REVIEW_PALETTE.teal).toBe("#3abfbf");
    expect(BRAND_REVIEW_PALETTE.cream).toBe("#fff8ee");
    expect(BRAND_REVIEW_PALETTE.slate).toBe("#4a5568");
    expect(BRAND_REVIEW_PALETTE.deepFooter).toBe("#0d0f1a");
  });
});
