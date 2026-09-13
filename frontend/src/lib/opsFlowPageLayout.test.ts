import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  OPSFLOW_SECTION_HEADING_CLASS,
  OPSFLOW_SECTION_SHELL_CLASS,
  OPSFLOW_BOTTOM_CTA_ACTIONS_CLASS,
  OPSFLOW_BOTTOM_CTA_ACTIONS_DIRECTION,
  OPSFLOW_BOTTOM_CTA_ACTIONS_JUSTIFY,
  OPSFLOW_BOTTOM_CTA_CLASS,
  OPSFLOW_BOTTOM_CTA_PRIMARY_CLASS,
  OPSFLOW_INNER_CLASS,
} from "./opsFlowPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles", "opsFlow.css"), "utf8");
const siteCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("opsFlowPageLayout", () => {
  it("offsets sandbox and section anchors below the sticky header", () => {
    expect(OPSFLOW_SECTION_SHELL_CLASS).toBe("pt-16 pb-16 w-full");
    expect(OPSFLOW_SECTION_SHELL_CLASS).not.toMatch(/scroll-mt-/);
    expect(OPSFLOW_SECTION_HEADING_CLASS).toBe("text-2xl font-bold text-center mb-6");
    expect(siteCss).toContain(".pt-16 {\n  padding-top: 4rem;");
    expect(siteCss).toContain(".pb-16 {\n  padding-bottom: 4rem;");
    expect(siteCss).toContain(".mb-6 {\n  margin-bottom: 1.5rem;");
  });

  it("centers the Talk to an Engineer actions under the bottom CTA copy", () => {
    const inner = ruleBlock(
      `.${OPSFLOW_BOTTOM_CTA_CLASS} .${OPSFLOW_INNER_CLASS} {`,
      `.${OPSFLOW_BOTTOM_CTA_CLASS}-title {`,
    );
    expect(inner).toContain("display: flex");
    expect(inner).toContain("flex-direction: column");
    expect(inner).toContain("align-items: center");
    expect(inner).toContain("text-align: center");

    const actions = ruleBlock(
      `.${OPSFLOW_BOTTOM_CTA_ACTIONS_CLASS} {`,
      `.${OPSFLOW_BOTTOM_CTA_PRIMARY_CLASS} {`,
    );
    expect(actions).toContain(`flex-direction: ${OPSFLOW_BOTTOM_CTA_ACTIONS_DIRECTION}`);
    expect(actions).not.toContain("flex-direction: column");
    expect(actions).toContain(`justify-content: ${OPSFLOW_BOTTOM_CTA_ACTIONS_JUSTIFY}`);
    expect(actions).toContain("width: 100%");
    expect(actions).toContain("align-items: center");

    const primary = ruleBlock(
      `.${OPSFLOW_BOTTOM_CTA_PRIMARY_CLASS} {`,
      `.${OPSFLOW_BOTTOM_CTA_ACTIONS_CLASS} .btn-secondary {`,
    );
    expect(primary).not.toContain("margin-inline: auto");
  });
});
