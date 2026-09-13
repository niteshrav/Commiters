import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  TRUSTTAP_PORTAL_BANNER_CLASS,
  TRUSTTAP_SECTION_SHELL_CLASS,
} from "./trustTapPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");
const trustTapCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles/trustTap.css"), "utf8");

describe("trustTapPageLayout", () => {
  it("offsets section anchors below the sticky header", () => {
    expect(TRUSTTAP_SECTION_SHELL_CLASS).toBe("pt-16 pb-16 w-full");
    expect(TRUSTTAP_SECTION_SHELL_CLASS).not.toMatch(/scroll-mt-/);
    expect(css).toContain(".pt-16 {\n  padding-top: 4rem;");
    expect(css).toContain(".pb-16 {\n  padding-bottom: 4rem;");
    expect(trustTapCss).toContain(".trusttap-section.pt-16");
  });

  it("styles the portal banner as a high-contrast split card", () => {
    expect(TRUSTTAP_PORTAL_BANNER_CLASS).toBe(
      "bg-slate-900 text-white rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6",
    );
    expect(css).toContain(".bg-slate-900");
    expect(css).toContain(".p-8");
    expect(css).toContain(".md\\:flex-row");
  });
});
