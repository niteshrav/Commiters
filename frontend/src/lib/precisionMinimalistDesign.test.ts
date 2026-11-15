import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { LOGO_CSS_VARIABLES } from "./themeColors";
import { PRECISION_MINIMALIST_DESIGN } from "./precisionMinimalistDesign";
import { SITE_TYPOGRAPHY } from "./siteTypography";
import { STITCH_LIGHT_PALETTE } from "./stitchLightPalette";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const indexHtml = readFileSync(join(root, "index.html"), "utf8");
const css = readFileSync(join(root, "src", "styles.css"), "utf8");

describe("precisionMinimalistDesign", () => {
  it("uses white canvas, electric blue accents, and slate headings", () => {
    expect(PRECISION_MINIMALIST_DESIGN.colors.background).toBe("#ffffff");
    expect(PRECISION_MINIMALIST_DESIGN.colors.primary).toBe("#0066ff");
    expect(PRECISION_MINIMALIST_DESIGN.colors.heading).toBe("#111827");
    expect(PRECISION_MINIMALIST_DESIGN.colors.body).toBe("#4b5563");
    expect(PRECISION_MINIMALIST_DESIGN.colors.surfaceContainerLow).toBe("#f8f9fa");
    expect(PRECISION_MINIMALIST_DESIGN.radius.card).toBe("0");

    expect(STITCH_LIGHT_PALETTE.stitchBlue).toBe(PRECISION_MINIMALIST_DESIGN.colors.primary);
    expect(LOGO_CSS_VARIABLES["--primary"]).toBe("#0066ff");
    expect(LOGO_CSS_VARIABLES["--page-background"]).toBe("#ffffff");
    expect(LOGO_CSS_VARIABLES["--body-text"]).toBe("#4b5563");
    expect(LOGO_CSS_VARIABLES["--surface-container-low"]).toBe("#f8f9fa");
  });

  it("uses Plus Jakarta Sans for display and body typography site-wide", () => {
    expect(PRECISION_MINIMALIST_DESIGN.typography.fontFamily).toContain("Plus Jakarta Sans");
    expect(SITE_TYPOGRAPHY.fontFamily).toContain("Plus Jakarta Sans");
    expect(indexHtml).toContain("family=Plus+Jakarta+Sans");
    expect(css).toContain('"Plus Jakarta Sans"');
    expect(css).toContain('--font-display:');
    expect(css).toContain('--font-body:');
  });

  it("styles global typography utilities for void-first hierarchy", () => {
    expect(css).toContain(".typography-display");
    expect(css).toContain("font-weight: var(--display-weight");
    expect(css).toContain("letter-spacing: var(--tracking-tighter");
    expect(css).toContain(".typography-body");
    expect(css).toContain("color: var(--body-text)");
    expect(css).toContain(".typography-kicker");
    expect(css).toContain("color: var(--primary)");
  });

  it("applies void-first spacing and card radius tokens globally", () => {
    expect(css).toContain("--stack-lg:");
    expect(css).toContain("--radius-card:");
    expect(css).toContain("border-radius: var(--radius-card)");
  });
});
