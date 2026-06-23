import type { NearDropCaseStudyFeature } from "../lib/neardropCaseStudyContent";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import {
  NEARDROP_CASE_STUDY_FEATURE_BODY_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_CARD_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_CARD_HIGHLIGHT_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_GRID_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_ICON_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_ICON_GOLD_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_ICON_HIGHLIGHT_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_TITLE_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_COUNT_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_COPY_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_DESCRIPTION_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_GRID_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_HEADER_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_HEADING_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_SECTION_CLASS,
} from "../lib/neardropCaseStudyLayout";
import { IconHandshake, IconLayers, IconRocket, IconShieldCheck, IconTarget } from "./icons";

function FeatureIcon({ icon }: { icon: NearDropCaseStudyFeature["icon"] }) {
  if (icon === "shield") return <IconShieldCheck width={22} height={22} />;
  if (icon === "tracking") return <IconTarget width={22} height={22} />;
  if (icon === "schema") return <IconLayers width={22} height={22} />;
  return <IconHandshake width={22} height={22} />;
}

function featureIconClassName(iconTone: NearDropCaseStudyFeature["iconTone"]): string {
  if (iconTone === "gold") {
    return `${NEARDROP_CASE_STUDY_FEATURE_ICON_CLASS} ${NEARDROP_CASE_STUDY_FEATURE_ICON_GOLD_CLASS}`;
  }
  if (iconTone === "highlight") {
    return `${NEARDROP_CASE_STUDY_FEATURE_ICON_CLASS} ${NEARDROP_CASE_STUDY_FEATURE_ICON_HIGHLIGHT_CLASS}`;
  }
  return NEARDROP_CASE_STUDY_FEATURE_ICON_CLASS;
}

export default function NearDropCaseStudyFunctionalExcellenceSection() {
  const { functionalExcellence } = NEARDROP_CASE_STUDY_COPY;

  return (
    <section
      className={`${NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_SECTION_CLASS} reveal-on-scroll`}
      data-testid="neardrop-case-study-functional-excellence"
      aria-labelledby="neardrop-case-study-functional-excellence-title"
    >
      <div className={NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_HEADER_CLASS}>
        <div className={NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_COPY_CLASS}>
          <h2
            id="neardrop-case-study-functional-excellence-title"
            className={NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_HEADING_CLASS}
          >
            {functionalExcellence.heading}
          </h2>
          <p className={NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_DESCRIPTION_CLASS}>
            {functionalExcellence.description}
          </p>
        </div>
        <p className={NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_COUNT_CLASS}>{functionalExcellence.countLabel}</p>
      </div>
      <div
        className={`${NEARDROP_CASE_STUDY_FEATURE_GRID_CLASS} ${NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_GRID_CLASS}`}
        data-testid="neardrop-case-study-functional-excellence-grid"
      >
        {functionalExcellence.items.map((feature) => (
          <article
            key={feature.id}
            className={[
              NEARDROP_CASE_STUDY_FEATURE_CARD_CLASS,
              feature.highlight ? NEARDROP_CASE_STUDY_FEATURE_CARD_HIGHLIGHT_CLASS : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={featureIconClassName(feature.iconTone)} aria-hidden>
              <FeatureIcon icon={feature.icon} />
            </span>
            <h3 className={NEARDROP_CASE_STUDY_FEATURE_TITLE_CLASS}>{feature.title}</h3>
            <p className={NEARDROP_CASE_STUDY_FEATURE_BODY_CLASS}>{feature.body}</p>
            {feature.highlight ? (
              <span className="neardrop-case-study-feature-watermark" aria-hidden>
                <IconRocket width={120} height={120} />
              </span>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
