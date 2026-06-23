import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  LEGAL_BODY_CLASS,
  LEGAL_DOCUMENT_INNER_CLASS,
  LEGAL_DOCUMENT_SECTION_CLASS,
  LEGAL_DOCUMENT_SURFACE_CLASS,
  LEGAL_HEADING_CLASS,
  LEGAL_LIST_CLASS,
  LEGAL_INTRO_INNER_CLASS,
  LEGAL_INTRO_META_CLASS,
  LEGAL_INTRO_SECTION_CLASS,
  LEGAL_INTRO_TITLE_CLASS,
  LEGAL_PAGE_CLASS,
  LEGAL_PROSE_MAX_WIDTH,
} from "./legalPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("legalPageLayout", () => {
  it("uses a Stitch light intro band without the premium hero shell", () => {
    expect(css).toContain(`.${LEGAL_INTRO_SECTION_CLASS}`);
    expect(css).toContain(`.${LEGAL_INTRO_TITLE_CLASS}`);
    expect(css).toContain(`.${LEGAL_INTRO_META_CLASS}`);
    expect(css).not.toContain(".legal-intro-divider");
  });

  it("keeps legal prose on a flat bordered surface aligned to the Stitch screenshot", () => {
    const surface = ruleBlock(`.${LEGAL_DOCUMENT_SURFACE_CLASS} {`, `.${LEGAL_HEADING_CLASS} {`);
    expect(surface).toContain("border: 1px solid var(--border)");
    expect(surface).toContain("box-shadow: none");
    expect(surface).not.toContain("transform: translateY");

    const inner = ruleBlock(`.${LEGAL_DOCUMENT_INNER_CLASS} {`, `.${LEGAL_DOCUMENT_SURFACE_CLASS} {`);
    expect(inner).toContain(`max-width: ${LEGAL_PROSE_MAX_WIDTH}`);
  });

  it("styles legal headings and body copy for readable long-form content", () => {
    const heading = ruleBlock(`.${LEGAL_HEADING_CLASS} {`, `.${LEGAL_BODY_CLASS} {`);
    expect(heading).toContain("font-weight: 650");

    const body = ruleBlock(`.${LEGAL_BODY_CLASS} {`, `.${LEGAL_LIST_CLASS} {`);
    expect(body).toContain("line-height: 1.65");
    expect(body).toContain("color: #4b5563");

    const list = ruleBlock(`.${LEGAL_LIST_CLASS} {`, ".legal-document-surface a {");
    expect(list).toContain("padding-left: 1.25rem");
  });

  it("exposes a page wrapper class for route-level styling", () => {
    expect(LEGAL_PAGE_CLASS).toBe("legal-page");
    expect(LEGAL_DOCUMENT_SECTION_CLASS).toBe("legal-document-section");
    expect(LEGAL_INTRO_INNER_CLASS).toBe("legal-intro-inner");
  });
});
