import {
  SERVICES_HOW_WE_WORK_GRID_CLASS,
  SERVICES_HOW_WE_WORK_INNER_CLASS,
  SERVICES_HOW_WE_WORK_SECTION_CLASS,
  SERVICES_HOW_WE_WORK_SEPARATOR_CLASS,
  SERVICES_HOW_WE_WORK_SEPARATOR_TEST_ID,
  SERVICES_HOW_WE_WORK_STEP_BODY_CLASS,
  SERVICES_HOW_WE_WORK_STEP_CLASS,
  SERVICES_HOW_WE_WORK_STEP_INDEX_CLASS,
  SERVICES_HOW_WE_WORK_STEP_TITLE_CLASS,
  SERVICES_HOW_WE_WORK_SUBTEXT_CLASS,
  SERVICES_HOW_WE_WORK_TITLE_CLASS,
} from "../lib/servicesPageBottomLayout";
import { SERVICES_HOW_WE_WORK } from "../lib/servicesPageBottomContent";

export default function ServicesHowWeWorkSection() {
  return (
    <section
      className={`${SERVICES_HOW_WE_WORK_SECTION_CLASS} reveal-on-scroll`}
      data-testid="services-how-we-work-section"
      aria-labelledby="services-how-we-work-title"
    >
      <div className="container">
        <div className={SERVICES_HOW_WE_WORK_INNER_CLASS} data-testid="services-how-we-work-inner">
          <h2 id="services-how-we-work-title" className={SERVICES_HOW_WE_WORK_TITLE_CLASS}>
            {SERVICES_HOW_WE_WORK.title}
          </h2>
          <p className={SERVICES_HOW_WE_WORK_SUBTEXT_CLASS}>{SERVICES_HOW_WE_WORK.subtext}</p>
          <div className={SERVICES_HOW_WE_WORK_GRID_CLASS} data-testid="services-how-we-work-grid">
            {SERVICES_HOW_WE_WORK.steps.map((step) => (
              <article
                key={step.index}
                className={SERVICES_HOW_WE_WORK_STEP_CLASS}
                data-testid="services-how-we-work-step"
              >
                <p className={SERVICES_HOW_WE_WORK_STEP_INDEX_CLASS}>{step.index}</p>
                <h3 className={SERVICES_HOW_WE_WORK_STEP_TITLE_CLASS}>{step.title}</h3>
                <p className={SERVICES_HOW_WE_WORK_STEP_BODY_CLASS}>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
        <hr
          className={SERVICES_HOW_WE_WORK_SEPARATOR_CLASS}
          data-testid={SERVICES_HOW_WE_WORK_SEPARATOR_TEST_ID}
        />
      </div>
    </section>
  );
}
