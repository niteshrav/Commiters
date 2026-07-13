import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CookiePolicyDocument from "./CookiePolicyDocument";
import { CookieConsentProvider } from "./CookieConsentProvider";
import { COOKIE_MANAGE_CTA, COOKIE_POLICY_NAV } from "../lib/cookiePageContent";
import {
  COOKIE_CATEGORY_CARD_CLASS,
  COOKIE_CATEGORY_GRID_CLASS,
  COOKIE_LAYOUT_CLASS,
  COOKIE_MANAGE_CTA_CLASS,
  COOKIE_NAV_CLASS,
} from "../lib/cookiePageLayout";

describe("CookiePolicyDocument", () => {
  function renderDocument() {
    return render(
      <CookieConsentProvider>
        <MemoryRouter>
          <CookiePolicyDocument />
        </MemoryRouter>
      </CookieConsentProvider>,
    );
  }

  it("renders sidebar navigation and category cards with layout classes", () => {
    renderDocument();

    expect(screen.getByTestId("cookie-policy-document")).toBeInTheDocument();
    expect(screen.getByTestId("cookie-policy-layout")).toHaveClass(COOKIE_LAYOUT_CLASS);
    expect(screen.getByTestId("cookie-policy-nav")).toHaveClass(COOKIE_NAV_CLASS);
    expect(screen.getByTestId("cookie-policy-category-grid")).toHaveClass(COOKIE_CATEGORY_GRID_CLASS);

    const cards = screen.getAllByTestId(/cookie-policy-category-card-/);
    expect(cards).toHaveLength(4);
    for (const card of cards) {
      expect(card).toHaveClass(COOKIE_CATEGORY_CARD_CLASS);
    }

    expect(screen.getByTestId("cookie-policy-manage-cta")).toHaveClass(COOKIE_MANAGE_CTA_CLASS);
    expect(screen.getByRole("button", { name: COOKIE_MANAGE_CTA.buttonLabel })).toBeInTheDocument();
  });

  it("highlights the first nav item when no hash is present", () => {
    renderDocument();

    const first = screen.getByRole("link", { name: COOKIE_POLICY_NAV[0].label });
    expect(first).toHaveClass("cookie-policy-nav-link--active");
  });
});
