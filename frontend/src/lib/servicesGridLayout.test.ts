import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  SERVICE_CARD_BORDER,
  SERVICE_CARD_BORDER_HOVER,
  SERVICE_CARD_BORDER_RADIUS,
  SERVICE_CARD_BUTTON_CLASS,
  SERVICE_CARD_CLASS,
  SERVICE_CARD_COPY_CLASS,
  SERVICE_CARD_HOVER_CLASS,
  SERVICE_CARD_ICON_CLASS,
  SERVICE_CARD_LAYOUT_CLASS,
  SERVICE_CARD_LINK_CLASS,
  SERVICE_CARD_PADDING,
  SERVICE_CARD_SPAN_CLASS,
  SERVICE_CARD_TITLE_CLASS,
  SERVICES_GRID_CLASS,
  SERVICES_GRID_COLUMNS,
  SERVICES_GRID_GAP,
  SERVICES_GRID_SECTION_CLASS,
  SERVICES_GRID_SECTION_PADDING,
} from "./servicesGridLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("servicesGridLayout", () => {
  it("uses a three-column mosaic grid with span modifiers", () => {
    const grid = ruleBlock(`.${SERVICES_GRID_CLASS} {`, ".stitch-case-card,");
    expect(grid).toContain(`grid-template-columns: ${SERVICES_GRID_COLUMNS}`);
    expect(grid).toContain(`gap: ${SERVICES_GRID_GAP}`);

    expect(ruleBlock(`.${SERVICE_CARD_SPAN_CLASS[2]} {`, `.${SERVICE_CARD_SPAN_CLASS[3]} {`)).toContain(
      "grid-column: span 2",
    );
    expect(ruleBlock(`.${SERVICE_CARD_SPAN_CLASS[3]} {`, `.stitch-service-card:hover,`)).toContain(
      "grid-column: span 3",
    );
  });

  it("styles cards with contained borders and hover-revealed actions", () => {
    const section = ruleBlock(`.${SERVICES_GRID_SECTION_CLASS} {`, ".services-expertise-section {");
    expect(section).toContain(`padding: ${SERVICES_GRID_SECTION_PADDING}`);
    expect(section).toContain("background: var(--surface)");

    const card = ruleBlock(`.${SERVICE_CARD_CLASS} {`, `.${SERVICE_CARD_ICON_CLASS} {`);
    expect(card).toContain(`padding: ${SERVICE_CARD_PADDING}`);
    expect(card).toContain(`border: 1px solid ${SERVICE_CARD_BORDER}`);
    expect(card).toContain(`border-radius: ${SERVICE_CARD_BORDER_RADIUS}`);
    expect(card).not.toContain("box-shadow:");

    const hover = ruleBlock(`.${SERVICE_CARD_CLASS}:hover,`, `.${SERVICE_CARD_HOVER_CLASS} {`);
    expect(hover).toContain(`border-color: ${SERVICE_CARD_BORDER_HOVER}`);

    const hoverAction = ruleBlock(`.${SERVICE_CARD_HOVER_CLASS} {`, `.${SERVICE_CARD_LAYOUT_CLASS.split} {`);
    expect(hoverAction).toContain("opacity: 0");

    const hoverReveal = ruleBlock(
      `.${SERVICE_CARD_CLASS}:hover .${SERVICE_CARD_HOVER_CLASS},`,
      `.${SERVICE_CARD_LAYOUT_CLASS.split} {`,
    );
    expect(hoverReveal).toContain("opacity: 1");

    expect(css).toContain(`.${SERVICE_CARD_LINK_CLASS}`);
    expect(css).toContain(`.${SERVICE_CARD_BUTTON_CLASS}`);
    expect(css).toContain(`.${SERVICE_CARD_LAYOUT_CLASS.split}`);
  });

  it("keeps card typography stacked with the icon above the title", () => {
    expect(css).toContain(`.${SERVICE_CARD_ICON_CLASS}`);
    expect(css).toContain(`.${SERVICE_CARD_TITLE_CLASS}`);
    expect(css).toContain(`.${SERVICE_CARD_COPY_CLASS}`);
    expect(css).not.toContain(".stitch-service-card-top {");
  });
});
