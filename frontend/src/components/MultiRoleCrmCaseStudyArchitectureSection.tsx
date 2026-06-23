import type { MultiRoleCrmArchitectureIndicator, MultiRoleCrmCaseStudyFeature } from "../lib/multiRoleCrmCaseStudyContent";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "../lib/multiRoleCrmCaseStudyContent";
import {
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_BODY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_COPY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_HEADING_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_HEADER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_INDICATOR_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_INDICATORS_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_SECTION_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_BODY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_GRID_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_GOLD_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ITEM_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_TITLE_CLASS,
} from "../lib/multiRoleCrmCaseStudyLayout";
import { IconBolt, IconChartLine, IconGauge, IconRobot, IconShieldCheck } from "./icons";

function ArchitectureIndicatorIcon({ icon }: { icon: MultiRoleCrmArchitectureIndicator["icon"] }) {
  if (icon === "shield") return <IconShieldCheck width={24} height={24} />;
  return <IconGauge width={24} height={24} />;
}

function FeatureIcon({ icon }: { icon: MultiRoleCrmCaseStudyFeature["icon"] }) {
  if (icon === "rbac") return <IconShieldCheck width={28} height={28} />;
  if (icon === "rag") return <IconRobot width={28} height={28} />;
  if (icon === "sync") return <IconBolt width={28} height={28} />;
  return <IconChartLine width={28} height={28} />;
}

function featureIconClassName(tone: MultiRoleCrmCaseStudyFeature["iconTone"]): string {
  return tone === "gold"
    ? `${MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_CLASS} ${MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_GOLD_CLASS}`
    : MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_CLASS;
}

export default function MultiRoleCrmCaseStudyArchitectureSection() {
  const { architecture } = MULTI_ROLE_CRM_CASE_STUDY_COPY;

  return (
    <section
      className={`${MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_SECTION_CLASS} reveal-on-scroll`}
      data-testid="multi-role-crm-case-study-architecture"
      aria-labelledby="multi-role-crm-case-study-architecture-title"
    >
      <div className={MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_HEADER_CLASS}>
        <div className={MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_COPY_CLASS}>
          <h2 id="multi-role-crm-case-study-architecture-title" className={MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_HEADING_CLASS}>
            {architecture.heading}
          </h2>
          <p className={MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_BODY_CLASS}>{architecture.description}</p>
        </div>
        <div className={MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_INDICATORS_CLASS}>
          {architecture.indicators.map((indicator) => (
            <div
              key={indicator.id}
              className={MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_INDICATOR_CLASS}
              aria-label={indicator.label}
              title={indicator.label}
            >
              <span aria-hidden>
                <ArchitectureIndicatorIcon icon={indicator.icon} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={MULTI_ROLE_CRM_CASE_STUDY_FEATURE_GRID_CLASS} data-testid="multi-role-crm-case-study-features">
        {architecture.features.map((feature) => (
          <article key={feature.id} className={MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ITEM_CLASS}>
            <span className={featureIconClassName(feature.iconTone)} aria-hidden>
              <FeatureIcon icon={feature.icon} />
            </span>
            <h3 className={MULTI_ROLE_CRM_CASE_STUDY_FEATURE_TITLE_CLASS}>{feature.title}</h3>
            <p className={MULTI_ROLE_CRM_CASE_STUDY_FEATURE_BODY_CLASS}>{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
