import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { STITCH_SURFACE_CARD_CLASS } from "./stitchSurfaceCard";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("stitchSurfaceCard", () => {
  it("defines the sprint-card surface style used for home and marketing boxes", () => {
    expect(STITCH_SURFACE_CARD_CLASS).toBe("stitch-surface-card");
    expect(css).toContain(".stitch-surface-card {");
    expect(css).toContain("box-shadow:");
    expect(css).toContain("border-radius: 14px");
  });
});
