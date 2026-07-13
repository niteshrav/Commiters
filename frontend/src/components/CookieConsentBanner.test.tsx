import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import CookieConsentBanner from "./CookieConsentBanner";
import { CookieConsentProvider } from "./CookieConsentProvider";
import { COOKIE_CONSENT_STORAGE_KEY } from "../lib/cookieConsentStorage";

function renderBanner() {
  return render(
    <CookieConsentProvider>
      <MemoryRouter>
        <CookieConsentBanner />
      </MemoryRouter>
    </CookieConsentProvider>,
  );
}

describe("CookieConsentBanner", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows the banner until a choice is saved", async () => {
    const user = userEvent.setup();
    renderBanner();

    expect(screen.getByTestId("cookie-consent-banner")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Accept All/i }));
    expect(screen.queryByTestId("cookie-consent-banner")).not.toBeInTheDocument();
    expect(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)).toBeTruthy();
  });

  it("opens the preferences panel from manage preferences", async () => {
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <MemoryRouter>
          <CookieConsentBanner />
          <div data-testid="cookie-preferences-panel-placeholder" />
        </MemoryRouter>
      </CookieConsentProvider>,
    );

    await user.click(screen.getByRole("button", { name: /Manage Preferences/i }));
    expect(screen.getByTestId("cookie-consent-banner")).toBeInTheDocument();
  });
});
