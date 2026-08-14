import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { SITE_SHELL_FOOTER_BORDER_CSS } from "./siteHorizontalRule";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("contactSectionLayout", () => {
  it("uses the light reference footer shell with a top border", () => {
    expect(css).toMatch(/\.footer--reference\.footer--home-mockup[\s\S]*border-top:\s*1px\s+solid\s+var\(--border\)/);
    expect(css).not.toContain(".contact-section-separator--full");
    expect(css).not.toContain(".footer-v2-accent");
  });
});
