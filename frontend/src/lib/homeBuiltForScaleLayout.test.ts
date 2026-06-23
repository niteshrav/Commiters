import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  BUILT_FOR_SCALE_FEATURE_COUNT,
  BUILT_FOR_SCALE_GRID_CLASS,
  BUILT_FOR_SCALE_IMAGE_HEIGHT,
  BUILT_FOR_SCALE_IMAGE_SIZES,
  BUILT_FOR_SCALE_IMAGE_WIDTH,
} from "./homeBuiltForScaleLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("homeBuiltForScaleLayout", () => {
  it("uses mockup grid, square image, and three feature rows", () => {
    expect(BUILT_FOR_SCALE_IMAGE_WIDTH).toBe(560);
    expect(BUILT_FOR_SCALE_IMAGE_HEIGHT).toBe(BUILT_FOR_SCALE_IMAGE_WIDTH);
    expect(BUILT_FOR_SCALE_IMAGE_SIZES).toContain("560px");
    expect(BUILT_FOR_SCALE_FEATURE_COUNT).toBe(3);
    expect(BUILT_FOR_SCALE_GRID_CLASS).toBe("home-built-for-scale-grid--mockup");
    expect(css).toMatch(
      new RegExp(
        `\\.${BUILT_FOR_SCALE_GRID_CLASS.replace(/-/g, "\\-")}[\\s\\S]*grid-template-columns:[\\s\\S]*1fr[\\s\\S]*1fr`,
      ),
    );
    expect(css).toContain(".home-scale-features");
    expect(css).toMatch(/\.home-scale-feature-icon[\s\S]*#2563eb/);
  });
});
