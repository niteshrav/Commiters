import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { BRAND_LOGO_FOOTER_HEIGHT_PX, BRAND_LOGO_HEADER_HEIGHT_PX } from "./lib/brandDisplay";
import { SITE_CONTENT_MAX_WIDTH_PX } from "./lib/layoutTokens";
import { LOGO_CSS_VARIABLES, LOGO_THEME } from "./lib/themeColors";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("theme CSS tokens", () => {
  const css = readFileSync(join(__dirname, "styles.css"), "utf8");

  it("uses white canvas and site button tokens in :root", () => {
    expect(css).toContain(`--page-background: ${LOGO_THEME.pageBackground}`);
    expect(css).toContain(`--stitch-blue: ${LOGO_THEME.stitchBlue}`);
    expect(css).toContain(`--max-width: ${SITE_CONTENT_MAX_WIDTH_PX}px`);
    expect(LOGO_THEME.pageBackground).toBe("#ffffff");
  });

  it("applies Stitch blue on primary buttons and links", () => {
    expect(css).toMatch(/\.btn-primary\s*\{[\s\S]*?var\(--site-btn-primary-bg/);
    expect(css).toMatch(/\.btn-secondary\s*\{[\s\S]*?var\(--site-btn-secondary-bg/);
    expect(css).toMatch(/\.quote-link\s*\{[\s\S]*?var\(--stitch-blue/);
    expect(css).toContain(".stitch-home-hero");
  });

  it("styles bold full-opacity header and footer logos", () => {
    expect(css).toContain(`--brand-logo-header-height: ${BRAND_LOGO_HEADER_HEIGHT_PX}px`);
    expect(css).toContain(`--brand-logo-footer-height: ${BRAND_LOGO_FOOTER_HEIGHT_PX}px`);
    expect(css).toMatch(/\.brand-logo--display\s*\{[\s\S]*?opacity:\s*1/);
  });

  it("keeps themeColors and styles.css :root in sync", () => {
    for (const [name, value] of Object.entries(LOGO_CSS_VARIABLES)) {
      expect(css).toContain(`${name}: ${value};`);
    }
  });
});
