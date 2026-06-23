import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  FOOTER_HOME_MOCKUP_MARGIN_TOP,
  FOOTER_HOME_MOCKUP_RICH_PADDING,
  FOOTER_MOCKUP_COMPACT_CLASS,
  FOOTER_MOCKUP_COPYRIGHT_LINE2_MARGIN,
  FOOTER_MOCKUP_HEADING_MARGIN,
  FOOTER_MOCKUP_LINK_GAP,
  FOOTER_MOCKUP_PADDING_BLOCK,
  FOOTER_MOCKUP_ROW_GAP,
  FOOTER_NAV_COLUMNS_CLASS,
  FOOTER_NAV_GROUP_CLASS,
} from "./footerLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("footerLayout", () => {
  it("matches Stitch preview footer height and column layout", () => {
    expect(css).toContain(`padding-block: ${FOOTER_MOCKUP_PADDING_BLOCK}`);
    expect(css).toContain(`row-gap: ${FOOTER_MOCKUP_ROW_GAP}`);
    expect(css).toContain(`.${FOOTER_MOCKUP_COMPACT_CLASS}`);
    expect(css).toMatch(
      new RegExp(
        `\\.${FOOTER_NAV_GROUP_CLASS.replace(/-/g, "\\-")}\\.${FOOTER_NAV_COLUMNS_CLASS.replace(/-/g, "\\-")}[\\s\\S]*grid-row:\\s*1\\s*/\\s*-1`,
      ),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.${FOOTER_MOCKUP_COMPACT_CLASS.replace(/-/g, "\\-")}[\\s\\S]*\\.footer-column-heading[\\s\\S]*margin:\\s*${FOOTER_MOCKUP_HEADING_MARGIN.replace(/ /g, "\\s*")}`,
      ),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.${FOOTER_MOCKUP_COMPACT_CLASS.replace(/-/g, "\\-")}[\\s\\S]*\\.footer-link-list[\\s\\S]*gap:\\s*${FOOTER_MOCKUP_LINK_GAP}`,
      ),
    );
    expect(css).toMatch(/\.footer-nav-group--columns \.footer-link-list[\s\S]*flex-direction:\s*column/);
    expect(css).toMatch(
      new RegExp(
        `\\.footer-rich\\.footer--home-mockup[\\s\\S]*padding:\\s*${FOOTER_HOME_MOCKUP_RICH_PADDING}`,
      ),
    );
    expect(css).toMatch(
      new RegExp(`\\.footer\\.footer--home-mockup[\\s\\S]*margin-top:\\s*${FOOTER_HOME_MOCKUP_MARGIN_TOP}`),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.${FOOTER_MOCKUP_COMPACT_CLASS.replace(/-/g, "\\-")}[\\s\\S]*\\.footer-mockup-copyright-line2[\\s\\S]*margin-top:\\s*${FOOTER_MOCKUP_COPYRIGHT_LINE2_MARGIN}`,
      ),
    );
  });
});
