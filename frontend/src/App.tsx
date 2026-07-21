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
import ThankYouPage from "./pages/ThankYouPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.services} element={<ServicesPage />} />
        <Route path={ROUTES.serviceDetail} element={<ServiceDetailPage />} />
        <Route path={ROUTES.caseStudies} element={<CaseStudiesPage />} />
        <Route path={ROUTES.technicalLedger} element={<TechnicalLedgerPage />} />
        <Route path={ROUTES.commitersCaseStudy} element={<CommitersCaseStudyPage />} />
        <Route path={ROUTES.aiSummarizerCaseStudy} element={<AiSummarizerCaseStudyPage />} />
        <Route path={ROUTES.neardropCaseStudy} element={<NearDropCaseStudyPage />} />
        <Route path={ROUTES.multiRoleCrmCaseStudy} element={<MultiRoleCrmCaseStudyPage />} />
        <Route path={ROUTES.nextsaasCaseStudy} element={<NextSaasCaseStudyPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.faq} element={<FaqPage />} />
        <Route path={ROUTES.joinUs} element={<JoinUsPage />} />
        <Route path={ROUTES.openPositions} element={<OpenPositionsPage />} />
        <Route path={ROUTES.openPositionDetail} element={<JobDetailPage />} />
        <Route path={ROUTES.openPositionsLegacy} element={<Navigate to={ROUTES.openPositions} replace />} />
        <Route path={ROUTES.jobPositionsLegacy} element={<Navigate to={ROUTES.openPositions} replace />} />
        <Route path={ROUTES.contact} element={<ContactPage />} />
        <Route path={ROUTES.privacyPolicy} element={<PrivacyPolicyPage />} />
        <Route path={ROUTES.cookiePolicy} element={<CookiePolicyPage />} />
        <Route path={ROUTES.terms} element={<TermsPage />} />
        <Route path={ROUTES.thankYou} element={<ThankYouPage />} />
        <Route path={ROUTES.notFound} element={<NotFoundPage />} />

        <Route path="*" element={<Navigate to={ROUTES.notFound} replace />} />
      </Routes>
    </Layout>
  );
}

