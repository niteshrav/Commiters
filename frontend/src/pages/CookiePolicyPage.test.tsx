import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import CookiePolicyPage from "./CookiePolicyPage";
import { COMMITERS_HEADER_LOGO_ALT } from "../lib/siteBrand";
import {
  COOKIE_CATEGORY_CARDS,
  COOKIE_MANAGE_CTA,
  COOKIE_PAGE_COPY,
  COOKIE_POLICY_DISCLAIMER,
  COOKIE_POLICY_NAV,
  COOKIE_POLICY_SECTIONS,
} from "../lib/cookiePageContent";
import { COOKIE_CONTENT_COLUMN_CLASS } from "../lib/cookiePageLayout";
import { ROUTES } from "../lib/routes";
import {
  SITE_FOOTER_COPY,
  SITE_FOOTER_SITEMAP_LINK_LABELS,
  SITE_FOOTER_TAGLINE,
} from "../lib/siteFooterCopy";

describe("CookiePolicyPage", () => {
  it("renders the Stitch cookie policy layout from the screenshot", () => {
    render(
      <MemoryRouter>
        <CookiePolicyPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("cookie-policy-page")).toBeInTheDocument();
    const contentColumn = screen.getByTestId("cookie-policy-content");
    expect(contentColumn).toHaveClass(COOKIE_CONTENT_COLUMN_CLASS);
    expect(screen.getByTestId("cookie-policy-intro")).toBeInTheDocument();
    expect(screen.getByTestId("cookie-policy-document")).toBeInTheDocument();

    expect(screen.getByText(COOKIE_PAGE_COPY.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: COOKIE_PAGE_COPY.title })).toBeInTheDocument();
    expect(
      screen.getByText(`${COOKIE_PAGE_COPY.lastUpdatedLabel} ${COOKIE_PAGE_COPY.lastUpdatedDate}`),
    ).toBeInTheDocument();

    for (const item of COOKIE_POLICY_NAV) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute("href", `#${item.id}`);
    }

    for (const section of COOKIE_POLICY_SECTIONS) {
      expect(
        screen.getByRole("heading", { name: new RegExp(section.title, "i") }),
      ).toBeInTheDocument();
    }

    for (const card of COOKIE_CATEGORY_CARDS) {
      expect(screen.getByText(card.label)).toBeInTheDocument();
      expect(screen.getByText(card.description)).toBeInTheDocument();
    }

    expect(screen.getByRole("heading", { name: COOKIE_MANAGE_CTA.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: COOKIE_MANAGE_CTA.buttonLabel })).toHaveAttribute(
      "href",
      COOKIE_MANAGE_CTA.buttonHref,
    );
    expect(screen.getByRole("link", { name: new RegExp(COOKIE_MANAGE_CTA.privacyLinkLabel) })).toHaveAttribute(
      "href",
      ROUTES.privacyPolicy,
    );
    expect(screen.getByText(COOKIE_POLICY_DISCLAIMER)).toBeInTheDocument();
  });

  it("uses the contact page footer columns when routed through the site shell", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.cookiePolicy]}>
        <App />
      </MemoryRouter>,
    );

    const banner = screen.getByRole("banner");
    expect(within(banner).getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveClass("footer--contact-mockup");

    const sitemapNav = screen.getByTestId("footer-nav-column-sitemap");
    expect(within(sitemapNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_SITEMAP_LINK_LABELS,
    ]);

    const copyrightCell = screen.getByTestId("footer-copyright-cell");
    expect(within(copyrightCell).getByText(SITE_FOOTER_COPY.copyrightLine1)).toHaveTextContent(
      "© 2026 Commiters Softwares.",
    );
    expect(within(copyrightCell).getByText(SITE_FOOTER_TAGLINE)).toHaveTextContent(
      "Engineering Precision for world-class digital products.",
    );
  });
});
