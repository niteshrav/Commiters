import { SITE_ORIGIN } from "../hooks/usePageSeo";
import { COMMITERS_HEADER_LOGO_SRC } from "./siteBrand";
import { CONTACT_STUDIO } from "./contactPageContent";
import { OFFICE_MAP_COORDINATES } from "./officeMap";
import { COMMITERS_EMAIL_PRIMARY, COMMITERS_PHONE_DISPLAY, buildTelHref } from "./siteContact";
import {
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
  SITE_MEDIUM_URL,
  SITE_YOUTUBE_URL,
} from "./siteLinks";

export const SITE_SEO_KEYWORDS =
  "Commiters, Commiters Softwares, Software Development Company, Web Development, Mobile App Development, SaaS Development, Enterprise AI, Cloud Systems, Spec-driven engineering" as const;

export const DEFAULT_OG_IMAGE_PATH = COMMITERS_HEADER_LOGO_SRC;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SITE_POSTAL_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "82, Sobhagya Nagar, Nakoda Nagar",
  addressLocality: "Udaipur",
  addressRegion: "Rajasthan",
  postalCode: "313001",
  addressCountry: "IN",
};

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Commiters",
    alternateName: ["Commiters Softwares"],
    url: SITE_ORIGIN,
    logo: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
    email: COMMITERS_EMAIL_PRIMARY,
    telephone: COMMITERS_PHONE_DISPLAY,
    description:
      "Commiters — Enterprise AI & Cloud Systems. Spec-driven engineering, custom AI pipelines, and enterprise software architectures.",
    address: SITE_POSTAL_ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: OFFICE_MAP_COORDINATES.lat,
      longitude: OFFICE_MAP_COORDINATES.lng,
    },
    sameAs: [SITE_LINKEDIN_URL, SITE_INSTAGRAM_URL, SITE_MEDIUM_URL, SITE_YOUTUBE_URL],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: COMMITERS_EMAIL_PRIMARY,
      telephone: buildTelHref().replace("tel:", ""),
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
  } as const;
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: CONTACT_STUDIO.title,
    url: SITE_ORIGIN,
    image: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
    email: COMMITERS_EMAIL_PRIMARY,
    telephone: COMMITERS_PHONE_DISPLAY,
    address: SITE_POSTAL_ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: OFFICE_MAP_COORDINATES.lat,
      longitude: OFFICE_MAP_COORDINATES.lng,
    },
    areaServed: {
      "@type": "City",
      name: "Udaipur",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Commiters",
      url: SITE_ORIGIN,
    },
  } as const;
}

export function buildFaqPageSchema(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } as const;
}

export function buildBreadcrumbSchema(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  } as const;
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Commiters",
    alternateName: "Commiters Softwares",
    url: SITE_ORIGIN,
    publisher: {
      "@type": "Organization",
      name: "Commiters Softwares",
      url: SITE_ORIGIN,
    },
  } as const;
}
