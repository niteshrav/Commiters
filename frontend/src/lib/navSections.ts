import { ROUTES } from "./routes";

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

/** Secondary links grouped under a More menu on desktop. */
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
  { id: "automation-tools", label: "Automation Tools" },
  { id: "ai-integration", label: "AI Integration" },
  { id: "mvp-development", label: "MVP Development" },
];

export function buildServiceSectionHref(sectionId: string): string {
  return `${ROUTES.services}#${sectionId}`;
}

export function buildServiceSectionLocation(sectionId: string): { pathname: string; hash: string } {
  return { pathname: ROUTES.services, hash: `#${sectionId}` };
}

export const NAV_DROPDOWN_LINK_CLASS = "nav-dropdown-link" as const;
export const NAV_DROPDOWN_LINK_ACTIVE_CLASS = "nav-dropdown-link--active" as const;

const SERVICE_SECTION_IDS = new Set(SERVICE_NAV_ENTRIES.map((entry) => entry.id));

/** Active service section when the URL hash matches a known anchor on the Services page. */
export function resolveActiveServiceSectionId(pathname: string, hash: string): string | null {
  if (pathname !== ROUTES.services) return null;
  const sectionId = hash.replace(/^#/, "");
  return SERVICE_SECTION_IDS.has(sectionId) ? sectionId : null;
}
