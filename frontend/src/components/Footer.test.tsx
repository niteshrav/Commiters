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
import { COMMITERS_FOOTER_LOGO_SRC, COMMITERS_HEADER_LOGO_ALT, COMMITERS_TAGLINE } from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";
import {
  SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
  SITE_FOOTER_COMPANY_NAV_LINK_LABELS,
  SITE_FOOTER_COPY,
  SITE_FOOTER_ENGINEERING_NAV_LINK_LABELS,
  SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS,
  SITE_FOOTER_SOCIAL_LINK_LABELS,
  SITE_FOOTER_TAGLINE,
} from "../lib/siteFooterCopy";
import { SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_MEDIUM_URL } from "../lib/siteLinks";

function columnLabels(nav: HTMLElement) {
  return within(nav)
    .getAllByRole("link")
    .map((link) => link.querySelector(".footer-link-label")?.textContent ?? link.textContent);
}

describe("Footer", () => {
  it("renders a 4-column footer with brand socials and a legal bar", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("footer--stitch", FOOTER_NOCK_CLASS, "footer--home-mockup");
    expect(footer.querySelector(`.${FOOTER_NOCK_SHELL_CLASS}`)).toBeInTheDocument();
    expect(footer.querySelector(`.${FOOTER_NOCK_MAIN_CLASS}`)).toHaveClass("grid-cols-1", "md:grid-cols-4");
    expect(footer.querySelector(`.${FOOTER_BLACKBOOK_BAR_CLASS}`)).toBeInTheDocument();

    const logoCell = screen.getByTestId("footer-logo-cell");
    const flagshipNav = screen.getByTestId("footer-nav-column-flagship");
    const engineeringNav = screen.getByTestId("footer-nav-column-engineering");
    const companyNav = screen.getByTestId("footer-nav-column-company");
    const socialIcons = screen.getByTestId("footer-social-icons");
    const copyrightCell = screen.getByTestId("footer-copyright-cell");
    const legalCell = screen.getByTestId("footer-legal-cell");

    expect(logoCell).toHaveClass(FOOTER_LOGO_CELL_CLASS);
    expect(copyrightCell).toHaveClass(FOOTER_COPYRIGHT_CELL_CLASS);
    expect(columnLabels(flagshipNav)).toEqual([...SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS]);
    expect(columnLabels(engineeringNav)).toEqual([...SITE_FOOTER_ENGINEERING_NAV_LINK_LABELS]);
    expect(columnLabels(companyNav)).toEqual([...SITE_FOOTER_COMPANY_NAV_LINK_LABELS]);
    expect(within(socialIcons).getAllByRole("link").map((link) => link.getAttribute("aria-label"))).toEqual([
      ...SITE_FOOTER_SOCIAL_LINK_LABELS,
    ]);
    expect(socialIcons.closest(".footer-nock-brand")).toBeTruthy();
    expect(screen.queryByTestId("footer-nav-column-social")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-contact-block")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-status-pill")).not.toBeInTheDocument();

    expect(screen.getByText(SITE_FOOTER_TAGLINE)).toHaveClass(FOOTER_BRAND_TAGLINE_CLASS);
    expect(screen.queryByText(COMMITERS_TAGLINE)).not.toBeInTheDocument();
    expect(copyrightCell).toHaveTextContent(SITE_FOOTER_COPY.copyrightLine1);
    expect(within(legalCell).getByRole("link", { name: /^Privacy$/i })).toHaveAttribute("href", ROUTES.privacy);
    expect(within(legalCell).getByRole("link", { name: /^Terms$/i })).toHaveAttribute("href", ROUTES.terms);
    expect(within(legalCell).queryByRole("link", { name: /^Site Map$/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back to top/i })).toHaveClass(FOOTER_BACK_TO_TOP_CLASS);

    const logoLink = within(logoCell).getByRole("link", { name: /Commiters/i });
    expect(logoLink).toHaveAttribute("href", ROUTES.home);
    const logo = within(logoLink).getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(logo).toHaveAttribute("src", COMMITERS_FOOTER_LOGO_SRC);
    expect(logo).toHaveAttribute("height", String(BRAND_LOGO_FOOTER_HEIGHT_PX));

    expect(within(flagshipNav).getByRole("link", { name: /^AI Operational Audits$/i })).toHaveAttribute(
      "href",
      ROUTES.aiOperationalAudit,
    );
    expect(within(flagshipNav).getByRole("link", { name: /^Governed AI & Workflow Systems$/i })).toHaveAttribute(
      "href",
      ROUTES.aiSolutions,
    );
    expect(within(flagshipNav).getByRole("link", { name: /^Spec-Driven Full-Stack Platforms$/i })).toHaveAttribute(
      "href",
      ROUTES.webApplications,
    );
    expect(within(flagshipNav).getByRole("link", { name: /^OpsFlow AI$/i })).toHaveAttribute(
      "href",
      ROUTES.opsFlowPlayground,
    );
    expect(within(flagshipNav).getByRole("link", { name: /^Free Business Utilities$/i })).toHaveAttribute(
      "href",
      ROUTES.utilities,
    );
    expect(within(flagshipNav).queryByRole("link", { name: /^TrustTap$/i })).not.toBeInTheDocument();
    expect(within(flagshipNav).queryByRole("link", { name: /^Custom AI Pipelines$/i })).not.toBeInTheDocument();
    expect(within(engineeringNav).getByRole("link", { name: /^B2B Web Applications$/i })).toHaveAttribute(
      "href",
      ROUTES.webApplications,
    );
    expect(within(companyNav).getByRole("link", { name: /^About Us$/i })).toHaveAttribute("href", ROUTES.about);
    expect(within(companyNav).getByRole("link", { name: /^Client Work$/i })).toHaveAttribute("href", ROUTES.caseStudies);
    expect(within(companyNav).getByRole("link", { name: /^Contact$/i })).toHaveAttribute("href", ROUTES.contact);
    expect(within(companyNav).queryByRole("link", { name: /^Privacy$/i })).not.toBeInTheDocument();
    expect(within(companyNav).queryByRole("link", { name: /^Terms$/i })).not.toBeInTheDocument();

    const socialLinks = within(socialIcons).getAllByRole("link");
    for (const link of socialLinks) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link.querySelector("svg")).toBeTruthy();
    }
    expect(within(socialIcons).getByRole("link", { name: /^LinkedIn$/i })).toHaveAttribute("href", SITE_LINKEDIN_URL);
    expect(within(socialIcons).getByRole("link", { name: /^Instagram$/i })).toHaveAttribute("href", SITE_INSTAGRAM_URL);
    expect(within(socialIcons).getByRole("link", { name: /^Medium$/i })).toHaveAttribute("href", SITE_MEDIUM_URL);
    expect(within(socialIcons).getByRole("link", { name: /^GitHub$/i })).toHaveAttribute("href", SITE_GITHUB_URL);
    expect(within(socialIcons).queryByRole("link", { name: /^Twitter$/i })).not.toBeInTheDocument();
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

    expect(screen.getByTestId("footer-nav-column-company").querySelector("a.active")).toHaveTextContent("Client Work");
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
