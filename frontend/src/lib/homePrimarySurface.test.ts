import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { HOME_PRIMARY_SURFACE_CLASS, HOME_PRIMARY_SURFACE_CSS_VAR } from "./homePrimarySurface";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("homePrimarySurface", () => {
  it("ties hero and built-for-scale to the same surface background token", () => {
    const surfaceRule = new RegExp(
      `\\.${HOME_PRIMARY_SURFACE_CLASS.replace(/-/g, "\\-")}[\\s\\S]*background:\\s*var\\(${HOME_PRIMARY_SURFACE_CSS_VAR}\\)`,
    );
    expect(css).toMatch(surfaceRule);
    expect(css).toMatch(/\.stitch-home-hero\.home-primary-surface/);
    expect(css).toMatch(/\.home-built-for-scale\.home-primary-surface/);
  });
});
