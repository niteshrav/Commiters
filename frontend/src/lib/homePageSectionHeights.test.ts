import { describe, expect, it } from "vitest";
import {
  HOME_BOTTOM_CTA_PADDING_BLOCK_MAX_PX,
  HOME_BOTTOM_CTA_PADDING_BLOCK_MIN_PX,
} from "./homeBottomCtaLayout";
import {
  FOOTER_MOCKUP_PADDING_BLOCK_MAX_PX,
  FOOTER_MOCKUP_PADDING_BLOCK_MIN_PX,
} from "./footerLayout";

describe("homePageSectionHeights", () => {
  it("keeps the bottom CTA taller than the home footer (Stitch screenshot proportions)", () => {
    expect(HOME_BOTTOM_CTA_PADDING_BLOCK_MIN_PX).toBeGreaterThanOrEqual(
      FOOTER_MOCKUP_PADDING_BLOCK_MAX_PX * 1.5,
    );
    expect(HOME_BOTTOM_CTA_PADDING_BLOCK_MAX_PX).toBeGreaterThan(
      FOOTER_MOCKUP_PADDING_BLOCK_MIN_PX * 2,
    );
  });
});
