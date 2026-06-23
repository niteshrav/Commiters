import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CONTACT_INQUIRY_SECTION_PADDING_BOTTOM,
  CONTACT_INQUIRY_SECTION_PADDING_TOP,
  CONTACT_INTRO_SECTION_PADDING_BOTTOM,
  CONTACT_INTRO_SECTION_PADDING_TOP,
  CONTACT_SECTION_GAP,
} from "./contactPageSpacing";
import { CONTACT_INTRO_SECTION_CLASS } from "./contactIntroLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("contactPageSpacing", () => {
  it("uses equal gap padding between the intro and inquiry sections", () => {
    expect(CONTACT_INTRO_SECTION_PADDING_BOTTOM).toBe(CONTACT_SECTION_GAP);
    expect(CONTACT_INQUIRY_SECTION_PADDING_TOP).toBe(CONTACT_SECTION_GAP);

    const intro = ruleBlock(`.${CONTACT_INTRO_SECTION_CLASS} {`, ".contact-intro-inner {");
    expect(intro).toContain(`padding: ${CONTACT_INTRO_SECTION_PADDING_TOP} 0 ${CONTACT_INTRO_SECTION_PADDING_BOTTOM}`);

    const inquiry = ruleBlock(".stitch-contact-section {", ".stitch-contact-submit {");
    expect(inquiry).toContain(
      `padding: ${CONTACT_INQUIRY_SECTION_PADDING_TOP} 0 ${CONTACT_INQUIRY_SECTION_PADDING_BOTTOM}`,
    );
  });
});
