import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  MENU_SECTION_LINKS,
  NAV_CTA_LABEL,
  NAV_CTA_TO,
  NAV_DROPDOWN_CONFIGS,
  NAV_DROPDOWN_LINK_ACTIVE_CLASS,
  NAV_DROPDOWN_PANEL_GLASS_CLASS,
  NAV_MEGA_FROST_CLASSES,
  PRIMARY_NAV_ITEMS,
  SERVICE_MEGA_CARDS,
  SERVICE_NAV_ENTRIES,
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
  it("lists conversion-focused primary links with Services first", () => {
    expect(PRIMARY_NAV_ITEMS.map((item) => item.label)).toEqual([
      "Services",
      "About",
      "Work",
      "TrustTap",
      "OpsFlow AI",
    ]);
    expect(PRIMARY_NAV_ITEMS.map((item) => item.to)).toEqual([
      ROUTES.services,
      ROUTES.about,
      ROUTES.caseStudies,
      ROUTES.trustTap,
      ROUTES.opsFlow,
    ]);
    expect(PRIMARY_NAV_ITEMS.find((item) => item.id === "trusttap")?.emphasis).toBe("flagship");
    expect(PRIMARY_NAV_ITEMS.find((item) => item.id === "opsflow")?.emphasis).toBe("lead-magnet");
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "Products")).toBe(false);
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "Home")).toBe(false);
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "Careers")).toBe(false);
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "More")).toBe(false);
    expect(PRIMARY_NAV_ITEMS.some((item) => item.label === "Join Us")).toBe(false);
    expect(NAV_CTA_LABEL).toBe("Book Operational Audit");
    expect(NAV_CTA_TO).toBe(ROUTES.aiOperationalAudit);
  });

  it("structures the Services mega-menu as four rich cards", () => {
    expect(SERVICE_MEGA_CARDS.map((card) => ({ label: card.label, description: card.description, to: card.to }))).toEqual([
      {
        label: "AI Operational Audits",
        description: "2-week workflow diagnostics & custom automation prototypes.",
        to: ROUTES.aiOperationalAudit,
      },
      {
        label: "Custom AI Pipeline Engineering",
        description: "Bespoke document parsing, LLM integrations & workflow automation.",
        to: ROUTES.aiSolutions,
      },
      {
        label: "Full-Stack B2B Web Applications",
        description: "High-performance web applications built on Vite, Express & React.",
        to: ROUTES.webApplications,
      },
      {
        label: "Free Business Utilities",
        description: "Zero-code tools including OpsFlow AI PDF-to-Excel extraction.",
        to: ROUTES.opsFlowPlayground,
      },
    ]);
    expect(NAV_DROPDOWN_CONFIGS).toHaveLength(1);
    expect(NAV_DROPDOWN_CONFIGS[0]?.layout).toBe("mega");
    expect(NAV_DROPDOWN_CONFIGS.every((config) => flattenNavDropdownLinks(config).every((link) => Boolean(link.description)))).toBe(
      true,
    );
    expect(flattenNavDropdownLinks(NAV_DROPDOWN_CONFIGS.find((config) => config.id === "services")!)).toHaveLength(4);
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

  it("lists dropdown section links from the Services mega-menu only", () => {
    expect(MENU_SECTION_LINKS.map((link) => link.label)).toEqual([
      "AI Operational Audits",
      "Custom AI Pipeline Engineering",
      "Full-Stack B2B Web Applications",
      "Free Business Utilities",
    ]);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildAboutSectionHref("principles"))).toBe(false);
  });

  it("builds desktop dropdown configs from primary nav items", () => {
    const configs = resolveNavDropdownConfigs();
    expect(configs.map((config) => config.label)).toEqual(["Services"]);
    expect(configs.find((config) => config.id === "services")?.links.map((link) => ({ label: link.label, to: link.to }))).toEqual([
      { label: "AI Operational Audits", to: ROUTES.aiOperationalAudit },
      { label: "Custom AI Pipeline Engineering", to: ROUTES.aiSolutions },
      { label: "Full-Stack B2B Web Applications", to: ROUTES.webApplications },
      { label: "Free Business Utilities", to: ROUTES.opsFlowPlayground },
    ]);
  });

  it("keeps a Services dropdown with About, Work, TrustTap, and OpsFlow AI as plain links", () => {
    const entries = resolveDesktopHeaderNav();
    expect(entries.map((entry) => (entry.kind === "link" ? entry.item.label : entry.config.label))).toEqual([
      "Services",
      "About",
      "Work",
      "TrustTap",
      "OpsFlow AI",
    ]);
    expect(entries.filter((entry) => entry.kind === "dropdown")).toHaveLength(1);
    expect(entries[0]).toMatchObject({ kind: "dropdown", config: { id: "services" } });
    expect(entries.slice(1).every((entry) => entry.kind === "link")).toBe(true);
  });

  it("exposes frosted-glass utility classes for the mega-menu panel", () => {
    expect(NAV_DROPDOWN_PANEL_GLASS_CLASS).toBe("nav-item-dropdown-panel--glass");
    expect([...NAV_MEGA_FROST_CLASSES]).toEqual([
      "backdrop-blur-md",
      "bg-white/80",
      "dark:bg-slate-900/80",
      "border",
      "border-slate-200/50",
      "dark:border-slate-800/50",
    ]);
  });

  it("marks the Services dropdown active for nested service and playground routes", () => {
    const services = NAV_DROPDOWN_CONFIGS.find((config) => config.id === "services");
    expect(services).toBeTruthy();
    expect(isNavDropdownActive(services!, "/services/ai-pipeline-engineering")).toBe(true);
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
  });

  it("partitions desktop header links into the conversion bar", () => {
    const groups = partitionHeaderNavItems(PRIMARY_NAV_ITEMS);

    expect(groups.bar.map((item) => item.label)).toEqual(["Services", "About", "Work", "TrustTap", "OpsFlow AI"]);
    expect(groups.more.map((item) => item.label)).toEqual([]);
    expect(groups.mobile.map((item) => item.label)).toEqual(PRIMARY_NAV_ITEMS.map((item) => item.label));
  });
});
