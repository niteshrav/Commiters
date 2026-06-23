import type { CommitersCaseStudyHighlight } from "../lib/commitersCaseStudyContent";
import { COMMITERS_CASE_STUDY_COPY } from "../lib/commitersCaseStudyContent";
import { IconBolt, IconLayers, IconSearch } from "./icons";
import {
  COMMITERS_CASE_STUDY_FEATURE_BODY_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_CARD_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_GRID_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_ICON_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_TITLE_CLASS,
  COMMITERS_CASE_STUDY_FEATURES_SECTION_CLASS,
} from "../lib/commitersCaseStudyLayout";

function FeatureIcon({ icon }: { icon: CommitersCaseStudyHighlight["icon"] }) {
  if (icon === "seo") return <IconSearch width={28} height={28} />;
  if (icon === "minimalist") return <IconLayers width={28} height={28} />;
  return <IconBolt width={28} height={28} />;
}

export default function CommitersCaseStudyFeaturesSection() {
  const { features } = COMMITERS_CASE_STUDY_COPY;

  return (
    <section className={COMMITERS_CASE_STUDY_FEATURES_SECTION_CLASS} data-testid="commiters-case-study-features">
      <div className={COMMITERS_CASE_STUDY_FEATURE_GRID_CLASS}>
        {features.map((feature) => (
          <article key={feature.id} className={COMMITERS_CASE_STUDY_FEATURE_CARD_CLASS}>
            <span className={COMMITERS_CASE_STUDY_FEATURE_ICON_CLASS} aria-hidden>
              <FeatureIcon icon={feature.icon} />
            </span>
            <h3 className={COMMITERS_CASE_STUDY_FEATURE_TITLE_CLASS}>{feature.title}</h3>
            <p className={COMMITERS_CASE_STUDY_FEATURE_BODY_CLASS}>{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
