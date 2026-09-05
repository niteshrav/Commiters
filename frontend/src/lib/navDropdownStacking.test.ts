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

  it("lays out the Services mega-menu as a four-column rich-card grid", () => {
    const mega = ruleBlock(".nav-item-dropdown-panel--mega-cards {", ".nav-item-dropdown-panel--mega-cards .nav-dropdown-link--stacked {");
    expect(mega).toMatch(/display:\s*grid/);
    expect(mega).toMatch(/grid-template-columns:\s*repeat\(4/);
  });

  it("styles card dropdowns with stacked titles, muted descriptions, and rounded panels", () => {
    expect(css).toMatch(/\.nav-item-dropdown-panel--cards\s*\{[^}]*flex-direction:\s*column/s);
    expect(css).toMatch(/\.nav-dropdown-link-description\s*\{[^}]*font-size:\s*0\.8rem/s);
    expect(css).toMatch(/@media \(max-width: 1400px\)[\s\S]*\.nav-item-dropdown-panel--grouped[\s\S]*repeat\(2/);
  });

  it("uses frosted-glass panels, subtle item hover, and a fade-drop entrance", () => {
    const panel = ruleBlock(".nav-item-dropdown-panel {", ".nav-item-dropdown-panel.backdrop-blur-md {");
    expect(panel).toMatch(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.8\)/);
    expect(panel).toMatch(/backdrop-filter:\s*blur\(12px\)/);
    expect(panel).toMatch(/border:\s*1px solid rgba\(226,\s*232,\s*240,\s*0\.5\)/);
    expect(panel).toMatch(/box-shadow:\s*var\(--shadow\)/);

    expect(css).toMatch(/\.nav-item-dropdown-panel\.backdrop-blur-md\s*\{[^}]*backdrop-filter:\s*blur\(12px\)/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel\.bg-white\\\/80\s*\{[^}]*background:\s*rgba\(255,\s*255,\s*255,\s*0\.8\)/s);
    expect(css).toMatch(
      /\[data-theme="dark"\] \.nav-item-dropdown-panel\.dark\\:bg-slate-900\\\/80\s*\{[^}]*background:\s*rgba\(15,\s*23,\s*42,\s*0\.8\)/s,
    );
    expect(css).toMatch(
      /\.nav-item-dropdown-panel \.nav-dropdown-link:hover\s*\{[^}]*background:\s*var\(--navy-soft\)/s,
    );
    expect(css).toMatch(/\.nav-item-dropdown-panel \.nav-dropdown-link:hover\s*\{[^}]*color:\s*var\(--primary\)/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel \.nav-dropdown-link\s*\{[^}]*border-radius:\s*12px/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel \.nav-dropdown-link\s*\{[^}]*transition:[^}]*150ms/s);
    expect(css).toMatch(/@keyframes nav-dropdown-enter[\s\S]*opacity:\s*0[\s\S]*translateY\(-8px\)/);
    expect(css).toMatch(/\.nav-item-dropdown-panel--fixed\s*\{[^}]*animation:\s*nav-dropdown-enter 200ms ease-out/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel--glass\s*\{[^}]*backdrop-filter:\s*blur\(12px\)/s);
    expect(css).toMatch(/\.nav-dropdown-link-label\s*\{[^}]*font-weight:\s*700/s);
  });
});
