import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";
import { BRAND_LOGO_FOOTER_HEIGHT_PX } from "../lib/brandDisplay";
import {
  FOOTER_COPYRIGHT_CELL_CLASS,
  FOOTER_LOGO_CELL_CLASS,
  FOOTER_MOCKUP_COMPACT_CLASS,
  FOOTER_MOCKUP_GRID_CLASS,
  FOOTER_NAV_COLUMNS_CLASS,
  FOOTER_NAV_GROUP_CLASS,
} from "../lib/footerLayout";
import { COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";
import { ADMIN_PANEL_URL } from "../lib/siteAdmin";
import {
  SITE_FOOTER_COPY,
  SITE_FOOTER_CONNECT_LINK_LABELS,
  SITE_FOOTER_CONTACT_NAV_COLUMNS,
  SITE_FOOTER_LEGAL_LINK_LABELS,
  SITE_FOOTER_NAVIGATION_LINK_LABELS,
  SITE_FOOTER_SITEMAP_LINK_LABELS,
  SITE_FOOTER_SOCIAL_LINK_LABELS,
  SITE_FOOTER_TAGLINE,
  resolveSiteFooterNavColumns,
} from "../lib/siteFooterCopy";
import { SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_MEDIUM_URL } from "../lib/siteLinks";
import { buildWhatsAppUrl } from "../lib/siteContact";

describe("Footer", () => {
  it("matches Stitch preview footer with logo, home copyright, and services-page link columns", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("footer--stitch", "footer--home-mockup");

    const columns = footer.querySelector(".footer-columns--mockup");
    expect(columns).toHaveClass(FOOTER_MOCKUP_GRID_CLASS, FOOTER_MOCKUP_COMPACT_CLASS);

    const logoCell = screen.getByTestId("footer-logo-cell");
    const copyrightCell = screen.getByTestId("footer-copyright-cell");
    const navGroup = screen.getByTestId("footer-nav-group");

    expect(logoCell).toHaveClass(FOOTER_LOGO_CELL_CLASS);
    expect(copyrightCell).toHaveClass(FOOTER_COPYRIGHT_CELL_CLASS);
    expect(navGroup).toHaveClass(FOOTER_NAV_GROUP_CLASS, FOOTER_NAV_COLUMNS_CLASS);

    const navigationNav = screen.getByTestId("footer-nav-column-navigation");
    const socialNav = screen.getByTestId("footer-nav-column-social");
    const legalNav = screen.getByTestId("footer-nav-column-legal");

    expect(within(navigationNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_NAVIGATION_LINK_LABELS,
    ]);
    expect(within(socialNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_SOCIAL_LINK_LABELS,
    ]);
    expect(within(legalNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_LEGAL_LINK_LABELS,
      "Admin",
    ]);

    expect(within(copyrightCell).getByText(SITE_FOOTER_COPY.copyrightLine1)).toHaveTextContent(
      "© 2026 Commiters Softwares.",
    );
    expect(within(copyrightCell).getByText(SITE_FOOTER_TAGLINE)).toHaveTextContent(
      "Engineering Precision for world-class digital products.",
    );
    expect(within(copyrightCell).getByText(SITE_FOOTER_COPY.copyrightLine1)).toHaveClass(
      "footer-mockup-copyright-line1",
    );
    expect(within(copyrightCell).getByText(SITE_FOOTER_COPY.copyrightLine2)).toHaveClass(
      "footer-mockup-copyright-line2",
    );

    const logo = within(logoCell).getByRole("img", { name: /Commiters/i });
    expect(logo).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(logo).toHaveAttribute("height", String(BRAND_LOGO_FOOTER_HEIGHT_PX));

    expect(within(navigationNav).getByRole("link", { name: /^Home$/i })).toHaveAttribute("href", ROUTES.home);
    expect(within(navigationNav).getByRole("link", { name: /^About$/i })).toHaveAttribute("href", ROUTES.about);
    expect(within(navigationNav).getByRole("link", { name: /^Our Work$/i })).toHaveAttribute(
      "href",
      ROUTES.caseStudies,
    );
    expect(within(navigationNav).getByRole("link", { name: /^Technical Ledger$/i })).toHaveAttribute(
      "href",
      ROUTES.technicalLedger,
    );
    expect(within(navigationNav).getByRole("link", { name: /^Services$/i })).toHaveAttribute("href", ROUTES.services);
    expect(within(navigationNav).getByRole("link", { name: /^Join Us$/i })).toHaveAttribute("href", ROUTES.joinUs);
    expect(within(navigationNav).getByRole("link", { name: /^FAQ$/i })).toHaveAttribute("href", ROUTES.faq);
    expect(within(navigationNav).getByRole("link", { name: /^Contact$/i })).toHaveAttribute("href", ROUTES.contact);
    expect(within(socialNav).getByRole("link", { name: /^LinkedIn$/i })).toHaveAttribute("href", SITE_LINKEDIN_URL);
    expect(within(socialNav).getByRole("link", { name: /^WhatsApp$/i })).toHaveAttribute("href", buildWhatsAppUrl());
    expect(within(socialNav).getByRole("link", { name: /^Instagram$/i })).toHaveAttribute("href", SITE_INSTAGRAM_URL);
    expect(within(socialNav).getByRole("link", { name: /^Medium$/i })).toHaveAttribute("href", SITE_MEDIUM_URL);
    expect(within(socialNav).queryByRole("link", { name: /^X$/i })).not.toBeInTheDocument();
    expect(within(socialNav).queryByRole("link", { name: /^GitHub$/i })).not.toBeInTheDocument();
    expect(within(legalNav).getByRole("link", { name: /^Privacy$/i })).toHaveAttribute("href", ROUTES.privacyPolicy);
    expect(within(legalNav).getByRole("link", { name: /^Terms$/i })).toHaveAttribute("href", ROUTES.terms);
    expect(within(legalNav).getByRole("link", { name: /^Admin$/i })).toHaveAttribute("href", ADMIN_PANEL_URL);
  });

  it("matches the contact page footer with home copyright and Sitemap, Connect, Legal columns", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.contact]}>
        <Footer />
      </MemoryRouter>,
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("footer--contact-mockup");

    const copyrightCell = screen.getByTestId("footer-copyright-cell");
    expect(within(copyrightCell).getByText(SITE_FOOTER_COPY.copyrightLine1)).toHaveTextContent(
      "© 2026 Commiters Softwares.",
    );
    expect(within(copyrightCell).getByText(SITE_FOOTER_TAGLINE)).toHaveTextContent(
      "Engineering Precision for world-class digital products.",
    );

    const sitemapNav = screen.getByTestId("footer-nav-column-sitemap");
    const connectNav = screen.getByTestId("footer-nav-column-connect");
    const legalNav = screen.getByTestId("footer-nav-column-legal");

    expect(within(sitemapNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_SITEMAP_LINK_LABELS,
    ]);
    expect(within(connectNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_CONNECT_LINK_LABELS,
    ]);
    expect(within(legalNav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_LEGAL_LINK_LABELS,
      "Admin",
    ]);

    expect(within(connectNav).getByRole("link", { name: /^LinkedIn$/i })).toHaveAttribute("href", SITE_LINKEDIN_URL);
    expect(within(connectNav).getByRole("link", { name: /^WhatsApp$/i })).toHaveAttribute("href", buildWhatsAppUrl());
    expect(within(connectNav).getByRole("link", { name: /^Instagram$/i })).toHaveAttribute("href", SITE_INSTAGRAM_URL);
    expect(within(connectNav).getByRole("link", { name: /^Medium$/i })).toHaveAttribute("href", SITE_MEDIUM_URL);
    expect(within(connectNav).queryByRole("link", { name: /^X$/i })).not.toBeInTheDocument();
    expect(within(connectNav).queryByRole("link", { name: /^GitHub$/i })).not.toBeInTheDocument();
    expect(within(sitemapNav).getByRole("link", { name: /^Contact$/i })).toHaveAttribute("href", ROUTES.contact);
    expect(sitemapNav.querySelector("a.active")).toHaveTextContent("Contact");
    expect(screen.queryByTestId("footer-nav-column-navigation")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-nav-column-social")).not.toBeInTheDocument();
  });

  it("highlights the active route in the navigation column", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.services]}>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("footer-nav-column-navigation").querySelector("a.active")).toHaveTextContent("Services");
  });
});
