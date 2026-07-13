import { describe, expect, it } from "vitest";
import { STITCH_COPY } from "./stitchDesign";
import {
  ACCESSIBILITY_MAIN_CONTENT_ID,
  ACCESSIBILITY_SKIP_LINK_COPY,
  ACCESSIBILITY_TEXT_SIZE_OPTIONS,
  ACCESSIBILITY_WIDGET_COPY,
} from "./accessibilityContent";

describe("accessibilityContent", () => {
  it("defines the skip link target for main content", () => {
    expect(ACCESSIBILITY_MAIN_CONTENT_ID).toBe("main-content");
    expect(ACCESSIBILITY_SKIP_LINK_COPY.label).toBe(STITCH_COPY.accessibility.skipLinkLabel);
    expect(ACCESSIBILITY_SKIP_LINK_COPY.href).toBe("#main-content");
  });

  it("defines the accessibility widget copy and text size options", () => {
    expect(ACCESSIBILITY_WIDGET_COPY.panelTitle).toBe("Accessibility Settings");
    expect(ACCESSIBILITY_WIDGET_COPY.resetLabel).toBe("Reset accessibility settings");
    expect(ACCESSIBILITY_TEXT_SIZE_OPTIONS.map((option) => option.id)).toEqual(["default", "large", "xlarge"]);
  });
});
