import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  BRAND_CARD_HOVER_CLASSES,
  BRAND_COLOR_KIT,
  BRAND_COLOR_KIT_CSS_VARIABLES,
  BRAND_TECH_BADGE_CLASSES,
} from "./brandColorKit";
import { LOGO_CSS_VARIABLES } from "./themeColors";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("brandColorKit", () => {
  it("pins the Commiters Brand Asset Kit", () => {
    expect(BRAND_COLOR_KIT.electricBlue).toBe("#0066ff");
    expect(BRAND_COLOR_KIT.electricBlueBright).toBe("#0088ff");
    expect(BRAND_COLOR_KIT.cyan).toBe("#00c2ff");
    expect(BRAND_COLOR_KIT.gold).toBe("#d4a017");
    expect(BRAND_COLOR_KIT.goldBright).toBe("#e5b82a");
    expect(BRAND_COLOR_KIT.navy).toBe("#0a0e17");
    expect(BRAND_COLOR_KIT.slate).toBe("#0f172a");
    expect(BRAND_COLOR_KIT.offWhite).toBe("#f8fafc");
    expect(BRAND_COLOR_KIT.lightGray).toBe("#f1f5f9");
  });

  it("keeps primary electric blue and gold tokens wired into the theme", () => {
    expect(LOGO_CSS_VARIABLES["--primary"]).toBe(BRAND_COLOR_KIT.electricBlue);
    expect(LOGO_CSS_VARIABLES["--brand-gold"]).toBe(BRAND_COLOR_KIT.gold);
    expect(LOGO_CSS_VARIABLES["--brand-gold-bright"]).toBe(BRAND_COLOR_KIT.goldBright);
    expect(LOGO_CSS_VARIABLES["--brand-cyan"]).toBe(BRAND_COLOR_KIT.cyan);
  });

  it("ships kit tokens and badge/hover utilities in styles.css", () => {
    for (const [name, value] of Object.entries(BRAND_COLOR_KIT_CSS_VARIABLES)) {
      expect(css).toContain(`${name}: ${value};`);
    }
    expect(css).toContain(".bg-cyan\\/10");
    expect(css).toContain(".text-cyan-400");
    expect(css).toContain(".border-cyan\\/30");
    expect(css).toContain(".hover\\:border-cyan\\/50:hover");
    expect(css).toContain(".transition-all");
    expect(css).toContain(".duration-300");
    expect(BRAND_TECH_BADGE_CLASSES).toContain("bg-cyan/10");
    expect(BRAND_CARD_HOVER_CLASSES).toContain("hover:border-cyan/50");
  });
});
