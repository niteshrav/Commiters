import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import AccessibilityWidget from "./AccessibilityWidget";
import { AccessibilityProvider } from "./AccessibilityProvider";
import { ACCESSIBILITY_STORAGE_KEY } from "../lib/accessibilityStorage";

function renderWidget() {
  return render(
    <AccessibilityProvider>
      <AccessibilityWidget />
    </AccessibilityProvider>,
  );
}

describe("AccessibilityWidget", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.a11yTextSize = "default";
    document.documentElement.dataset.a11yHighContrast = "false";
    document.documentElement.dataset.a11yUnderlineLinks = "false";
    document.documentElement.dataset.a11yReduceMotion = "false";
  });

  it("opens the settings panel and saves text size changes", async () => {
    const user = userEvent.setup();
    renderWidget();

    await user.click(screen.getByRole("button", { name: /Accessibility options/i }));
    expect(screen.getByTestId("accessibility-widget-dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "Large" }));
    expect(document.documentElement.dataset.a11yTextSize).toBe("large");
    expect(window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY)).toContain('"textSize":"large"');
  });

  it("closes the panel with Escape", async () => {
    const user = userEvent.setup();
    renderWidget();

    await user.click(screen.getByRole("button", { name: /Accessibility options/i }));
    expect(screen.getByTestId("accessibility-widget-dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("accessibility-widget-dialog")).not.toBeInTheDocument();
  });

  it("resets settings to defaults", async () => {
    const user = userEvent.setup();
    renderWidget();

    await user.click(screen.getByRole("button", { name: /Accessibility options/i }));
    await user.click(screen.getByRole("radio", { name: /Extra large/i }));
    await user.click(screen.getByRole("checkbox", { name: /High contrast/i }));

    await user.click(screen.getByRole("button", { name: /Reset accessibility settings/i }));
    expect(document.documentElement.dataset.a11yTextSize).toBe("default");
    expect(document.documentElement.dataset.a11yHighContrast).toBe("false");
  });
});
