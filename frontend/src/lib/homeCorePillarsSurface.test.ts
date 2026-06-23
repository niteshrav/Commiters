import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  HOME_CORE_PILLARS_SURFACE_CLASS,
  HOME_CORE_PILLARS_SURFACE_CSS_VAR,
  HOME_CORE_PILLARS_SURFACE_HEX,
} from "./homeCorePillarsSurface";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("homeCorePillarsSurface", () => {
  it("declares the void-first surface token for core pillars", () => {
    expect(HOME_CORE_PILLARS_SURFACE_HEX).toBe("#f8f9fa");
    expect(css).toContain(`${HOME_CORE_PILLARS_SURFACE_CSS_VAR}: ${HOME_CORE_PILLARS_SURFACE_HEX}`);
    expect(css).toMatch(
      new RegExp(
        `\\.home-core-pillars\\.${HOME_CORE_PILLARS_SURFACE_CLASS.replace(/-/g, "\\-")}[\\s\\S]*background:\\s*var\\(${HOME_CORE_PILLARS_SURFACE_CSS_VAR}\\)`,
      ),
    );
  });
});
