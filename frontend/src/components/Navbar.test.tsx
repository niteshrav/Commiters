import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { BRAND_LOGO_HEADER_HEIGHT_PX } from "../lib/brandDisplay";
import { PRIMARY_NAV_ITEMS } from "../lib/navSections";
import { COMMITERS_HEADER_LOGO_ALT, COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";

function primaryNavLinks(container: HTMLElement) {
  return within(container).getAllByRole("link").filter((link) => link.classList.contains("nav-primary-link"));
}

describe("Navbar", () => {
  it("shows the Commiters header logo and flat primary nav links without a Services dropdown", () => {
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
    const links = primaryNavLinks(primaryNav);
    expect(links.map((link) => link.textContent)).toEqual(PRIMARY_NAV_ITEMS.map((item) => item.label));
    expect(links.map((link) => link.getAttribute("href"))).toEqual(PRIMARY_NAV_ITEMS.map((item) => item.to));

    const servicesNav = within(primaryNav).getByRole("link", { name: /^Services$/i });
    expect(servicesNav).toHaveClass("nav-primary-link");
    expect(servicesNav).not.toHaveClass("nav-dropdown-trigger");
    expect(within(primaryNav).queryByTestId("nav-services-menu")).not.toBeInTheDocument();
    expect(within(primaryNav).queryByRole("menu")).not.toBeInTheDocument();
    expect(within(primaryNav).queryByRole("menuitem")).not.toBeInTheDocument();

    expect(within(primaryNav).getByRole("link", { name: /^Our Work$/i })).toHaveAttribute("href", ROUTES.caseStudies);
    expect(within(primaryNav).getByRole("link", { name: /^Technical Ledger$/i })).toHaveAttribute(
      "href",
      ROUTES.technicalLedger,
    );
    expect(within(primaryNav).getByRole("link", { name: /^Contact$/i })).toHaveAttribute("href", ROUTES.contact);
    expect(within(primaryNav).queryByRole("button", { name: /^Inquiry$/i })).not.toBeInTheDocument();
    expect(screen.getByTestId("nav-start-project-cta")).toHaveAttribute("href", ROUTES.contact);
    expect(screen.getByTestId("nav-start-project-cta")).toHaveTextContent("Start Project");
    expect(screen.queryByRole("link", { name: /Get Started/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Softwares/i)).not.toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveClass("header", "header-light");
  });

  it("places Services before Our Work in the primary nav order", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const labels = primaryNavLinks(primaryNav).map((link) => link.textContent);
    expect(labels.indexOf("Services")).toBeLessThan(labels.indexOf("Our Work"));
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
    expect(servicesLink).toHaveClass("nav-primary-link", "active");

    const servicesStyle = window.getComputedStyle(servicesLink);
    const contactStyle = window.getComputedStyle(contactLink);
    expect(servicesStyle.borderTopWidth).toBe(contactStyle.borderTopWidth);
    expect(servicesStyle.backgroundColor).toBe(contactStyle.backgroundColor);
  });

  it("applies visual hover only while the pointer is over the link", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const home = within(primaryNav).getByRole("link", { name: /^Home$/i });
    expect(home).not.toHaveClass("nav-primary-link--hover");

    await user.hover(home);
    expect(home).toHaveClass("nav-primary-link--hover");

    await user.unhover(home);
    expect(home).not.toHaveClass("nav-primary-link--hover");
  });

  it("navigates directly to the Services page from mobile nav without opening a submenu", async () => {
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

    await user.click(screen.getByRole("button", { name: /^Menu$/i }));
    const mobileNav = screen.getByTestId("mobile-nav-inner");
    expect(within(mobileNav).queryByTestId("nav-services-menu")).not.toBeInTheDocument();

    await user.click(within(mobileNav).getByRole("link", { name: /^Services$/i }));
    expect(await screen.findByTestId("services-outlet")).toBeInTheDocument();
    expect(within(mobileNav).queryByTestId("nav-services-menu")).not.toBeInTheDocument();
  });

  it("navigates to the Our Work page from the primary nav link", async () => {
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
    await user.click(within(primaryNav).getByRole("link", { name: /^Our Work$/i }));

    expect(await screen.findByTestId("our-work-outlet")).toBeInTheDocument();
    expect(screen.queryByTestId("home-outlet")).not.toBeInTheDocument();
  });

  it("highlights Our Work when the case studies route is active", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.caseStudies]}>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    expect(within(primaryNav).getByRole("link", { name: /^Our Work$/i })).toHaveClass("nav-primary-link", "active");
  });

  it("navigates to the Technical Ledger page from the primary nav link", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<div data-testid="home-outlet">Home</div>} />
            <Route
              path={ROUTES.technicalLedger}
              element={<div data-testid="technical-ledger-outlet">Technical Ledger</div>}
            />
          </Routes>
        </>
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    await user.click(within(primaryNav).getByRole("link", { name: /^Technical Ledger$/i }));

    expect(await screen.findByTestId("technical-ledger-outlet")).toBeInTheDocument();
    expect(screen.queryByTestId("home-outlet")).not.toBeInTheDocument();
  });

  it("highlights Technical Ledger when the technical ledger route is active", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.technicalLedger]}>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    expect(within(primaryNav).getByRole("link", { name: /^Technical Ledger$/i })).toHaveClass(
      "nav-primary-link",
      "active",
    );
  });

  it("opens the mobile navigation menu from the Menu button", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /^Menu$/i });
    const mobileNav = document.getElementById("mobile-nav");
    expect(mobileNav).not.toHaveClass("open");

    await user.click(menuButton);
    expect(mobileNav).toHaveClass("open");
    expect(screen.getByTestId("mobile-nav-inner")).toBeInTheDocument();
    expect(screen.getByTestId("nav-start-project-cta-mobile")).toHaveAttribute("href", ROUTES.contact);

    await user.click(menuButton);
    expect(mobileNav).not.toHaveClass("open");
  });
});
