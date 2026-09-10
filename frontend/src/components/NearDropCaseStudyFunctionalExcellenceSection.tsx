import type { NearDropCaseStudyFeature } from "../lib/neardropCaseStudyContent";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import {
  NEARDROP_CASE_STUDY_FEATURE_ARROW_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_BODY_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_CARD_BLUE_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_CARD_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_CARD_GOLD_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_CARD_GREEN_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_CARD_PURPLE_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_GRID_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_ICON_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_ICON_GOLD_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_ICON_GREEN_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_ICON_PURPLE_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_TITLE_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_COPY_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_GRID_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_HEADER_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_HEADING_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_SECTION_CLASS,
} from "../lib/neardropCaseStudyLayout";
import { IconArrowRight, IconClock, IconDatabase, IconHandshake, IconUsers } from "./icons";

function FeatureIcon({ icon }: { icon: NearDropCaseStudyFeature["icon"] }) {
  if (icon === "shield") return <IconUsers width={22} height={22} />;
  if (icon === "tracking") return <IconClock width={22} height={22} />;
  if (icon === "schema") return <IconDatabase width={22} height={22} />;
  return <IconHandshake width={22} height={22} />;
}

function featureIconClassName(iconTone: NearDropCaseStudyFeature["iconTone"]): string {
  if (iconTone === "gold") {
    return `${NEARDROP_CASE_STUDY_FEATURE_ICON_CLASS} ${NEARDROP_CASE_STUDY_FEATURE_ICON_GOLD_CLASS}`;
  }
  if (iconTone === "green") {
    return `${NEARDROP_CASE_STUDY_FEATURE_ICON_CLASS} ${NEARDROP_CASE_STUDY_FEATURE_ICON_GREEN_CLASS}`;
  }
  if (iconTone === "purple") {
    return `${NEARDROP_CASE_STUDY_FEATURE_ICON_CLASS} ${NEARDROP_CASE_STUDY_FEATURE_ICON_PURPLE_CLASS}`;
  }
  return NEARDROP_CASE_STUDY_FEATURE_ICON_CLASS;
}

function featureCardClassName(iconTone: NearDropCaseStudyFeature["iconTone"]): string {
  if (iconTone === "gold") {
    return `${NEARDROP_CASE_STUDY_FEATURE_CARD_CLASS} ${NEARDROP_CASE_STUDY_FEATURE_CARD_GOLD_CLASS}`;
  }
  if (iconTone === "green") {
    return `${NEARDROP_CASE_STUDY_FEATURE_CARD_CLASS} ${NEARDROP_CASE_STUDY_FEATURE_CARD_GREEN_CLASS}`;
  }
  if (iconTone === "purple") {
    return `${NEARDROP_CASE_STUDY_FEATURE_CARD_CLASS} ${NEARDROP_CASE_STUDY_FEATURE_CARD_PURPLE_CLASS}`;
  }
  return `${NEARDROP_CASE_STUDY_FEATURE_CARD_CLASS} ${NEARDROP_CASE_STUDY_FEATURE_CARD_BLUE_CLASS}`;
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
        </div>
      </div>
      <div
        className={`${NEARDROP_CASE_STUDY_FEATURE_GRID_CLASS} ${NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_GRID_CLASS}`}
        data-testid="neardrop-case-study-functional-excellence-grid"
      >
        {functionalExcellence.items.map((feature) => (
          <article key={feature.id} className={featureCardClassName(feature.iconTone)}>
            <span className={featureIconClassName(feature.iconTone)} aria-hidden>
              <FeatureIcon icon={feature.icon} />
            </span>
            <h3 className={NEARDROP_CASE_STUDY_FEATURE_TITLE_CLASS}>{feature.title}</h3>
            <p className={NEARDROP_CASE_STUDY_FEATURE_BODY_CLASS}>{feature.body}</p>
            <span className={NEARDROP_CASE_STUDY_FEATURE_ARROW_CLASS} aria-hidden>
              <IconArrowRight width={14} height={14} />
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
