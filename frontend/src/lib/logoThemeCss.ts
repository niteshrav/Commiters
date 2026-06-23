import { LOGO_CSS_VARIABLES } from "./themeColors";

/** Ordered :root declarations for tests and documentation parity with styles.css */
export function logoThemeRootDeclarations(): string[] {
  return Object.entries(LOGO_CSS_VARIABLES).map(([name, value]) => `  ${name}: ${value};`);
}

export function logoThemeRootBlock(): string {
  return `:root {\n${logoThemeRootDeclarations().join("\n")}\n}`;
}
