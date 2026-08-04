import { ROUTES } from "./routes";
import { SERVICE_SLUGS } from "./services";

/** Paths included in public/sitemap.xml (indexable marketing pages). */
export function buildSitemapPublicPaths(): string[] {
  const servicePaths = SERVICE_SLUGS.map((slug) => `/services/${slug}`);
  return [
    ROUTES.home,
    ROUTES.about,
    ROUTES.services,
    ...servicePaths,
    ROUTES.caseStudies,
    ROUTES.commitersCaseStudy,
    ROUTES.aiSummarizerCaseStudy,
    ROUTES.neardropCaseStudy,
    ROUTES.multiRoleCrmCaseStudy,
    ROUTES.nextsaasCaseStudy,
    ROUTES.trustTap,
    ROUTES.technicalLedger,
    ROUTES.contact,
    ROUTES.faq,
    ROUTES.joinUs,
    ROUTES.openPositions,
    ROUTES.websiteDevelopmentUdaipur,
    ROUTES.whatsappAutomationUdaipur,
    ROUTES.privacyPolicy,
    ROUTES.cookiePolicy,
    ROUTES.terms,
  ];
}
