import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  TECHNICAL_LEDGER_ARTICLE_CARD_CLASS,
  TECHNICAL_LEDGER_ARTICLE_CATEGORY_CLASS,
  TECHNICAL_LEDGER_ARTICLE_GRID_COLUMNS,
  TECHNICAL_LEDGER_ARTICLE_LINK_CLASS,
  TECHNICAL_LEDGER_ARTICLE_LIST_CLASS,
  TECHNICAL_LEDGER_DIVIDER_CLASS,
  TECHNICAL_LEDGER_PAGE_CLASS,
  TECHNICAL_LEDGER_TITLE_CLASS,
} from "./technicalLedgerPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("technicalLedgerPageLayout", () => {
  it("styles the Stitch ledger hero and split article card", () => {
    const page = ruleBlock(`.${TECHNICAL_LEDGER_PAGE_CLASS} {`, `.${TECHNICAL_LEDGER_TITLE_CLASS} {`);
    expect(page).toContain("background: var(--surface)");

    const title = ruleBlock(`.${TECHNICAL_LEDGER_TITLE_CLASS} {`, `.technical-ledger-subtext {`);
    expect(title).toContain("font-weight: 700");
    expect(title).toContain("letter-spacing:");

    const divider = ruleBlock(`.${TECHNICAL_LEDGER_DIVIDER_CLASS} {`, `.technical-ledger-articles-section {`);
    expect(divider).toContain("border-top: 1px solid var(--border)");

    const list = ruleBlock(`.${TECHNICAL_LEDGER_ARTICLE_LIST_CLASS} {`, `.${TECHNICAL_LEDGER_ARTICLE_CARD_CLASS} {`);
    expect(list).toContain("display: grid");
    expect(list).toContain("gap:");

    const card = ruleBlock(`.${TECHNICAL_LEDGER_ARTICLE_CARD_CLASS} {`, `.technical-ledger-article-media {`);
    expect(card).toContain(`grid-template-columns: ${TECHNICAL_LEDGER_ARTICLE_GRID_COLUMNS}`);

    const category = ruleBlock(
      `.${TECHNICAL_LEDGER_ARTICLE_CATEGORY_CLASS} {`,
      `.technical-ledger-article-title {`,
    );
    expect(category).toContain("text-transform: uppercase");
    expect(category).toContain("color: var(--stitch-blue");

    const link = ruleBlock(`.${TECHNICAL_LEDGER_ARTICLE_LINK_CLASS} {`, ".case-studies-page {");
    expect(link).toContain("color: var(--stitch-blue");
  });
});
