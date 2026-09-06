import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ROUTES } from "./lib/routes";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CommitersCaseStudyPage from "./pages/CommitersCaseStudyPage";
import AiSummarizerCaseStudyPage from "./pages/AiSummarizerCaseStudyPage";
import NearDropCaseStudyPage from "./pages/NearDropCaseStudyPage";
import MultiRoleCrmCaseStudyPage from "./pages/MultiRoleCrmCaseStudyPage";
import NextSaasCaseStudyPage from "./pages/NextSaasCaseStudyPage";
import ProspectIqCaseStudyPage from "./pages/ProspectIqCaseStudyPage";
import EcoRouteCaseStudyPage from "./pages/EcoRouteCaseStudyPage";
import TechnicalLedgerPage from "./pages/TechnicalLedgerPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import JoinUsPage from "./pages/JoinUsPage";
import OpenPositionsPage from "./pages/OpenPositionsPage";
import JobDetailPage from "./pages/JobDetailPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import TermsPage from "./pages/TermsPage";
import SitemapPage from "./pages/SitemapPage";
import ThankYouPage from "./pages/ThankYouPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import TrustTapPage from "./pages/TrustTapPage";
import OpsFlowPage from "./pages/OpsFlowPage";
import UtilitiesPage from "./pages/UtilitiesPage";
import WebsiteDevelopmentUdaipurPage from "./pages/WebsiteDevelopmentUdaipurPage";
import WhatsAppAutomationUdaipurPage from "./pages/WhatsAppAutomationUdaipurPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import AiOperationalAuditPage from "./pages/AiOperationalAuditPage";
import AiSolutionsPage from "./pages/AiSolutionsPage";
import WebApplicationsPage from "./pages/WebApplicationsPage";
import WorkflowAutomationPage from "./pages/WorkflowAutomationPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.services} element={<ServicesPage />} />
        <Route path={ROUTES.aiOperationalAudit} element={<AiOperationalAuditPage />} />
        <Route path={ROUTES.aiSolutions} element={<AiSolutionsPage />} />
        <Route path={ROUTES.webApplications} element={<WebApplicationsPage />} />
        <Route path={ROUTES.aiSolutionsLegacy} element={<Navigate to={ROUTES.aiSolutions} replace />} />
        <Route path={ROUTES.aiSolutionsPipelineLegacy} element={<Navigate to={ROUTES.aiSolutions} replace />} />
        <Route path={ROUTES.webApplicationsLegacy} element={<Navigate to={ROUTES.webApplications} replace />} />
        <Route path={ROUTES.webApplicationsB2bLegacy} element={<Navigate to={ROUTES.webApplications} replace />} />
        <Route path={ROUTES.workflowAutomation} element={<WorkflowAutomationPage />} />
        <Route path={ROUTES.serviceDetail} element={<ServiceDetailPage />} />
        <Route path={ROUTES.caseStudies} element={<CaseStudiesPage />} />
        <Route path={ROUTES.caseStudiesLegacy} element={<Navigate to={ROUTES.caseStudies} replace />} />
        <Route path={ROUTES.technicalLedger} element={<TechnicalLedgerPage />} />
        <Route path={ROUTES.technicalLedgerLegacy} element={<Navigate to={ROUTES.technicalLedger} replace />} />
        <Route path={ROUTES.commitersCaseStudy} element={<CommitersCaseStudyPage />} />
        <Route path={ROUTES.aiSummarizerCaseStudy} element={<AiSummarizerCaseStudyPage />} />
        <Route path={ROUTES.neardropCaseStudy} element={<NearDropCaseStudyPage />} />
        <Route path={ROUTES.multiRoleCrmCaseStudy} element={<MultiRoleCrmCaseStudyPage />} />
        <Route path={ROUTES.browseMyVacationCaseStudy} element={<NextSaasCaseStudyPage />} />
        <Route path={ROUTES.prospectIqCaseStudy} element={<ProspectIqCaseStudyPage />} />
        <Route path={ROUTES.ecoRouteCaseStudy} element={<EcoRouteCaseStudyPage />} />
        <Route path={ROUTES.commitersCaseStudyLegacy} element={<Navigate to={ROUTES.commitersCaseStudy} replace />} />
        <Route path={ROUTES.aiSummarizerCaseStudyLegacy} element={<Navigate to={ROUTES.aiSummarizerCaseStudy} replace />} />
        <Route path={ROUTES.neardropCaseStudyLegacy} element={<Navigate to={ROUTES.neardropCaseStudy} replace />} />
        <Route path={ROUTES.multiRoleCrmCaseStudyLegacy} element={<Navigate to={ROUTES.multiRoleCrmCaseStudy} replace />} />
        <Route path={ROUTES.browseMyVacationCaseStudyLegacy} element={<Navigate to={ROUTES.browseMyVacationCaseStudy} replace />} />
        <Route path={ROUTES.nextsaasCaseStudy} element={<Navigate to={ROUTES.browseMyVacationCaseStudy} replace />} />
        <Route path={ROUTES.trustTap} element={<TrustTapPage />} />
        <Route path={ROUTES.trustTapShort} element={<Navigate to={ROUTES.trustTap} replace />} />
        <Route path={ROUTES.opsFlow} element={<OpsFlowPage />} />
        <Route path={ROUTES.opsFlowPlayground} element={<OpsFlowPage />} />
        <Route path={ROUTES.opsFlowAi} element={<Navigate to={ROUTES.opsFlowPlayground} replace />} />
        <Route path={ROUTES.utilities} element={<UtilitiesPage />} />
        <Route path={ROUTES.websiteDevelopmentUdaipur} element={<WebsiteDevelopmentUdaipurPage />} />
        <Route path={ROUTES.whatsappAutomationUdaipur} element={<WhatsAppAutomationUdaipurPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.faq} element={<FaqPage />} />
        <Route path={ROUTES.testimonials} element={<TestimonialsPage />} />
        <Route path={ROUTES.joinUs} element={<JoinUsPage />} />
        <Route path={ROUTES.openPositions} element={<OpenPositionsPage />} />
        <Route path={ROUTES.openPositionDetail} element={<JobDetailPage />} />
        <Route path={ROUTES.openPositionsLegacy} element={<Navigate to={ROUTES.openPositions} replace />} />
        <Route path={ROUTES.jobPositionsLegacy} element={<Navigate to={ROUTES.openPositions} replace />} />
        <Route path={ROUTES.contact} element={<ContactPage />} />
        <Route path={ROUTES.privacyPolicy} element={<PrivacyPolicyPage />} />
        <Route path={ROUTES.privacy} element={<Navigate to={ROUTES.privacyPolicy} replace />} />
        <Route path={ROUTES.cookiePolicy} element={<CookiePolicyPage />} />
        <Route path={ROUTES.terms} element={<TermsPage />} />
        <Route path={ROUTES.sitemap} element={<SitemapPage />} />
        <Route path={ROUTES.thankYou} element={<ThankYouPage />} />
        <Route path={ROUTES.notFound} element={<NotFoundPage />} />

        <Route path="*" element={<Navigate to={ROUTES.notFound} replace />} />
      </Routes>
    </Layout>
  );
}

