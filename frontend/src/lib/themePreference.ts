export const THEME_PREFERENCE_STORAGE_KEY = "commiters-theme-preference";

export type ThemePreference = "light" | "dark" | "system";
export type Theme = Exclude<ThemePreference, "system">;

function parseThemePreference(value: string | null): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

export function readThemePreference(storage?: Storage): ThemePreference {
  try {
    const target = storage ?? window.localStorage;
    return parseThemePreference(target.getItem(THEME_PREFERENCE_STORAGE_KEY));
  } catch {
    return "system";
  }
}

export function writeThemePreference(preference: ThemePreference): boolean {
  try {
    if (preference === "system") {
      window.localStorage.removeItem(THEME_PREFERENCE_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, preference);
    }
    return true;
  } catch {
    return false;
  }
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
