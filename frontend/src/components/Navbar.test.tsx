import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { BRAND_LOGO_HEADER_HEIGHT_PX } from "../lib/brandDisplay";
import {
  NAV_DROPDOWN_CONFIGS,
  NAV_DROPDOWN_PANEL_GLASS_CLASS,
  PRIMARY_NAV_ITEMS,
  resolveNavDropdownConfigs,
} from "../lib/navSections";
import { afterEach } from "vitest";
import { COMMITERS_HEADER_LOGO_ALT, COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";
import {
  HEADER_MENU_BTN_TESTID,
  MOBILE_NAV_BODY_LOCK_CLASS,
  MOBILE_NAV_CLOSE_BTN_TESTID,
  MOBILE_NAV_DRAWER_COPYRIGHT,
  MOBILE_NAV_DRAWER_TESTID,
  MOBILE_NAV_OVERLAY_CLASS,
} from "../lib/mobileNavDrawer";
import { SITE_GITHUB_URL, SITE_LINKEDIN_URL } from "../lib/siteLinks";
import { buildWhatsAppUrl } from "../lib/siteContact";

function desktopNavTriggers(container: HTMLElement) {
  return within(container).getAllByRole("link").filter((link) => link.classList.contains("nav-dropdown-trigger"));
}

describe("Navbar", () => {
  afterEach(() => {
    document.body.classList.remove(MOBILE_NAV_BODY_LOCK_CLASS);
    document.body.style.overflow = "unset";
  });
  it("shows the Commiters header logo and hover mega-menu nav items", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const brandLink = screen.getByRole("link", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(brandLink).toHaveAttribute("href", ROUTES.home);
    expect(brandLink).toHaveClass("brand", "brand-logo-link");
    const banner = screen.getByRole("banner");
    const logo = within(banner).getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(logo).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(logo).toHaveAttribute("height", String(BRAND_LOGO_HEADER_HEIGHT_PX));
    expect(within(banner).queryByTestId("brand-tagline")).not.toBeInTheDocument();
    expect(screen.queryByText(/^Commiters$/)).not.toBeInTheDocument();

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const triggers = desktopNavTriggers(primaryNav);
    expect(triggers.map((link) => link.textContent?.replace(/\s+/g, " ").trim())).toEqual(
      resolveNavDropdownConfigs().map((item) => item.label),
    );
    expect(triggers.map((link) => link.getAttribute("href"))).toEqual(
      resolveNavDropdownConfigs().map((item) => item.overviewTo),
    );

    expect(within(primaryNav).queryByRole("link", { name: /^Home$/i })).not.toBeInTheDocument();
    expect(within(primaryNav).queryByRole("link", { name: /^Careers$/i })).not.toBeInTheDocument();
    expect(within(primaryNav).queryByRole("link", { name: /^More$/i })).not.toBeInTheDocument();
    expect(within(primaryNav).queryByRole("link", { name: /^Contact$/i })).not.toBeInTheDocument();
    expect(within(primaryNav).queryByTestId("nav-more-menu")).not.toBeInTheDocument();
    expect(screen.getByTestId(HEADER_MENU_BTN_TESTID)).toHaveAttribute("aria-label", "Open menu");
    expect(screen.getByTestId(HEADER_MENU_BTN_TESTID)).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId(MOBILE_NAV_DRAWER_TESTID)).not.toBeInTheDocument();
    expect(screen.getByTestId("nav-start-project-cta")).toHaveAttribute("href", ROUTES.contact);
    expect(screen.getByTestId("nav-start-project-cta")).toHaveTextContent("Start Project");
    expect(screen.queryByTestId("nav-start-project-cta-mobile")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Get Started/i })).not.toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveClass("header", "header-light");
  });

  it("opens each dropdown menu on hover without chevron arrows", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const configs = resolveNavDropdownConfigs();

    for (const config of configs) {
      const trigger = within(primaryNav).getByRole("link", { name: new RegExp(`^${config.label}$`, "i") });
      expect(trigger.querySelector("svg")).toBeNull();

      await user.hover(trigger);

      expect(screen.getByTestId(`nav-mega-panel-${config.id}`)).toBeInTheDocument();
      expect(trigger).toHaveClass("nav-dropdown-trigger--open");
      for (const other of configs) {
        if (other.id === config.id) continue;
        expect(screen.queryByTestId(`nav-mega-panel-${other.id}`)).not.toBeInTheDocument();
      }
    }
  });

  it("places Services before Work in the primary nav order", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const labels = desktopNavTriggers(primaryNav).map((link) => link.textContent?.replace(/\s+/g, " ").trim());
    expect(labels.indexOf("Services")).toBeLessThan(labels.indexOf("Work"));
  });

  it("opens a services mega-menu panel on hover with grouped service links", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const servicesTrigger = within(primaryNav).getByRole("link", { name: /^Services$/i });
    expect(screen.queryByTestId("nav-mega-panel-services")).not.toBeInTheDocument();

    await user.hover(servicesTrigger);
    const panel = screen.getByTestId("nav-mega-panel-services");
    expect(panel).toHaveClass("nav-item-dropdown-panel--grouped", NAV_DROPDOWN_PANEL_GLASS_CLASS);
    expect(within(panel).getByTestId("nav-mega-column-ai-operational-engineering")).toHaveTextContent(
      "AI Operational Engineering",
    );
    expect(within(panel).getByRole("menuitem", { name: /Generative AI & LLM Solutions/i })).toHaveAttribute(
      "href",
      "/services/ai-solutions",
    );
    expect(within(panel).getByRole("menuitem", { name: /OpsFlow AI Playground/i })).toHaveAttribute("href", "/opsflow");
    expect(within(panel).getByRole("menuitem", { name: /AI Operational Audit/i })).toHaveClass(
      "nav-dropdown-link--featured",
    );
    expect(within(panel).getByRole("menuitem", { name: /AI Operational Audit/i })).toHaveTextContent(
      /2-week fixed diagnostic/i,
    );
    expect(within(panel).queryByRole("menuitem", { name: /^Website Development$/i })).not.toBeInTheDocument();
    expect(within(panel).queryByRole("link", { name: /^See overview$/i })).not.toBeInTheDocument();
  });

  it("navigates to the Services page when the Services nav label is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<div data-testid="home-outlet">Home</div>} />
            <Route path="/services" element={<div data-testid="services-outlet">Services page</div>} />
          </Routes>
        </>
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    await user.click(within(primaryNav).getByRole("link", { name: /^Services$/i }));

    expect(await screen.findByTestId("services-outlet")).toBeInTheDocument();
    expect(screen.queryByTestId("home-outlet")).not.toBeInTheDocument();
  });

  it("matches other primary links when the Services route is active (no extra frame)", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.services]}>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const servicesLink = within(primaryNav).getByRole("link", { name: /^Services$/i });
    const aboutLink = within(primaryNav).getByRole("link", { name: /^About$/i });
    expect(servicesLink).not.toHaveClass("nav-primary-link--hover");

    const servicesStyle = window.getComputedStyle(servicesLink);
    const aboutStyle = window.getComputedStyle(aboutLink);
    expect(servicesStyle.borderTopWidth).toBe(aboutStyle.borderTopWidth);
    expect(servicesStyle.backgroundColor).toBe(aboutStyle.backgroundColor);
  });

  it("opens Work dropdown without navbar pill highlight on hover", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[ROUTES.caseStudies]}>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const workLink = within(primaryNav).getByRole("link", { name: /^Work$/i });

    await user.hover(workLink);
    expect(workLink).toHaveClass("nav-dropdown-trigger--open");
    expect(workLink).not.toHaveClass("nav-primary-link--hover");
    expect(screen.getByTestId("nav-mega-panel-work")).toBeInTheDocument();
  });

  it("opens a full-screen mobile drawer with primary links, CTA, socials, and copyright", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("nav-mobile-accordion")).not.toBeInTheDocument();
    const menuButton = screen.getByTestId(HEADER_MENU_BTN_TESTID);
    expect(menuButton.querySelector("svg")).toBeTruthy();

    await user.click(menuButton);

    const drawer = screen.getByTestId(MOBILE_NAV_DRAWER_TESTID);
    expect(drawer).toHaveClass(MOBILE_NAV_OVERLAY_CLASS);
    expect(drawer.parentElement).toBe(document.body);
    expect(drawer).toHaveAttribute("role", "dialog");
    expect(drawer).toHaveAttribute("aria-modal", "true");
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(document.body).toHaveClass(MOBILE_NAV_BODY_LOCK_CLASS);
    expect(document.body.style.overflow).toBe("hidden");

    expect(within(drawer).getByRole("link", { name: COMMITERS_HEADER_LOGO_ALT })).toHaveAttribute("href", ROUTES.home);
    expect(within(drawer).getByTestId(MOBILE_NAV_CLOSE_BTN_TESTID)).toHaveAttribute("aria-label", "Close menu");

    expect(within(drawer).getByRole("button", { name: /^Products$/i })).toBeInTheDocument();
    expect(within(drawer).getByRole("link", { name: /^Services$/i })).toHaveAttribute("href", ROUTES.services);
    expect(within(drawer).getByRole("link", { name: /^Work$/i })).toHaveAttribute("href", ROUTES.caseStudies);
    expect(within(drawer).getByRole("link", { name: /^About$/i })).toHaveAttribute("href", ROUTES.about);
    expect(within(drawer).getByRole("link", { name: /^Contact$/i })).toHaveAttribute("href", ROUTES.contact);
    expect(within(drawer).getByRole("link", { name: /^Careers$/i })).toHaveAttribute("href", ROUTES.openPositions);
    expect(within(drawer).queryByRole("link", { name: /^Home$/i })).not.toBeInTheDocument();
    expect(within(drawer).queryByRole("link", { name: /^More$/i })).not.toBeInTheDocument();
    expect(within(drawer).queryByRole("link", { name: /^OpsFlow AI$/i })).not.toBeInTheDocument();

    await user.click(within(drawer).getByRole("button", { name: /^Products$/i }));
    expect(within(drawer).getByRole("link", { name: /^OpsFlow AI$/i })).toHaveAttribute("href", ROUTES.opsFlow);
    expect(within(drawer).getByRole("link", { name: /^TrustTap$/i })).toHaveAttribute("href", ROUTES.trustTap);

    expect(within(drawer).getByTestId("nav-start-project-cta-mobile")).toHaveAttribute("href", ROUTES.contact);
    expect(within(drawer).getByTestId("nav-start-project-cta-mobile")).toHaveTextContent("Start Project");
    expect(within(drawer).getByTestId("nav-start-project-cta-mobile")).toHaveClass("nav-mobile-cta");
    expect(within(drawer).getByRole("link", { name: /^LinkedIn$/i })).toHaveAttribute("href", SITE_LINKEDIN_URL);
    expect(within(drawer).getByRole("link", { name: /^WhatsApp$/i })).toHaveAttribute("href", buildWhatsAppUrl());
    expect(within(drawer).getByRole("link", { name: /^GitHub$/i })).toHaveAttribute("href", SITE_GITHUB_URL);
    expect(within(drawer).getByText(MOBILE_NAV_DRAWER_COPYRIGHT)).toBeInTheDocument();
  });

  it("closes the mobile drawer from the close button, Escape, and navigation", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<div data-testid="home-outlet">Home</div>} />
            <Route path={ROUTES.about} element={<div data-testid="about-outlet">About</div>} />
          </Routes>
        </>
      </MemoryRouter>,
    );

    await user.click(screen.getByTestId(HEADER_MENU_BTN_TESTID));
    expect(screen.getByTestId(MOBILE_NAV_DRAWER_TESTID)).toBeInTheDocument();

    await user.click(screen.getByTestId(MOBILE_NAV_CLOSE_BTN_TESTID));
    expect(screen.queryByTestId(MOBILE_NAV_DRAWER_TESTID)).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass(MOBILE_NAV_BODY_LOCK_CLASS);
    expect(document.body.style.overflow).toBe("unset");

    await user.click(screen.getByTestId(HEADER_MENU_BTN_TESTID));
    await user.keyboard("{Escape}");
    expect(screen.queryByTestId(MOBILE_NAV_DRAWER_TESTID)).not.toBeInTheDocument();

    await user.click(screen.getByTestId(HEADER_MENU_BTN_TESTID));
    await user.click(within(screen.getByTestId(MOBILE_NAV_DRAWER_TESTID)).getByRole("link", { name: /^About$/i }));
    expect(await screen.findByTestId("about-outlet")).toBeInTheDocument();
    expect(screen.queryByTestId(MOBILE_NAV_DRAWER_TESTID)).not.toBeInTheDocument();
  });

  it("navigates to the Work page from the primary nav link", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<div data-testid="home-outlet">Home</div>} />
            <Route path={ROUTES.caseStudies} element={<div data-testid="our-work-outlet">Our Work</div>} />
          </Routes>
        </>
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    await user.click(within(primaryNav).getByRole("link", { name: /^Work$/i }));

    expect(await screen.findByTestId("our-work-outlet")).toBeInTheDocument();
    expect(screen.queryByTestId("home-outlet")).not.toBeInTheDocument();
  });

  it("does not highlight Work in the navbar when the case studies route is active", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.caseStudies]}>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const workLink = within(primaryNav).getByRole("link", { name: /^Work$/i });
    expect(workLink).toHaveClass("nav-dropdown-trigger");
    expect(workLink).not.toHaveClass("nav-primary-link--hover");
    expect(workLink).not.toHaveClass("nav-dropdown-trigger--open");
  });

  it("keeps Blog and Careers out of the header so they live in the footer", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    expect(within(primaryNav).queryByRole("link", { name: /^More$/i })).not.toBeInTheDocument();
    expect(within(primaryNav).queryByRole("link", { name: /^Careers$/i })).not.toBeInTheDocument();
    expect(within(primaryNav).queryByRole("link", { name: /^Home$/i })).not.toBeInTheDocument();
    expect(screen.queryByTestId("nav-mega-panel-more")).not.toBeInTheDocument();
  });

  it("opens Products, About, and Work as stacked card dropdowns with descriptions", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });

    await user.hover(within(primaryNav).getByRole("link", { name: /^Products$/i }));
    const productsPanel = screen.getByTestId("nav-mega-panel-products");
    expect(productsPanel).toHaveClass("nav-item-dropdown-panel--cards", NAV_DROPDOWN_PANEL_GLASS_CLASS);
    expect(within(productsPanel).getByRole("menuitem", { name: /^TrustTap/i })).toHaveAttribute("href", ROUTES.trustTap);
    expect(within(productsPanel).getByRole("menuitem", { name: /OpsFlow AI/i })).toHaveAttribute("href", ROUTES.opsFlow);

    await user.hover(within(primaryNav).getByRole("link", { name: /^About$/i }));
    const aboutPanel = screen.getByTestId("nav-mega-panel-about");
    expect(aboutPanel).toHaveClass("nav-item-dropdown-panel--cards", NAV_DROPDOWN_PANEL_GLASS_CLASS);
    expect(within(aboutPanel).getByRole("menuitem", { name: /Company Overview/i })).toHaveAttribute("href", ROUTES.about);
    expect(within(aboutPanel).getByRole("menuitem", { name: /Company Overview/i })).toHaveClass("nav-dropdown-link--stacked");
    expect(within(aboutPanel).getByText(/Learn about Commiters, our background/i)).toBeInTheDocument();

    await user.hover(within(primaryNav).getByRole("link", { name: /^Work$/i }));
    const workPanel = screen.getByTestId("nav-mega-panel-work");
    expect(workPanel).toHaveClass("nav-item-dropdown-panel--cards", NAV_DROPDOWN_PANEL_GLASS_CLASS);
    expect(within(workPanel).getByRole("menuitem", { name: /Case Studies/i })).toHaveAttribute("href", ROUTES.caseStudies);
    expect(within(workPanel).getByRole("menuitem", { name: /Browse My Vacations/i })).toHaveAttribute(
      "href",
      ROUTES.browseMyVacationCaseStudy,
    );
    expect(within(workPanel).getByRole("menuitem", { name: /Client Stories/i })).toHaveAttribute("href", ROUTES.testimonials);
  });

  it("defines dropdown configs for every desktop nav item", () => {
    expect(NAV_DROPDOWN_CONFIGS.map((config) => config.id)).toEqual(["products", "services", "work", "about"]);
    expect(NAV_DROPDOWN_CONFIGS.find((config) => config.id === "products")?.links.map((link) => link.label)).toEqual([
      "TrustTap",
      "OpsFlow AI",
    ]);
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "Join Us")).toBe(false);
  });
});
