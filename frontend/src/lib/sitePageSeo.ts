import type { PageSeoInput } from "../hooks/usePageSeo";
import { AI_SUMMARIZER_CASE_STUDY_COPY } from "./aiSummarizerCaseStudyContent";
import { COMMITERS_CASE_STUDY_COPY } from "./commitersCaseStudyContent";
import { COOKIE_PAGE_COPY } from "./cookiePageContent";
import { FAQ_PAGE_COPY } from "./faqPageContent";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "./multiRoleCrmCaseStudyContent";
import { NEARDROP_CASE_STUDY_COPY } from "./neardropCaseStudyContent";
import { NEXTSAAS_CASE_STUDY_COPY } from "./nextsaasCaseStudyContent";
import { PRIVACY_PAGE_COPY } from "./privacyPageContent";
import { ROUTES } from "./routes";
import { DEFAULT_DOCUMENT_TITLE, pageTitle } from "./siteMeta";
import { SITE_SEO_KEYWORDS, buildWebSiteSchema } from "./siteSeo";
import { SITE_ORIGIN } from "../hooks/usePageSeo";
import { TRUSTTAP_SEO } from "./trustTapPageContent";
import { TECHNICAL_LEDGER_PAGE_COPY } from "./technicalLedgerPageContent";
import { TESTIMONIALS_PAGE_COPY } from "./testimonialsPageContent";

function page(input: PageSeoInput): PageSeoInput {
  return {
    ogType: "website",
    keywords: SITE_SEO_KEYWORDS,
    ...input,
  };
}

export function homePageSeo(): PageSeoInput {
  return page({
    title: DEFAULT_DOCUMENT_TITLE,
    description:
      "Committers Softwares is a software development company for web development, mobile app development, and SaaS development—building premium products for startups and growing businesses worldwide.",
    path: ROUTES.home,
    structuredData: buildWebSiteSchema(),
  });
}

export function aboutPageSeo(): PageSeoInput {
  return page({
    title: pageTitle("About Committers Softwares"),
    description:
      "Learn about Committers Softwares—a software development company focused on web development, mobile app development, and SaaS development with engineering precision.",
    path: ROUTES.about,
  });
}

export function servicesPageSeo(): PageSeoInput {
  return page({
    title: pageTitle("Web Development & Mobile App Development Services"),
    description:
      "Explore Committers services: custom web development, mobile app development, SaaS development, AI integration, and MVP delivery from a trusted software development company.",
    path: ROUTES.services,
  });
}

export function caseStudiesPageSeo(): PageSeoInput {
  return page({
    title: pageTitle("Case Studies & SaaS Development Portfolio"),
    description:
      "See Committers Softwares work—web development, mobile apps, and SaaS development case studies built for high-performance digital products.",
    path: ROUTES.caseStudies,
  });
}

export function technicalLedgerPageSeo(): PageSeoInput {
  return page({
    title: pageTitle(TECHNICAL_LEDGER_PAGE_COPY.title),
    description:
      "Technical Ledger by Committers Softwares—notes on web development, mobile engineering, and SaaS development craft.",
    path: ROUTES.technicalLedger,
  });
}

export function contactPageSeo(): PageSeoInput {
  return page({
    title: pageTitle("Contact Committers Softwares"),
    description:
      "Contact Committers for web development, mobile app development, and SaaS development projects. Talk with our software development company team.",
    path: ROUTES.contact,
  });
}

export function faqPageSeo(): PageSeoInput {
  return page({
    title: pageTitle(FAQ_PAGE_COPY.title),
    description:
      "Frequently asked questions about working with Committers Softwares on web development, mobile app development, and SaaS development engagements.",
    path: ROUTES.faq,
  });
}

export function testimonialsPageSeo(): PageSeoInput {
  return page({
    title: pageTitle(TESTIMONIALS_PAGE_COPY.title),
    description:
      "Read client testimonials for Committers Softwares—including BrowseMyVacation travel platform founder Rahul on web application delivery, communication, and quality.",
    path: ROUTES.testimonials,
  });
}

export function joinUsPageSeo(): PageSeoInput {
  return page({
    title: pageTitle("Apply — Careers at Committers"),
    description:
      "Apply to join Committers Softwares. We're hiring engineers who care about web development, mobile apps, and SaaS product quality.",
    path: ROUTES.joinUs,
  });
}

export function openPositionsPageSeo(): PageSeoInput {
  return page({
    title: pageTitle("Open Positions"),
    description:
      "Open roles at Committers Softwares across web development, mobile app development, AI, and SaaS engineering teams.",
    path: ROUTES.openPositions,
  });
}

export function privacyPolicyPageSeo(): PageSeoInput {
  return page({
    title: pageTitle(PRIVACY_PAGE_COPY.title),
    description:
      "Privacy Policy for Committers Softwares websites and software development services.",
    path: ROUTES.privacyPolicy,
  });
}

export function cookiePolicyPageSeo(): PageSeoInput {
  return page({
    title: pageTitle(COOKIE_PAGE_COPY.title),
    description:
      "Cookie Policy for Committers Softwares—how we use cookies on our web development company site.",
    path: ROUTES.cookiePolicy,
  });
}

export function termsPageSeo(): PageSeoInput {
  return page({
    title: pageTitle("Terms of Service"),
    description: "Terms of Service for Committers Softwares products and software development services.",
    path: ROUTES.terms,
  });
}

export function thankYouPageSeo(): PageSeoInput {
  return page({
    title: pageTitle("Thank you"),
    description: "Thank you for contacting Committers Softwares.",
    path: ROUTES.thankYou,
    robots: "noindex, follow",
  });
}

export function notFoundPageSeo(): PageSeoInput {
  return page({
    title: pageTitle("Page not found"),
    description: "The page you requested was not found on Committers Softwares.",
    path: ROUTES.notFound,
    robots: "noindex, follow",
  });
}

export function commitersCaseStudyPageSeo(): PageSeoInput {
  return page({
    title: pageTitle(COMMITERS_CASE_STUDY_COPY.documentTitle),
    description: COMMITERS_CASE_STUDY_COPY.subtitle,
    path: ROUTES.commitersCaseStudy,
  });
}

export function aiSummarizerCaseStudyPageSeo(): PageSeoInput {
  return page({
    title: pageTitle(AI_SUMMARIZER_CASE_STUDY_COPY.documentTitle),
    description: AI_SUMMARIZER_CASE_STUDY_COPY.description,
    path: ROUTES.aiSummarizerCaseStudy,
  });
}

export function neardropCaseStudyPageSeo(): PageSeoInput {
  return page({
    title: pageTitle(NEARDROP_CASE_STUDY_COPY.documentTitle),
    description: NEARDROP_CASE_STUDY_COPY.description,
    path: ROUTES.neardropCaseStudy,
  });
}

export function multiRoleCrmCaseStudyPageSeo(): PageSeoInput {
  return page({
    title: pageTitle(MULTI_ROLE_CRM_CASE_STUDY_COPY.documentTitle),
    description: `${MULTI_ROLE_CRM_CASE_STUDY_COPY.subheadline}. Enterprise SaaS development case study by Committers Softwares.`,
    path: ROUTES.multiRoleCrmCaseStudy,
  });
}

export function nextsaasCaseStudyPageSeo(): PageSeoInput {
  return page({
    title: pageTitle(NEXTSAAS_CASE_STUDY_COPY.documentTitle),
    description: NEXTSAAS_CASE_STUDY_COPY.description,
    path: ROUTES.browseMyVacationCaseStudy,
  });
}

export function trustTapPageSeo(): PageSeoInput {
  return page({
    title: TRUSTTAP_SEO.title,
    description: TRUSTTAP_SEO.description,
    keywords: TRUSTTAP_SEO.keywords,
    path: TRUSTTAP_SEO.path,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "TrustTap",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: TRUSTTAP_SEO.description,
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
      provider: {
        "@type": "Organization",
        name: "Commiters Softwares",
        url: SITE_ORIGIN,
      },
      url: `${SITE_ORIGIN}${TRUSTTAP_SEO.path}`,
    },
  });
}
