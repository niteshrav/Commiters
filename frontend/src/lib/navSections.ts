import { ABOUT_STUDIO_ID } from "./aboutPageContent";
import { AI_OPERATIONAL_AUDIT_BOOKING_HREF, ROUTES } from "./routes";
import { resolveServiceDetailHref } from "./services";

export type ServiceNavEntry = { id: string; label: string };

export type PrimaryNavEmphasis = "flagship" | "lead-magnet";

export type PrimaryNavItem = {
  id: string;
  to: string;
  label: string;
  end?: boolean;
  emphasis?: PrimaryNavEmphasis;
};

export const NAV_CTA_LABEL = "Book Operational Audit" as const;
export const NAV_CTA_TO = AI_OPERATIONAL_AUDIT_BOOKING_HREF;
export const NAV_HEADER_BADGE = "COMMITERS — Enterprise AI & Cloud Systems" as const;

/** Conversion-focused header: Services, Work, About, then flagship products. */
export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { id: "services", to: ROUTES.services, label: "Services" },
  { id: "work", to: ROUTES.caseStudies, label: "Work" },
  { id: "about", to: ROUTES.about, label: "About" },
  { id: "trusttap", to: ROUTES.trustTap, label: "Prooflyn", emphasis: "flagship" },
  { id: "opsflow", to: ROUTES.opsFlow, label: "OpsFlow AI", emphasis: "lead-magnet" },
];

/** Desktop bar links shown in the header. */
export const DESKTOP_HEADER_BAR_IDS = ["services", "work", "about", "trusttap", "opsflow"] as const;

/** Header items that navigate directly without a dropdown panel. */
export const DESKTOP_HEADER_PLAIN_LINK_IDS = [] as const;

/** @deprecated More menu removed; secondary links live in the footer. */
export const DESKTOP_HEADER_MORE_IDS = [] as const;

export type HeaderNavGroups = {
  bar: PrimaryNavItem[];
  more: PrimaryNavItem[];
  mobile: PrimaryNavItem[];
};

export function partitionHeaderNavItems(items: readonly PrimaryNavItem[]): HeaderNavGroups {
  const byId = new Map(items.map((item) => [item.id, item]));
  const bar = DESKTOP_HEADER_BAR_IDS.map((id) => byId.get(id)).filter((item): item is PrimaryNavItem => Boolean(item));
  const more = DESKTOP_HEADER_MORE_IDS.map((id) => byId.get(id)).filter((item): item is PrimaryNavItem => Boolean(item));
  const slotted = new Set<string>([...DESKTOP_HEADER_BAR_IDS, ...DESKTOP_HEADER_MORE_IDS]);

  for (const item of items) {
    if (slotted.has(item.id)) continue;
    bar.push(item);
  }

  return { bar, more, mobile: [...items] };
}

/** Section ids on `ServicesPage` (flagship cards, dropdown aliases, and capability anchors). */
export const SERVICE_NAV_ENTRIES: ServiceNavEntry[] = [
  { id: "flagship-solutions", label: "Flagship Operational Solutions" },
  { id: "ai-operational-audits", label: "AI Operational Audits" },
  { id: "governed-ai", label: "Governed AI & Workflow Systems" },
  { id: "governed-ai-workflow-systems", label: "Governed AI & Workflow Systems" },
  { id: "spec-driven", label: "Spec-Driven Full-Stack Platforms" },
  { id: "spec-driven-full-stack-platforms", label: "Spec-Driven Full-Stack Platforms" },
  { id: "web-mobile", label: "High-Performance Web & Mobile Apps" },
  { id: "web-engineering", label: "High-Performance Web Platforms" },
  { id: "automation", label: "Automation & Integration Tools" },
  { id: "ecommerce", label: "Automated E-commerce Systems" },
  { id: "saas-mvp", label: "Rapid SaaS MVP Development" },
  { id: "mobile", label: "Cross-Platform Mobile Applications" },
  { id: "engineering-capabilities", label: "Full-Lifecycle Software Engineering Capabilities" },
];

export type NavDropdownIconId =
  | "shield"
  | "layers"
  | "rocket"
  | "workflow"
  | "document"
  | "users"
  | "target"
  | "bolt"
  | "check"
  | "list"
  | "lock"
  | "database"
  | "cloud"
  | "globe"
  | "external"
  | "chart"
  | "sparkles";

export type NavDropdownLink = {
  id: string;
  label: string;
  to: string;
  description: string;
  icon: NavDropdownIconId;
  featured?: boolean;
  badge?: string;
  external?: boolean;
  accent?: "blue";
};

export type NavDropdownGroup = {
  id: string;
  label: string;
  links: NavDropdownLink[];
};

export type NavDropdownLayout = "cards" | "mega";

export type NavDropdownPanelSize = "md" | "lg" | "xl";

export type NavDropdownConfig = {
  id: string;
  label: string;
  overviewTo: string;
  overviewLabel?: string;
  headline: string;
  end?: boolean;
  layout?: NavDropdownLayout;
  columns?: 1 | 2;
  panelSize?: NavDropdownPanelSize;
  emphasis?: PrimaryNavEmphasis;
  links: NavDropdownLink[];
  groups?: NavDropdownGroup[];
};

export function isExternalNavHref(href: string, external?: boolean): boolean {
  return Boolean(external) || href.startsWith("http://") || href.startsWith("https://");
}

export function flattenNavDropdownLinks(config: NavDropdownConfig): NavDropdownLink[] {
  if (config.groups?.length) {
    return config.groups.flatMap((group) => group.links);
  }
  return config.links;
}

export function buildHomeSectionHref(sectionId: string): string {
  return `${ROUTES.home}#${sectionId}`;
}

export function buildAboutSectionHref(sectionId: string): string {
  return `${ROUTES.about}#${sectionId}`;
}

export function buildTrustTapSectionHref(sectionId: string): string {
  return `${ROUTES.trustTap}#${sectionId}`;
}

export function buildServiceSectionHref(sectionId: string): string {
  return `${ROUTES.services}#${sectionId}`;
}

export function buildServiceDetailMenuHref(gridId: string): string {
  return resolveServiceDetailHref({ id: gridId });
}

export function buildServiceNavHref(slug: string): string {
  return `/services/${slug}`;
}

export const SERVICE_MEGA_CARDS: NavDropdownLink[] = [
  {
    id: "ai-operational-audits",
    label: "AI Operational Audits",
    to: ROUTES.audit,
    description: "48-hour workflow diagnostics, bottleneck elimination, and live automation blueprints.",
    icon: "document",
    featured: true,
    badge: "48-HOUR DIAGNOSTIC",
  },
  {
    id: "governed-ai",
    label: "Governed AI & Workflow Systems",
    to: ROUTES.aiSolutionsShort,
    description: "Custom pipelines, policy gateways, and enterprise AI workflows.",
    icon: "shield",
  },
  {
    id: "spec-driven",
    label: "Spec-Driven Full-Stack Platforms",
    to: ROUTES.webApplicationsShort,
    description: "Scalable web apps, cloud portals, and spec-driven SaaS architecture.",
    icon: "layers",
  },
  {
    id: "web-mobile",
    label: "High-Performance Web & Mobile Apps",
    to: buildServiceSectionHref("engineering-capabilities"),
    description: "Custom B2B web applications, mobile platforms, and SaaS MVPs.",
    icon: "rocket",
  },
  {
    id: "automation",
    label: "Automation & Integration Tools",
    to: buildServiceSectionHref("engineering-capabilities"),
    description: "API integrations, document processing, and operational workflow tools.",
    icon: "workflow",
  },
];

/** @deprecated Use SERVICE_MEGA_CARDS. Kept as a grouped view of the Services mega-menu cards. */
export const SERVICE_NAV_GROUPS: NavDropdownGroup[] = [
  {
    id: "services-mega",
    label: "Services",
    links: SERVICE_MEGA_CARDS,
  },
];

export function buildServiceSectionLocation(sectionId: string): { pathname: string; hash: string } {
  return { pathname: ROUTES.services, hash: `#${sectionId}` };
}

export const NAV_DROPDOWN_LINK_CLASS = "nav-dropdown-link" as const;
export const NAV_DROPDOWN_LINK_ACTIVE_CLASS = "nav-dropdown-link--active" as const;
export const NAV_DROPDOWN_ITEM_CLASS = "group p-3 rounded-xl hover:bg-slate-50 transition-all" as const;
export const NAV_DROPDOWN_ITEM_ACCENT_CLASS = "group p-3 rounded-xl hover:bg-blue-50/50 transition-all" as const;
export const NAV_DROPDOWN_ITEM_TITLE_CLASS =
  "text-sm font-semibold text-slate-900 group-hover:text-blue-600 flex items-center gap-2" as const;
export const NAV_DROPDOWN_ITEM_DESC_CLASS = "text-xs text-slate-500 mt-0.5" as const;
export const NAV_DROPDOWN_ITEM_BADGE_CLASS = "text-xs font-bold tracking-wide text-blue-600 uppercase" as const;
export const NAV_DROPDOWN_PANEL_SURFACE_CLASSES = ["bg-white", "rounded-2xl", "shadow-2xl", "border", "border-slate-100"] as const;
export const NAV_DROPDOWN_PANEL_MD_CLASS = "max-w-md" as const;
export const NAV_DROPDOWN_PANEL_MD_PAD_CLASS = "p-4" as const;
export const NAV_DROPDOWN_PANEL_COMPACT_CLASS = "max-w-lg" as const;
export const NAV_DROPDOWN_PANEL_WIDE_CLASS = "max-w-xl" as const;
export const NAV_DROPDOWN_PANEL_GAP_PX = 8 as const;
export const NAV_DROPDOWN_VIEWPORT_GUTTER_PX = 16 as const;
export const NAV_DROPDOWN_MD_MAX_WIDTH_PX = 420 as const;
export const NAV_DROPDOWN_COMPACT_MAX_WIDTH_PX = 512 as const;
export const NAV_DROPDOWN_WIDE_MAX_WIDTH_PX = 576 as const;
export const NAV_SECTION_ALIAS_CLASS = "nav-section-alias" as const;
export const NAV_MEGA_OVERVIEW_CLASS = "nav-mega-overview" as const;

export function resolveNavDropdownPanelSize(config: Pick<NavDropdownConfig, "columns" | "panelSize">): NavDropdownPanelSize {
  return config.panelSize ?? (config.columns === 2 ? "xl" : "lg");
}

export function navDropdownPanelClassName(config: Pick<NavDropdownConfig, "columns" | "panelSize">): string {
  const size = resolveNavDropdownPanelSize(config);
  const sizeClass =
    size === "md" ? NAV_DROPDOWN_PANEL_MD_CLASS : size === "xl" ? NAV_DROPDOWN_PANEL_WIDE_CLASS : NAV_DROPDOWN_PANEL_COMPACT_CLASS;
  const layoutClass =
    size === "xl"
      ? "nav-item-dropdown-panel--wide"
      : size === "md"
        ? "nav-item-dropdown-panel--compact nav-item-dropdown-panel--md"
        : "nav-item-dropdown-panel--compact";
  return [
    "nav-item-dropdown-panel",
    "nav-item-dropdown-panel--fixed",
    ...NAV_DROPDOWN_PANEL_SURFACE_CLASSES,
    sizeClass,
    size === "md" ? NAV_DROPDOWN_PANEL_MD_PAD_CLASS : "",
    layoutClass,
  ]
    .filter(Boolean)
    .join(" ");
}

export function resolveNavDropdownPanelPosition(
  trigger: { left: number; bottom: number },
  columns: 1 | 2,
  viewportWidth: number,
  panelSize?: NavDropdownPanelSize,
): { top: number; left: number } {
  const width =
    panelSize === "md"
      ? NAV_DROPDOWN_MD_MAX_WIDTH_PX
      : columns === 2
        ? NAV_DROPDOWN_WIDE_MAX_WIDTH_PX
        : NAV_DROPDOWN_COMPACT_MAX_WIDTH_PX;
  const maxLeft = Math.max(
    NAV_DROPDOWN_VIEWPORT_GUTTER_PX,
    viewportWidth - NAV_DROPDOWN_VIEWPORT_GUTTER_PX - width,
  );
  return {
    top: trigger.bottom + NAV_DROPDOWN_PANEL_GAP_PX,
    left: Math.min(Math.max(NAV_DROPDOWN_VIEWPORT_GUTTER_PX, trigger.left), maxLeft),
  };
}

export function buildOpsFlowSectionHref(sectionId: string): string {
  return `${ROUTES.opsFlow}#${sectionId}`;
}

export const ABOUT_MEGA_CARDS: NavDropdownLink[] = [
  {
    id: "about-studio",
    label: "The Studio",
    to: buildAboutSectionHref(ABOUT_STUDIO_ID),
    description: "Founder-led engineering studio for high-stakes AI and cloud.",
    icon: "target",
  },
  {
    id: "vision",
    label: "Vision & Philosophy",
    to: buildAboutSectionHref("governed-engineering"),
    description: "Craftsmanship, governance, and production reliability.",
    icon: "bolt",
  },
  {
    id: "principles",
    label: "What We Stand For",
    to: buildAboutSectionHref("our-values"),
    description: "Guardrails, security-by-default, specs, and transparent delivery.",
    icon: "check",
  },
  {
    id: "process",
    label: "From Idea to Production",
    to: buildAboutSectionHref("delivery-journey"),
    description: "Discover, architect, build, and launch with connected delivery.",
    icon: "list",
  },
];

export const WORK_MEGA_CARDS: NavDropdownLink[] = [
  {
    id: "client-case-studies",
    label: "Client Case Studies",
    to: ROUTES.caseStudies,
    description: "Explore production builds, tech stack choices, and outcomes.",
    icon: "document",
  },
  {
    id: "client-testimonials",
    label: "Client Testimonials",
    to: ROUTES.testimonials,
    description: "Hear from founders and product leaders we have shipped with.",
    icon: "users",
  },
];

export const TRUSTTAP_MEGA_CARDS: NavDropdownLink[] = [
  {
    id: "trusttap-overview",
    label: "Product Overview",
    to: buildTrustTapSectionHref("product-overview"),
    description: "Smart NFC touchpoints & sentiment routing platform for modern merchants.",
    icon: "check",
  },
  {
    id: "merchant-intelligence",
    label: "Merchant Intelligence",
    to: `${ROUTES.trustTap}#core-pillars`,
    description: "On-premise tap hardware & weekly executive performance digests.",
    icon: "chart",
  },
  {
    id: "how-it-works",
    label: "How It Works",
    to: `${ROUTES.trustTap}#how-it-works`,
    description: "Three-step deployment roadmap from hardware anchor to ratings growth.",
    icon: "layers",
  },
];

export const OPSFLOW_MEGA_CARDS: NavDropdownLink[] = [
  {
    id: "try-free-sandbox",
    label: "Try Free Sandbox",
    to: buildOpsFlowSectionHref("sandbox"),
    description: "Instant zero-code PDF-to-Excel data extraction tool.",
    icon: "sparkles",
    badge: "LIVE TOOL",
    accent: "blue",
  },
  {
    id: "extraction-capabilities",
    label: "Extraction Capabilities",
    to: buildOpsFlowSectionHref("features"),
    description: "Deterministic schema checking & structured GST/PAN parsing.",
    icon: "document",
  },
  {
    id: "how-it-works-integration",
    label: "How It Works & Integration",
    to: buildOpsFlowSectionHref("how-it-works"),
    description: "3-step extraction flow & custom enterprise ERP sync.",
    icon: "workflow",
  },
];

/** Hover dropdown content for every desktop header item. */
export const NAV_DROPDOWN_CONFIGS: NavDropdownConfig[] = [
  {
    id: "services",
    label: "Services",
    overviewTo: ROUTES.services,
    headline: "COMMITERS — Enterprise AI & Cloud Systems",
    columns: 2,
    links: SERVICE_MEGA_CARDS,
  },
  {
    id: "work",
    label: "Work",
    overviewTo: ROUTES.caseStudies,
    headline: "COMMITERS — Enterprise AI & Cloud Systems",
    columns: 1,
    links: WORK_MEGA_CARDS,
  },
  {
    id: "about",
    label: "About",
    overviewTo: ROUTES.about,
    headline: "COMMITERS — Enterprise AI & Cloud Systems",
    columns: 2,
    links: ABOUT_MEGA_CARDS,
  },
  {
    id: "trusttap",
    label: "Prooflyn",
    overviewTo: ROUTES.trustTap,
    headline: "COMMITERS — Enterprise AI & Cloud Systems",
    columns: 1,
    panelSize: "md",
    emphasis: "flagship",
    links: TRUSTTAP_MEGA_CARDS,
  },
  {
    id: "opsflow",
    label: "OpsFlow AI",
    overviewTo: ROUTES.opsFlow,
    headline: "COMMITERS — Enterprise AI & Cloud Systems",
    columns: 1,
    panelSize: "md",
    emphasis: "lead-magnet",
    links: OPSFLOW_MEGA_CARDS,
  },
];

export type MenuSectionLink = NavDropdownLink;

/** Flat list of all section links (used in tests and mobile panels). */
export const MENU_SECTION_LINKS: MenuSectionLink[] = NAV_DROPDOWN_CONFIGS.flatMap(flattenNavDropdownLinks);

export function resolveNavDropdownConfigs(
  navItems: ReadonlyArray<Pick<PrimaryNavItem, "id" | "label" | "to" | "end" | "emphasis">> = PRIMARY_NAV_ITEMS,
): NavDropdownConfig[] {
  const configById = new Map(NAV_DROPDOWN_CONFIGS.map((config) => [config.id, config]));
  const navById = new Map(navItems.map((item) => [item.id, item]));
  const plainLinkIds = new Set<string>(DESKTOP_HEADER_PLAIN_LINK_IDS);

  return DESKTOP_HEADER_BAR_IDS.flatMap((id) => {
    if (plainLinkIds.has(id)) return [];
    const config = configById.get(id);
    if (!config) return [];
    const navItem = navById.get(id);
    const end = navItem?.end ?? config.end;
    const resolved: NavDropdownConfig = {
      ...config,
      label: navItem?.label ?? config.label,
      overviewTo: navItem?.to ?? config.overviewTo,
      emphasis: navItem?.emphasis ?? config.emphasis,
    };
    if (end !== undefined) resolved.end = end;
    return [resolved];
  });
}

export type DesktopHeaderNavEntry =
  | { kind: "dropdown"; config: NavDropdownConfig }
  | { kind: "link"; item: PrimaryNavItem };

export function resolveDesktopHeaderNav(
  navItems: ReadonlyArray<{ id: string; label: string; to: string; end?: boolean }> = PRIMARY_NAV_ITEMS,
): DesktopHeaderNavEntry[] {
  const dropdownById = new Map(resolveNavDropdownConfigs(navItems).map((config) => [config.id, config]));
  const navById = new Map(navItems.map((item) => [item.id, item]));
  const plainLinkIds = new Set<string>(DESKTOP_HEADER_PLAIN_LINK_IDS);
  const entries: DesktopHeaderNavEntry[] = [];

  for (const id of DESKTOP_HEADER_BAR_IDS) {
    if (plainLinkIds.has(id)) {
      const item = navById.get(id);
      if (item) entries.push({ kind: "link", item });
      continue;
    }

    const config = dropdownById.get(id);
    if (config) entries.push({ kind: "dropdown", config });
  }

  return entries;
}

export function isNavDropdownActive(config: NavDropdownConfig, pathname: string): boolean {
  if (config.end) {
    if (pathname === config.overviewTo) return true;
  } else if (pathname === config.overviewTo || pathname.startsWith(`${config.overviewTo}/`)) {
    return true;
  }

  return flattenNavDropdownLinks(config).some((link) => {
    const path = link.to.split("#")[0] ?? link.to;
    if (path === ROUTES.home) return pathname === ROUTES.home;
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}

const SERVICE_SECTION_IDS = new Set(SERVICE_NAV_ENTRIES.map((entry) => entry.id));

/** Active service section when the URL hash matches a known anchor on the Services page. */
export function resolveActiveServiceSectionId(pathname: string, hash: string): string | null {
  if (pathname !== ROUTES.services) return null;
  const sectionId = hash.replace(/^#/, "");
  return SERVICE_SECTION_IDS.has(sectionId) ? sectionId : null;
}
