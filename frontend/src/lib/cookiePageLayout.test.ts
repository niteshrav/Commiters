import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  COOKIE_CATEGORY_CARD_CLASS,
  COOKIE_CATEGORY_GRID_CLASS,
  COOKIE_CONTENT_COLUMN_CLASS,
  COOKIE_INTRO_KICKER_CLASS,
  COOKIE_LAYOUT_CLASS,
  COOKIE_MANAGE_CTA_CLASS,
  COOKIE_NAV_CLASS,
  COOKIE_NAV_LINK_ACTIVE_CLASS,
  COOKIE_PAGE_CLASS,
  COOKIE_PROSE_MAX_WIDTH,
  COOKIE_SECTION_TITLE_CLASS,
  COOKIE_TITLE_CLASS,
} from "./cookiePageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("cookiePageLayout", () => {
  it("matches the cookie policy hero typography from the Stitch screenshot", () => {
    const kicker = ruleBlock(`.${COOKIE_INTRO_KICKER_CLASS} {`, `.${COOKIE_TITLE_CLASS} {`);
    expect(kicker).toContain("text-transform: uppercase");

    const title = ruleBlock(`.${COOKIE_TITLE_CLASS} {`, `.cookie-policy-last-updated {`);
    expect(title).toContain("font-weight: 700");
  });

  it("uses a sidebar plus content column with a responsive category grid", () => {
    const layout = ruleBlock(`.${COOKIE_LAYOUT_CLASS} {`, `.${COOKIE_NAV_CLASS} {`);
    expect(layout).toContain("grid-template-columns");

    const grid = ruleBlock(`.${COOKIE_CATEGORY_GRID_CLASS} {`, `.${COOKIE_CATEGORY_CARD_CLASS} {`);
    expect(grid).toContain("grid-template-columns: repeat(2");

    const manage = ruleBlock(`.${COOKIE_MANAGE_CTA_CLASS} {`, `.cookie-policy-disclaimer {`);
    expect(manage).toContain("border-radius");
  });

  it("exposes layout tokens for tests and page structure", () => {
    expect(COOKIE_PAGE_CLASS).toBe("cookie-policy-page");
    expect(COOKIE_CONTENT_COLUMN_CLASS).toBe("cookie-policy-content");
    expect(COOKIE_PROSE_MAX_WIDTH).toBe("56rem");
    expect(COOKIE_NAV_LINK_ACTIVE_CLASS).toBe("cookie-policy-nav-link--active");
    expect(COOKIE_SECTION_TITLE_CLASS).toBe("cookie-policy-section-title");
  });
});
