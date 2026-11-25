import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ThemeProvider from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";
import { THEME_PREFERENCE_STORAGE_KEY } from "../lib/themePreference";

function createMediaQuery(matches: boolean) {
  let isMatching = matches;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQuery: MediaQueryList = {
    get matches() {
      return isMatching;
    },
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject | null) => {
      if (type !== "change" || !listener) return;
      listeners.add((event) => {
        if (typeof listener === "function") {
          listener.call(mediaQuery, event);
        } else {
          listener.handleEvent(event);
        }
      });
    },
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => true,
  };

  return {
    mediaQuery,
    setMatches(next: boolean) {
      isMatching = next;
      listeners.forEach((listener) => listener({ matches: next } as MediaQueryListEvent));
    },
  };
}

describe("ThemeProvider", () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  });

  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
    if (originalMatchMedia) {
      Object.defineProperty(window, "matchMedia", { configurable: true, value: originalMatchMedia });
    } else {
      Reflect.deleteProperty(window, "matchMedia");
    }
  });

  it("uses the operating-system theme and updates the site shell when toggled", () => {
    const systemPreference = createMediaQuery(true);
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue(systemPreference.mediaQuery),
    });

    render(
      <ThemeProvider>
        <div className="site-shell" data-brand="commiters-brand">
          <ThemeToggle testId="theme-toggle" />
        </div>
      </ThemeProvider>,
    );

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(screen.getByTestId("theme-toggle")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("theme-toggle")).toHaveAccessibleName("Switch to light mode");

    act(() => systemPreference.setMatches(false));
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(screen.getByTestId("theme-toggle")).toHaveAccessibleName("Switch to dark mode");

    act(() => systemPreference.setMatches(true));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");

    fireEvent.click(screen.getByTestId("theme-toggle"));

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(document.querySelector(".site-shell")).toHaveAttribute("data-theme", "light");
    expect(window.localStorage.getItem(THEME_PREFERENCE_STORAGE_KEY)).toBe("light");
  });

  it("prefers a saved theme over the operating-system setting", () => {
    window.localStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, "light");
    const matchMedia = vi.fn().mockReturnValue(createMediaQuery(true).mediaQuery);
    Object.defineProperty(window, "matchMedia", { configurable: true, value: matchMedia });

    render(
      <ThemeProvider>
        <div className="site-shell" data-brand="commiters-brand">
          <ThemeToggle />
        </div>
      </ThemeProvider>,
    );

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(matchMedia).not.toHaveBeenCalled();
  });
});
