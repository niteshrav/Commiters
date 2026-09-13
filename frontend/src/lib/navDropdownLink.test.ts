import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { NAV_DROPDOWN_LINK_ACTIVE_CLASS } from "./navSections";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("navDropdownLink (styles contract)", () => {
  it("styles the active Services menu item like its hover state", () => {
    const activeRule = css.match(
      new RegExp(
        `\\.${NAV_DROPDOWN_LINK_ACTIVE_CLASS}[^{]*\\{[^}]*background:[^}]+color:[^}]+\\}`,
      ),
    )?.[0];
    expect(activeRule).toBeTruthy();
    expect(activeRule).toContain("#f8fafc");
    expect(activeRule).toContain("var(--primary)");
    expect(css).toMatch(/\.nav-item-dropdown-panel \.nav-dropdown-link:hover\s*\{[^}]*background:\s*#f8fafc/s);
  });
});
