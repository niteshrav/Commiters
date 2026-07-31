import MultiRoleCrmCaseStudyArchitectureSection from "../components/MultiRoleCrmCaseStudyArchitectureSection";
import MultiRoleCrmCaseStudyBottomCta from "../components/MultiRoleCrmCaseStudyBottomCta";
import MultiRoleCrmCaseStudyIntroSection from "../components/MultiRoleCrmCaseStudyIntroSection";
import MultiRoleCrmCaseStudyVisionSection from "../components/MultiRoleCrmCaseStudyVisionSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { MULTI_ROLE_CRM_CASE_STUDY_PAGE_CLASS } from "../lib/multiRoleCrmCaseStudyLayout";
import { multiRoleCrmCaseStudyPageSeo } from "../lib/sitePageSeo";

export default function MultiRoleCrmCaseStudyPage() {
  usePageSeo(multiRoleCrmCaseStudyPageSeo());

  return (
    <div className={MULTI_ROLE_CRM_CASE_STUDY_PAGE_CLASS} data-testid="multi-role-crm-case-study-page">
      <MultiRoleCrmCaseStudyIntroSection />
      <MultiRoleCrmCaseStudyVisionSection />
      <MultiRoleCrmCaseStudyArchitectureSection />
      <MultiRoleCrmCaseStudyBottomCta />
    </div>
  );
}
