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

export const SITE_FOOTER_TAGLINE = "Engineering Precision for world-class digital products." as const;

export const SITE_FOOTER_PRIMARY_NAV_LINK_LABELS = [
  "Home",
  "About",
  "Our Work",
  "Technical Ledger",
  "Services",
  "Join Us",
  "FAQ",
  "Contact",
] as const;

export const SITE_FOOTER_NAVIGATION_LINK_LABELS = SITE_FOOTER_PRIMARY_NAV_LINK_LABELS;
export const SITE_FOOTER_SITEMAP_LINK_LABELS = SITE_FOOTER_PRIMARY_NAV_LINK_LABELS;

export const SITE_FOOTER_SOCIAL_LINK_LABELS = ["LinkedIn", "WhatsApp", "Instagram", "Medium"] as const;
export const SITE_FOOTER_CONNECT_LINK_LABELS = SITE_FOOTER_SOCIAL_LINK_LABELS;

const SITE_FOOTER_PRIMARY_NAV_LINKS = [
  { kind: "internal", label: "Home", to: ROUTES.home },
  { kind: "internal", label: "About", to: ROUTES.about },
  { kind: "internal", label: "Our Work", to: ROUTES.caseStudies },
  { kind: "internal", label: "Technical Ledger", to: ROUTES.technicalLedger },
  { kind: "internal", label: "Services", to: ROUTES.services },
  { kind: "internal", label: "Join Us", to: ROUTES.joinUs },
  { kind: "internal", label: "FAQ", to: ROUTES.faq },
  { kind: "internal", label: "Contact", to: ROUTES.contact },
] as const satisfies readonly FooterLinkCell[];

export const SITE_FOOTER_CONNECT_LINKS = [
  { kind: "external", label: "LinkedIn", href: SITE_LINKEDIN_URL, external: true },
  { kind: "external", label: "WhatsApp", href: buildWhatsAppUrl(), external: true },
  { kind: "external", label: "Instagram", href: SITE_INSTAGRAM_URL, external: true },
  { kind: "external", label: "Medium", href: SITE_MEDIUM_URL, external: true },
] as const satisfies readonly FooterLinkCell[];

const SITE_FOOTER_LEGAL_LINKS = [
  { kind: "internal", label: "Privacy", to: ROUTES.privacyPolicy },
  { kind: "internal", label: "Cookies", to: ROUTES.cookiePolicy },
  { kind: "internal", label: "Terms", to: ROUTES.terms },
] as const satisfies readonly FooterLinkCell[];

export const SITE_FOOTER_LEGAL_LINK_LABELS = ["Privacy", "Cookies", "Terms"] as const;

export type FooterNavLinkRecord = {
  label: string;
  url: string;
  order: number;
};

export const SITE_FOOTER_DEFAULT_NAVIGATION_LINKS: readonly FooterNavLinkRecord[] = [
  { label: "Home", url: ROUTES.home, order: 1 },
  { label: "About", url: ROUTES.about, order: 2 },
  { label: "Our Work", url: ROUTES.caseStudies, order: 3 },
  { label: "Technical Ledger", url: ROUTES.technicalLedger, order: 4 },
  { label: "Services", url: ROUTES.services, order: 5 },
  { label: "Join Us", url: ROUTES.joinUs, order: 6 },
  { label: "FAQ", url: ROUTES.faq, order: 7 },
  { label: "Contact", url: ROUTES.contact, order: 8 },
] as const;

export const SITE_FOOTER_DEFAULT_LEGAL_LINKS: readonly FooterNavLinkRecord[] = [
  { label: "Privacy", url: ROUTES.privacyPolicy, order: 1 },
  { label: "Cookies", url: ROUTES.cookiePolicy, order: 2 },
  { label: "Terms", url: ROUTES.terms, order: 3 },
] as const;

export const SITE_FOOTER_COPY = {
  copyrightLine1: "© 2026 Commiters Softwares.",
  copyrightLine2: SITE_FOOTER_TAGLINE,
  navColumns: [
    {
      heading: "NAVIGATION",
      links: SITE_FOOTER_PRIMARY_NAV_LINKS,
    },
    {
      heading: "SOCIAL",
      links: SITE_FOOTER_CONNECT_LINKS,
    },
    {
      heading: "LEGAL",
      links: SITE_FOOTER_LEGAL_LINKS,
    },
  ] as const satisfies readonly FooterNavColumn[],
} as const;

/** Contact page footer columns from the Stitch screenshot. */
export const SITE_FOOTER_CONTACT_NAV_COLUMNS = [
  {
    heading: "SITEMAP",
    links: SITE_FOOTER_PRIMARY_NAV_LINKS,
  },
  {
    heading: "CONNECT",
    links: SITE_FOOTER_CONNECT_LINKS,
  },
  {
    heading: "LEGAL",
    links: SITE_FOOTER_LEGAL_LINKS,
  },
] as const satisfies readonly FooterNavColumn[];

/** Routes that share the contact page footer (Sitemap / Connect / Legal). */
export const CONTACT_STYLE_FOOTER_PATHS = [ROUTES.contact, ROUTES.cookiePolicy] as const;

export function usesContactStyleFooter(pathname: string): boolean {
  return (CONTACT_STYLE_FOOTER_PATHS as readonly string[]).includes(pathname);
}

export function resolveSiteFooterNavColumns(pathname: string): readonly FooterNavColumn[] {
  if (usesContactStyleFooter(pathname)) {
    return SITE_FOOTER_CONTACT_NAV_COLUMNS;
  }

  return SITE_FOOTER_COPY.navColumns;
}
