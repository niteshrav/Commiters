import { SITE_ORIGIN } from "../hooks/usePageSeo";
import { COMMITERS_HEADER_LOGO_SRC } from "./siteBrand";
import { COMMITERS_EMAIL_PRIMARY, COMMITERS_PHONE_DISPLAY, buildTelHref } from "./siteContact";
import {
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
  SITE_MEDIUM_URL,
} from "./siteLinks";

export const SITE_SEO_KEYWORDS =
  "Committers, Committers Softwares, Software Development Company, Web Development, Mobile App Development, SaaS Development" as const;

export const DEFAULT_OG_IMAGE_PATH = COMMITERS_HEADER_LOGO_SRC;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Commiters",
    alternateName: ["Committers", "Committers Softwares"],
    url: SITE_ORIGIN,
    logo: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
    email: COMMITERS_EMAIL_PRIMARY,
    telephone: COMMITERS_PHONE_DISPLAY,
    description:
      "Committers Softwares is a software development company specializing in web development, mobile app development, and SaaS development.",
    sameAs: [SITE_LINKEDIN_URL, SITE_INSTAGRAM_URL, SITE_MEDIUM_URL],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: COMMITERS_EMAIL_PRIMARY,
      telephone: buildTelHref().replace("tel:", ""),
      availableLanguage: ["English", "Hindi"],
    },
  } as const;
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Commiters",
    alternateName: "Committers Softwares",
    url: SITE_ORIGIN,
    publisher: {
      "@type": "Organization",
      name: "Committers Softwares",
      url: SITE_ORIGIN,
    },
  } as const;
}
