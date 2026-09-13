import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ABOUT_BOTTOM_CTA_SUBTEXT_CLASS,
  ABOUT_BOTTOM_CTA_SUBTEXT_MARGIN,
  ABOUT_BOTTOM_CTA_SUBTEXT_TEXT_ALIGN,
} from "./aboutBottomCtaLayout";
import { HOME_CLOUD_LEAD_CLASS } from "./homeCloudTheme";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("aboutBottomCtaLayout", () => {
  it("centers the technical roadmap subtext under the heading", () => {
    const subtext = ruleBlock(`.${ABOUT_BOTTOM_CTA_SUBTEXT_CLASS} {`, ".about-bottom-cta-actions {");
    expect(subtext).toContain(`text-align: ${ABOUT_BOTTOM_CTA_SUBTEXT_TEXT_ALIGN}`);
    expect(subtext).toContain(`margin: ${ABOUT_BOTTOM_CTA_SUBTEXT_MARGIN}`);

    const leadOverride = ruleBlock(
      `.${ABOUT_BOTTOM_CTA_SUBTEXT_CLASS}.${HOME_CLOUD_LEAD_CLASS} {`,
      ".about-bottom-cta-actions {",
    );
    expect(leadOverride).toContain(`text-align: ${ABOUT_BOTTOM_CTA_SUBTEXT_TEXT_ALIGN}`);
    expect(leadOverride).toContain(`margin: ${ABOUT_BOTTOM_CTA_SUBTEXT_MARGIN}`);
    expect(leadOverride).toContain("max-width: 100%");
  });
});
