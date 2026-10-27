import { describe, expect, it } from "vitest";
import { AI_OPERATIONAL_AUDIT_BOOKING_HREF, ROUTES } from "./routes";
import {
  MENU_SECTION_LINKS,
  NAV_CTA_LABEL,
  NAV_CTA_TO,
  NAV_HEADER_BADGE,
  NAV_DROPDOWN_CONFIGS,
  NAV_DROPDOWN_ITEM_CLASS,
  NAV_DROPDOWN_ITEM_DESC_CLASS,
  NAV_DROPDOWN_ITEM_TITLE_CLASS,
  NAV_DROPDOWN_LINK_ACTIVE_CLASS,
  NAV_DROPDOWN_ITEM_ACCENT_CLASS,
  NAV_DROPDOWN_PANEL_COMPACT_CLASS,
  NAV_DROPDOWN_PANEL_MD_CLASS,
  NAV_DROPDOWN_PANEL_MD_PAD_CLASS,
  NAV_DROPDOWN_PANEL_SURFACE_CLASSES,
  NAV_DROPDOWN_PANEL_WIDE_CLASS,
  PRIMARY_NAV_ITEMS,
  SERVICE_MEGA_CARDS,
  SERVICE_NAV_ENTRIES,
  OPSFLOW_MEGA_CARDS,
  TRUSTTAP_MEGA_CARDS,
  buildAboutSectionHref,
  buildServiceSectionHref,
  buildServiceSectionLocation,
  flattenNavDropdownLinks,
  isNavDropdownActive,
  navDropdownPanelClassName,
  partitionHeaderNavItems,
  resolveActiveServiceSectionId,
  resolveNavDropdownConfigs,
  resolveDesktopHeaderNav,
  resolveNavDropdownPanelPosition,
  WORK_MEGA_CARDS,
} from "./navSections";

describe("navSections", () => {
  it("lists conversion-focused primary links with Services first", () => {
    expect(PRIMARY_NAV_ITEMS.map((item) => item.label)).toEqual([
      "Services",
      "Work",
      "About",
      "Prooflyn",
      "OpsFlow AI",
    ]);
    expect(PRIMARY_NAV_ITEMS.map((item) => item.to)).toEqual([
      ROUTES.services,
      ROUTES.caseStudies,
      ROUTES.about,
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
    expect(NAV_CTA_TO).toBe(AI_OPERATIONAL_AUDIT_BOOKING_HREF);
    expect(NAV_HEADER_BADGE).toBe("COMMITERS — Enterprise AI & Cloud Systems");
  });

  it("structures unified conversion dropdowns with icons and column layouts", () => {
    expect(SERVICE_MEGA_CARDS.map((card) => ({ label: card.label, description: card.description, to: card.to, icon: card.icon, badge: card.badge }))).toEqual([
      {
        label: "AI Operational Audits",
        description: "48-hour workflow diagnostics, bottleneck elimination, and live automation blueprints.",
        to: ROUTES.audit,
        icon: "document",
        badge: "48-HOUR DIAGNOSTIC",
      },
      {
        label: "Governed AI & Workflow Systems",
        description: "Custom pipelines, policy gateways, and enterprise AI workflows.",
        to: ROUTES.aiSolutionsShort,
        icon: "shield",
        badge: undefined,
      },
      {
        label: "Spec-Driven Full-Stack Platforms",
        description: "Scalable web apps, cloud portals, and spec-driven SaaS architecture.",
        to: ROUTES.webApplicationsShort,
        icon: "layers",
        badge: undefined,
      },
      {
        label: "High-Performance Web & Mobile Apps",
        description: "Custom B2B web applications, mobile platforms, and SaaS MVPs.",
        to: `${ROUTES.services}#engineering-capabilities`,
        icon: "rocket",
        badge: undefined,
      },
      {
        label: "Automation & Integration Tools",
        description: "API integrations, document processing, and operational workflow tools.",
        to: `${ROUTES.services}#engineering-capabilities`,
        icon: "workflow",
        badge: undefined,
      },
    ]);
    expect(SERVICE_MEGA_CARDS.some((card) => /trusttap|opsflow/i.test(card.label) || /trusttap|opsflow/i.test(card.to))).toBe(false);
    expect(NAV_DROPDOWN_CONFIGS).toHaveLength(5);
    expect(NAV_DROPDOWN_CONFIGS.find((config) => config.id === "services")?.columns).toBe(2);
    expect(NAV_DROPDOWN_CONFIGS.find((config) => config.id === "about")?.columns).toBe(2);
    expect(NAV_DROPDOWN_CONFIGS.find((config) => config.id === "work")?.columns).toBe(1);
    expect(NAV_DROPDOWN_CONFIGS.find((config) => config.id === "trusttap")?.columns).toBe(1);
    expect(NAV_DROPDOWN_CONFIGS.find((config) => config.id === "opsflow")?.columns).toBe(1);
    expect(NAV_DROPDOWN_CONFIGS.every((config) => flattenNavDropdownLinks(config).every((link) => Boolean(link.description) && Boolean(link.icon)))).toBe(
      true,
    );
    expect(NAV_DROPDOWN_PANEL_SURFACE_CLASSES).toEqual(["bg-white", "rounded-2xl", "shadow-2xl", "border", "border-slate-100"]);
    expect(NAV_DROPDOWN_PANEL_COMPACT_CLASS).toBe("max-w-lg");
    expect(NAV_DROPDOWN_PANEL_WIDE_CLASS).toBe("max-w-xl");
    expect(NAV_DROPDOWN_ITEM_CLASS).toBe("group p-3 rounded-xl hover:bg-slate-50 transition-all");
    expect(NAV_DROPDOWN_ITEM_TITLE_CLASS).toBe(
      "text-sm font-semibold text-slate-900 group-hover:text-blue-600 flex items-center gap-2",
    );
    expect(NAV_DROPDOWN_ITEM_ACCENT_CLASS).toBe("group p-3 rounded-xl hover:bg-blue-50/50 transition-all");
    expect(NAV_DROPDOWN_PANEL_MD_CLASS).toBe("max-w-md");
    expect(NAV_DROPDOWN_PANEL_MD_PAD_CLASS).toBe("p-4");
    expect(navDropdownPanelClassName({ columns: 1, panelSize: "md" })).toContain("max-w-md");
    expect(navDropdownPanelClassName({ columns: 1, panelSize: "md" })).toContain("p-4");
    expect(resolveNavDropdownPanelPosition({ left: 240, bottom: 80 }, 1, 1280, "md")).toEqual({ top: 88, left: 240 });
    expect(NAV_DROPDOWN_ITEM_DESC_CLASS).toBe("text-xs text-slate-500 mt-0.5");
    expect(WORK_MEGA_CARDS.map((card) => ({ label: card.label, to: card.to }))).toEqual([
      { label: "Client Case Studies", to: ROUTES.caseStudies },
      { label: "Client Testimonials", to: ROUTES.testimonials },
    ]);
    expect(navDropdownPanelClassName({ columns: 2 })).toContain("max-w-xl");
    expect(navDropdownPanelClassName({ columns: 1 })).toContain("max-w-lg");
    expect(resolveNavDropdownPanelPosition({ left: 240, bottom: 80 }, 1, 1280)).toEqual({ top: 88, left: 240 });
    expect(resolveNavDropdownPanelPosition({ left: 1200, bottom: 80 }, 2, 1280).left).toBeLessThan(1200);
  });

  it("builds stable service section URLs for Services page anchors", () => {
    expect(buildServiceSectionHref("ai-operational-audits")).toBe(`${ROUTES.services}#ai-operational-audits`);
    expect(buildServiceSectionLocation("ai-operational-audits")).toEqual({
      pathname: ROUTES.services,
      hash: "#ai-operational-audits",
    });
    expect(SERVICE_NAV_ENTRIES.map((e) => e.id)).toEqual([
      "flagship-solutions",
      "ai-operational-audits",
      "governed-ai",
      "governed-ai-workflow-systems",
      "spec-driven",
      "spec-driven-full-stack-platforms",
      "web-mobile",
      "web-engineering",
      "automation",
      "ecommerce",
      "saas-mvp",
      "mobile",
      "engineering-capabilities",
    ]);
  });

  it("lists dropdown section links from every header mega-menu", () => {
    expect(MENU_SECTION_LINKS.map((link) => link.label)).toEqual([
      "AI Operational Audits",
      "Governed AI & Workflow Systems",
      "Spec-Driven Full-Stack Platforms",
      "High-Performance Web & Mobile Apps",
      "Automation & Integration Tools",
      "Client Case Studies",
      "Client Testimonials",
      "The Studio",
      "Vision & Philosophy",
      "What We Stand For",
      "From Idea to Production",
      "Product Overview",
      "Merchant Intelligence",
      "How It Works",
      "Try Free Sandbox",
      "Extraction Capabilities",
      "How It Works & Integration",
    ]);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildAboutSectionHref("the-studio"))).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildAboutSectionHref("our-values"))).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildAboutSectionHref("governed-engineering"))).toBe(true);
    expect(MENU_SECTION_LINKS.some((link) => link.to === buildAboutSectionHref("delivery-journey"))).toBe(true);
  });

  it("builds desktop dropdown configs from primary nav items", () => {
    const configs = resolveNavDropdownConfigs();
    expect(configs.map((config) => config.label)).toEqual(["Services", "Work", "About", "Prooflyn", "OpsFlow AI"]);
    expect(configs.find((config) => config.id === "about")?.links.map((link) => ({ label: link.label, to: link.to }))).toEqual([
      { label: "The Studio", to: `${ROUTES.about}#the-studio` },
      { label: "Vision & Philosophy", to: `${ROUTES.about}#governed-engineering` },
      { label: "What We Stand For", to: `${ROUTES.about}#our-values` },
      { label: "From Idea to Production", to: `${ROUTES.about}#delivery-journey` },
    ]);
    expect(configs.find((config) => config.id === "trusttap")?.emphasis).toBe("flagship");
    expect(configs.find((config) => config.id === "trusttap")?.panelSize).toBe("md");
    expect(TRUSTTAP_MEGA_CARDS.map((card) => ({ label: card.label, to: card.to, description: card.description, icon: card.icon, external: card.external }))).toEqual([
      {
        label: "Product Overview",
        to: `${ROUTES.trustTap}#product-overview`,
        description: "Smart NFC touchpoints & sentiment routing platform for modern merchants.",
        icon: "check",
        external: undefined,
      },
      {
        label: "Merchant Intelligence",
        to: `${ROUTES.trustTap}#core-pillars`,
        description: "On-premise tap hardware & weekly executive performance digests.",
        icon: "chart",
        external: undefined,
      },
      {
        label: "How It Works",
        to: `${ROUTES.trustTap}#how-it-works`,
        description: "Three-step deployment roadmap from hardware anchor to ratings growth.",
        icon: "layers",
        external: undefined,
      },
    ]);
    expect(configs.find((config) => config.id === "opsflow")?.emphasis).toBe("lead-magnet");
    expect(configs.find((config) => config.id === "opsflow")?.panelSize).toBe("md");
    expect(OPSFLOW_MEGA_CARDS.map((card) => ({
      label: card.label,
      to: card.to,
      description: card.description,
      icon: card.icon,
      badge: card.badge,
      accent: card.accent,
    }))).toEqual([
      {
        label: "Try Free Sandbox",
        to: `${ROUTES.opsFlow}#sandbox`,
        description: "Instant zero-code PDF-to-Excel data extraction tool.",
        icon: "sparkles",
        badge: "LIVE TOOL",
        accent: "blue",
      },
      {
        label: "Extraction Capabilities",
        to: `${ROUTES.opsFlow}#features`,
        description: "Deterministic schema checking & structured GST/PAN parsing.",
        icon: "document",
        badge: undefined,
        accent: undefined,
      },
      {
        label: "How It Works & Integration",
        to: `${ROUTES.opsFlow}#how-it-works`,
        description: "3-step extraction flow & custom enterprise ERP sync.",
        icon: "workflow",
        badge: undefined,
        accent: undefined,
      },
    ]);
    expect(configs.find((config) => config.id === "services")?.links.map((link) => ({ label: link.label, to: link.to }))).toEqual([
      { label: "AI Operational Audits", to: ROUTES.audit },
      { label: "Governed AI & Workflow Systems", to: ROUTES.aiSolutionsShort },
      { label: "Spec-Driven Full-Stack Platforms", to: ROUTES.webApplicationsShort },
      { label: "High-Performance Web & Mobile Apps", to: `${ROUTES.services}#engineering-capabilities` },
      { label: "Automation & Integration Tools", to: `${ROUTES.services}#engineering-capabilities` },
    ]);
  });

  it("uses a mega-menu dropdown for every desktop header item", () => {
    const entries = resolveDesktopHeaderNav();
    expect(entries.map((entry) => (entry.kind === "link" ? entry.item.label : entry.config.label))).toEqual([
      "Services",
      "Work",
      "About",
      "Prooflyn",
      "OpsFlow AI",
    ]);
    expect(entries.every((entry) => entry.kind === "dropdown")).toBe(true);
    expect(entries.map((entry) => (entry.kind === "dropdown" ? entry.config.id : ""))).toEqual([
      "services",
      "work",
      "about",
      "trusttap",
      "opsflow",
    ]);
  });

  it("marks the Services dropdown active on the services route only", () => {
    const services = NAV_DROPDOWN_CONFIGS.find((config) => config.id === "services");
    expect(services).toBeTruthy();
    expect(isNavDropdownActive(services!, "/services")).toBe(true);
    expect(isNavDropdownActive(services!, "/utilities")).toBe(false);
    expect(isNavDropdownActive(services!, "/about")).toBe(false);
  });

  it("marks the Work dropdown active for case studies", () => {
    const work = NAV_DROPDOWN_CONFIGS.find((config) => config.id === "work");
    expect(work).toBeTruthy();
    expect(isNavDropdownActive(work!, "/work")).toBe(true);
    expect(isNavDropdownActive(work!, "/testimonials")).toBe(true);
    expect(isNavDropdownActive(work!, "/about")).toBe(false);
  });

  it("resolves the active service section only on /services with a known hash", () => {
    expect(resolveActiveServiceSectionId(ROUTES.services, "#ai-operational-audits")).toBe("ai-operational-audits");
    expect(resolveActiveServiceSectionId(ROUTES.services, "#governed-ai")).toBe("governed-ai");
    expect(resolveActiveServiceSectionId(ROUTES.services, "#web-engineering")).toBe("web-engineering");
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

    expect(groups.bar.map((item) => item.label)).toEqual(["Services", "Work", "About", "Prooflyn", "OpsFlow AI"]);
    expect(groups.more.map((item) => item.label)).toEqual([]);
    expect(groups.mobile.map((item) => item.label)).toEqual(PRIMARY_NAV_ITEMS.map((item) => item.label));
  });
});
