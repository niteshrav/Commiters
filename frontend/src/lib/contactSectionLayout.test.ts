import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CONTACT_SECTION_SEPARATOR_BORDER,
  CONTACT_SECTION_SEPARATOR_CLASS,
  CONTACT_SECTION_SEPARATOR_TEST_ID,
} from "./contactSectionLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("contactSectionLayout", () => {
  it("declares a full-width separator before the footer on the contact page", () => {
    expect(CONTACT_SECTION_SEPARATOR_TEST_ID).toBe("contact-section-separator");
    expect(CONTACT_SECTION_SEPARATOR_CLASS).toBe("contact-section-separator--full");
  });

  it("styles the contact footer separator as an edge-to-edge horizontal rule", () => {
    expect(css).toContain(".contact-section-separator--full");
    expect(css).toMatch(/\.contact-section-separator--full[\s\S]*width:\s*100vw/);
    expect(css).toMatch(
      new RegExp(`\\.contact-section-separator[\\s\\S]*border-top:\\s*1px solid ${CONTACT_SECTION_SEPARATOR_BORDER}`),
    );
  });

  it("avoids a double rule when the contact page renders its own footer separator", () => {
    expect(css).toContain('.site-shell:has([data-testid="contact-page"]) .footer--stitch');
    expect(css).toMatch(/\.site-shell:has\(\[data-testid="contact-page"\]\) \.footer--stitch[\s\S]*border-top:\s*none/);
  });
});
