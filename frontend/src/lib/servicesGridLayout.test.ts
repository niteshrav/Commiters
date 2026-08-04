import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  SERVICE_CARD_ACTION_CLASS,
  SERVICE_CARD_BORDER,
  SERVICE_CARD_BORDER_HOVER,
  SERVICE_CARD_BORDER_RADIUS,
  SERVICE_CARD_CLASS,
  SERVICE_CARD_COPY_CLASS,
  SERVICE_CARD_ICON_CLASS,
  SERVICE_CARD_LINK_WRAP_CLASS,
  SERVICE_CARD_PADDING,
  SERVICE_CARD_BODY_PADDING,
  SERVICE_CARD_TITLE_CLASS,
  SERVICE_CARD_MEDIA_CLASS,
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
  it("uses a responsive equal-card grid", () => {
    const grid = ruleBlock(`.${SERVICES_GRID_CLASS} {`, ".stitch-case-card,");
    expect(grid).toContain(`grid-template-columns: ${SERVICES_GRID_COLUMNS}`);
    expect(grid).toContain(`gap: ${SERVICES_GRID_GAP}`);
  });

  it("styles cards with contained borders and always-visible actions", () => {
    const section = ruleBlock(`.${SERVICES_GRID_SECTION_CLASS} {`, ".services-expertise-section {");
    expect(section).toContain(`padding: ${SERVICES_GRID_SECTION_PADDING}`);
    expect(section).toContain("background: var(--surface)");

    const wrap = ruleBlock(`.${SERVICE_CARD_LINK_WRAP_CLASS} {`, ".stitch-service-card-media {");
    expect(wrap).toContain(`padding: ${SERVICE_CARD_PADDING}`);

    const body = ruleBlock(`.stitch-service-card-body {`, ".stitch-service-card--span-2 {");
    expect(body).toContain(`padding: ${SERVICE_CARD_BODY_PADDING}`);

    const card = ruleBlock(`.${SERVICE_CARD_CLASS} {`, `.${SERVICE_CARD_LINK_WRAP_CLASS} {`);
    expect(card).toContain(`border: 1px solid ${SERVICE_CARD_BORDER}`);
    expect(card).toContain(`border-radius: ${SERVICE_CARD_BORDER_RADIUS}`);

    const hover = ruleBlock(`.${SERVICE_CARD_CLASS}:hover,`, `.${SERVICE_CARD_LINK_WRAP_CLASS} {`);
    expect(hover).toContain(`border-color: ${SERVICE_CARD_BORDER_HOVER}`);

    expect(css).toContain(`.${SERVICE_CARD_ACTION_CLASS}`);
  });

  it("keeps card typography stacked with media above the title", () => {
    expect(css).toContain(`.${SERVICE_CARD_MEDIA_CLASS}`);
    expect(css).toContain(`.${SERVICE_CARD_TITLE_CLASS}`);
    expect(css).toContain(`.${SERVICE_CARD_COPY_CLASS}`);
    expect(css).not.toContain(".stitch-service-card-top {");
  });
});
