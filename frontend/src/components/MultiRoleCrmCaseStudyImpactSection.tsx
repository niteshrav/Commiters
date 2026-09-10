import type { MultiRoleCrmImpactItem } from "../lib/multiRoleCrmCaseStudyContent";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "../lib/multiRoleCrmCaseStudyContent";
import {
  MULTI_ROLE_CRM_CASE_STUDY_IMPACT_BODY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_IMPACT_COPY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_IMPACT_HEADING_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_IMPACT_ICON_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_IMPACT_ITEM_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_IMPACT_LIST_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_IMPACT_SECTION_CLASS,
} from "../lib/multiRoleCrmCaseStudyLayout";
import { IconAutomationSpark, IconClock, IconLock, IconUsers } from "./icons";

function ImpactIcon({ icon }: { icon: MultiRoleCrmImpactItem["icon"] }) {
  if (icon === "lock") return <IconLock width={18} height={18} />;
  if (icon === "clock") return <IconClock width={18} height={18} />;
  if (icon === "spark") return <IconAutomationSpark width={18} height={18} />;
  return <IconUsers width={18} height={18} />;
}

export default function MultiRoleCrmCaseStudyImpactSection() {
  const { impact } = MULTI_ROLE_CRM_CASE_STUDY_COPY;

  return (
    <section
      className={`${MULTI_ROLE_CRM_CASE_STUDY_IMPACT_SECTION_CLASS} reveal-on-scroll`}
      data-testid="multi-role-crm-case-study-impact"
      aria-labelledby="multi-role-crm-case-study-impact-title"
    >
      <div className={MULTI_ROLE_CRM_CASE_STUDY_IMPACT_COPY_CLASS}>
        <span className={MULTI_ROLE_CRM_CASE_STUDY_IMPACT_ICON_CLASS} aria-hidden>
          <IconAutomationSpark width={18} height={18} />
        </span>
        <div>
          <h2 id="multi-role-crm-case-study-impact-title" className={MULTI_ROLE_CRM_CASE_STUDY_IMPACT_HEADING_CLASS}>
            {impact.heading}
          </h2>
          <p className={MULTI_ROLE_CRM_CASE_STUDY_IMPACT_BODY_CLASS}>{impact.body}</p>
        </div>
      </div>
      <ul className={MULTI_ROLE_CRM_CASE_STUDY_IMPACT_LIST_CLASS}>
        {impact.items.map((item) => (
          <li key={item.id} className={MULTI_ROLE_CRM_CASE_STUDY_IMPACT_ITEM_CLASS}>
            <span className={MULTI_ROLE_CRM_CASE_STUDY_IMPACT_ICON_CLASS} aria-hidden>
              <ImpactIcon icon={item.icon} />
            </span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
