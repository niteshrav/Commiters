import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { BRAND_LOGO_HEADER_HEIGHT_PX } from "../lib/brandDisplay";
import {
  NAV_CTA_LABEL,
  NAV_CTA_TO,
  NAV_DROPDOWN_CONFIGS,
  NAV_DROPDOWN_ITEM_ACCENT_CLASS,
  NAV_DROPDOWN_ITEM_BADGE_CLASS,
  NAV_DROPDOWN_ITEM_CLASS,
  NAV_DROPDOWN_ITEM_DESC_CLASS,
  NAV_DROPDOWN_ITEM_TITLE_CLASS,
  NAV_DROPDOWN_PANEL_MD_CLASS,
  NAV_DROPDOWN_PANEL_MD_PAD_CLASS,
  NAV_DROPDOWN_PANEL_SURFACE_CLASSES,
  NAV_DROPDOWN_PANEL_WIDE_CLASS,
  OPSFLOW_MEGA_CARDS,
  TRUSTTAP_MEGA_CARDS,
  PRIMARY_NAV_ITEMS,
  SERVICE_MEGA_CARDS,
  resolveNavDropdownConfigs,
} from "../lib/navSections";
import { afterEach, vi } from "vitest";
import TrustTapPage from "../pages/TrustTapPage";
import { COMMITERS_HEADER_LOGO_ALT, COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";
import {
  HEADER_DRAWER_OPEN_CLASS,
  HEADER_MENU_BTN_TESTID,
  HEADER_MENU_CLOSE_LABEL,
  HEADER_MENU_OPEN_LABEL,
  MOBILE_NAV_BODY_LOCK_CLASS,
  MOBILE_NAV_DRAWER_CLASS,
  MOBILE_NAV_DRAWER_COPYRIGHT,
  MOBILE_NAV_DRAWER_TESTID,
  MOBILE_NAV_OVERLAY_CLASS,
} from "../lib/mobileNavDrawer";
import { SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL } from "../lib/siteLinks";

function desktopNavTriggers(container: HTMLElement) {
  return within(container).getAllByRole("link").filter((link) => link.classList.contains("nav-dropdown-trigger"));
}

function primaryNavLabels(container: HTMLElement) {
  return within(container)
    .getAllByRole("link")
    .filter((link) => link.classList.contains("nav-primary-link"))
    .map((link) => link.textContent?.replace(/\s+/g, " ").trim());
}

describe("Navbar", () => {
  afterEach(() => {
    document.body.classList.remove(MOBILE_NAV_BODY_LOCK_CLASS);
    document.body.style.overflow = "unset";
  });

  it("shows the Commiters header logo and conversion-focused primary nav", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const brandLink = screen.getByRole("link", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(brandLink).toHaveAttribute("href", ROUTES.home);
    expect(brandLink).toHaveClass("brand", "brand-logo-link", "opacity-90", "transition-opacity", "flex", "items-center", "gap-3", "shrink-0", "overflow-visible");
    const banner = screen.getByRole("banner");
    expect(banner).toHaveClass(
      "sticky",
      "top-0",
      "z-50",
      "w-full",
      "border-b",
      "border-slate-200/80",
      "bg-white/90",
      "backdrop-blur-md",
      "transition-all",
      "duration-300",
      "shadow-sm",
    );
    expect(banner).toBeVisible();
    const logo = within(banner).getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(logo).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(logo).toHaveAttribute("height", String(BRAND_LOGO_HEADER_HEIGHT_PX));
    expect(logo).toHaveClass("h-12", "max-h-12");
    expect(within(banner).queryByTestId("brand-tagline")).not.toBeInTheDocument();
    expect(within(banner).queryByTestId("nav-header-badge")).not.toBeInTheDocument();
    expect(banner.querySelector(".header-brand")).toHaveClass("flex", "items-center", "h-full", "overflow-visible");
    expect(screen.queryByText(/^Commiters$/)).not.toBeInTheDocument();

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    expect(primaryNavLabels(primaryNav)).toEqual(["Services", "Work", "About", "trustTap", "OpsFlow AI"]);
    expect(desktopNavTriggers(primaryNav).map((link) => link.textContent?.replace(/\s+/g, " ").trim())).toEqual([
      "Services",
      "Work",
      "About",
      "trustTap",
      "OpsFlow AI",
    ]);
    expect(desktopNavTriggers(primaryNav)[0]).toHaveAttribute("href", ROUTES.services);

    expect(within(primaryNav).getByRole("link", { name: /^trustTap$/i })).toHaveAttribute("data-nav-emphasis", "flagship");
    expect(within(primaryNav).getByRole("link", { name: /^OpsFlow AI$/i })).toHaveAttribute("data-nav-emphasis", "lead-magnet");
    expect(within(primaryNav).getByRole("link", { name: /^trustTap$/i })).toHaveAttribute("href", ROUTES.trustTap);
    expect(within(primaryNav).getByRole("link", { name: /^OpsFlow AI$/i })).toHaveAttribute("href", ROUTES.opsFlow);

    expect(within(primaryNav).queryByRole("link", { name: /^Home$/i })).not.toBeInTheDocument();
    expect(within(primaryNav).queryByRole("link", { name: /^Careers$/i })).not.toBeInTheDocument();
    expect(within(primaryNav).queryByRole("link", { name: /^More$/i })).not.toBeInTheDocument();
    expect(within(primaryNav).queryByRole("link", { name: /^Contact$/i })).not.toBeInTheDocument();
    expect(within(primaryNav).queryByRole("link", { name: /^Products$/i })).not.toBeInTheDocument();
    expect(within(primaryNav).queryByTestId("nav-more-menu")).not.toBeInTheDocument();
    expect(screen.getByTestId(HEADER_MENU_BTN_TESTID)).toHaveAttribute("aria-label", HEADER_MENU_OPEN_LABEL);
    expect(screen.getByTestId(HEADER_MENU_BTN_TESTID)).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId(MOBILE_NAV_DRAWER_TESTID)).not.toBeInTheDocument();
    expect(screen.getByTestId("nav-start-project-cta")).toHaveAttribute("href", NAV_CTA_TO);
    expect(screen.getByTestId("nav-start-project-cta")).toHaveTextContent(NAV_CTA_LABEL);
    expect(screen.getByTestId("nav-start-project-cta")).toHaveClass("btn-primary");
    expect(screen.queryByTestId("nav-start-project-cta-mobile")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Get Started/i })).not.toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveClass("header", "header-light");
  });

  it("opens the Services mega-menu on hover without a chevron", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const configs = resolveNavDropdownConfigs();
    expect(configs).toHaveLength(5);

    for (const config of configs) {
      const trigger = within(primaryNav).getByRole("link", { name: new RegExp(`^${config.label}$`, "i") });
      expect(trigger.querySelector("svg")).toBeNull();

      await user.hover(trigger);

      expect(screen.getByTestId(`nav-mega-panel-${config.id}`)).toBeInTheDocument();
      expect(trigger).toHaveClass("nav-dropdown-trigger--open");
    }
  });

  it("places Services before Work in the primary nav order", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const labels = primaryNavLabels(primaryNav);
    expect(labels.indexOf("Services")).toBeLessThan(labels.indexOf("Work"));
  });

  it("opens a unified Services dropdown of hover cards with icons", async () => {
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
    expect(panel).toHaveAttribute("id", "nav-mega-panel-services");
    expect(servicesTrigger).toHaveAttribute("aria-controls", "nav-mega-panel-services");
    expect(panel).toHaveClass("nav-item-dropdown-panel--wide", NAV_DROPDOWN_PANEL_WIDE_CLASS, ...NAV_DROPDOWN_PANEL_SURFACE_CLASSES);
    expect(panel.style.right).toBe("");

    for (const card of SERVICE_MEGA_CARDS) {
      const item = within(panel).getByRole("menuitem", { name: new RegExp(card.label, "i") });
      expect(item).toHaveAttribute("href", card.to);
      expect(item).toHaveClass(...NAV_DROPDOWN_ITEM_CLASS.split(" "));
      expect(item.querySelector("svg")).toBeTruthy();
      expect(item.querySelector(".nav-dropdown-link-label")).toHaveClass(...NAV_DROPDOWN_ITEM_TITLE_CLASS.split(" "));
      expect(item.querySelector(".nav-dropdown-link-description")).toHaveClass(...NAV_DROPDOWN_ITEM_DESC_CLASS.split(" "));
      expect(item).toHaveTextContent(card.description);
      if (card.badge) {
        const badge = item.querySelector(".nav-dropdown-link-badge");
        expect(badge).toHaveTextContent(card.badge);
        expect(badge).toHaveClass(...NAV_DROPDOWN_ITEM_BADGE_CLASS.split(" "));
      }
      expect(item).not.toHaveClass("nav-dropdown-link--featured");
    }

    expect(within(panel).getByRole("menuitem", { name: /AI Operational Audits/i })).toHaveAttribute("href", ROUTES.audit);
    expect(within(panel).queryByRole("menuitem", { name: /trustTap/i })).not.toBeInTheDocument();
    expect(within(panel).queryByRole("menuitem", { name: /OpsFlow/i })).not.toBeInTheDocument();
    expect(within(panel).queryByRole("menuitem", { name: /^Website Development$/i })).not.toBeInTheDocument();
    expect(within(panel).queryByRole("link", { name: /^See overview$/i })).not.toBeInTheDocument();
  });

  it("opens a compact trustTap product dropdown with on-page section anchors", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    await user.hover(within(primaryNav).getByRole("link", { name: /^trustTap$/i }));

    const panel = screen.getByTestId("nav-mega-panel-trusttap");
    expect(panel).toHaveClass(
      "nav-item-dropdown-panel--md",
      NAV_DROPDOWN_PANEL_MD_CLASS,
      NAV_DROPDOWN_PANEL_MD_PAD_CLASS,
      ...NAV_DROPDOWN_PANEL_SURFACE_CLASSES,
    );

    for (const card of TRUSTTAP_MEGA_CARDS) {
      const item = within(panel).getByRole("menuitem", { name: new RegExp(card.label, "i") });
      expect(item).toHaveAttribute("href", card.to);
      expect(item).toHaveTextContent(card.description);
      expect(item).toHaveClass(...NAV_DROPDOWN_ITEM_CLASS.split(" "));
      expect(item).not.toHaveAttribute("target", "_blank");
    }

    await user.click(within(panel).getByRole("menuitem", { name: /How It Works/i }));
    expect(screen.queryByTestId("nav-mega-panel-trusttap")).not.toBeInTheDocument();
  });

  it("opens a compact OpsFlow AI dropdown with sandbox, features, and how-it-works anchors", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    await user.hover(within(primaryNav).getByRole("link", { name: /^OpsFlow AI$/i }));

    const panel = screen.getByTestId("nav-mega-panel-opsflow");
    expect(panel).toHaveClass(
      "nav-item-dropdown-panel--md",
      NAV_DROPDOWN_PANEL_MD_CLASS,
      NAV_DROPDOWN_PANEL_MD_PAD_CLASS,
      ...NAV_DROPDOWN_PANEL_SURFACE_CLASSES,
    );

    for (const card of OPSFLOW_MEGA_CARDS) {
      const item = within(panel).getByRole("menuitem", { name: new RegExp(card.label, "i") });
      expect(item).toHaveAttribute("href", card.to);
      expect(item).toHaveTextContent(card.description);
      if (card.accent === "blue") {
        expect(item).toHaveClass(...NAV_DROPDOWN_ITEM_ACCENT_CLASS.split(" "));
        expect(within(item).getByText(card.badge ?? "")).toHaveClass(...NAV_DROPDOWN_ITEM_BADGE_CLASS.split(" "));
      } else {
        expect(item).toHaveClass(...NAV_DROPDOWN_ITEM_CLASS.split(" "));
      }
    }

    await user.click(within(panel).getByRole("menuitem", { name: /Try Free Sandbox/i }));
    expect(screen.queryByTestId("nav-mega-panel-opsflow")).not.toBeInTheDocument();
  });

  it("keeps the sticky site header visible on landing hashes", () => {
    const hashes = [
      `${ROUTES.about}#our-values`,
      `${ROUTES.trustTap}#how-it-works`,
      `${ROUTES.opsFlow}#sandbox`,
    ];

    for (const entry of hashes) {
      const { unmount } = render(
        <MemoryRouter initialEntries={[entry]}>
          <Navbar />
        </MemoryRouter>,
      );

      const header = document.querySelector("header");
      expect(header).toBeVisible();
      expect(header).toHaveClass("sticky", "top-0", "z-50");
      unmount();
    }
  });

  it("keeps trustTap dropdown hashes on the product page", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[ROUTES.trustTap]}>
        <Navbar />
        <TrustTapPage />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    await user.hover(within(primaryNav).getByRole("link", { name: /^trustTap$/i }));
    await user.click(within(screen.getByTestId("nav-mega-panel-trusttap")).getByRole("menuitem", { name: /How It Works/i }));

    expect(screen.getByTestId("trusttap-page")).toBeInTheDocument();
    expect(document.getElementById("how-it-works")).toBe(screen.getByTestId("trusttap-how-it-works"));
    expect(document.getElementById("how-it-works")?.className).not.toMatch(/scroll-mt-/);
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

  it("opens the Work mega-menu on hover", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[ROUTES.caseStudies]}>
        <Navbar />
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    const workLink = within(primaryNav).getByRole("link", { name: /^Work$/i });

    expect(screen.queryByTestId("nav-mega-panel-work")).not.toBeInTheDocument();
    await user.hover(workLink);
    expect(workLink).toHaveClass("nav-dropdown-trigger", "nav-dropdown-trigger--open");
    expect(screen.getByTestId("nav-mega-panel-work")).toBeInTheDocument();
  });

  it("opens a header-locked sheet with accordion Services menu, CTA, socials, and copyright", async () => {
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
    const banner = screen.getByRole("banner");
    expect(banner).toHaveClass(HEADER_DRAWER_OPEN_CLASS);
    expect(drawer).toHaveClass(MOBILE_NAV_DRAWER_CLASS);
    expect(drawer).not.toHaveClass("p-6");
    expect(drawer).not.toHaveClass(MOBILE_NAV_OVERLAY_CLASS);
    expect(drawer.parentElement).toHaveClass(MOBILE_NAV_OVERLAY_CLASS);
    expect(drawer.parentElement?.parentElement).toBe(document.body);
    expect(drawer).toHaveAttribute("role", "dialog");
    expect(drawer).toHaveAttribute("aria-modal", "true");
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(menuButton).toHaveAttribute("aria-label", HEADER_MENU_CLOSE_LABEL);
    expect(document.body).toHaveClass(MOBILE_NAV_BODY_LOCK_CLASS);
    expect(document.body.style.overflow).toBe("hidden");

    expect(screen.getAllByRole("link", { name: COMMITERS_HEADER_LOGO_ALT })).toHaveLength(1);
    expect(within(banner).getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT })).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(within(drawer).queryByRole("link", { name: COMMITERS_HEADER_LOGO_ALT })).not.toBeInTheDocument();
    expect(within(drawer).queryByRole("button", { name: HEADER_MENU_CLOSE_LABEL })).not.toBeInTheDocument();

    expect(within(drawer).getByRole("button", { name: /^Services$/i })).toBeInTheDocument();
    expect(within(drawer).getByRole("button", { name: /^About$/i })).toBeInTheDocument();
    expect(within(drawer).getByRole("button", { name: /^Work$/i })).toBeInTheDocument();
    expect(within(drawer).getByRole("button", { name: /^trustTap$/i })).toBeInTheDocument();
    expect(within(drawer).getByRole("button", { name: /^OpsFlow AI$/i })).toBeInTheDocument();
    expect(within(drawer).queryByRole("link", { name: /^About$/i })).not.toBeInTheDocument();
    expect(within(drawer).queryByRole("link", { name: /^Work$/i })).not.toBeInTheDocument();
    expect(within(drawer).queryByRole("link", { name: /^trustTap$/i })).not.toBeInTheDocument();
    expect(within(drawer).queryByRole("link", { name: /^OpsFlow AI$/i })).not.toBeInTheDocument();
    expect(within(drawer).getByRole("link", { name: /^Contact$/i })).toHaveAttribute("href", ROUTES.contact);
    expect(within(drawer).getByRole("link", { name: /^Careers$/i })).toHaveAttribute("href", ROUTES.openPositions);
    expect(within(drawer).queryByRole("link", { name: /^Home$/i })).not.toBeInTheDocument();
    expect(within(drawer).queryByRole("link", { name: /^More$/i })).not.toBeInTheDocument();
    expect(within(drawer).queryByRole("button", { name: /^Products$/i })).not.toBeInTheDocument();

    await user.click(within(drawer).getByRole("button", { name: /^Services$/i }));
    const auditCard = within(drawer).getByRole("link", { name: /AI Operational Audits/i });
    expect(auditCard).toHaveAttribute("href", ROUTES.audit);
    expect(auditCard).toHaveTextContent("48-hour workflow diagnostics, bottleneck elimination, and live automation blueprints.");
    const governedCard = within(drawer).getByRole("link", { name: /Governed AI & Workflow Systems/i });
    expect(governedCard).toHaveAttribute("href", ROUTES.aiSolutionsShort);
    expect(governedCard).toHaveTextContent("Custom pipelines, policy gateways, and enterprise AI workflows.");
    const automationCard = within(drawer).getByRole("link", { name: /Automation & Integration Tools/i });
    expect(automationCard).toHaveAttribute("href", `${ROUTES.services}#engineering-capabilities`);
    expect(automationCard).toHaveTextContent("API integrations, document processing, and operational workflow tools.");

    expect(within(drawer).getByTestId("nav-start-project-cta-mobile")).toHaveAttribute("href", NAV_CTA_TO);
    expect(within(drawer).getByTestId("nav-start-project-cta-mobile")).toHaveTextContent(NAV_CTA_LABEL);
    expect(within(drawer).getByTestId("nav-start-project-cta-mobile")).toHaveClass("nav-mobile-cta", "btn-primary");
    expect(within(drawer).getByRole("link", { name: /^LinkedIn$/i })).toHaveAttribute("href", SITE_LINKEDIN_URL);
    expect(within(drawer).getByRole("link", { name: /^Instagram$/i })).toHaveAttribute("href", SITE_INSTAGRAM_URL);
    expect(within(drawer).queryByRole("link", { name: /^YouTube$/i })).not.toBeInTheDocument();
    expect(within(drawer).getByRole("link", { name: /^GitHub$/i })).toHaveAttribute("href", SITE_GITHUB_URL);
    expect(within(drawer).queryByRole("link", { name: /^Twitter$/i })).not.toBeInTheDocument();
    expect(within(drawer).getByText(MOBILE_NAV_DRAWER_COPYRIGHT)).toBeInTheDocument();
  });

  it("closes the mobile sheet from the header toggle, Escape, and navigation", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<div data-testid="home-outlet">Home</div>} />
            <Route path={ROUTES.contact} element={<div data-testid="contact-outlet">Contact</div>} />
          </Routes>
        </>
      </MemoryRouter>,
    );

    const menuButton = screen.getByTestId(HEADER_MENU_BTN_TESTID);
    await user.click(menuButton);
    expect(screen.getByTestId(MOBILE_NAV_DRAWER_TESTID)).toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-label", HEADER_MENU_CLOSE_LABEL);

    await user.click(menuButton);
    expect(screen.queryByTestId(MOBILE_NAV_DRAWER_TESTID)).not.toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-label", HEADER_MENU_OPEN_LABEL);
    expect(document.body).not.toHaveClass(MOBILE_NAV_BODY_LOCK_CLASS);
    expect(document.body.style.overflow).toBe("unset");

    await user.click(menuButton);
    await user.keyboard("{Escape}");
    expect(screen.queryByTestId(MOBILE_NAV_DRAWER_TESTID)).not.toBeInTheDocument();

    await user.click(menuButton);
    await user.click(within(screen.getByTestId(MOBILE_NAV_DRAWER_TESTID)).getByRole("link", { name: /^Contact$/i }));
    expect(await screen.findByTestId("contact-outlet")).toBeInTheDocument();
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
    expect(workLink).toHaveClass("nav-primary-link", "nav-dropdown-trigger");
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

  it("closes open dropdowns when the route hash changes", async () => {
    function HashChanger() {
      const navigate = useNavigate();
      return (
        <button type="button" onClick={() => navigate(`${ROUTES.services}#automation`)}>
          change hash
        </button>
      );
    }

    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <>
          <Navbar />
          <HashChanger />
        </>
      </MemoryRouter>,
    );

    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    await user.hover(within(primaryNav).getByRole("link", { name: /^Services$/i }));
    expect(screen.getByTestId("nav-mega-panel-services")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /change hash/i }));
    expect(screen.queryByTestId("nav-mega-panel-services")).not.toBeInTheDocument();
  });

  it("defines mega-menu dropdowns for every desktop bar item", () => {
    expect(NAV_DROPDOWN_CONFIGS.map((config) => config.id)).toEqual([
      "services",
      "work",
      "about",
      "trusttap",
      "opsflow",
    ]);
    expect(NAV_DROPDOWN_CONFIGS[0]?.links.map((link) => link.label)).toEqual(SERVICE_MEGA_CARDS.map((card) => card.label));
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "Join Us")).toBe(false);
  });
});
