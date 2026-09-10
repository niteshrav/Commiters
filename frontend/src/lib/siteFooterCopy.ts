import { buildServiceDetailMenuHref } from "./navSections";
import { ROUTES } from "./routes";
import { SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_MEDIUM_URL } from "./siteLinks";

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

export const SITE_FOOTER_BRAND_TAGLINE = "Commiters — Enterprise AI & Cloud Systems" as const;
export const SITE_FOOTER_BRAND_SUBTEXT = "Commit. Code. Connect." as const;

/** @deprecated Use SITE_FOOTER_BRAND_TAGLINE */
export const SITE_FOOTER_TAGLINE = SITE_FOOTER_BRAND_TAGLINE;

export const SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS = [
  "OpsFlow AI",
  "TrustTap",
  "Spec-Driven Full-Stack Platforms",
  "AI Operational Audits",
  "Governed AI & Workflow Systems",
  "Free Business Utilities",
] as const;

/** @deprecated Use SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS */
export const SITE_FOOTER_PRODUCTS_NAV_LINK_LABELS = SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS;

/** @deprecated Use SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS */
export const SITE_FOOTER_PRIMARY_NAV_LINK_LABELS = SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS;

/** @deprecated Use SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS */
export const SITE_FOOTER_SERVICES_NAV_LINK_LABELS = SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS;

export const SITE_FOOTER_ENGINEERING_NAV_LINK_LABELS = [
  "Automated E-commerce Systems",
  "B2B Web Applications",
  "Mobile Application Development",
  "Rapid SaaS MVP Development",
  "Automation & Integration Tools",
  "Workflow & Process Automation",
] as const;

/** @deprecated Use SITE_FOOTER_ENGINEERING_NAV_LINK_LABELS */
export const SITE_FOOTER_RESOURCES_LINK_LABELS = SITE_FOOTER_ENGINEERING_NAV_LINK_LABELS;

export const SITE_FOOTER_COMPANY_NAV_LINK_LABELS = [
  "About Us",
  "Client Work",
  "Services",
  "Jobs",
  "FAQ",
  "Blog",
  "Contact",
] as const;

export const SITE_FOOTER_OPSFLOW_PARSER_BADGE = "PARSER" as const;
export const SITE_FOOTER_TRUSTTAP_PRODUCT_BADGE = "PRODUCT" as const;
export const SITE_FOOTER_CAREERS_HIRING_BADGE = "WE'RE HIRING" as const;

export const SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS = ["Privacy", "Terms"] as const;

export const SITE_FOOTER_NAV_LINK_LABELS = [
  ...SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS,
  ...SITE_FOOTER_ENGINEERING_NAV_LINK_LABELS,
  ...SITE_FOOTER_COMPANY_NAV_LINK_LABELS,
] as const;

const SITE_FOOTER_FLAGSHIP_NAV_LINKS = [
  { kind: "internal", label: "OpsFlow AI", to: ROUTES.opsFlowPlayground },
  { kind: "internal", label: "TrustTap", to: ROUTES.trustTap },
  { kind: "internal", label: "Spec-Driven Full-Stack Platforms", to: ROUTES.webApplications },
  { kind: "internal", label: "AI Operational Audits", to: ROUTES.aiOperationalAudit },
  { kind: "internal", label: "Governed AI & Workflow Systems", to: ROUTES.aiSolutions },
  { kind: "internal", label: "Free Business Utilities", to: ROUTES.utilities },
] as const satisfies readonly FooterLinkCell[];

const SITE_FOOTER_ENGINEERING_NAV_LINKS = [
  { kind: "internal", label: "Automated E-commerce Systems", to: buildServiceDetailMenuHref("e-commerce-development") },
  { kind: "internal", label: "B2B Web Applications", to: ROUTES.webApplications },
  { kind: "internal", label: "Mobile Application Development", to: buildServiceDetailMenuHref("mobile-app-development") },
  { kind: "internal", label: "Rapid SaaS MVP Development", to: buildServiceDetailMenuHref("mvp-development") },
  { kind: "internal", label: "Automation & Integration Tools", to: buildServiceDetailMenuHref("automation-tools") },
  { kind: "internal", label: "Workflow & Process Automation", to: ROUTES.workflowAutomation },
] as const satisfies readonly FooterLinkCell[];

const SITE_FOOTER_COMPANY_NAV_LINKS = [
  { kind: "internal", label: "About Us", to: ROUTES.about },
  { kind: "internal", label: "Client Work", to: ROUTES.caseStudies },
  { kind: "internal", label: "Services", to: ROUTES.services },
  { kind: "internal", label: "Jobs", to: ROUTES.openPositions, badge: SITE_FOOTER_CAREERS_HIRING_BADGE },
  { kind: "internal", label: "FAQ", to: ROUTES.faq },
  { kind: "internal", label: "Blog", to: ROUTES.technicalLedger },
  { kind: "internal", label: "Contact", to: ROUTES.contact },
] as const satisfies readonly FooterLinkCell[];

const SITE_FOOTER_BOTTOM_LEGAL_LINKS = [
  { kind: "internal", label: "Privacy", to: ROUTES.privacy },
  { kind: "internal", label: "Terms", to: ROUTES.terms },
] as const satisfies readonly FooterLinkCell[];

export const SITE_FOOTER_SOCIAL_LINK_LABELS = ["LinkedIn", "Instagram", "Medium", "GitHub"] as const;
export const SITE_FOOTER_CONNECT_LINK_LABELS = SITE_FOOTER_SOCIAL_LINK_LABELS;

export const SITE_FOOTER_CONNECT_LINKS = [
  { kind: "external", label: "LinkedIn", href: SITE_LINKEDIN_URL, external: true },
  { kind: "external", label: "Instagram", href: SITE_INSTAGRAM_URL, external: true },
  { kind: "external", label: "Medium", href: SITE_MEDIUM_URL, external: true },
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
      ...SITE_FOOTER_FLAGSHIP_NAV_LINKS,
      ...SITE_FOOTER_ENGINEERING_NAV_LINKS,
      ...SITE_FOOTER_COMPANY_NAV_LINKS,
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
  brandSubtext: SITE_FOOTER_BRAND_SUBTEXT,
  copyrightLine1: "© Commiters Softwares. All rights reserved.",
  socialLinks: SITE_FOOTER_CONNECT_LINKS,
  bottomLegalLinks: SITE_FOOTER_BOTTOM_LEGAL_LINKS,
  navLinks: [
    ...SITE_FOOTER_FLAGSHIP_NAV_LINKS,
    ...SITE_FOOTER_ENGINEERING_NAV_LINKS,
    ...SITE_FOOTER_COMPANY_NAV_LINKS,
  ] as const,
  navColumns: [
    {
      id: "flagship",
      heading: "Flagship Solutions & Products",
      links: SITE_FOOTER_FLAGSHIP_NAV_LINKS,
    },
    {
      id: "engineering",
      heading: "Full-Lifecycle Engineering Services",
      links: SITE_FOOTER_ENGINEERING_NAV_LINKS,
    },
    {
      id: "company",
      heading: "Company",
      links: SITE_FOOTER_COMPANY_NAV_LINKS,
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
