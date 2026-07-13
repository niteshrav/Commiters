import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import CookieConsentBanner from "./CookieConsentBanner";
import CookiePreferencesPanel from "./CookiePreferencesPanel";
import { CookieConsentProvider } from "./CookieConsentProvider";
import { COOKIE_CONSENT_STORAGE_KEY } from "../lib/cookieConsentStorage";

function renderConsentUi() {
  return render(
    <CookieConsentProvider>
      <MemoryRouter>
        <CookieConsentBanner />
        <CookiePreferencesPanel />
      </MemoryRouter>
    </CookieConsentProvider>,
  );
}

describe("CookiePreferencesPanel", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("saves custom optional cookie choices", async () => {
    const user = userEvent.setup();
    renderConsentUi();

    await user.click(screen.getByRole("button", { name: /Manage Preferences/i }));
    expect(screen.getByTestId("cookie-preferences-dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: /Enable PERFORMANCE cookies/i }));
    await user.click(screen.getByRole("button", { name: /Save Preferences/i }));

    expect(screen.queryByTestId("cookie-preferences-dialog")).not.toBeInTheDocument();
    expect(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)).toContain('"performance":true');
  });
});
