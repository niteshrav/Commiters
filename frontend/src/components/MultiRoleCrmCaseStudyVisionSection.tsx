import type { MultiRoleCrmCaseStudyStackItem } from "../lib/multiRoleCrmCaseStudyContent";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "../lib/multiRoleCrmCaseStudyContent";
import { resolveTechIconUrl } from "../lib/homeTechStack";
import {
  MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_GRID_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_ITEM_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_LABEL_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_LABEL_SOLUTION_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_TEXT_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_COPY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_GRID_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ICON_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_HIGHLIGHT_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_WIDE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_LABEL_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_PANEL_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ROLE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_VISION_BODY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_VISION_COPY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_VISION_HEADING_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_VISION_LAYOUT_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_VISION_SECTION_CLASS,
} from "../lib/multiRoleCrmCaseStudyLayout";
import { IconAutomationSpark, IconCodeBracket, IconDatabase, IconGlobe } from "./icons";

function StackIcon({ item }: { item: MultiRoleCrmCaseStudyStackItem }) {
  if (item.icon === "code") return <IconCodeBracket width={28} height={28} />;
  if (item.icon === "database") return <IconDatabase width={28} height={28} />;
  if (item.icon === "cloud") return <IconGlobe width={28} height={28} />;
  return <IconAutomationSpark width={28} height={28} />;
}

function stackItemClassName(item: MultiRoleCrmCaseStudyStackItem): string {
  const classes: string[] = [MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_CLASS];
  if (item.layout === "wide") classes.push(MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_WIDE_CLASS);
  if (item.highlight) classes.push(MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_HIGHLIGHT_CLASS);
  return classes.join(" ");
}

export default function MultiRoleCrmCaseStudyVisionSection() {
  const { vision, techStack } = MULTI_ROLE_CRM_CASE_STUDY_COPY;

  return (
    <section
      className={`${MULTI_ROLE_CRM_CASE_STUDY_VISION_SECTION_CLASS} reveal-on-scroll`}
      data-testid="multi-role-crm-case-study-vision"
      aria-labelledby="multi-role-crm-case-study-vision-title"
    >
      <div className={MULTI_ROLE_CRM_CASE_STUDY_VISION_LAYOUT_CLASS}>
        <div className={MULTI_ROLE_CRM_CASE_STUDY_VISION_COPY_CLASS}>
          <h2 id="multi-role-crm-case-study-vision-title" className={MULTI_ROLE_CRM_CASE_STUDY_VISION_HEADING_CLASS}>
            {vision.heading}
          </h2>
          <p className={MULTI_ROLE_CRM_CASE_STUDY_VISION_BODY_CLASS}>{vision.body}</p>
          <div className={MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_GRID_CLASS}>
            <article className={MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_ITEM_CLASS}>
              <p className={MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_LABEL_CLASS}>{vision.challenge.label}</p>
              <p className={MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_TEXT_CLASS}>{vision.challenge.text}</p>
            </article>
            <article className={MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_ITEM_CLASS}>
              <p
                className={`${MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_LABEL_CLASS} ${MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_LABEL_SOLUTION_CLASS}`}
              >
                {vision.solution.label}
              </p>
              <p className={MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_TEXT_CLASS}>{vision.solution.text}</p>
            </article>
          </div>
        </div>
        <aside className={MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_PANEL_CLASS} data-testid="multi-role-crm-case-study-tech-stack">
          <ul className={MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_GRID_CLASS}>
            {techStack.items.map((item) => (
              <li key={item.slug} className={stackItemClassName(item)}>
                <span className={MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ICON_CLASS} aria-hidden>
                  {item.highlight ? (
                    <StackIcon item={item} />
                  ) : (
                    <img src={resolveTechIconUrl(item)} alt="" width={28} height={28} loading="lazy" decoding="async" />
                  )}
                </span>
                <div className={MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_COPY_CLASS}>
                  <span className={MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_LABEL_CLASS}>{item.alt}</span>
                  <span className={MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ROLE_CLASS}>{item.role}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
