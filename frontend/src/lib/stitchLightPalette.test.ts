import { describe, expect, it } from "vitest";
import { STITCH_LIGHT_PALETTE } from "./stitchLightPalette";

describe("stitchLightPalette", () => {
  it("uses white canvas and vibrant blue accents", () => {
    expect(STITCH_LIGHT_PALETTE.surface).toBe("#ffffff");
    expect(STITCH_LIGHT_PALETTE.stitchBlue).toMatch(/^#[0-9a-f]{6}$/i);
  });
});
