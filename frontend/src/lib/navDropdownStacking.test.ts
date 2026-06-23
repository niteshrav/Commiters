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
});
