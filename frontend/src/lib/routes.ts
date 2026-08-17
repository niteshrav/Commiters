/** Canonical paths — keep in sync with `App.tsx` routes. */
export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  caseStudies: "/work",
  /** Legacy URL — redirect to Work portfolio */
  caseStudiesLegacy: "/case-studies",
  technicalLedger: "/blog",
  /** Legacy URL — redirect to Blog */
  technicalLedgerLegacy: "/technical-ledger",
  commitersCaseStudy: "/work/commiters",
  aiSummarizerCaseStudy: "/work/ai-summarizer",
  neardropCaseStudy: "/work/neardrop-mvp",
  multiRoleCrmCaseStudy: "/work/multi-role-crm",
  browseMyVacationCaseStudy: "/work/browse-my-vacation",
  /** Legacy URL — redirect to BrowseMyVacation case study */
  nextsaasCaseStudy: "/case-studies/nextsaas",
  commitersCaseStudyLegacy: "/case-studies/commiters",
  aiSummarizerCaseStudyLegacy: "/case-studies/ai-summarizer",
  neardropCaseStudyLegacy: "/case-studies/neardrop-mvp",
  multiRoleCrmCaseStudyLegacy: "/case-studies/multi-role-crm",
  browseMyVacationCaseStudyLegacy: "/case-studies/browse-my-vacation",
  trustTap: "/products/trusttap",
  contact: "/contact",
  joinUs: "/join-us",
  openPositions: "/open-positions",
  openPositionDetail: "/open-positions/:slug",
  /** Legacy CMS/admin URLs — redirect to openPositions */
  openPositionsLegacy: "/open-position",
  jobPositionsLegacy: "/job-positions",
  privacyPolicy: "/privacy-policy",
  cookiePolicy: "/cookie-policy",
  terms: "/terms",
  thankYou: "/thank-you",
  faq: "/faq",
  notFound: "/404",
  serviceDetail: "/services/:slug",
  websiteDevelopmentUdaipur: "/website-development-udaipur",
  whatsappAutomationUdaipur: "/whatsapp-automation-udaipur",
  testimonials: "/testimonials",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Application form URL — optionally pre-select a role from Open Positions. */
export function buildJoinUsApplyHref(position?: string): string {
  const trimmed = position?.trim();
  if (!trimmed) return ROUTES.joinUs;
  return `${ROUTES.joinUs}?position=${encodeURIComponent(trimmed)}`;
}

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
  ROUTES.browseMyVacationCaseStudy,
  ROUTES.trustTap,
  ROUTES.contact,
  ROUTES.joinUs,
  ROUTES.openPositions,
  ROUTES.privacyPolicy,
  ROUTES.cookiePolicy,
  ROUTES.terms,
  ROUTES.faq,
  ROUTES.thankYou,
  ROUTES.notFound,
  ROUTES.websiteDevelopmentUdaipur,
  ROUTES.whatsappAutomationUdaipur,
  ROUTES.testimonials,
];
