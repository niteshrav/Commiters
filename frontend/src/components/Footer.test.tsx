import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";
import { BRAND_LOGO_FOOTER_HEIGHT_PX } from "../lib/brandDisplay";
import {
  FOOTER_BACK_TO_TOP_CLASS,
  FOOTER_BLACKBOOK_BAR_CLASS,
  FOOTER_BRAND_TAGLINE_CLASS,
  FOOTER_COPYRIGHT_CELL_CLASS,
  FOOTER_LOGO_CELL_CLASS,
  FOOTER_NOCK_CLASS,
  FOOTER_NOCK_MAIN_CLASS,
  FOOTER_NOCK_SHELL_CLASS,
} from "../lib/footerLayout";
import { COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";
import {
  SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
  SITE_FOOTER_COPY,
  SITE_FOOTER_PRIMARY_NAV_LINK_LABELS,
  SITE_FOOTER_RESOURCES_LINK_LABELS,
  SITE_FOOTER_SOCIAL_LINK_LABELS,
  SITE_FOOTER_TAGLINE,
} from "../lib/siteFooterCopy";
import { SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_MEDIUM_URL } from "../lib/siteLinks";
import { buildWhatsAppUrl } from "../lib/siteContact";

describe("Footer", () => {
  it("matches the merged nock footer with nav columns, bottom social icons, and copyright bar", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("footer--stitch", FOOTER_NOCK_CLASS, "footer--home-mockup");
    expect(footer.querySelector(`.${FOOTER_NOCK_SHELL_CLASS}`)).toBeInTheDocument();
    expect(footer.querySelector(`.${FOOTER_NOCK_MAIN_CLASS}`)).toBeInTheDocument();
    expect(footer.querySelector(`.${FOOTER_BLACKBOOK_BAR_CLASS}`)).toBeInTheDocument();

    const logoCell = screen.getByTestId("footer-logo-cell");
    const primaryNav = screen.getByTestId("footer-nav-column-primary");
    const resourcesNav = screen.getByTestId("footer-nav-column-resources");
    const socialIcons = screen.getByTestId("footer-social-icons");
    const copyrightCell = screen.getByTestId("footer-copyright-cell");
    const legalCell = screen.getByTestId("footer-legal-cell");

    expect(logoCell).toHaveClass(FOOTER_LOGO_CELL_CLASS);
    expect(copyrightCell).toHaveClass(FOOTER_COPYRIGHT_CELL_CLASS);
    expect(within(primaryNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_PRIMARY_NAV_LINK_LABELS,
    ]);
    expect(within(resourcesNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_RESOURCES_LINK_LABELS,
    ]);
    expect(within(socialIcons).getAllByRole("link").map((link) => link.getAttribute("aria-label"))).toEqual([
      ...SITE_FOOTER_SOCIAL_LINK_LABELS,
    ]);
    expect(screen.queryByTestId("footer-nav-column-social")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-contact-block")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-status-pill")).not.toBeInTheDocument();

    expect(screen.getByText(SITE_FOOTER_TAGLINE)).toHaveClass(FOOTER_BRAND_TAGLINE_CLASS);
    expect(copyrightCell).toHaveTextContent("Copyright 2026 (C) Commiters. All Rights Reserved.");
    expect(within(legalCell).getByRole("link", { name: /^Privacy$/i })).toHaveAttribute("href", ROUTES.privacyPolicy);
    expect(within(legalCell).getByRole("link", { name: /^Terms$/i })).toHaveAttribute("href", ROUTES.terms);
    expect(screen.getByRole("button", { name: /back to top/i })).toHaveClass(FOOTER_BACK_TO_TOP_CLASS);

    const logo = within(logoCell).getByRole("img", { name: /Commiters/i });
    expect(logo).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(logo).toHaveAttribute("height", String(BRAND_LOGO_FOOTER_HEIGHT_PX));

    expect(within(primaryNav).getByRole("link", { name: /^Principles$/i })).toHaveAttribute(
      "href",
      `${ROUTES.about}#principles`,
    );
    expect(within(primaryNav).getByRole("link", { name: /^Product$/i })).toHaveAttribute("href", ROUTES.trustTap);
    expect(within(primaryNav).getByRole("link", { name: /^Work$/i })).toHaveAttribute("href", ROUTES.caseStudies);
    expect(within(resourcesNav).getByRole("link", { name: /^Careers$/i })).toHaveAttribute("href", ROUTES.openPositions);
    expect(within(resourcesNav).getByRole("link", { name: /^Blog$/i })).toHaveAttribute("href", ROUTES.technicalLedger);
    expect(within(socialIcons).getByRole("link", { name: /^LinkedIn$/i })).toHaveAttribute("href", SITE_LINKEDIN_URL);
    expect(within(socialIcons).getByRole("link", { name: /^WhatsApp$/i })).toHaveAttribute("href", buildWhatsAppUrl());
    expect(within(socialIcons).getByRole("link", { name: /^Instagram$/i })).toHaveAttribute("href", SITE_INSTAGRAM_URL);
    expect(within(socialIcons).getByRole("link", { name: /^Medium$/i })).toHaveAttribute("href", SITE_MEDIUM_URL);
    expect(screen.getByText(SITE_FOOTER_COPY.copyrightLine1)).toBeInTheDocument();
    expect(within(legalCell).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
    ]);
  });

  it("highlights the active route in the navigation columns", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.services]}>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("footer-nav-column-primary").querySelector("a.active")).toHaveTextContent("Services");
  });

  it("scrolls to the top when Back to Top is clicked", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /back to top/i }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });

    scrollTo.mockRestore();
  });
});
