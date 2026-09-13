import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_CONTAINER_WIDTH_CSS, SITE_SIDE_GUTTER_CSS } from "./layoutTokens";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("layoutTokens", () => {
  it("uses a full-width shell with a 3cm side gutter", () => {
    expect(SITE_SIDE_GUTTER_CSS).toBe("3cm");
    expect(css).toContain(`--max-width: ${SITE_CONTAINER_WIDTH_CSS}`);
    expect(css).toContain(`--site-gutter: ${SITE_SIDE_GUTTER_CSS}`);
    expect(css).not.toContain("--site-gutter: 5cm");
    expect(css).toContain(".container {");
    expect(css).toMatch(/\.container\s*\{[^}]*width:\s*100%/);
    expect(css).toMatch(/\.container\s*\{[^}]*padding-inline:\s*var\(--site-gutter\)/);
    expect(css).not.toMatch(/\.container\s*\{[^}]*width:\s*min\([^)]*94%/);
  });

  it("aligns header, footer, and page content to the same side gutter", () => {
    expect(css).toMatch(/\.container\s*\{[^}]*padding-inline:\s*var\(--site-gutter\)/);
    expect(css).toMatch(/\.footer--nock \.footer-nock-shell\s*\{[^}]*padding:\s*48px var\(--site-gutter\)/);
    expect(css).toMatch(
      /@media \(min-width: 1024px\)\s*\{[^}]*\.footer--nock \.footer-nock-shell\s*\{[^}]*padding-left:\s*var\(--site-gutter\)/,
    );
    expect(css).toMatch(
      /@media \(min-width: 1024px\)\s*\{[^}]*\.footer--nock \.footer-nock-shell\s*\{[^}]*padding-right:\s*var\(--site-gutter\)/,
    );
    expect(css).toMatch(/@media \(max-width: 768px\)\s*\{[\s\S]*?--site-gutter:\s*16px/);
    expect(css).toMatch(
      /@media \(max-width: 768px\)\s*\{[\s\S]*?\.footer--nock \.footer-nock-shell\s*\{[^}]*padding:\s*48px var\(--site-gutter\)/,
    );
  });
});
