import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { SITE_SHELL_FOOTER_BORDER_CSS } from "./siteHorizontalRule";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("contactSectionLayout", () => {
  it("uses a thin inset-style rule above the stitch footer (no gradient accent bar)", () => {
    expect(css).toMatch(
      new RegExp(
        `\\.footer--home-mockup[\\s\\S]*border-top:\\s*${SITE_SHELL_FOOTER_BORDER_CSS.replace(/ /g, "\\s*")}`,
      ),
    );
    expect(css).not.toContain(".contact-section-separator--full");
    expect(css).not.toContain(".footer-v2-accent");
  });
});
