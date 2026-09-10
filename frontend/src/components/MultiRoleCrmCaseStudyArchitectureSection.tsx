import type { MultiRoleCrmCaseStudyFeature } from "../lib/multiRoleCrmCaseStudyContent";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "../lib/multiRoleCrmCaseStudyContent";
import {
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_BODY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_COPY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_HEADING_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_HEADER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_SECTION_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_BODY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_GRID_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_GOLD_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_GREEN_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_PURPLE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ITEM_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_TITLE_CLASS,
} from "../lib/multiRoleCrmCaseStudyLayout";
import { IconBolt, IconChartLine, IconDatabase, IconShieldCheck } from "./icons";

function FeatureIcon({ icon }: { icon: MultiRoleCrmCaseStudyFeature["icon"] }) {
  if (icon === "rbac") return <IconShieldCheck width={18} height={18} />;
  if (icon === "rag") return <IconDatabase width={18} height={18} />;
  if (icon === "sync") return <IconBolt width={18} height={18} />;
  return <IconChartLine width={18} height={18} />;
}

function featureIconClassName(tone: MultiRoleCrmCaseStudyFeature["iconTone"]): string {
  if (tone === "gold") return `${MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_CLASS} ${MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_GOLD_CLASS}`;
  if (tone === "purple") return `${MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_CLASS} ${MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_PURPLE_CLASS}`;
  if (tone === "green") return `${MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_CLASS} ${MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_GREEN_CLASS}`;
  return MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ICON_CLASS;
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
