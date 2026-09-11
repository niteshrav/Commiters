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
  prospectIqCaseStudy: "/work/prospectiq-ai",
  ecoRouteCaseStudy: "/work/ecoroute-intelligence",
  /** Legacy URL — redirect to BrowseMyVacation case study */
  nextsaasCaseStudy: "/case-studies/nextsaas",
  commitersCaseStudyLegacy: "/case-studies/commiters",
  aiSummarizerCaseStudyLegacy: "/case-studies/ai-summarizer",
  neardropCaseStudyLegacy: "/case-studies/neardrop-mvp",
  multiRoleCrmCaseStudyLegacy: "/case-studies/multi-role-crm",
  browseMyVacationCaseStudyLegacy: "/case-studies/browse-my-vacation",
  trustTap: "/products/trusttap",
  /** Short URL — redirect to trustTap product page */
  trustTapShort: "/trusttap",
  opsFlow: "/products/opsflow",
  opsFlowPlayground: "/opsflow",
  /** Marketing URL — redirect to OpsFlow playground */
  opsFlowAi: "/opsflow-ai",
  utilities: "/utilities",
  aiOperationalAudit: "/services/ai-operational-audit",
  aiSolutions: "/services/governed-ai-workflow-systems",
  /** Legacy URL — redirect to governed AI */
  aiSolutionsLegacy: "/services/ai-solutions",
  /** Legacy URL — redirect to governed AI */
  aiSolutionsPipelineLegacy: "/services/ai-pipeline-engineering",
  webApplications: "/services/spec-driven-full-stack-platforms",
  /** Legacy URL — redirect to spec-driven platforms */
  webApplicationsLegacy: "/services/web-applications",
  /** Legacy URL — redirect to spec-driven platforms */
  webApplicationsB2bLegacy: "/services/b2b-web-applications",
  workflowAutomation: "/services/workflow-automation",
  contact: "/contact",
  joinUs: "/join-us",
  openPositions: "/open-positions",
  openPositionDetail: "/open-positions/:slug",
  /** Legacy CMS/admin URLs — redirect to openPositions */
  openPositionsLegacy: "/open-position",
  jobPositionsLegacy: "/job-positions",
  /** Short URL — redirect to Privacy Policy */
  privacy: "/privacy",
  privacyPolicy: "/privacy-policy",
  cookiePolicy: "/cookie-policy",
  terms: "/terms",
  sitemap: "/sitemap",
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
  ROUTES.prospectIqCaseStudy,
  ROUTES.ecoRouteCaseStudy,
  ROUTES.trustTap,
  ROUTES.opsFlow,
  ROUTES.utilities,
  ROUTES.aiOperationalAudit,
  ROUTES.aiSolutions,
  ROUTES.webApplications,
  ROUTES.workflowAutomation,
  ROUTES.contact,
  ROUTES.joinUs,
  ROUTES.openPositions,
  ROUTES.privacyPolicy,
  ROUTES.cookiePolicy,
  ROUTES.terms,
  ROUTES.sitemap,
  ROUTES.faq,
  ROUTES.thankYou,
  ROUTES.notFound,
  ROUTES.websiteDevelopmentUdaipur,
  ROUTES.whatsappAutomationUdaipur,
  ROUTES.testimonials,
];
