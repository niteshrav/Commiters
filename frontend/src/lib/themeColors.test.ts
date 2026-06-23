import { describe, expect, it } from "vitest";
import { STITCH_LIGHT_PALETTE } from "./stitchLightPalette";
import { LOGO_CSS_VARIABLES, LOGO_THEME } from "./themeColors";

describe("themeColors", () => {
  it("maps Stitch light palette to CSS variables", () => {
    expect(LOGO_THEME.stitchBlue).toBe(STITCH_LIGHT_PALETTE.stitchBlue);
    expect(LOGO_THEME.pageBackground).toBe("#ffffff");
    expect(LOGO_CSS_VARIABLES["--primary"]).toBe(STITCH_LIGHT_PALETTE.stitchBlue);
    expect(LOGO_CSS_VARIABLES["--page-background"]).toBe("#ffffff");
  });
});
