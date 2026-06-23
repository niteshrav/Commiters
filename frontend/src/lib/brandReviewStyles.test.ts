import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { STITCH_LIGHT_PALETTE } from "./stitchLightPalette";
import { PRECISION_MINIMALIST_DESIGN } from "./precisionMinimalistDesign";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("brandReviewStyles", () => {
  it("loads Plus Jakarta Sans for display headings and body copy", () => {
    expect(css).toContain("Plus Jakarta Sans");
    expect(css).toContain("--font-display:");
    expect(css).toContain("--font-body:");
  });

  it("implements Stitch light UI patterns in CSS", () => {
    expect(css).toContain(".stitch-home-hero");
    expect(css).toContain(".stitch-contact-grid");
    expect(css).toContain(".footer--stitch");
    expect(css).toContain(STITCH_LIGHT_PALETTE.stitchBlue);
    expect(STITCH_LIGHT_PALETTE.stitchBlue).toBe(PRECISION_MINIMALIST_DESIGN.colors.primary);
  });
});
