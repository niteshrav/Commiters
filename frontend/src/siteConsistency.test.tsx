import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { APP_ROUTE_PATHS, ROUTES } from "./lib/routes";
import { buildServiceDetailPath } from "./lib/services";
import { serviceDetailTitleForTests } from "./pages/ServiceDetailPage";
import { COMMITERS_HEADER_LOGO_ALT, COMMITERS_HEADER_LOGO_SRC } from "./lib/siteBrand";
import { WHATSAPP_FLOATING_ACTION_LABEL } from "./lib/whatsappFloatingAction";
import { TRUSTTAP_DOCUMENT_TITLE } from "./lib/trustTapPageContent";
import { DEFAULT_DOCUMENT_TITLE, pageTitle } from "./lib/siteMeta";
import { WEBSITE_DEVELOPMENT_UDAPUR, WHATSAPP_AUTOMATION_UDAPUR } from "./lib/seoLandingUdaipurContent";
import {
  aboutPageSeo,
  caseStudiesPageSeo,
  contactPageSeo,
  joinUsPageSeo,
  servicesPageSeo,
  testimonialsPageSeo,
} from "./lib/sitePageSeo";

function expectedTitle(path: string): string {
  switch (path) {
    case ROUTES.home:
      return DEFAULT_DOCUMENT_TITLE;
    case ROUTES.about:
      return aboutPageSeo().title;
    case ROUTES.caseStudies:
      return caseStudiesPageSeo().title;
    case ROUTES.technicalLedger:
      return pageTitle("Technical Ledger");
    case ROUTES.commitersCaseStudy:
      return pageTitle("Commiters Case Study");
    case ROUTES.aiSummarizerCaseStudy:
      return pageTitle("AI Summarizer Case Study");
    case ROUTES.neardropCaseStudy:
      return pageTitle("NearDrop MVP Case Study");
    case ROUTES.multiRoleCrmCaseStudy:
      return pageTitle("Multi-Role CRM Case Study");
    case ROUTES.browseMyVacationCaseStudy:
      return pageTitle("BrowseMyVacation Case Study");
    case ROUTES.trustTap:
      return TRUSTTAP_DOCUMENT_TITLE;
    case ROUTES.services:
      return servicesPageSeo().title;
    case ROUTES.joinUs:
      return joinUsPageSeo().title;
    case ROUTES.openPositions:
      return pageTitle("Open Positions");
    case ROUTES.contact:
      return contactPageSeo().title;
    case ROUTES.faq:
      return pageTitle("Frequently Asked Questions");
    case ROUTES.testimonials:
      return testimonialsPageSeo().title;
    case ROUTES.websiteDevelopmentUdaipur:
      return WEBSITE_DEVELOPMENT_UDAPUR.seo.title;
    case ROUTES.whatsappAutomationUdaipur:
      return WHATSAPP_AUTOMATION_UDAPUR.seo.title;
    case ROUTES.privacyPolicy:
      return pageTitle("Privacy Policy");
    case ROUTES.cookiePolicy:
      return pageTitle("Cookie Policy");
    case ROUTES.terms:
      return pageTitle("Terms of Service");
    case ROUTES.thankYou:
      return pageTitle("Thank you");
    case ROUTES.notFound:
      return pageTitle("Page not found");
    default:
      throw new Error(`Untested route: ${path}`);
  }
}

describe("Site-wide consistency", () => {
  beforeEach(() => {
    document.title = "";
  });

  it.each(APP_ROUTE_PATHS)("route %s uses theme shell, layout, and document title", (path) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );

    expect(document.querySelector(".site-shell")).toHaveAttribute("data-theme", "commiters-brand");
    expect(screen.getByTestId("route-shell")).toHaveClass("route-shell", "route-transition");
    expect(screen.getByRole("main")).toHaveClass("container");
    expect(document.title).toBe(expectedTitle(path));
  });

  it("does not render floating quick-contact chrome (credibility-focused layout)", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.home]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("site-quick-actions")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog", { name: /quick inquiry/i })).not.toBeInTheDocument();
  });

  it.each(APP_ROUTE_PATHS)("route %s shows the floating WhatsApp action", (path) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: WHATSAPP_FLOATING_ACTION_LABEL })).toBeInTheDocument();
  });

  it.each(APP_ROUTE_PATHS)("route %s exposes exactly one site footer landmark", (path) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );

    const footers = screen.getAllByRole("contentinfo");
    expect(footers).toHaveLength(1);
    expect(footers[0]).toHaveClass("footer", "footer-rich");
  });

  it.each(APP_ROUTE_PATHS)("route %s does not show a GitHub link in the footer", (path) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).queryByRole("link", { name: /^GitHub$/i })).not.toBeInTheDocument();
  });

  it.each(APP_ROUTE_PATHS)("route %s uses the regenerated Commiters logo in header and footer", (path) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );

    const banner = screen.getByRole("banner");
    const footer = screen.getByRole("contentinfo");

    const headerLogo = within(banner).getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT });
    const footerLogo = within(footer).getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT });

    expect(headerLogo).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(footerLogo).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(banner.querySelector(".brand-logo--header")).toBeTruthy();
    expect(footer.querySelector(".brand-logo--footer")).toBeTruthy();
  });

  it("does not duplicate the logo tagline as separate text anywhere on the page", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.home]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("brand-tagline")).not.toBeInTheDocument();
    expect(screen.getByRole("banner").querySelector(".brand-logo--header")).toBeTruthy();
    expect(screen.getByRole("contentinfo").querySelector(".brand-logo--footer")).toBeTruthy();
  });

  it("maps unknown URLs to the not-found experience with the same shell and title", () => {
    render(
      <MemoryRouter initialEntries={["/does-not-exist-yet"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /Page not found/i })).toBeInTheDocument();
    expect(document.querySelector(".site-shell")).toHaveAttribute("data-theme", "commiters-brand");
    expect(document.title).toBe(pageTitle("Page not found"));
  });

  it("renders service detail pages inside the site shell with SEO title", () => {
    const path = buildServiceDetailPath("website-development");
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("service-detail-page")).toBeInTheDocument();
    expect(document.querySelector(".site-shell")).toHaveAttribute("data-theme", "commiters-brand");
    expect(document.title).toBe(serviceDetailTitleForTests("website-development"));
  });
});
