import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  MENU_SECTION_LINKS,
  NAV_CTA_LABEL,
  NAV_CTA_TO,
  NAV_HEADER_BADGE,
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
      "trustTap",
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
    expect(NAV_HEADER_BADGE).toBe("COMMITERS — Enterprise AI & Cloud Systems");
  });

  it("structures the Services mega-menu as four rich cards", () => {
    expect(SERVICE_MEGA_CARDS.map((card) => ({ label: card.label, description: card.description, to: card.to }))).toEqual([
      {
        label: "AI Operational Audits",
        description: "2-week workflow diagnostics & spec-driven cloud blueprints.",
        to: ROUTES.aiOperationalAudit,
      },
      {
        label: "Governed AI & Workflow Systems",
        description: "Enterprise document parsing, LLM integrations & automated workflows.",
        to: ROUTES.aiSolutions,
      },
      {
        label: "Spec-Driven Full-Stack Platforms",
        description: "Scalable B2B web portals, SaaS platforms, & cloud web applications.",
        to: ROUTES.webApplications,
      },
      {
        label: "Free Business Utilities",
        description: "Zero-code operational tools including OpsFlow AI PDF-to-Excel extraction.",
        to: ROUTES.utilities,
      },
    ]);
    expect(NAV_DROPDOWN_CONFIGS).toHaveLength(5);
    expect(NAV_DROPDOWN_CONFIGS.every((config) => config.layout === "mega")).toBe(true);
    expect(NAV_DROPDOWN_CONFIGS.every((config) => config.headline === NAV_HEADER_BADGE)).toBe(true);
    expect(NAV_DROPDOWN_CONFIGS.every((config) => flattenNavDropdownLinks(config).every((link) => Boolean(link.description)))).toBe(
      true,
    );
    expect(NAV_DROPDOWN_CONFIGS.every((config) => flattenNavDropdownLinks(config).length === 4)).toBe(true);
  });

  it("builds stable service section URLs for Services page anchors", () => {
    expect(buildServiceSectionHref("ai-operational-audits")).toBe(`${ROUTES.services}#ai-operational-audits`);
    expect(buildServiceSectionLocation("ai-operational-audits")).toEqual({
      pathname: ROUTES.services,
      hash: "#ai-operational-audits",
    });
    expect(SERVICE_NAV_ENTRIES.map((e) => e.id)).toEqual([
      "ai-operational-audits",
      "governed-ai-workflow-systems",
      "spec-driven-full-stack-platforms",
    ]);
  });

  it("lists dropdown section links from every header mega-menu", () => {
    expect(MENU_SECTION_LINKS.map((link) => link.label)).toEqual([
      "AI Operational Audits",
      "Governed AI & Workflow Systems",
      "Spec-Driven Full-Stack Platforms",
      "Free Business Utilities",
      "The Studio",
      "Vision",
      "What We Stand For",
      "From Idea to Production",
      "Featured Case Studies",
      "Commiters.com",
      "AI Summarizer",
      "Multi-Role CRM",
      "Product Overview",
      "Field Capabilities",
      "How It Works",
      "FAQ",
      "Product Overview",
      "Try Free Sandbox",
      "How It Works",
      "PDF → Excel Preview",
    ]);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildAboutSectionHref("principles"))).toBe(true);
  });

  it("builds desktop dropdown configs from primary nav items", () => {
    const configs = resolveNavDropdownConfigs();
    expect(configs.map((config) => config.label)).toEqual(["Services", "About", "Work", "trustTap", "OpsFlow AI"]);
    expect(configs.find((config) => config.id === "trusttap")?.emphasis).toBe("flagship");
    expect(configs.find((config) => config.id === "opsflow")?.emphasis).toBe("lead-magnet");
    expect(configs.find((config) => config.id === "services")?.links.map((link) => ({ label: link.label, to: link.to }))).toEqual([
      { label: "AI Operational Audits", to: ROUTES.aiOperationalAudit },
      { label: "Governed AI & Workflow Systems", to: ROUTES.aiSolutions },
      { label: "Spec-Driven Full-Stack Platforms", to: ROUTES.webApplications },
      { label: "Free Business Utilities", to: ROUTES.utilities },
    ]);
  });

  it("uses a mega-menu dropdown for every desktop header item", () => {
    const entries = resolveDesktopHeaderNav();
    expect(entries.map((entry) => (entry.kind === "link" ? entry.item.label : entry.config.label))).toEqual([
      "Services",
      "About",
      "Work",
      "trustTap",
      "OpsFlow AI",
    ]);
    expect(entries.every((entry) => entry.kind === "dropdown")).toBe(true);
    expect(entries.map((entry) => (entry.kind === "dropdown" ? entry.config.id : ""))).toEqual([
      "services",
      "about",
      "work",
      "trusttap",
      "opsflow",
    ]);
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
    expect(isNavDropdownActive(services!, "/services/governed-ai-workflow-systems")).toBe(true);
    expect(isNavDropdownActive(services!, "/utilities")).toBe(true);
    expect(isNavDropdownActive(services!, "/about")).toBe(false);
  });

  it("resolves the active service section only on /services with a known hash", () => {
    expect(resolveActiveServiceSectionId(ROUTES.services, "#ai-operational-audits")).toBe("ai-operational-audits");
    expect(resolveActiveServiceSectionId(ROUTES.services, "")).toBeNull();
    expect(resolveActiveServiceSectionId(ROUTES.home, "#ai-operational-audits")).toBeNull();
    expect(resolveActiveServiceSectionId(ROUTES.services, "#unknown")).toBeNull();
    expect(resolveActiveServiceSectionId(ROUTES.services, "#website-development")).toBeNull();
  });

  it("exports the active dropdown link class for hover-matched highlighting", () => {
    expect(NAV_DROPDOWN_LINK_ACTIVE_CLASS).toBe("nav-dropdown-link--active");
  });

  it("partitions desktop header links into the conversion bar", () => {
    const groups = partitionHeaderNavItems(PRIMARY_NAV_ITEMS);

    expect(groups.bar.map((item) => item.label)).toEqual(["Services", "About", "Work", "trustTap", "OpsFlow AI"]);
    expect(groups.more.map((item) => item.label)).toEqual([]);
    expect(groups.mobile.map((item) => item.label)).toEqual(PRIMARY_NAV_ITEMS.map((item) => item.label));
  });
});
