import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  MENU_SECTION_LINKS,
  NAV_DROPDOWN_CONFIGS,
  NAV_DROPDOWN_LINK_ACTIVE_CLASS,
  NAV_DROPDOWN_PANEL_GLASS_CLASS,
  PRIMARY_NAV_ITEMS,
  SERVICE_NAV_ENTRIES,
  SERVICE_NAV_GROUPS,
  buildAboutSectionHref,
  buildServiceSectionHref,
  buildServiceSectionLocation,
  flattenNavDropdownLinks,
  isNavDropdownActive,
  partitionHeaderNavItems,
  resolveActiveServiceSectionId,
  resolveNavDropdownConfigs,
  resolveDesktopHeaderNav,
} from "./navSections";

describe("navSections", () => {
  it("lists compact primary nav items focused on products, services, work, and about", () => {
    expect(PRIMARY_NAV_ITEMS.map((item) => item.label)).toEqual(["Products", "Services", "Work", "About"]);
    expect(PRIMARY_NAV_ITEMS.map((item) => item.to)).toEqual([
      ROUTES.trustTap,
      ROUTES.services,
      ROUTES.caseStudies,
      ROUTES.about,
    ]);
    const productsIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "products");
    const servicesIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "services");
    const workIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "work");
    const aboutIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "about");
    expect(productsIndex).toBe(0);
    expect(servicesIndex).toBeGreaterThan(productsIndex);
    expect(workIndex).toBeGreaterThan(servicesIndex);
    expect(aboutIndex).toBeGreaterThan(workIndex);
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "Home")).toBe(false);
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "Careers")).toBe(false);
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "More")).toBe(false);
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "Join Us")).toBe(false);
    expect(PRIMARY_NAV_ITEMS.some((item) => item.id === "testimonials")).toBe(false);
  });

  it("structures the Services mega-menu into four categories with descriptions", () => {
    expect(SERVICE_NAV_GROUPS.map((group) => group.label)).toEqual([
      "AI Operational Engineering",
      "Custom Web & Platform Engineering",
      "Strategic Diagnostic & Product Studio",
      "Free Business Utilities",
    ]);
    expect(
      SERVICE_NAV_GROUPS.flatMap((group) =>
        group.links.map((link) => ({ id: link.id, to: link.to, featured: Boolean(link.featured) })),
      ),
    ).toEqual([
      { id: "ai-solutions", to: "/services/ai-solutions", featured: false },
      { id: "workflow-automation", to: "/services/workflow-automation", featured: false },
      { id: "web-applications", to: "/services/web-applications", featured: false },
      { id: "marketplace-platforms", to: "/services/marketplace-platforms", featured: false },
      { id: "ai-operational-audit", to: "/services/ai-operational-audit", featured: true },
      { id: "mvp-development", to: "/services/mvp-development", featured: false },
      { id: "opsflow-playground", to: "/opsflow", featured: false },
    ]);
    expect(SERVICE_NAV_GROUPS.find((group) => group.id === "ai-operational-engineering")?.links[0]?.description).toMatch(
      /Vertex AI/i,
    );
    expect(SERVICE_NAV_GROUPS.find((group) => group.id === "strategic-diagnostic-product-studio")?.links[0]?.label).toBe(
      "AI Operational Audit (Featured)",
    );
    expect(SERVICE_NAV_GROUPS.find((group) => group.id === "custom-web-platform-engineering")?.links[1]?.label).toBe(
      "E-commerce & Marketplace Engines",
    );
    expect(NAV_DROPDOWN_CONFIGS.every((config) => flattenNavDropdownLinks(config).every((link) => Boolean(link.description)))).toBe(
      true,
    );
    expect(flattenNavDropdownLinks(NAV_DROPDOWN_CONFIGS.find((config) => config.id === "services")!)).toHaveLength(7);
  });

  it("builds stable service section URLs for Services page anchors", () => {
    expect(buildServiceSectionHref("website-development")).toBe(`${ROUTES.services}#website-development`);
    expect(buildServiceSectionLocation("website-development")).toEqual({
      pathname: ROUTES.services,
      hash: "#website-development",
    });
    expect(SERVICE_NAV_ENTRIES.map((e) => e.id)).toEqual([
      "website-development",
      "web-applications",
      "mobile-applications",
      "e-commerce-development",
      "ai-integration",
      "automation-tools",
      "mvp-development",
    ]);
  });

  it("lists dropdown section links derived from nav mega-menu configs", () => {
    expect(MENU_SECTION_LINKS.length).toBeGreaterThan(10);
    expect(MENU_SECTION_LINKS.some((link) => link.label === "TrustTap" && link.to === ROUTES.trustTap)).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.label === "OpsFlow AI" && link.to === ROUTES.opsFlow)).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.label === "Company Overview" && link.to === ROUTES.about)).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildAboutSectionHref("principles"))).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildAboutSectionHref("how-we-work"))).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.label === "Generative AI & LLM Solutions")).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.to === "/services/ai-solutions")).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.label === "Case Studies" && link.to === ROUTES.caseStudies)).toBe(true);
    expect(
      MENU_SECTION_LINKS.some((link) => link.label === "Browse My Vacations" && link.to === ROUTES.browseMyVacationCaseStudy),
    ).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.label === "Client Stories" && link.to === ROUTES.testimonials)).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.label === "OpsFlow AI Playground" && link.to === ROUTES.opsFlowPlayground)).toBe(
      true,
    );
  });

  it("builds desktop dropdown configs from primary nav items", () => {
    const configs = resolveNavDropdownConfigs();
    expect(configs.map((config) => config.label)).toEqual(["Products", "Services", "Work", "About"]);
    expect(configs.find((config) => config.id === "services")?.groups?.map((group) => group.label)).toEqual([
      "AI Operational Engineering",
      "Custom Web & Platform Engineering",
      "Strategic Diagnostic & Product Studio",
      "Free Business Utilities",
    ]);
    expect(configs.find((config) => config.id === "services")?.links.map((link) => ({ label: link.label, to: link.to }))).toEqual([
      { label: "Generative AI & LLM Solutions", to: "/services/ai-solutions" },
      { label: "Workflow & Process Automation", to: "/services/workflow-automation" },
      { label: "Custom Web Applications", to: "/services/web-applications" },
      { label: "E-commerce & Marketplace Engines", to: "/services/marketplace-platforms" },
      { label: "AI Operational Audit (Featured)", to: "/services/ai-operational-audit" },
      { label: "MVP & SaaS Development", to: "/services/mvp-development" },
      { label: "OpsFlow AI Playground", to: "/opsflow" },
    ]);
  });

  it("keeps the desktop header to Products, Services, Work, and About dropdowns", () => {
    const entries = resolveDesktopHeaderNav();
    expect(entries.map((entry) => (entry.kind === "link" ? entry.item.label : entry.config.label))).toEqual([
      "Products",
      "Services",
      "Work",
      "About",
    ]);
    expect(entries.every((entry) => entry.kind === "dropdown")).toBe(true);
    const products = entries.find((entry) => entry.kind === "dropdown" && entry.config.id === "products");
    expect(products?.kind === "dropdown" ? products.config.overviewTo : undefined).toBe(ROUTES.trustTap);
  });

  it("defines stacked card dropdowns for About, Work, and Products", () => {
    const about = NAV_DROPDOWN_CONFIGS.find((config) => config.id === "about")!;
    const work = NAV_DROPDOWN_CONFIGS.find((config) => config.id === "work")!;
    const products = NAV_DROPDOWN_CONFIGS.find((config) => config.id === "products")!;

    expect(about.links.map((link) => ({ label: link.label, to: link.to }))).toEqual([
      { label: "Company Overview", to: ROUTES.about },
      { label: "Principles & Core Pillars", to: buildAboutSectionHref("principles") },
      { label: "How We Work", to: buildAboutSectionHref("how-we-work") },
    ]);
    expect(work.links.map((link) => ({ label: link.label, to: link.to }))).toEqual([
      { label: "Case Studies", to: ROUTES.caseStudies },
      { label: "Browse My Vacations", to: ROUTES.browseMyVacationCaseStudy },
      { label: "Client Stories", to: ROUTES.testimonials },
    ]);
    expect(products.links.map((link) => ({ label: link.label, to: link.to }))).toEqual([
      { label: "TrustTap", to: ROUTES.trustTap },
      { label: "OpsFlow AI", to: ROUTES.opsFlow },
    ]);
    expect([about, work, products].every((config) => config.links.every((link) => Boolean(link.description)))).toBe(true);
  });

  it("marks dropdown parents active for nested routes and section links", () => {
    const services = NAV_DROPDOWN_CONFIGS.find((config) => config.id === "services");
    expect(services).toBeTruthy();
    expect(isNavDropdownActive(services!, "/services/ai-solutions")).toBe(true);
    expect(isNavDropdownActive(services!, "/opsflow")).toBe(true);
    expect(isNavDropdownActive(services!, "/about")).toBe(false);
  });

  it("resolves the active service section only on /services with a known hash", () => {
    expect(resolveActiveServiceSectionId(ROUTES.services, "#automation-tools")).toBe("automation-tools");
    expect(resolveActiveServiceSectionId(ROUTES.services, "")).toBeNull();
    expect(resolveActiveServiceSectionId(ROUTES.home, "#automation-tools")).toBeNull();
    expect(resolveActiveServiceSectionId(ROUTES.services, "#unknown")).toBeNull();
  });

  it("exports the active dropdown link class for hover-matched highlighting", () => {
    expect(NAV_DROPDOWN_LINK_ACTIVE_CLASS).toBe("nav-dropdown-link--active");
    expect(NAV_DROPDOWN_PANEL_GLASS_CLASS).toBe("nav-item-dropdown-panel--glass");
  });

  it("partitions desktop header links into the compact conversion bar", () => {
    const groups = partitionHeaderNavItems(PRIMARY_NAV_ITEMS);

    expect(groups.bar.map((item) => item.label)).toEqual(["Products", "Services", "Work", "About"]);
    expect(groups.more.map((item) => item.label)).toEqual([]);
    expect(groups.mobile.map((item) => item.label)).toEqual(PRIMARY_NAV_ITEMS.map((item) => item.label));
  });
});
