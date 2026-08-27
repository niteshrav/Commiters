import { buildAboutSectionHref, buildHomeSectionHref, buildServiceDetailMenuHref } from "./navSections";
import { ROUTES } from "./routes";
import { buildDiscoveryCallCalendarUrl, buildWhatsAppUrl } from "./siteContact";
import { SITE_GITHUB_URL, SITE_LINKEDIN_URL } from "./siteLinks";

export type FooterInternalLink = {
  kind: "internal";
  label: string;
  to: string;
  badge?: string;
};

export type FooterExternalLink = {
  kind: "external";
  label: string;
  href: string;
  external: true;
};

export type FooterLinkCell = FooterInternalLink | FooterExternalLink;

export type FooterNavColumn = {
  id: string;
  heading: string;
  links: readonly FooterLinkCell[];
};

export const SITE_FOOTER_MAX_LINKS_PER_COLUMN = 7 as const;

export const SITE_FOOTER_BRAND_TAGLINE =
  "Engineering precision for world-class digital products and scalable enterprise architectures." as const;

/** @deprecated Use SITE_FOOTER_BRAND_TAGLINE */
export const SITE_FOOTER_TAGLINE = SITE_FOOTER_BRAND_TAGLINE;

export const SITE_FOOTER_PRODUCTS_NAV_LINK_LABELS = [
  "OpsFlow AI",
  "TrustTap",
  "Custom Web Applications",
  "AI Integrations",
  "Automation Tools",
] as const;

/** @deprecated Use SITE_FOOTER_PRODUCTS_NAV_LINK_LABELS */
export const SITE_FOOTER_PRIMARY_NAV_LINK_LABELS = SITE_FOOTER_PRODUCTS_NAV_LINK_LABELS;

export const SITE_FOOTER_SERVICES_NAV_LINK_LABELS = SITE_FOOTER_PRODUCTS_NAV_LINK_LABELS;

export const SITE_FOOTER_COMPANY_NAV_LINK_LABELS = [
  "About Us",
  "Core Pillars",
  "How We Work",
  "Case Studies / Work",
  "Careers",
] as const;

export const SITE_FOOTER_RESOURCES_LINK_LABELS = [
  "Blog & Insights",
  "FAQ",
  "Contact Us",
  "Book Consultation",
] as const;

export const SITE_FOOTER_OPSFLOW_PARSER_BADGE = "PARSER" as const;
export const SITE_FOOTER_TRUSTTAP_PRODUCT_BADGE = "PRODUCT" as const;
export const SITE_FOOTER_CAREERS_HIRING_BADGE = "WE'RE HIRING" as const;

export const SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS = ["Privacy Policy", "Terms of Service", "Site Map"] as const;

export const SITE_FOOTER_NAV_LINK_LABELS = [
  ...SITE_FOOTER_PRODUCTS_NAV_LINK_LABELS,
  ...SITE_FOOTER_COMPANY_NAV_LINK_LABELS,
  ...SITE_FOOTER_RESOURCES_LINK_LABELS,
] as const;

const SITE_FOOTER_PRODUCTS_NAV_LINKS = [
  { kind: "internal", label: "OpsFlow AI", to: ROUTES.opsFlow, badge: SITE_FOOTER_OPSFLOW_PARSER_BADGE },
  { kind: "internal", label: "TrustTap", to: ROUTES.trustTap, badge: SITE_FOOTER_TRUSTTAP_PRODUCT_BADGE },
  { kind: "internal", label: "Custom Web Applications", to: ROUTES.webApplications },
  { kind: "internal", label: "AI Integrations", to: buildServiceDetailMenuHref("ai-integration") },
  { kind: "internal", label: "Automation Tools", to: buildServiceDetailMenuHref("automation-tools") },
] as const satisfies readonly FooterLinkCell[];

const SITE_FOOTER_COMPANY_NAV_LINKS = [
  { kind: "internal", label: "About Us", to: ROUTES.about },
  { kind: "internal", label: "Core Pillars", to: buildHomeSectionHref("core-pillars") },
  { kind: "internal", label: "How We Work", to: buildAboutSectionHref("how-we-work") },
  { kind: "internal", label: "Case Studies / Work", to: ROUTES.caseStudies },
  { kind: "internal", label: "Careers", to: ROUTES.openPositions, badge: SITE_FOOTER_CAREERS_HIRING_BADGE },
] as const satisfies readonly FooterLinkCell[];

const SITE_FOOTER_RESOURCES_LINKS = [
  { kind: "internal", label: "Blog & Insights", to: ROUTES.technicalLedger },
  { kind: "internal", label: "FAQ", to: ROUTES.faq },
  { kind: "internal", label: "Contact Us", to: ROUTES.contact },
  { kind: "external", label: "Book Consultation", href: buildDiscoveryCallCalendarUrl(), external: true },
] as const satisfies readonly FooterLinkCell[];

const SITE_FOOTER_BOTTOM_LEGAL_LINKS = [
  { kind: "internal", label: "Privacy Policy", to: ROUTES.privacyPolicy },
  { kind: "internal", label: "Terms of Service", to: ROUTES.terms },
  { kind: "internal", label: "Site Map", to: ROUTES.sitemap },
] as const satisfies readonly FooterLinkCell[];

export const SITE_FOOTER_SOCIAL_LINK_LABELS = ["LinkedIn", "WhatsApp", "GitHub"] as const;
export const SITE_FOOTER_CONNECT_LINK_LABELS = SITE_FOOTER_SOCIAL_LINK_LABELS;

export const SITE_FOOTER_CONNECT_LINKS = [
  { kind: "external", label: "LinkedIn", href: SITE_LINKEDIN_URL, external: true },
  { kind: "external", label: "WhatsApp", href: buildWhatsAppUrl(), external: true },
  { kind: "external", label: "GitHub", href: SITE_GITHUB_URL, external: true },
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

function footerLinkUrl(link: FooterLinkCell | undefined): string {
  if (!link) return ROUTES.home;
  return link.kind === "internal" ? link.to : link.href;
}

export const SITE_FOOTER_DEFAULT_NAVIGATION_LINKS: readonly FooterNavLinkRecord[] = SITE_FOOTER_NAV_LINK_LABELS.map(
  (label, index) => {
    const link = [
      ...SITE_FOOTER_PRODUCTS_NAV_LINKS,
      ...SITE_FOOTER_COMPANY_NAV_LINKS,
      ...SITE_FOOTER_RESOURCES_LINKS,
    ].find((entry) => entry.label === label);
    return {
      label,
      url: footerLinkUrl(link),
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
  copyrightLine1: "Copyright 2026 © Commiters Softwares. All Rights Reserved.",
  socialLinks: SITE_FOOTER_CONNECT_LINKS,
  bottomLegalLinks: SITE_FOOTER_BOTTOM_LEGAL_LINKS,
  navLinks: [
    ...SITE_FOOTER_PRODUCTS_NAV_LINKS,
    ...SITE_FOOTER_COMPANY_NAV_LINKS,
    ...SITE_FOOTER_RESOURCES_LINKS,
  ] as const,
  navColumns: [
    {
      id: "products",
      heading: "Products & Solutions",
      links: SITE_FOOTER_PRODUCTS_NAV_LINKS,
    },
    {
      id: "company",
      heading: "Company",
      links: SITE_FOOTER_COMPANY_NAV_LINKS,
    },
    {
      id: "resources",
      heading: "Resources & Contact",
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
