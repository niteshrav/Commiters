import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  FOOTER_BLACKBOOK_BAR_CLASS,
  FOOTER_NOCK_CLASS,
  FOOTER_NOCK_LINK_GAP,
  FOOTER_NOCK_MAIN_CLASS,
  FOOTER_NOCK_SHELL_CLASS,
  FOOTER_NOCK_SHELL_MAX_WIDTH,
  FOOTER_NOCK_SHELL_PADDING,
  FOOTER_HOME_MOCKUP_MARGIN_TOP,
  FOOTER_HOME_MOCKUP_RICH_PADDING,
} from "./footerLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("footerLayout", () => {
  it("matches the Option 1 four-column nock footer with a legal bottom bar", () => {
    expect(css).toContain(`.${FOOTER_NOCK_CLASS}`);
    expect(css).toContain(`.${FOOTER_NOCK_SHELL_CLASS}`);
    expect(css).toContain(`.${FOOTER_NOCK_MAIN_CLASS}`);
    expect(css).toContain(`.${FOOTER_BLACKBOOK_BAR_CLASS}`);
    expect(css).toContain(FOOTER_NOCK_SHELL_PADDING);
    expect(css).toContain(`max-width: ${FOOTER_NOCK_SHELL_MAX_WIDTH}`);
    expect(css).toContain(`gap: ${FOOTER_NOCK_LINK_GAP}`);
    expect(css).toContain("grid-template-columns: minmax(14rem, 1.15fr) repeat(3, minmax(0, 1fr))");
    expect(css).toMatch(/\.footer--nock\.footer--home-mockup[\s\S]*background:\s*#ffffff/);
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
