import NextSaasCaseStudyCapabilitiesSection from "./NextSaasCaseStudyCapabilitiesSection";
import NextSaasCaseStudyInfrastructureSection from "./NextSaasCaseStudyInfrastructureSection";
import NextSaasCaseStudyOutcomesSection from "./NextSaasCaseStudyOutcomesSection";
import NextSaasCaseStudyTechStackSection from "./NextSaasCaseStudyTechStackSection";
import { NEXTSAAS_CASE_STUDY_FEATURES_SECTION_CLASS } from "../lib/nextsaasCaseStudyLayout";

export default function NextSaasCaseStudyFeaturesSection() {
  return (
    <section className={NEXTSAAS_CASE_STUDY_FEATURES_SECTION_CLASS} data-testid="nextsaas-case-study-features">
      <NextSaasCaseStudyCapabilitiesSection />
      <NextSaasCaseStudyTechStackSection />
      <NextSaasCaseStudyOutcomesSection />
      <NextSaasCaseStudyInfrastructureSection />
    </section>
  );
}
