import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { BRAND_LOGO_HEADER_HEIGHT_PX } from "../lib/brandDisplay";
import {
  NAV_DROPDOWN_CONFIGS,
  PRIMARY_NAV_ITEMS,
  buildServiceDetailMenuHref,
  resolveNavDropdownConfigs,
} from "../lib/navSections";
import { COMMITERS_HEADER_LOGO_ALT, COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";

function desktopNavTriggers(container: HTMLElement) {
  return within(container).getAllByRole("link").filter((link) => link.classList.contains("nav-dropdown-trigger"));
}

describe("Navbar", () => {
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

    expect(within(primaryNav).queryByTestId("nav-more-menu")).not.toBeInTheDocument();
    expect(screen.queryByTestId("header-menu-btn")).not.toBeInTheDocument();
    expect(screen.getByTestId("nav-start-project-cta")).toHaveAttribute("href", ROUTES.contact);
    expect(screen.getByTestId("nav-start-project-cta")).toHaveTextContent("Start Project");
    expect(screen.queryByRole("link", { name: /Get Started/i })).not.toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveClass("header", "header-light");
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

  it("opens a services mega-menu panel on hover with service detail links", async () => {
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
    expect(panel).toBeInTheDocument();
    expect(within(panel).getByRole("menuitem", { name: /^Website Development$/i })).toHaveAttribute(
      "href",
      buildServiceDetailMenuHref("website-development"),
    );
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
    const contactLink = within(primaryNav).getByRole("link", { name: /^Contact$/i });
    expect(servicesLink).not.toHaveClass("nav-primary-link--hover");

    const servicesStyle = window.getComputedStyle(servicesLink);
    const contactStyle = window.getComputedStyle(contactLink);
    expect(servicesStyle.borderTopWidth).toBe(contactStyle.borderTopWidth);
    expect(servicesStyle.backgroundColor).toBe(contactStyle.backgroundColor);
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

  it("exposes mobile accordion groups with section links", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const accordion = screen.getByTestId("nav-mobile-accordion");
    expect(within(accordion).getByTestId("nav-mobile-group-services")).toBeInTheDocument();

    await user.click(within(accordion).getByRole("button", { name: /^Services$/i }));
    expect(within(accordion).getByRole("link", { name: /^Website Development$/i })).toHaveAttribute(
      "href",
      buildServiceDetailMenuHref("website-development"),
    );
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

  it("shows Blog inside the Contact dropdown panel", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<div data-testid="home-outlet">Home</div>} />
            <Route path={ROUTES.technicalLedger} element={<div data-testid="technical-ledger-outlet">Blog</div>} />
          </Routes>
        </>
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    await user.hover(within(primaryNav).getByRole("link", { name: /^Contact$/i }));
    await user.click(within(screen.getByTestId("nav-mega-panel-contact")).getByRole("menuitem", { name: /^Blog$/i }));

    expect(await screen.findByTestId("technical-ledger-outlet")).toBeInTheDocument();
    expect(screen.queryByTestId("home-outlet")).not.toBeInTheDocument();
  });

  it("defines dropdown configs for every desktop nav item", () => {
    expect(NAV_DROPDOWN_CONFIGS.map((config) => config.id)).toEqual([
      "home",
      "about",
      "services",
      "work",
      "trusttap",
      "careers",
      "contact",
    ]);
    expect(NAV_DROPDOWN_CONFIGS.find((config) => config.id === "trusttap")?.links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Features" }),
        expect.objectContaining({ label: "How It Works" }),
      ]),
    );
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "Join Us")).toBe(false);
  });
});
