import MultiRoleCrmCaseStudyArchitectureSection from "../components/MultiRoleCrmCaseStudyArchitectureSection";
import MultiRoleCrmCaseStudyBottomCta from "../components/MultiRoleCrmCaseStudyBottomCta";
import MultiRoleCrmCaseStudyIntroSection from "../components/MultiRoleCrmCaseStudyIntroSection";
import MultiRoleCrmCaseStudyVisionSection from "../components/MultiRoleCrmCaseStudyVisionSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "../lib/multiRoleCrmCaseStudyContent";
import { MULTI_ROLE_CRM_CASE_STUDY_PAGE_CLASS } from "../lib/multiRoleCrmCaseStudyLayout";
import { pageTitle } from "../lib/siteMeta";

export default function MultiRoleCrmCaseStudyPage() {
  useDocumentTitle(pageTitle(MULTI_ROLE_CRM_CASE_STUDY_COPY.documentTitle));

  return (
    <div className={MULTI_ROLE_CRM_CASE_STUDY_PAGE_CLASS} data-testid="multi-role-crm-case-study-page">
      <MultiRoleCrmCaseStudyIntroSection />
      <MultiRoleCrmCaseStudyVisionSection />
      <MultiRoleCrmCaseStudyArchitectureSection />
      <MultiRoleCrmCaseStudyBottomCta />
    </div>
  );
}
