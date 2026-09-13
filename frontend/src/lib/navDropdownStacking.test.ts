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

  it("lays out two-column dropdowns as a compact enterprise grid", () => {
    const wide = ruleBlock(".nav-item-dropdown-panel--wide {", ".nav-item-dropdown-panel--compact {");
    expect(wide).toMatch(/display:\s*grid/);
    expect(wide).toMatch(/grid-template-columns:\s*repeat\(2/);
    expect(wide).toMatch(/max-width:\s*36rem/);
    expect(css).toContain(".max-w-xl");
  });

  it("styles compact dropdowns as a single column with a capped width", () => {
    expect(css).toMatch(/\.nav-item-dropdown-panel--compact\s*\{[^}]*flex-direction:\s*column/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel--compact\s*\{[^}]*max-width:\s*32rem/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel--md\s*\{[^}]*max-width:\s*26\.25rem/s);
    expect(css).toContain(".max-w-md");
    expect(css).toContain(".p-4");
    expect(css).toContain(".hover\\:bg-blue-50\\/50");
    expect(css).toMatch(/\.nav-dropdown-link-description\s*\{[^}]*font-size:\s*0\.75rem/s);
  });

  it("uses solid white panels, hover cards, and a fade-drop entrance", () => {
    const panel = ruleBlock(".nav-item-dropdown-panel {", ".nav-item-dropdown-panel.bg-white {");
    expect(panel).toMatch(/background:\s*#fff/);
    expect(panel).toMatch(/border:\s*1px solid #f1f5f9/);
    expect(panel).toMatch(/border-radius:\s*1rem/);
    expect(panel).toMatch(/box-shadow:\s*0 25px 50px -12px/);

    expect(css).toMatch(/\.nav-item-dropdown-panel\.bg-white\s*\{[^}]*background:\s*#fff/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel\.border-slate-100\s*\{[^}]*border-color:\s*#f1f5f9/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel \.nav-dropdown-link:hover\s*\{[^}]*background:\s*#f8fafc/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel \.nav-dropdown-link\s*\{[^}]*border-radius:\s*0\.75rem/s);
    expect(css).toMatch(/\.nav-item-dropdown-panel \.nav-dropdown-link\s*\{[^}]*box-shadow:\s*none/s);
    expect(css).toMatch(/@keyframes nav-dropdown-enter[\s\S]*opacity:\s*0[\s\S]*translateY\(-8px\)/);
    expect(css).toMatch(/\.nav-item-dropdown-panel--fixed\s*\{[^}]*animation:\s*nav-dropdown-enter 200ms ease-out/s);
    expect(css).toMatch(/\.nav-dropdown-link-label\s*\{[^}]*font-weight:\s*600/s);
    expect(css).not.toMatch(/\.nav-dropdown-link--featured\s*\{[^}]*box-shadow:/s);
  });
});
