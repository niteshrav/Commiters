import { ROUTES } from "./routes";
import { buildWhatsAppUrl } from "./siteContact";
import {
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
  SITE_MEDIUM_URL,
} from "./siteLinks";

export type FooterInternalLink = {
  kind: "internal";
  label: string;
  to: string;
};

export type FooterExternalLink = {
  kind: "external";
  label: string;
  href: string;
  external: true;
};

export type FooterLinkCell = FooterInternalLink | FooterExternalLink;

export type FooterNavColumn = {
  heading: string;
  links: readonly FooterLinkCell[];
};

export const SITE_FOOTER_MAX_LINKS_PER_COLUMN = 5 as const;

export const SITE_FOOTER_BRAND_TAGLINE =
  "Engineering Precision for world-class digital products." as const;

/** @deprecated Use SITE_FOOTER_BRAND_TAGLINE */
export const SITE_FOOTER_TAGLINE = SITE_FOOTER_BRAND_TAGLINE;

export const SITE_FOOTER_PRIMARY_NAV_LINK_LABELS = [
  "Principles",
  "Core Pillars",
  "Product",
  "Services",
  "How We Work",
] as const;

export const SITE_FOOTER_COMPANY_NAV_LINK_LABELS = [
  "Work",
  "Contact",
  "FAQ",
  "Blog",
  "Testimonials",
] as const;

export const SITE_FOOTER_RESOURCES_LINK_LABELS = ["Careers", "Join Us"] as const;

export const SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS = ["Privacy", "Terms"] as const;

export const SITE_FOOTER_NAV_LINK_LABELS = [
  ...SITE_FOOTER_PRIMARY_NAV_LINK_LABELS,
  ...SITE_FOOTER_COMPANY_NAV_LINK_LABELS,
  ...SITE_FOOTER_RESOURCES_LINK_LABELS,
] as const;

const SITE_FOOTER_PRIMARY_NAV_LINKS = [
  { kind: "internal", label: "Principles", to: `${ROUTES.about}#principles` },
  { kind: "internal", label: "Core Pillars", to: `${ROUTES.home}#core-pillars` },
  { kind: "internal", label: "Product", to: ROUTES.trustTap },
  { kind: "internal", label: "Services", to: ROUTES.services },
  { kind: "internal", label: "How We Work", to: `${ROUTES.services}#how-we-work` },
] as const satisfies readonly FooterLinkCell[];

const SITE_FOOTER_COMPANY_NAV_LINKS = [
  { kind: "internal", label: "Work", to: ROUTES.caseStudies },
  { kind: "internal", label: "Contact", to: ROUTES.contact },
  { kind: "internal", label: "FAQ", to: ROUTES.faq },
  { kind: "internal", label: "Blog", to: ROUTES.technicalLedger },
  { kind: "internal", label: "Testimonials", to: ROUTES.testimonials },
] as const satisfies readonly FooterLinkCell[];

const SITE_FOOTER_RESOURCES_LINKS = [
  { kind: "internal", label: "Careers", to: ROUTES.openPositions },
  { kind: "internal", label: "Join Us", to: ROUTES.joinUs },
] as const satisfies readonly FooterLinkCell[];

const SITE_FOOTER_BOTTOM_LEGAL_LINKS = [
  { kind: "internal", label: "Privacy", to: ROUTES.privacyPolicy },
  { kind: "internal", label: "Terms", to: ROUTES.terms },
] as const satisfies readonly FooterLinkCell[];

export const SITE_FOOTER_SOCIAL_LINK_LABELS = ["LinkedIn", "WhatsApp", "Instagram", "Medium"] as const;
export const SITE_FOOTER_CONNECT_LINK_LABELS = SITE_FOOTER_SOCIAL_LINK_LABELS;

export const SITE_FOOTER_CONNECT_LINKS = [
  { kind: "external", label: "LinkedIn", href: SITE_LINKEDIN_URL, external: true },
  { kind: "external", label: "WhatsApp", href: buildWhatsAppUrl(), external: true },
  { kind: "external", label: "Instagram", href: SITE_INSTAGRAM_URL, external: true },
  { kind: "external", label: "Medium", href: SITE_MEDIUM_URL, external: true },
] as const satisfies readonly FooterLinkCell[];

/** @deprecated Use SITE_FOOTER_PRIMARY_NAV_LINK_LABELS */
export const SITE_FOOTER_NAVIGATION_LINK_LABELS = SITE_FOOTER_PRIMARY_NAV_LINK_LABELS;
/** @deprecated Use SITE_FOOTER_COMPANY_NAV_LINK_LABELS */
export const SITE_FOOTER_SITEMAP_LINK_LABELS = SITE_FOOTER_PRIMARY_NAV_LINK_LABELS;
/** @deprecated Use SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS */
export const SITE_FOOTER_LEGAL_LINK_LABELS = ["Privacy", "Cookies", "Terms"] as const;

export type FooterNavLinkRecord = {
  label: string;
  url: string;
  order: number;
};

export const SITE_FOOTER_DEFAULT_NAVIGATION_LINKS: readonly FooterNavLinkRecord[] = SITE_FOOTER_NAV_LINK_LABELS.map(
  (label, index) => {
    const link = [...SITE_FOOTER_PRIMARY_NAV_LINKS, ...SITE_FOOTER_COMPANY_NAV_LINKS, ...SITE_FOOTER_RESOURCES_LINKS].find(
      (entry) => entry.label === label,
    );
    return {
      label,
      url: link && link.kind === "internal" ? link.to : ROUTES.home,
      order: index + 1,
    };
  },
);

export const SITE_FOOTER_DEFAULT_LEGAL_LINKS: readonly FooterNavLinkRecord[] = SITE_FOOTER_BOTTOM_LEGAL_LINKS.map(
  (link, index) => ({
    label: link.label,
    url: link.to,
    order: index + 1,
  }),
);

export const SITE_FOOTER_COPY = {
  brandTagline: SITE_FOOTER_BRAND_TAGLINE,
  copyrightLine1: "Copyright 2026 (C) Commiters. All Rights Reserved.",
  socialLinks: SITE_FOOTER_CONNECT_LINKS,
  bottomLegalLinks: SITE_FOOTER_BOTTOM_LEGAL_LINKS,
  navLinks: [...SITE_FOOTER_PRIMARY_NAV_LINKS, ...SITE_FOOTER_COMPANY_NAV_LINKS, ...SITE_FOOTER_RESOURCES_LINKS] as const,
  navColumns: [
    {
      heading: "PRIMARY",
      links: SITE_FOOTER_PRIMARY_NAV_LINKS,
    },
    {
      heading: "COMPANY",
      links: SITE_FOOTER_COMPANY_NAV_LINKS,
    },
    {
      heading: "RESOURCES",
      links: SITE_FOOTER_RESOURCES_LINKS,
    },
  ] as const satisfies readonly FooterNavColumn[],
} as const;

/** @deprecated Footer layout is unified across routes. */
export const SITE_FOOTER_CONTACT_NAV_COLUMNS = SITE_FOOTER_COPY.navColumns;
/** @deprecated */
export const CONTACT_STYLE_FOOTER_PATHS = [] as const;

export function usesContactStyleFooter(_pathname: string): boolean {
  return false;
}

export function resolveSiteFooterNavColumns(_pathname: string): readonly FooterNavColumn[] {
  return SITE_FOOTER_COPY.navColumns;
}

export function formatFooterColumnHeading(heading: string): string {
  return heading;
}

export function isSocialFooterColumn(heading: string): boolean {
  const normalized = heading.trim().toLowerCase();
  return normalized === "social" || normalized === "connect";
}
