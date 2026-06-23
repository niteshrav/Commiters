import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { LOGO_CSS_VARIABLES } from "./themeColors";
import { logoThemeRootBlock } from "./logoThemeCss";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function rootBlock(): string {
  const start = css.indexOf(":root {");
  let depth = 0;
  for (let i = start; i < css.length; i += 1) {
    if (css[i] === "{") depth += 1;
    if (css[i] === "}") {
      depth -= 1;
      if (depth === 0) return css.slice(start, i + 1);
    }
  }
  throw new Error(":root block not found");
}

describe("logoThemeCss", () => {
  it("documents every logo CSS variable in themeColors", () => {
    for (const [name, value] of Object.entries(LOGO_CSS_VARIABLES)) {
      expect(logoThemeRootBlock()).toContain(`${name}: ${value};`);
    }
  });

  it("mirrors the same values in styles.css :root", () => {
    const root = rootBlock();
    for (const [name, value] of Object.entries(LOGO_CSS_VARIABLES)) {
      expect(root).toContain(`${name}: ${value};`);
    }
  });
});
