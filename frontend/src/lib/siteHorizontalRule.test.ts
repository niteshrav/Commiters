import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  SITE_HORIZONTAL_RULE_BORDER_CSS,
  SITE_HORIZONTAL_RULE_CLASS,
  SITE_SHELL_FOOTER_BORDER_CSS,
  SITE_SHELL_HEADER_BORDER_CSS,
} from "./siteHorizontalRule";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("siteHorizontalRule", () => {
  it("pins one border style for header, footer, and contained page rules", () => {
    expect(SITE_SHELL_HEADER_BORDER_CSS).toBe(SITE_HORIZONTAL_RULE_BORDER_CSS);
    expect(SITE_SHELL_FOOTER_BORDER_CSS).toBe(SITE_HORIZONTAL_RULE_BORDER_CSS);
    expect(SITE_HORIZONTAL_RULE_BORDER_CSS).toBe("1px solid var(--border)");
  });

  it("styles contained rules at full column width without viewport breakout", () => {
    const rule = ruleBlock(`.${SITE_HORIZONTAL_RULE_CLASS} {`, ".header-inner {");
    expect(rule).toContain(`border-top: ${SITE_HORIZONTAL_RULE_BORDER_CSS}`);
    expect(rule).toContain("width: 100%");
    expect(rule).not.toContain("100vw");
    expect(rule).not.toContain("calc(50% - 50vw)");
  });

  it("matches the header bottom border to the footer top border", () => {
    const header = ruleBlock(".header-light {", ".header-inner {");
    expect(header).toContain(`border-bottom: ${SITE_SHELL_HEADER_BORDER_CSS}`);

    const footer = ruleBlock(".footer--stitch {", ".footer-columns--mockup {");
    expect(footer).toContain(`border-top: ${SITE_SHELL_FOOTER_BORDER_CSS}`);
  });
});
