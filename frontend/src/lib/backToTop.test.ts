import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  BACK_TO_TOP_CLASS,
  BACK_TO_TOP_POSITION_CLASS,
  BACK_TO_TOP_SHOW_AFTER_PX,
  BACK_TO_TOP_VISIBLE_CLASS,
  shouldShowBackToTop,
} from "./backToTop";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("backToTop", () => {
  it("shows the floating control after the page has scrolled past the threshold", () => {
    expect(BACK_TO_TOP_SHOW_AFTER_PX).toBe(400);
    expect(shouldShowBackToTop(399)).toBe(false);
    expect(shouldShowBackToTop(400)).toBe(true);
    expect(shouldShowBackToTop(720)).toBe(true);
  });

  it("pins the control above other floating actions and hides it with the mobile drawer", () => {
    expect(BACK_TO_TOP_POSITION_CLASS).toBe("fixed bottom-28 right-6 z-40");
    expect(css).toContain(".fixed {\n  position: fixed;");
    expect(css).toContain(".bottom-28 {\n  bottom: 7rem;");
    expect(css).toContain(".right-6 {\n  right: 1.5rem;");
    expect(css).toContain(".z-40 {\n  z-index: 40;");
    expect(css).toContain(`.${BACK_TO_TOP_CLASS} {`);
    expect(css).toMatch(
      new RegExp(`\\.${BACK_TO_TOP_CLASS.replace(/-/g, "\\-")}\\.bottom-28[\\s\\S]*bottom:\\s*calc\\(7rem \\+ 56px\\)`),
    );
    expect(css).toContain(`.${BACK_TO_TOP_VISIBLE_CLASS}`);
    expect(css).toMatch(
      /body\.nav-mobile-drawer-open \.back-to-top[\s\S]*visibility:\s*hidden/,
    );
  });
});
