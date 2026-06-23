import type { NearDropCaseStudyStackItem } from "../lib/neardropCaseStudyContent";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import {
  NEARDROP_CASE_STUDY_DESCRIPTION_CLASS,
  NEARDROP_CASE_STUDY_INTRO_INNER_CLASS,
  NEARDROP_CASE_STUDY_INTRO_SECTION_CLASS,
  NEARDROP_CASE_STUDY_INTRO_STACK_CLASS,
  NEARDROP_CASE_STUDY_INTRO_STACK_ICON_CLASS,
  NEARDROP_CASE_STUDY_INTRO_STACK_ITEM_CLASS,
  NEARDROP_CASE_STUDY_INTRO_STACK_LABEL_CLASS,
  NEARDROP_CASE_STUDY_INTRO_STACK_ROLE_CLASS,
  NEARDROP_CASE_STUDY_KICKER_CLASS,
  NEARDROP_CASE_STUDY_KICKER_DOT_CLASS,
  NEARDROP_CASE_STUDY_TITLE_ACCENT_CLASS,
  NEARDROP_CASE_STUDY_TITLE_CLASS,
  NEARDROP_CASE_STUDY_TITLE_LEAD_CLASS,
  NEARDROP_CASE_STUDY_TITLE_TRAIL_CLASS,
} from "../lib/neardropCaseStudyLayout";
import { IconBrowserWindow, IconCodeBracket, IconDatabase } from "./icons";

function StackIcon({ icon }: { icon: NearDropCaseStudyStackItem["icon"] }) {
  if (icon === "database") {
    return <IconDatabase width={22} height={22} />;
  }
  if (icon === "code") {
    return <IconCodeBracket width={22} height={22} />;
  }
  return <IconBrowserWindow width={22} height={22} />;
}

export default function NearDropCaseStudyIntroSection() {
  const { kicker, titleLead, titleAccent, titleTrail, description, introStack } = NEARDROP_CASE_STUDY_COPY;

  return (
    <section
      className={`${NEARDROP_CASE_STUDY_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="neardrop-case-study-intro"
      aria-labelledby="neardrop-case-study-title"
    >
      <div className={NEARDROP_CASE_STUDY_INTRO_INNER_CLASS}>
        <p className={NEARDROP_CASE_STUDY_KICKER_CLASS}>
          <span className={NEARDROP_CASE_STUDY_KICKER_DOT_CLASS} aria-hidden />
          {kicker}
        </p>
        <h1
          id="neardrop-case-study-title"
          className={NEARDROP_CASE_STUDY_TITLE_CLASS}
          aria-label={`${titleLead}${titleAccent} ${titleTrail}`}
        >
          <span className={NEARDROP_CASE_STUDY_TITLE_LEAD_CLASS}>{titleLead}</span>
          <span className={NEARDROP_CASE_STUDY_TITLE_ACCENT_CLASS}>{titleAccent}</span>
          <span className={NEARDROP_CASE_STUDY_TITLE_TRAIL_CLASS}>{titleTrail}</span>
        </h1>
        <p className={NEARDROP_CASE_STUDY_DESCRIPTION_CLASS}>{description}</p>
        <ul className={NEARDROP_CASE_STUDY_INTRO_STACK_CLASS} data-testid="neardrop-case-study-intro-stack">
          {introStack.items.map((item) => (
            <li key={item.slug} className={NEARDROP_CASE_STUDY_INTRO_STACK_ITEM_CLASS}>
              <div>
                <p className={NEARDROP_CASE_STUDY_INTRO_STACK_ROLE_CLASS}>{item.role}</p>
                <p className={NEARDROP_CASE_STUDY_INTRO_STACK_LABEL_CLASS}>{item.label}</p>
              </div>
              <span className={NEARDROP_CASE_STUDY_INTRO_STACK_ICON_CLASS} aria-hidden>
                <StackIcon icon={item.icon} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
