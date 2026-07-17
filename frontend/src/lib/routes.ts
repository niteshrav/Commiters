/** Canonical paths — keep in sync with `App.tsx` routes. */
export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  caseStudies: "/case-studies",
  technicalLedger: "/technical-ledger",
  commitersCaseStudy: "/case-studies/commiters",
  aiSummarizerCaseStudy: "/case-studies/ai-summarizer",
  neardropCaseStudy: "/case-studies/neardrop-mvp",
  multiRoleCrmCaseStudy: "/case-studies/multi-role-crm",
  nextsaasCaseStudy: "/case-studies/nextsaas",
  contact: "/contact",
  joinUs: "/join-us",
  privacyPolicy: "/privacy-policy",
  cookiePolicy: "/cookie-policy",
  terms: "/terms",
  thankYou: "/thank-you",
  faq: "/faq",
  notFound: "/404",
  serviceDetail: "/services/:slug",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Every top-level path rendered by the app (for consistency tests). */
export const APP_ROUTE_PATHS: RoutePath[] = [
  ROUTES.home,
  ROUTES.about,
  ROUTES.services,
  ROUTES.caseStudies,
  ROUTES.technicalLedger,
  ROUTES.commitersCaseStudy,
  ROUTES.aiSummarizerCaseStudy,
  ROUTES.neardropCaseStudy,
  ROUTES.multiRoleCrmCaseStudy,
  ROUTES.nextsaasCaseStudy,
  ROUTES.contact,
  ROUTES.joinUs,
  ROUTES.privacyPolicy,
  ROUTES.cookiePolicy,
  ROUTES.terms,
  ROUTES.faq,
  ROUTES.thankYou,
  ROUTES.notFound,
];
