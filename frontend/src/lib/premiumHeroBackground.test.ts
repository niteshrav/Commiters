import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { REMOVED_PREMIUM_HERO_WARM_MESH_RGB } from "./premiumHeroBackground";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cssPath = join(__dirname, "..", "styles.css");
const css = readFileSync(cssPath, "utf8");

function cssBlockAfter(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  expect(next).toBeGreaterThan(start);
  return css.slice(start, next);
}

describe("premiumHeroBackground (styles contract)", () => {
  it("does not use the retired warm gold mesh in the hero backdrop", () => {
    const backdrop = cssBlockAfter(".premium-hero-backdrop {", ".premium-hero-shell {");
    expect(backdrop).not.toContain(REMOVED_PREMIUM_HERO_WARM_MESH_RGB);
  });

  it("uses dark navy dot-grid hero for review v2 pages", () => {
    const navyBackdrop = cssBlockAfter(".premium-hero--navy .premium-hero-backdrop {", ".premium-hero--navy .premium-hero-glass {");
    expect(navyBackdrop).toMatch(/var\(--dark-navy\)/);
  });
});
