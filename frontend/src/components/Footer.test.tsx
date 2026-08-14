import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";
import { BRAND_LOGO_FOOTER_HEIGHT_PX } from "../lib/brandDisplay";
import {
  FOOTER_BACK_TO_TOP_CLASS,
  FOOTER_COPYRIGHT_CELL_CLASS,
  FOOTER_LOGO_CELL_CLASS,
  FOOTER_REFERENCE_BAR_CLASS,
  FOOTER_REFERENCE_CARD_CLASS,
  FOOTER_REFERENCE_GRID_CLASS,
  FOOTER_REFERENCE_SHELL_CLASS,
} from "../lib/footerLayout";
import { COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";
import {
  SITE_FOOTER_COPY,
  SITE_FOOTER_CONNECT_LINK_LABELS,
  SITE_FOOTER_LEGAL_LINK_LABELS,
  SITE_FOOTER_NAVIGATION_LINK_LABELS,
  SITE_FOOTER_SITEMAP_LINK_LABELS,
  SITE_FOOTER_SOCIAL_LINK_LABELS,
  SITE_FOOTER_TAGLINE,
} from "../lib/siteFooterCopy";
import { SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_MEDIUM_URL } from "../lib/siteLinks";
import { buildWhatsAppUrl } from "../lib/siteContact";

describe("Footer", () => {
  it("matches the reference footer card with brand stack, site map, legal, and accent bar", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("footer--stitch", "footer--reference", "footer--home-mockup");
    expect(footer.querySelector(`.${FOOTER_REFERENCE_SHELL_CLASS}`)).toBeInTheDocument();
    expect(footer.querySelector(`.${FOOTER_REFERENCE_CARD_CLASS}`)).toBeInTheDocument();
    expect(footer.querySelector(`.${FOOTER_REFERENCE_GRID_CLASS}`)).toBeInTheDocument();
    expect(footer.querySelector(`.${FOOTER_REFERENCE_BAR_CLASS}`)).toBeInTheDocument();

    const logoCell = screen.getByTestId("footer-logo-cell");
    const copyrightCell = screen.getByTestId("footer-copyright-cell");
    const navigationNav = screen.getByTestId("footer-nav-column-navigation");
    const legalNav = screen.getByTestId("footer-nav-column-legal");
    const socialIcons = screen.getByTestId("footer-social-icons");

    expect(logoCell).toHaveClass(FOOTER_LOGO_CELL_CLASS);
    expect(copyrightCell).toHaveClass(FOOTER_COPYRIGHT_CELL_CLASS);
    expect(within(navigationNav).getByText("Site Map")).toBeInTheDocument();
    expect(within(legalNav).getByText("Legal")).toBeInTheDocument();

    expect(within(navigationNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_NAVIGATION_LINK_LABELS,
    ]);
    expect(within(legalNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_LEGAL_LINK_LABELS,
    ]);
    expect(within(socialIcons).getAllByRole("link").map((link) => link.getAttribute("aria-label"))).toEqual([
      ...SITE_FOOTER_SOCIAL_LINK_LABELS,
    ]);

    expect(copyrightCell).toHaveTextContent("Copyright © 2026. Commiters, All Rights Reserved.");
    expect(screen.getByText(SITE_FOOTER_TAGLINE)).toHaveTextContent(
      "Engineering Precision for world-class digital products.",
    );
    expect(screen.getByText(SITE_FOOTER_COPY.copyrightLine2)).toHaveClass("footer-brand-tagline");
    expect(screen.getByRole("button", { name: /back to top/i })).toHaveClass(FOOTER_BACK_TO_TOP_CLASS);
    expect(within(copyrightCell).queryByRole("link")).not.toBeInTheDocument();

    const logo = within(logoCell).getByRole("img", { name: /Commiters/i });
    expect(logo).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(logo).toHaveAttribute("height", String(BRAND_LOGO_FOOTER_HEIGHT_PX));

    expect(within(navigationNav).getByRole("link", { name: /^Home$/i })).toHaveAttribute("href", ROUTES.home);
    expect(within(navigationNav).getByRole("link", { name: /^About$/i })).toHaveAttribute("href", ROUTES.about);
    expect(within(navigationNav).getByRole("link", { name: /^Work$/i })).toHaveAttribute(
      "href",
      ROUTES.caseStudies,
    );
    expect(within(navigationNav).getByRole("link", { name: /^Services$/i })).toHaveAttribute("href", ROUTES.services);
    expect(within(navigationNav).getByRole("link", { name: /^FAQ$/i })).toHaveAttribute("href", ROUTES.faq);
    expect(within(navigationNav).getByRole("link", { name: /^Contact$/i })).toHaveAttribute("href", ROUTES.contact);
    expect(within(socialIcons).getByRole("link", { name: /^LinkedIn$/i })).toHaveAttribute("href", SITE_LINKEDIN_URL);
    expect(within(socialIcons).getByRole("link", { name: /^WhatsApp$/i })).toHaveAttribute("href", buildWhatsAppUrl());
    expect(within(socialIcons).getByRole("link", { name: /^Instagram$/i })).toHaveAttribute("href", SITE_INSTAGRAM_URL);
    expect(within(socialIcons).getByRole("link", { name: /^Medium$/i })).toHaveAttribute("href", SITE_MEDIUM_URL);
    expect(within(legalNav).getByRole("link", { name: /^Privacy$/i })).toHaveAttribute("href", ROUTES.privacyPolicy);
    expect(within(legalNav).getByRole("link", { name: /^Terms$/i })).toHaveAttribute("href", ROUTES.terms);
    expect(within(legalNav).queryByRole("link", { name: /^Admin$/i })).not.toBeInTheDocument();
  });

  it("matches the contact page footer with Site Map, social icons, and accent bar copyright", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.contact]}>
        <Footer />
      </MemoryRouter>,
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("footer--contact-mockup", "footer--reference");

    const copyrightCell = screen.getByTestId("footer-copyright-cell");
    expect(copyrightCell).toHaveTextContent("Copyright © 2026. Commiters, All Rights Reserved.");

    const sitemapNav = screen.getByTestId("footer-nav-column-sitemap");
    const legalNav = screen.getByTestId("footer-nav-column-legal");
    const socialIcons = screen.getByTestId("footer-social-icons");

    expect(within(sitemapNav).getByText("Site Map")).toBeInTheDocument();
    expect(within(sitemapNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_SITEMAP_LINK_LABELS,
    ]);
    expect(within(socialIcons).getAllByRole("link").map((link) => link.getAttribute("aria-label"))).toEqual([
      ...SITE_FOOTER_CONNECT_LINK_LABELS,
    ]);
    expect(within(sitemapNav).getByRole("link", { name: /^Contact$/i })).toHaveAttribute("href", ROUTES.contact);
    expect(sitemapNav.querySelector("a.active")).toHaveTextContent("Contact");
    expect(screen.queryByTestId("footer-nav-column-navigation")).not.toBeInTheDocument();
  });

  it("highlights the active route in the navigation column", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.services]}>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("footer-nav-column-navigation").querySelector("a.active")).toHaveTextContent("Services");
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
