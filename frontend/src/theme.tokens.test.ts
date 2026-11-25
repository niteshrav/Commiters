import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { BRAND_LOGO_FOOTER_HEIGHT_PX, BRAND_LOGO_HEADER_HEIGHT_PX } from "./lib/brandDisplay";
import { LOGO_CSS_VARIABLES, LOGO_THEME } from "./lib/themeColors";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("theme CSS tokens", () => {
  const css = readFileSync(join(__dirname, "styles.css"), "utf8");
  const darkCss = readFileSync(join(__dirname, "styles", "themeDark.css"), "utf8");

  it("uses white canvas and site button tokens in :root", () => {
    expect(css).toContain(`--page-background: ${LOGO_THEME.pageBackground}`);
    expect(css).toContain(`--stitch-blue: ${LOGO_THEME.stitchBlue}`);
    expect(css).toContain("--max-width: 100%");
    expect(css).toContain("--site-gutter: 3cm");
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

  it("defines dark surfaces, readable text, and dark-mode coverage for page styles", () => {
    expect(darkCss).toContain('html[data-theme="dark"]');
    expect(darkCss).toContain("--page-background: #0b1120;");
    expect(darkCss).toContain("--text: #f3f6fc;");
    expect(darkCss).toContain(".home-demo-page");
    expect(darkCss).toContain(".planner-summary");
    expect(darkCss).toContain(".summary-lead");
    expect(darkCss).toContain(".srow span");
    expect(darkCss).toContain(".footer-blackbook-social-link");
    expect(darkCss).toContain(".case-studies-page .case-studies-intro-title");
    expect(darkCss).toContain(".case-studies-bottom-cta-inner");
    expect(darkCss).toContain(".about-founder-quote");
    expect(darkCss).toContain(".trusttap-bottom-cta-inner");
    expect(darkCss).toContain(".opsflow-panel-card .opsflow-trust");
    expect(darkCss).toContain(".work-case-study");
    expect(darkCss).toContain(".cookie-consent-banner");
  });
});
