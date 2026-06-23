import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { LOGO_COLOR_ROLE_SELECTORS } from "./logoColorRoles";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("logoColorRoles", () => {
  it("uses white canvas and light footer from the Stitch palette", () => {
    expect(ruleBlock(LOGO_COLOR_ROLE_SELECTORS.pageCanvas.selector, ".route-shell {")).toContain(
      LOGO_COLOR_ROLE_SELECTORS.pageCanvas.property,
    );
    expect(ruleBlock(LOGO_COLOR_ROLE_SELECTORS.footerStitch.selector, ".footer-columns {")).toContain(
      LOGO_COLOR_ROLE_SELECTORS.footerStitch.property,
    );
  });

  it("uses Stitch blue for primary CTAs via site button tokens, nav active state, and quote links", () => {
    expect(ruleBlock(LOGO_COLOR_ROLE_SELECTORS.primaryCta.selector, ".btn-primary:hover {")).toMatch(
      /var\(--site-btn-primary-bg/,
    );
    expect(css).toContain("--site-btn-primary-bg: var(--stitch-blue);");
    expect(ruleBlock(LOGO_COLOR_ROLE_SELECTORS.navUnderline.selector, ".nav-primary-link:focus:not(:focus-visible) {")).toContain(
      LOGO_COLOR_ROLE_SELECTORS.navUnderline.property,
    );
    expect(ruleBlock(LOGO_COLOR_ROLE_SELECTORS.quoteLink.selector, ".quote-link:hover {")).toContain(
      LOGO_COLOR_ROLE_SELECTORS.quoteLink.property,
    );
  });

  it("styles Stitch page heroes and kickers", () => {
    expect(css).toContain(".stitch-home-hero");
    expect(ruleBlock(LOGO_COLOR_ROLE_SELECTORS.sectionKicker.selector, ".stitch-page-title {")).toContain(
      LOGO_COLOR_ROLE_SELECTORS.sectionKicker.property,
    );
  });
});
