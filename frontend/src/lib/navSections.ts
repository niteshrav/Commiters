import { ROUTES } from "./routes";
import { resolveServiceDetailHref } from "./services";

export type ServiceNavEntry = { id: string; label: string };

export type PrimaryNavItem = {
  id: string;
  to: string;
  label: string;
  end?: boolean;
};

/** Compact conversion-focused header: Products, Services, Work, About. */
export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { id: "products", to: ROUTES.trustTap, label: "Products" },
  { id: "services", to: ROUTES.services, label: "Services" },
  { id: "work", to: ROUTES.caseStudies, label: "Work" },
  { id: "about", to: ROUTES.about, label: "About" },
];

/** Desktop bar links shown in the header. */
export const DESKTOP_HEADER_BAR_IDS = ["products", "services", "work", "about"] as const;

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

/** Section ids on `ServicesPage` (order matches page). */
export const SERVICE_NAV_ENTRIES: ServiceNavEntry[] = [
  { id: "website-development", label: "Website Development" },
  { id: "web-applications", label: "Web Applications" },
  { id: "mobile-applications", label: "Mobile Applications" },
  { id: "e-commerce-development", label: "E-commerce Development" },
  { id: "ai-integration", label: "AI Integration" },
  { id: "automation-tools", label: "Automation Tools" },
  { id: "mvp-development", label: "MVP Development" },
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

export type NavDropdownConfig = {
  id: string;
  label: string;
  overviewTo: string;
  overviewLabel?: string;
  headline: string;
  end?: boolean;
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

export const SERVICE_NAV_GROUPS: NavDropdownGroup[] = [
  {
    id: "ai-operational-engineering",
    label: "AI Operational Engineering",
    links: [
      {
        id: "ai-solutions",
        label: "Generative AI & LLM Solutions",
        to: buildServiceNavHref("ai-solutions"),
        description: "Custom GenAI agents, Vertex AI integrations, and LLM workflows.",
      },
      {
        id: "workflow-automation",
        label: "Workflow & Process Automation",
        to: buildServiceNavHref("workflow-automation"),
        description: "Eliminate back-office bottlenecks and manual data syncs.",
      },
    ],
  },
  {
    id: "custom-web-platform-engineering",
    label: "Custom Web & Platform Engineering",
    links: [
      {
        id: "web-applications",
        label: "Custom Web Applications",
        to: buildServiceNavHref("web-applications"),
        description: "High-performance Next.js, Node.js, and PostgreSQL web platforms.",
      },
      {
        id: "marketplace-platforms",
        label: "E-commerce & Marketplace Engines",
        to: buildServiceNavHref("marketplace-platforms"),
        description: "Dynamic booking grids and custom quote funnels.",
      },
    ],
  },
  {
    id: "strategic-diagnostic-product-studio",
    label: "Strategic Diagnostic & Product Studio",
    links: [
      {
        id: "ai-operational-audit",
        label: "AI Operational Audit (Featured)",
        to: buildServiceNavHref("ai-operational-audit"),
        description: "2-week fixed diagnostic engagement ($3k-$5k) mapping your operational waste.",
        featured: true,
      },
      {
        id: "mvp-development",
        label: "MVP & SaaS Development",
        to: buildServiceNavHref("mvp-development"),
        description: "Rapid 3-to-6 week product engineering for bootstrapped founders.",
      },
    ],
  },
  {
    id: "free-business-utilities",
    label: "Free Business Utilities",
    links: [
      {
        id: "opsflow-playground",
        label: "OpsFlow AI Playground",
        to: ROUTES.opsFlowPlayground,
        description: "Zero-code unstructured document parser converting PDFs/Invoices to Excel.",
      },
    ],
  },
];

export function buildServiceSectionLocation(sectionId: string): { pathname: string; hash: string } {
  return { pathname: ROUTES.services, hash: `#${sectionId}` };
}

export const NAV_DROPDOWN_LINK_CLASS = "nav-dropdown-link" as const;
export const NAV_DROPDOWN_LINK_ACTIVE_CLASS = "nav-dropdown-link--active" as const;
export const NAV_DROPDOWN_PANEL_GLASS_CLASS = "nav-item-dropdown-panel--glass" as const;
export const NAV_MEGA_OVERVIEW_CLASS = "nav-mega-overview" as const;

/** Hover mega-menu content for each desktop nav item. */
export const NAV_DROPDOWN_CONFIGS: NavDropdownConfig[] = [
  {
    id: "products",
    label: "Products",
    overviewTo: ROUTES.trustTap,
    headline: "Product platforms for operations and document intelligence.",
    links: [
      {
        id: "trusttap",
        label: "TrustTap",
        to: ROUTES.trustTap,
        description: "Physical-to-digital operational verification and QR review workflows.",
      },
      {
        id: "opsflow",
        label: "OpsFlow AI",
        to: ROUTES.opsFlow,
        description: "Unstructured document extraction from invoices and PDFs into Excel.",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    overviewTo: ROUTES.services,
    headline: "Full-stack development for ambitious teams.",
    groups: SERVICE_NAV_GROUPS,
    links: SERVICE_NAV_GROUPS.flatMap((group) => group.links),
  },
  {
    id: "work",
    label: "Work",
    overviewTo: ROUTES.caseStudies,
    headline: "Case studies, products, and client outcomes.",
    links: [
      {
        id: "case-studies",
        label: "Case Studies",
        to: ROUTES.caseStudies,
        description: "Detailed technical blueprints and ROI outcomes from our client projects.",
      },
      {
        id: "browse-my-vacation",
        label: "Browse My Vacations",
        to: ROUTES.browseMyVacationCaseStudy,
        description: "Curated travel marketplace platform built with Next.js and custom quote engines.",
      },
      {
        id: "client-stories",
        label: "Client Stories",
        to: ROUTES.testimonials,
        description: "Real outcomes from B2B operations and local businesses.",
      },
    ],
  },
  {
    id: "about",
    label: "About",
    overviewTo: ROUTES.about,
    headline: "Craftsmanship, vision, and how we operate.",
    links: [
      {
        id: "company-overview",
        label: "Company Overview",
        to: ROUTES.about,
        description: "Learn about Commiters, our background, and our team.",
      },
      {
        id: "principles",
        label: "Principles & Core Pillars",
        to: buildAboutSectionHref("principles"),
        description: "How we approach AI engineering, transparency, and product delivery.",
      },
      {
        id: "how-we-work",
        label: "How We Work",
        to: buildAboutSectionHref("how-we-work"),
        description: "Our 2-week sprint model, product-led agency approach, and code standards.",
      },
    ],
  },
];

export type MenuSectionLink = NavDropdownLink;

/** Flat list of all section links (used in tests and mobile panels). */
export const MENU_SECTION_LINKS: MenuSectionLink[] = NAV_DROPDOWN_CONFIGS.flatMap(flattenNavDropdownLinks);

export function resolveNavDropdownConfigs(
  navItems: ReadonlyArray<{ id: string; label: string; to: string; end?: boolean }> = PRIMARY_NAV_ITEMS,
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
