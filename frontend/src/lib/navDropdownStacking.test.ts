import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  expect(next).toBeGreaterThan(start);
  return css.slice(start, next);
}

describe("navDropdownStacking (styles contract)", () => {
  it("stacks the sticky header above main content so dropdowns are not covered", () => {
    const headerShell = ruleBlock(".site-shell > .header {", ".site-shell > main");
    const mainShell = ruleBlock(".site-shell > main,", ".site-shell > .footer");
    const headerZ = Number(headerShell.match(/z-index:\s*(\d+)/)?.[1] ?? 0);
    const mainZ = Number(mainShell.match(/z-index:\s*(\d+)/)?.[1] ?? 0);
    expect(headerZ).toBeGreaterThan(mainZ);
    expect(headerZ).toBeGreaterThanOrEqual(100);
  });

  it("keeps the sticky header shell with visible overflow", () => {
    const header = ruleBlock(".header {", ".header-inner");
    expect(header).toMatch(/overflow:\s*visible/);
  });

  it("lays out the Services mega-menu as a four-column grouped grid", () => {
    const grouped = ruleBlock(".nav-item-dropdown-panel--grouped {", ".nav-mega-column {");
    expect(grouped).toMatch(/display:\s*grid/);
    expect(grouped).toMatch(/grid-template-columns:\s*repeat\(4/);
  });

  it("styles card dropdowns with stacked titles, muted descriptions, and rounded panels", () => {
    expect(css).toMatch(/\.nav-item-dropdown-panel--cards\s*\{[^}]*flex-direction:\s*column/s);
    expect(css).toMatch(/\.nav-dropdown-link-description\s*\{[^}]*font-size:\s*0\.8rem/s);
    expect(css).toMatch(/@media \(max-width: 1400px\)[\s\S]*\.nav-item-dropdown-panel--grouped[\s\S]*repeat\(2/);
  });

  it("uses frosted-glass panels, subtle item hover, and a fade-drop entrance", () => {
    const panel = ruleBlock(".nav-item-dropdown-panel {", ".nav-item-dropdown-panel--fixed {");
    expect(panel).toMatch(/background:\s*rgba\(var\(--white-rgb\),\s*0\.9\)/);
    expect(panel).toMatch(/backdrop-filter:\s*blur\(12px\)/);
    expect(panel).toMatch(/border:\s*1px solid var\(--border\)/);
    expect(panel).toMatch(/box-shadow:\s*var\(--shadow\)/);
    expect(panel).not.toMatch(/#f8fafc|#e2e8f0|rgba\(226,\s*232,\s*240/);

    expect(css).toMatch(
      /\.nav-item-dropdown-panel \.nav-dropdown-link:hover\s*\{[^}]*background:\s*var\(--navy-soft\)/s,
    );
    expect(css).toMatch(/\.nav-item-dropdown-panel \.nav-dropdown-link:hover\s*\{[^}]*color:\s*var\(--primary\)/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel \.nav-dropdown-link\s*\{[^}]*border-radius:\s*12px/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel \.nav-dropdown-link\s*\{[^}]*transition:[^}]*150ms/s);
    expect(css).toMatch(/@keyframes nav-dropdown-enter[\s\S]*opacity:\s*0[\s\S]*translateY\(-8px\)/);
    expect(css).toMatch(/\.nav-item-dropdown-panel--fixed\s*\{[^}]*animation:\s*nav-dropdown-enter 200ms ease-out/s);
    expect(css).not.toMatch(/rgba\(15,\s*23,\s*42,\s*0\.9\)/);
    expect(css).not.toMatch(/rgba\(241,\s*245,\s*249,\s*0\.7\)/);
  });
});
