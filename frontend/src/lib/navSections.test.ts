import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  MENU_SECTION_LINKS,
  NAV_DROPDOWN_CONFIGS,
  NAV_DROPDOWN_LINK_ACTIVE_CLASS,
  PRIMARY_NAV_ITEMS,
  SERVICE_NAV_ENTRIES,
  buildAboutSectionHref,
  buildHomeSectionHref,
  buildServiceDetailMenuHref,
  buildServiceSectionHref,
  buildServiceSectionLocation,
  buildTrustTapSectionHref,
  isNavDropdownActive,
  partitionHeaderNavItems,
  resolveActiveServiceSectionId,
  resolveNavDropdownConfigs,
  resolveDesktopHeaderNav,
} from "./navSections";

describe("navSections", () => {
  it("lists primary nav items with TrustTap, Work, Blog, and Careers without a separate Join Us link", () => {
    expect(PRIMARY_NAV_ITEMS.map((item) => item.label)).toEqual([
      "Home",
      "About",
      "Services",
      "Work",
      "TrustTap",
      "Testimonials",
      "Blog",
      "FAQ",
      "Careers",
      "Contact",
      "More",
    ]);
    expect(PRIMARY_NAV_ITEMS.map((item) => item.to)).toEqual([
      ROUTES.home,
      ROUTES.about,
      ROUTES.services,
      ROUTES.caseStudies,
      ROUTES.trustTap,
      ROUTES.testimonials,
      ROUTES.technicalLedger,
      ROUTES.faq,
      ROUTES.openPositions,
      ROUTES.contact,
      ROUTES.testimonials,
    ]);
    const servicesIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "services");
    const workIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "work");
    const trustTapIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "trusttap");
    const testimonialsIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "testimonials");
    const blogIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "blog");
    const faqIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "faq");
    const careersIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "careers");
    expect(servicesIndex).toBeGreaterThan(-1);
    expect(workIndex).toBeGreaterThan(servicesIndex);
    expect(trustTapIndex).toBeGreaterThan(workIndex);
    expect(testimonialsIndex).toBeGreaterThan(trustTapIndex);
    expect(blogIndex).toBeGreaterThan(testimonialsIndex);
    expect(faqIndex).toBeGreaterThan(blogIndex);
    expect(careersIndex).toBeGreaterThan(faqIndex);
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "Join Us")).toBe(false);
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
    expect(MENU_SECTION_LINKS.some((link) => link.label === "Core Pillars")).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildHomeSectionHref("core-pillars"))).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildAboutSectionHref("vision"))).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildServiceSectionHref("how-we-work"))).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildServiceDetailMenuHref("website-development"))).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildTrustTapSectionHref("trusttap-features"))).toBe(true);
  });

  it("builds desktop dropdown configs from primary nav items", () => {
    const configs = resolveNavDropdownConfigs();
    expect(configs.map((config) => config.label)).toEqual([
      "Home",
      "About",
      "Services",
      "Work",
      "TrustTap",
      "More",
    ]);
    expect(configs.find((config) => config.id === "services")?.links.map((link) => link.label)).toEqual([
      "How We Work",
      ...SERVICE_NAV_ENTRIES.map((entry) => entry.label),
    ]);
  });

  it("keeps Careers and Contact as plain header links without dropdown panels", () => {
    const entries = resolveDesktopHeaderNav();
    expect(entries.map((entry) => (entry.kind === "link" ? entry.item.label : entry.config.label))).toEqual([
      "Home",
      "About",
      "Services",
      "Work",
      "TrustTap",
      "Careers",
      "Contact",
      "More",
    ]);
    expect(entries.find((entry) => entry.kind === "link" && entry.item.id === "careers")?.item.to).toBe(
      ROUTES.openPositions,
    );
    expect(entries.find((entry) => entry.kind === "link" && entry.item.id === "contact")?.item.to).toBe(
      ROUTES.contact,
    );
  });

  it("marks dropdown parents active for nested routes and section links", () => {
    const services = NAV_DROPDOWN_CONFIGS.find((config) => config.id === "services");
    expect(services).toBeTruthy();
    expect(isNavDropdownActive(services!, "/services/website-development")).toBe(true);
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
  });

  it("partitions desktop header links into a compact bar, More menu, and full mobile list", () => {
    const groups = partitionHeaderNavItems(PRIMARY_NAV_ITEMS);

    expect(groups.bar.map((item) => item.label)).toEqual([
      "Home",
      "About",
      "Services",
      "Work",
      "TrustTap",
      "Careers",
      "Contact",
      "More",
    ]);
    expect(groups.more.map((item) => item.label)).toEqual(["Testimonials", "Blog", "FAQ"]);
    expect(groups.mobile.map((item) => item.label)).toEqual(PRIMARY_NAV_ITEMS.map((item) => item.label));
  });
});
