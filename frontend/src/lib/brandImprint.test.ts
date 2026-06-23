import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BRAND_LOGO_FOOTER_HEIGHT_PX, BRAND_LOGO_HEADER_HEIGHT_PX } from "./brandDisplay";
import { BRAND_LOGO_DISPLAY_CLASS } from "./brandImprint";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("brandImprint (styles contract)", () => {
  it("renders bold full-opacity logos without multiply blend (avoids pasted/faded look)", () => {
    const block = css.match(new RegExp(`\\.${BRAND_LOGO_DISPLAY_CLASS}\\s*\\{[^}]+\\}`))?.[0] ?? "";
    expect(block).toMatch(/opacity:\s*1/);
    expect(block).not.toMatch(/mix-blend-mode:\s*multiply/);
    expect(block).toMatch(/filter:/);
  });

  it("sizes header and footer logos for strong visibility", () => {
    expect(css).toContain(`--brand-logo-header-height: ${BRAND_LOGO_HEADER_HEIGHT_PX}px`);
    expect(css).toContain(`--brand-logo-footer-height: ${BRAND_LOGO_FOOTER_HEIGHT_PX}px`);
    expect(css).toMatch(/\.brand-logo--header\s*\{[\s\S]*?height:\s*var\(--brand-logo-header-height\)/);
    expect(css).toMatch(/\.brand-logo--footer\s*\{[\s\S]*?height:\s*var\(--brand-logo-footer-height\)/);
  });
});
