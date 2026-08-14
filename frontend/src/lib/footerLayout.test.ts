import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  FOOTER_HOME_MOCKUP_MARGIN_TOP,
  FOOTER_HOME_MOCKUP_RICH_PADDING,
  FOOTER_REFERENCE_BAR_CLASS,
  FOOTER_REFERENCE_CARD_CLASS,
  FOOTER_REFERENCE_CARD_RADIUS,
  FOOTER_REFERENCE_GRID_CLASS,
  FOOTER_REFERENCE_GRID_GAP,
  FOOTER_REFERENCE_SHELL_CLASS,
  FOOTER_REFERENCE_SHELL_PADDING,
  FOOTER_SOCIAL_ICONS_ROW_CLASS,
} from "./footerLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("footerLayout", () => {
  it("matches the reference footer card layout and accent bar", () => {
    expect(css).toContain(`.${FOOTER_REFERENCE_SHELL_CLASS}`);
    expect(css).toContain(`.${FOOTER_REFERENCE_CARD_CLASS}`);
    expect(css).toContain(`.${FOOTER_REFERENCE_GRID_CLASS}`);
    expect(css).toContain(`.${FOOTER_REFERENCE_BAR_CLASS}`);
    expect(css).toContain(FOOTER_REFERENCE_SHELL_PADDING);
    expect(css).toContain(`border-radius: ${FOOTER_REFERENCE_CARD_RADIUS}`);
    expect(css).toContain(`gap: ${FOOTER_REFERENCE_GRID_GAP}`);
    expect(css).toContain("grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr) minmax(0, 0.85fr)");
    expect(css).toContain(`.footer--reference .${FOOTER_SOCIAL_ICONS_ROW_CLASS}`);
    expect(css).toMatch(/\.footer--reference\.footer--home-mockup[\s\S]*border-top:\s*1px\s+solid\s+var\(--border\)/);
    expect(css).toMatch(
      new RegExp(
        `\\.footer-rich\\.footer--home-mockup[\\s\\S]*padding:\\s*${FOOTER_HOME_MOCKUP_RICH_PADDING}`,
      ),
    );
    expect(css).toMatch(
      new RegExp(`\\.footer\\.footer--home-mockup[\\s\\S]*margin-top:\\s*${FOOTER_HOME_MOCKUP_MARGIN_TOP}`),
    );
  });
});
