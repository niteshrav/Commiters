import { ROUTES } from "./routes";
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
export const NAV_CTA_TO = ROUTES.aiOperationalAudit;
export const NAV_HEADER_BADGE = "COMMITERS — Enterprise AI & Cloud Systems" as const;

/** Conversion-focused header: Services mega-menu, then About, Work, trustTap, OpsFlow AI. */
export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { id: "services", to: ROUTES.services, label: "Services" },
  { id: "about", to: ROUTES.about, label: "About" },
  { id: "work", to: ROUTES.caseStudies, label: "Work" },
  { id: "trusttap", to: ROUTES.trustTap, label: "trustTap", emphasis: "flagship" },
  { id: "opsflow", to: ROUTES.opsFlow, label: "OpsFlow AI", emphasis: "lead-magnet" },
];

/** Desktop bar links shown in the header. */
export const DESKTOP_HEADER_BAR_IDS = ["services", "about", "work", "trusttap", "opsflow"] as const;

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

/** Section ids on `ServicesPage` (order matches the 3-card strategic grid). */
export const SERVICE_NAV_ENTRIES: ServiceNavEntry[] = [
  { id: "ai-operational-audits", label: "AI Operational Audits" },
  { id: "governed-ai-workflow-systems", label: "Governed AI & Workflow Systems" },
  { id: "spec-driven-full-stack-platforms", label: "Spec-Driven Full-Stack Platforms" },
];

export type NavDropdownLink = {
  id: string;
  label: string;
  to: string;
  description: string;
  featured?: boolean;
};

export type NavDropdownGroup = {
  id: string;
  label: string;
  links: NavDropdownLink[];
};

export type NavDropdownLayout = "cards" | "mega";

export type NavDropdownConfig = {
  id: string;
  label: string;
  overviewTo: string;
  overviewLabel?: string;
  headline: string;
  end?: boolean;
  layout?: NavDropdownLayout;
  emphasis?: PrimaryNavEmphasis;
  links: NavDropdownLink[];
  groups?: NavDropdownGroup[];
};

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
    to: ROUTES.aiOperationalAudit,
    description: "2-week workflow diagnostics & spec-driven cloud blueprints.",
    featured: true,
  },
  {
    id: "governed-ai-workflow-systems",
    label: "Governed AI & Workflow Systems",
    to: ROUTES.aiSolutions,
    description: "Enterprise document parsing, LLM integrations & automated workflows.",
  },
  {
    id: "spec-driven-full-stack-platforms",
    label: "Spec-Driven Full-Stack Platforms",
    to: ROUTES.webApplications,
    description: "Scalable B2B web portals, SaaS platforms, & cloud web applications.",
  },
  {
    id: "free-business-utilities",
    label: "Free Business Utilities",
    to: ROUTES.utilities,
    description: "Zero-code operational tools including OpsFlow AI PDF-to-Excel extraction.",
  },
];

/** @deprecated Use SERVICE_MEGA_CARDS. Kept as a grouped view of the four mega-menu cards. */
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
export const NAV_DROPDOWN_PANEL_GLASS_CLASS = "nav-item-dropdown-panel--glass" as const;
export const NAV_MEGA_OVERVIEW_CLASS = "nav-mega-overview" as const;
export const NAV_MEGA_FROST_CLASSES = [
  "backdrop-blur-md",
  "bg-white/80",
  "dark:bg-slate-900/80",
  "border",
  "border-slate-200/50",
  "dark:border-slate-800/50",
] as const;

export const ABOUT_MEGA_CARDS: NavDropdownLink[] = [
  {
    id: "about-studio",
    label: "The Studio",
    to: ROUTES.about,
    description: "Founder-led engineering studio for high-stakes AI and cloud systems.",
    featured: true,
  },
  {
    id: "vision",
    label: "Vision",
    to: buildAboutSectionHref("vision"),
    description: "How we think about craftsmanship, governance, and production software.",
  },
  {
    id: "principles",
    label: "What We Stand For",
    to: buildAboutSectionHref("principles"),
    description: "Guardrails, security-by-default, specs, and transparent delivery.",
  },
  {
    id: "how-we-work",
    label: "From Idea to Production",
    to: buildAboutSectionHref("how-we-work"),
    description: "Discover, architect, build, and launch with a connected delivery path.",
  },
];

export const WORK_MEGA_CARDS: NavDropdownLink[] = [
  {
    id: "featured-case-studies",
    label: "Featured Case Studies",
    to: `${ROUTES.caseStudies}#featured-case-studies`,
    description: "Selected AI, cloud, and workflow systems engineered for real operations.",
    featured: true,
  },
  {
    id: "commiters",
    label: "Commiters.com",
    to: ROUTES.commitersCaseStudy,
    description: "A high-performance cloud platform built for growth, speed, and clean UX.",
  },
  {
    id: "ai-summarizer",
    label: "AI Summarizer",
    to: ROUTES.aiSummarizerCaseStudy,
    description: "Document ingestion with governed LLM pipelines and enterprise security.",
  },
  {
    id: "multi-role-crm",
    label: "Multi-Role CRM",
    to: ROUTES.multiRoleCrmCaseStudy,
    description: "AI-powered CRM assistance with real-time, policy-gated workflows.",
  },
];

export const TRUSTTAP_MEGA_CARDS: NavDropdownLink[] = [
  {
    id: "trusttap-overview",
    label: "Product Overview",
    to: ROUTES.trustTap,
    description: "NFC and QR ground verification for logistics and field inspections.",
    featured: true,
  },
  {
    id: "hospitality",
    label: "Field Capabilities",
    to: buildTrustTapSectionHref("hospitality"),
    description: "Tamper-proof scans, offline sync, and live ops visibility.",
  },
  {
    id: "trusttap-how-it-works",
    label: "How It Works",
    to: buildTrustTapSectionHref("trusttap-how-it-works"),
    description: "From a physical tap to a verified inspection event.",
  },
  {
    id: "trusttap-faq",
    label: "FAQ",
    to: buildTrustTapSectionHref("trusttap-faq"),
    description: "Common questions on cards, admin, and field rollout.",
  },
];

export const OPSFLOW_MEGA_CARDS: NavDropdownLink[] = [
  {
    id: "opsflow-overview",
    label: "Product Overview",
    to: ROUTES.opsFlow,
    description: "Zero-code PDF-to-Excel extraction for invoices and GST records.",
    featured: true,
  },
  {
    id: "opsflow-sandbox",
    label: "Try Free Sandbox",
    to: `${ROUTES.opsFlow}#opsflow-sandbox`,
    description: "Upload a sample invoice and download structured Excel in seconds.",
  },
  {
    id: "opsflow-how-it-works",
    label: "How It Works",
    to: `${ROUTES.opsFlow}#opsflow-how-it-works`,
    description: "Upload, extract GST fields, and export a production-ready spreadsheet.",
  },
  {
    id: "opsflow-preview",
    label: "PDF → Excel Preview",
    to: `${ROUTES.opsFlow}#opsflow-preview`,
    description: "See how scanned documents become validated Excel rows.",
  },
];

/** Hover mega-menu content for every desktop header item. */
export const NAV_DROPDOWN_CONFIGS: NavDropdownConfig[] = [
  {
    id: "services",
    label: "Services",
    overviewTo: ROUTES.services,
    headline: "COMMITERS — Enterprise AI & Cloud Systems",
    layout: "mega",
    links: SERVICE_MEGA_CARDS,
  },
  {
    id: "about",
    label: "About",
    overviewTo: ROUTES.about,
    headline: "COMMITERS — Enterprise AI & Cloud Systems",
    layout: "mega",
    links: ABOUT_MEGA_CARDS,
  },
  {
    id: "work",
    label: "Work",
    overviewTo: ROUTES.caseStudies,
    headline: "COMMITERS — Enterprise AI & Cloud Systems",
    layout: "mega",
    links: WORK_MEGA_CARDS,
  },
  {
    id: "trusttap",
    label: "trustTap",
    overviewTo: ROUTES.trustTap,
    headline: "COMMITERS — Enterprise AI & Cloud Systems",
    layout: "mega",
    emphasis: "flagship",
    links: TRUSTTAP_MEGA_CARDS,
  },
  {
    id: "opsflow",
    label: "OpsFlow AI",
    overviewTo: ROUTES.opsFlow,
    headline: "COMMITERS — Enterprise AI & Cloud Systems",
    layout: "mega",
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
