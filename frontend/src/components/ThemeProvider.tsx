import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import {
  getSystemTheme,
  readThemePreference,
  THEME_PREFERENCE_STORAGE_KEY,
  type Theme,
  type ThemePreference,
  writeThemePreference,
} from "../lib/themePreference";

type ThemeContextValue = {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(() => {
    const preference = readThemePreference();
    return {
      preference,
      systemTheme: preference === "system" ? getSystemTheme() : "light",
    };
  });
  const { preference, systemTheme } = state;
  const theme = preference === "system" ? systemTheme : preference;

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const siteShell = document.querySelector<HTMLElement>(".site-shell");
    if (siteShell) {
      siteShell.dataset.theme = theme;
    }
  }, [theme]);

  useEffect(() => {
    if (preference !== "system" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      setState((current) => ({ ...current, systemTheme: event.matches ? "dark" : "light" }));
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, [preference]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== THEME_PREFERENCE_STORAGE_KEY && event.key !== null) {
        return;
      }

      const nextPreference = readThemePreference();
      setState((current) => ({
        preference: nextPreference,
        systemTheme: nextPreference === "system" ? getSystemTheme() : current.systemTheme,
      }));
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      preference,
      setPreference: (nextPreference) => {
        writeThemePreference(nextPreference);
        setState((current) => ({
          preference: nextPreference,
          systemTheme: nextPreference === "system" ? getSystemTheme() : current.systemTheme,
        }));
      },
    }),
    [preference, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
