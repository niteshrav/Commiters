import { COMMITERS_CASE_STUDY_COPY } from "../lib/commitersCaseStudyContent";
import { resolveTechIconUrl } from "../lib/homeTechStack";
import {
  COMMITERS_CASE_STUDY_CORE_STACK_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_HEADING_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_ICON_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_ITEM_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_LIST_CLASS,
  COMMITERS_CASE_STUDY_HIGHLIGHT_BODY_CLASS,
  COMMITERS_CASE_STUDY_HIGHLIGHT_CARD_CLASS,
  COMMITERS_CASE_STUDY_HIGHLIGHT_GRID_CLASS,
  COMMITERS_CASE_STUDY_HIGHLIGHT_LABEL_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_BODY_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_GRID_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_HEADING_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_MAIN_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_SECTION_CLASS,
} from "../lib/commitersCaseStudyLayout";

export default function CommitersCaseStudyOverviewSection() {
  const { overview, coreStack } = COMMITERS_CASE_STUDY_COPY;

  return (
    <section className={COMMITERS_CASE_STUDY_OVERVIEW_SECTION_CLASS}>
      <div className={COMMITERS_CASE_STUDY_OVERVIEW_GRID_CLASS}>
        <div className={COMMITERS_CASE_STUDY_OVERVIEW_MAIN_CLASS} data-testid="commiters-case-study-overview">
          <h2 className={COMMITERS_CASE_STUDY_OVERVIEW_HEADING_CLASS}>{overview.heading}</h2>
          <p className={COMMITERS_CASE_STUDY_OVERVIEW_BODY_CLASS}>{overview.body}</p>
          <div className={COMMITERS_CASE_STUDY_HIGHLIGHT_GRID_CLASS}>
            <article className={COMMITERS_CASE_STUDY_HIGHLIGHT_CARD_CLASS}>
              <p className={COMMITERS_CASE_STUDY_HIGHLIGHT_LABEL_CLASS}>{overview.objective.label}</p>
              <p className={COMMITERS_CASE_STUDY_HIGHLIGHT_BODY_CLASS}>{overview.objective.body}</p>
            </article>
            <article className={COMMITERS_CASE_STUDY_HIGHLIGHT_CARD_CLASS}>
              <p className={COMMITERS_CASE_STUDY_HIGHLIGHT_LABEL_CLASS}>{overview.outcome.label}</p>
              <p className={COMMITERS_CASE_STUDY_HIGHLIGHT_BODY_CLASS}>{overview.outcome.body}</p>
            </article>
          </div>
        </div>

        <aside className={COMMITERS_CASE_STUDY_CORE_STACK_CLASS} data-testid="commiters-case-study-core-stack">
          <h2 className={COMMITERS_CASE_STUDY_CORE_STACK_HEADING_CLASS}>{coreStack.heading}</h2>
          <ul className={COMMITERS_CASE_STUDY_CORE_STACK_LIST_CLASS}>
            {coreStack.items.map((item) => (
              <li key={item.slug} className={COMMITERS_CASE_STUDY_CORE_STACK_ITEM_CLASS}>
                <span className={COMMITERS_CASE_STUDY_CORE_STACK_ICON_CLASS} aria-hidden>
                  <img src={resolveTechIconUrl(item)} alt="" width={28} height={28} loading="lazy" decoding="async" />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
