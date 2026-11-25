import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getSystemTheme,
  readThemePreference,
  THEME_PREFERENCE_STORAGE_KEY,
  writeThemePreference,
} from "./themePreference";

describe("theme preference", () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    if (originalMatchMedia) {
      Object.defineProperty(window, "matchMedia", { configurable: true, value: originalMatchMedia });
    } else {
      Reflect.deleteProperty(window, "matchMedia");
    }
  });

  it("uses system preference for missing or invalid stored values", () => {
    const storage = {
      getItem: (key: string) => (key === THEME_PREFERENCE_STORAGE_KEY ? "sepia" : null),
    } as Storage;

    expect(readThemePreference(storage)).toBe("system");
  });

  it("persists explicit themes and removes the setting for system preference", () => {
    window.localStorage.clear();
    expect(writeThemePreference("dark")).toBe(true);
    expect(window.localStorage.getItem(THEME_PREFERENCE_STORAGE_KEY)).toBe("dark");
    expect(writeThemePreference("system")).toBe(true);
    expect(window.localStorage.getItem(THEME_PREFERENCE_STORAGE_KEY)).toBeNull();

    const values = new Map<string, string>([[THEME_PREFERENCE_STORAGE_KEY, "light"]]);
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
    } as Storage;

    expect(readThemePreference(storage)).toBe("light");
    values.delete(THEME_PREFERENCE_STORAGE_KEY);
    expect(readThemePreference(storage)).toBe("system");
  });

  it("resolves the operating-system theme when no explicit preference is stored", () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    Object.defineProperty(window, "matchMedia", { configurable: true, value: matchMedia });

    expect(getSystemTheme()).toBe("dark");
    expect(matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
  });
});
