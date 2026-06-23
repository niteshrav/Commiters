import NextSaasCaseStudyCapabilitiesSection from "./NextSaasCaseStudyCapabilitiesSection";
import NextSaasCaseStudyInfrastructureSection from "./NextSaasCaseStudyInfrastructureSection";
import { NEXTSAAS_CASE_STUDY_FEATURES_SECTION_CLASS } from "../lib/nextsaasCaseStudyLayout";

export default function NextSaasCaseStudyFeaturesSection() {
  return (
    <section className={NEXTSAAS_CASE_STUDY_FEATURES_SECTION_CLASS} data-testid="nextsaas-case-study-features">
      <NextSaasCaseStudyCapabilitiesSection />
      <NextSaasCaseStudyInfrastructureSection />
    </section>
  );
}
