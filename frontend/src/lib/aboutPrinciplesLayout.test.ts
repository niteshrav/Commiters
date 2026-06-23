import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ABOUT_PRINCIPLE_CARD_CLASS,
  ABOUT_PRINCIPLES_CARD_DIVIDER,
  ABOUT_PRINCIPLES_GRID_BORDER,
  ABOUT_PRINCIPLES_GRID_CLASS,
  ABOUT_PRINCIPLES_GRID_COLUMNS,
  ABOUT_PRINCIPLES_GRID_GAP,
} from "./aboutPrinciplesLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("aboutPrinciplesLayout", () => {
  it("boxes the four operating principles in a bordered grid with column dividers", () => {
    const sectionStart = css.indexOf(".about-principles-section {");
    expect(sectionStart).toBeGreaterThan(-1);

    const gridStart = css.indexOf(`.${ABOUT_PRINCIPLES_GRID_CLASS} {`, sectionStart);
    expect(gridStart).toBeGreaterThan(-1);
    const gridEnd = css.indexOf(`.${ABOUT_PRINCIPLE_CARD_CLASS} {`, gridStart + 1);
    const grid = css.slice(gridStart, gridEnd);
    expect(grid).toContain("display: grid");
    expect(grid).toContain(`grid-template-columns: ${ABOUT_PRINCIPLES_GRID_COLUMNS}`);
    expect(grid).toContain(`gap: ${ABOUT_PRINCIPLES_GRID_GAP}`);
    expect(grid).toContain(`border: ${ABOUT_PRINCIPLES_GRID_BORDER}`);

    const card = ruleBlock(`.${ABOUT_PRINCIPLE_CARD_CLASS} {`, `.${ABOUT_PRINCIPLE_CARD_CLASS}:last-child {`);
    expect(card).toContain(`border-right: ${ABOUT_PRINCIPLES_CARD_DIVIDER}`);

    const lastCard = ruleBlock(`.${ABOUT_PRINCIPLE_CARD_CLASS}:last-child {`, `.about-principle-icon {`);
    expect(lastCard).toContain("border-right: none");
  });
});
