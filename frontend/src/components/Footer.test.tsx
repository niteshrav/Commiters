import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
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
import { COMMITERS_HEADER_LOGO_ALT, COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";
import {
  SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
  SITE_FOOTER_CAREERS_HIRING_BADGE,
  SITE_FOOTER_COMPANY_NAV_LINK_LABELS,
  SITE_FOOTER_COPY,
  SITE_FOOTER_OPSFLOW_PARSER_BADGE,
  SITE_FOOTER_PRODUCTS_NAV_LINK_LABELS,
  SITE_FOOTER_RESOURCES_LINK_LABELS,
  SITE_FOOTER_SOCIAL_LINK_LABELS,
  SITE_FOOTER_TAGLINE,
  SITE_FOOTER_TRUSTTAP_PRODUCT_BADGE,
} from "../lib/siteFooterCopy";
import { SITE_GITHUB_URL, SITE_LINKEDIN_URL } from "../lib/siteLinks";
import { buildDiscoveryCallCalendarUrl, buildWhatsAppUrl } from "../lib/siteContact";

function columnLabels(nav: HTMLElement) {
  return within(nav)
    .getAllByRole("link")
    .map((link) => link.querySelector(".footer-link-label")?.textContent ?? link.textContent);
}

describe("Footer", () => {
  it("renders a 4-column Option 1 footer with brand socials and a legal bar", () => {
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
    const productsNav = screen.getByTestId("footer-nav-column-products");
    const companyNav = screen.getByTestId("footer-nav-column-company");
    const resourcesNav = screen.getByTestId("footer-nav-column-resources");
    const socialIcons = screen.getByTestId("footer-social-icons");
    const copyrightCell = screen.getByTestId("footer-copyright-cell");
    const legalCell = screen.getByTestId("footer-legal-cell");

    expect(logoCell).toHaveClass(FOOTER_LOGO_CELL_CLASS);
    expect(copyrightCell).toHaveClass(FOOTER_COPYRIGHT_CELL_CLASS);
    expect(columnLabels(productsNav)).toEqual([...SITE_FOOTER_PRODUCTS_NAV_LINK_LABELS]);
    expect(columnLabels(companyNav)).toEqual([...SITE_FOOTER_COMPANY_NAV_LINK_LABELS]);
    expect(columnLabels(resourcesNav)).toEqual([...SITE_FOOTER_RESOURCES_LINK_LABELS]);
    expect(within(socialIcons).getAllByRole("link").map((link) => link.getAttribute("aria-label"))).toEqual([
      ...SITE_FOOTER_SOCIAL_LINK_LABELS,
    ]);
    expect(socialIcons.closest(".footer-nock-brand")).toBeTruthy();
    expect(screen.queryByTestId("footer-nav-column-social")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-contact-block")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-status-pill")).not.toBeInTheDocument();

    expect(screen.getByText(SITE_FOOTER_TAGLINE)).toHaveClass(FOOTER_BRAND_TAGLINE_CLASS);
    expect(copyrightCell).toHaveTextContent(SITE_FOOTER_COPY.copyrightLine1);
    expect(within(legalCell).getByRole("link", { name: /^Privacy Policy$/i })).toHaveAttribute("href", ROUTES.privacyPolicy);
    expect(within(legalCell).getByRole("link", { name: /^Terms of Service$/i })).toHaveAttribute("href", ROUTES.terms);
    expect(within(legalCell).getByRole("link", { name: /^Site Map$/i })).toHaveAttribute("href", ROUTES.sitemap);
    expect(screen.getByRole("button", { name: /back to top/i })).toHaveClass(FOOTER_BACK_TO_TOP_CLASS);

    const logoLink = within(logoCell).getByRole("link", { name: /Commiters/i });
    expect(logoLink).toHaveAttribute("href", ROUTES.home);
    const logo = within(logoLink).getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(logo).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(logo).toHaveAttribute("height", String(BRAND_LOGO_FOOTER_HEIGHT_PX));

    expect(within(productsNav).getByRole("link", { name: /OpsFlow AI/i })).toHaveAttribute("href", ROUTES.opsFlow);
    expect(within(productsNav).getByText(SITE_FOOTER_OPSFLOW_PARSER_BADGE)).toBeInTheDocument();
    expect(within(productsNav).getByRole("link", { name: /TrustTap/i })).toHaveAttribute("href", ROUTES.trustTap);
    expect(within(productsNav).getByText(SITE_FOOTER_TRUSTTAP_PRODUCT_BADGE)).toBeInTheDocument();
    expect(within(productsNav).getByRole("link", { name: /^Custom Web Applications$/i })).toHaveAttribute(
      "href",
      "/services/web-applications",
    );
    expect(within(companyNav).getByRole("link", { name: /^About Us$/i })).toHaveAttribute("href", ROUTES.about);
    expect(within(companyNav).getByRole("link", { name: /^Core Pillars$/i })).toHaveAttribute(
      "href",
      `${ROUTES.home}#core-pillars`,
    );
    expect(within(companyNav).getByRole("link", { name: /^How We Work$/i })).toHaveAttribute(
      "href",
      `${ROUTES.about}#how-we-work`,
    );
    expect(within(companyNav).getByRole("link", { name: /Case Studies \/ Work/i })).toHaveAttribute(
      "href",
      ROUTES.caseStudies,
    );
    expect(within(companyNav).getByRole("link", { name: /Careers/i })).toHaveAttribute("href", ROUTES.openPositions);
    expect(within(companyNav).getByText(SITE_FOOTER_CAREERS_HIRING_BADGE)).toBeInTheDocument();
    expect(within(resourcesNav).getByRole("link", { name: /^Blog & Insights$/i })).toHaveAttribute(
      "href",
      ROUTES.technicalLedger,
    );
    expect(within(resourcesNav).getByRole("link", { name: /^Book Consultation$/i })).toHaveAttribute(
      "href",
      buildDiscoveryCallCalendarUrl(),
    );
    expect(within(socialIcons).getByRole("link", { name: /^LinkedIn$/i })).toHaveAttribute("href", SITE_LINKEDIN_URL);
    expect(within(socialIcons).getByRole("link", { name: /^WhatsApp$/i })).toHaveAttribute("href", buildWhatsAppUrl());
    expect(within(socialIcons).getByRole("link", { name: /^GitHub$/i })).toHaveAttribute("href", SITE_GITHUB_URL);
    expect(within(legalCell).getAllByRole("link").map((link) => link.textContent)).toEqual([
      ...SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
    ]);
  });

  it("highlights the active route in the navigation columns", () => {
    render(
      <MemoryRouter initialEntries={["/work"]}>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("footer-nav-column-company").querySelector("a.active")).toHaveTextContent(
      "Case Studies / Work",
    );
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
