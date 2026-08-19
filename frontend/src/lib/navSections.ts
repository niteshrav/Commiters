import { ROUTES } from "./routes";
import { resolveServiceDetailHref } from "./services";

export type ServiceNavEntry = { id: string; label: string };

export type PrimaryNavItem = {
  id: string;
  to: string;
  label: string;
  end?: boolean;
};

/** Primary header navigation — Services appears before Work. */
export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { id: "home", to: ROUTES.home, label: "Home", end: true },
  { id: "about", to: ROUTES.about, label: "About" },
  { id: "services", to: ROUTES.services, label: "Services" },
  { id: "work", to: ROUTES.caseStudies, label: "Work" },
  { id: "trusttap", to: ROUTES.trustTap, label: "TrustTap" },
  { id: "testimonials", to: ROUTES.testimonials, label: "Testimonials" },
  { id: "blog", to: ROUTES.technicalLedger, label: "Blog" },
  { id: "careers", to: ROUTES.openPositions, label: "Careers" },
  { id: "contact", to: ROUTES.contact, label: "Contact" },
];

/** Desktop bar links shown in the header. */
export const DESKTOP_HEADER_BAR_IDS = ["home", "about", "services", "work", "trusttap", "careers", "contact"] as const;

/** @deprecated Secondary links now live inside nav dropdown panels. */
export const DESKTOP_HEADER_MORE_IDS = ["testimonials", "blog"] as const;

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
};

export type NavDropdownConfig = {
  id: string;
  label: string;
  overviewTo: string;
  overviewLabel?: string;
  headline: string;
  end?: boolean;
  links: NavDropdownLink[];
};

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

export function buildServiceSectionLocation(sectionId: string): { pathname: string; hash: string } {
  return { pathname: ROUTES.services, hash: `#${sectionId}` };
}

export const NAV_DROPDOWN_LINK_CLASS = "nav-dropdown-link" as const;
export const NAV_DROPDOWN_LINK_ACTIVE_CLASS = "nav-dropdown-link--active" as const;
export const NAV_MEGA_OVERVIEW_CLASS = "nav-mega-overview" as const;

/** Hover mega-menu content for each desktop nav item. */
export const NAV_DROPDOWN_CONFIGS: NavDropdownConfig[] = [
  {
    id: "home",
    label: "Home",
    overviewTo: ROUTES.home,
    end: true,
    headline: "Engineering precision for world-class digital products.",
    links: [{ id: "core-pillars", label: "Core Pillars", to: buildHomeSectionHref("core-pillars") }],
  },
  {
    id: "about",
    label: "About",
    overviewTo: ROUTES.about,
    headline: "Craftsmanship, vision, and how we operate.",
    links: [
      { id: "vision", label: "Vision", to: buildAboutSectionHref("vision") },
      { id: "principles", label: "Operating Principles", to: buildAboutSectionHref("principles") },
    ],
  },
  {
    id: "services",
    label: "Services",
    overviewTo: ROUTES.services,
    headline: "Full-stack development for ambitious teams.",
    links: [
      { id: "how-we-work", label: "How We Work", to: buildServiceSectionHref("how-we-work") },
      ...SERVICE_NAV_ENTRIES.map((entry) => ({
        id: entry.id,
        label: entry.label,
        to: buildServiceDetailMenuHref(entry.id),
      })),
    ],
  },
  {
    id: "work",
    label: "Work",
    overviewTo: ROUTES.caseStudies,
    headline: "Case studies, products, and client outcomes.",
    links: [
      { id: "commiters", label: "Commiters.com", to: ROUTES.commitersCaseStudy },
      { id: "ai-summarizer", label: "AI Summarizer", to: ROUTES.aiSummarizerCaseStudy },
      { id: "multi-role-crm", label: "Multi-Role CRM", to: ROUTES.multiRoleCrmCaseStudy },
      { id: "neardrop-mvp", label: "NearDrop MVP", to: ROUTES.neardropCaseStudy },
      { id: "browse-my-vacation", label: "BrowseMyVacation", to: ROUTES.browseMyVacationCaseStudy },
      { id: "testimonials", label: "Testimonials", to: ROUTES.testimonials },
    ],
  },
  {
    id: "trusttap",
    label: "TrustTap",
    overviewTo: ROUTES.trustTap,
    headline: "Trust and verification for digital commerce.",
    links: [
      { id: "trusttap-features", label: "Features", to: buildTrustTapSectionHref("trusttap-features") },
      { id: "trusttap-benefits", label: "Benefits", to: buildTrustTapSectionHref("trusttap-benefits") },
      { id: "trusttap-how-it-works", label: "How It Works", to: buildTrustTapSectionHref("trusttap-how-it-works") },
    ],
  },
  {
    id: "careers",
    label: "Careers",
    overviewTo: ROUTES.openPositions,
    headline: "Join the team building precision software.",
    links: [
      { id: "open-positions", label: "Open Positions", to: ROUTES.openPositions },
      { id: "join-us", label: "Join Us", to: ROUTES.joinUs },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    overviewTo: ROUTES.contact,
    headline: "Start a project or get answers fast.",
    links: [
      { id: "contact-us", label: "Contact Us", to: ROUTES.contact },
      { id: "faq", label: "FAQ", to: ROUTES.faq },
      { id: "blog", label: "Blog", to: ROUTES.technicalLedger },
    ],
  },
];

export type MenuSectionLink = NavDropdownLink;

/** Flat list of all section links (used in tests and mobile panels). */
export const MENU_SECTION_LINKS: MenuSectionLink[] = NAV_DROPDOWN_CONFIGS.flatMap((config) => config.links);

export function resolveNavDropdownConfigs(
  navItems: ReadonlyArray<{ id: string; label: string; to: string; end?: boolean }> = PRIMARY_NAV_ITEMS,
): NavDropdownConfig[] {
  const configById = new Map(NAV_DROPDOWN_CONFIGS.map((config) => [config.id, config]));
  const navById = new Map(navItems.map((item) => [item.id, item]));

  return DESKTOP_HEADER_BAR_IDS.map((id) => {
    const config = configById.get(id);
    if (!config) return null;
    const navItem = navById.get(id);
    return {
      ...config,
      label: navItem?.label ?? config.label,
      overviewTo: navItem?.to ?? config.overviewTo,
      end: navItem?.end ?? config.end,
    };
  }).filter((config): config is NavDropdownConfig => Boolean(config));
}

export function isNavDropdownActive(config: NavDropdownConfig, pathname: string): boolean {
  if (config.end) {
    if (pathname === config.overviewTo) return true;
  } else if (pathname === config.overviewTo || pathname.startsWith(`${config.overviewTo}/`)) {
    return true;
  }

  return config.links.some((link) => {
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
