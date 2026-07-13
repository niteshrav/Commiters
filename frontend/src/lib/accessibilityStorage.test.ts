import { describe, expect, it, beforeEach } from "vitest";
import {
  ACCESSIBILITY_STORAGE_KEY,
  DEFAULT_ACCESSIBILITY_SETTINGS,
  clearAccessibilitySettings,
  readAccessibilitySettings,
  writeAccessibilitySettings,
} from "./accessibilityStorage";

describe("accessibilityStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-a11y-text-size");
    document.documentElement.removeAttribute("data-a11y-high-contrast");
    document.documentElement.removeAttribute("data-a11y-underline-links");
    document.documentElement.removeAttribute("data-a11y-reduce-motion");
  });

  it("persists accessibility settings and applies dataset flags", () => {
    writeAccessibilitySettings({
      textSize: "large",
      highContrast: true,
      underlineLinks: true,
      reduceMotion: true,
    });

    expect(window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY)).toBeTruthy();
    expect(readAccessibilitySettings()?.settings.textSize).toBe("large");
    expect(document.documentElement.dataset.a11yHighContrast).toBe("true");
    expect(document.documentElement.dataset.a11yUnderlineLinks).toBe("true");
    expect(document.documentElement.dataset.a11yReduceMotion).toBe("true");
  });

  it("clears stored settings and restores defaults", () => {
    writeAccessibilitySettings({
      textSize: "xlarge",
      highContrast: true,
      underlineLinks: false,
      reduceMotion: false,
    });
    clearAccessibilitySettings();

    expect(readAccessibilitySettings()).toBeNull();
    expect(document.documentElement.dataset.a11yTextSize).toBe(DEFAULT_ACCESSIBILITY_SETTINGS.textSize);
    expect(document.documentElement.dataset.a11yHighContrast).toBe("false");
  });
});
