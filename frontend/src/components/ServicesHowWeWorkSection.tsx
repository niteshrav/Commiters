import { Link } from "react-router-dom";
import { SERVICES_HOW_WE_WORK } from "../lib/servicesPageBottomContent";
import {
  SERVICES_HOW_WE_WORK_CARD_CLASS,
  SERVICES_HOW_WE_WORK_CARD_ICON_CLASS,
  SERVICES_HOW_WE_WORK_CONNECTOR_CLASS,
  SERVICES_HOW_WE_WORK_HEADER_CLASS,
  SERVICES_HOW_WE_WORK_INNER_CLASS,
  SERVICES_HOW_WE_WORK_KICKER_CLASS,
  SERVICES_HOW_WE_WORK_SECTION_CLASS,
  SERVICES_HOW_WE_WORK_STEP_BODY_CLASS,
  SERVICES_HOW_WE_WORK_STEP_INDEX_CLASS,
  SERVICES_HOW_WE_WORK_STEP_TITLE_CLASS,
  SERVICES_HOW_WE_WORK_SUBTEXT_CLASS,
  SERVICES_HOW_WE_WORK_TITLE_ACCENT_CLASS,
  SERVICES_HOW_WE_WORK_TITLE_CLASS,
  SERVICES_HOW_WE_WORK_TRACK_CLASS,
} from "../lib/servicesPageBottomLayout";
import type { ServicesProcessStepTone } from "../lib/servicesPageBottomContent";
import {
  IconArrowRight,
  IconCodeBracket,
  IconLayers,
  IconRocket,
  IconSearch,
} from "./icons";

const STEP_ICONS = {
  blue: IconSearch,
  green: IconLayers,
  gold: IconCodeBracket,
  purple: IconRocket,
} as const satisfies Record<ServicesProcessStepTone, typeof IconSearch>;

export default function ServicesHowWeWorkSection() {
  return (
    <section
      id="how-we-work"
      className={`${SERVICES_HOW_WE_WORK_SECTION_CLASS} reveal-on-scroll`}
      data-testid="services-how-we-work-section"
      aria-labelledby="services-how-we-work-title"
    >
      <div className={SERVICES_HOW_WE_WORK_INNER_CLASS} data-testid="services-how-we-work-inner">
        <header className={SERVICES_HOW_WE_WORK_HEADER_CLASS}>
          <p className={SERVICES_HOW_WE_WORK_KICKER_CLASS}>{SERVICES_HOW_WE_WORK.kicker}</p>
          <h2 id="services-how-we-work-title" className={SERVICES_HOW_WE_WORK_TITLE_CLASS}>
            {SERVICES_HOW_WE_WORK.titleLead}
            <span className={SERVICES_HOW_WE_WORK_TITLE_ACCENT_CLASS}>{SERVICES_HOW_WE_WORK.titleAccent}</span>
          </h2>
          <p className={SERVICES_HOW_WE_WORK_SUBTEXT_CLASS}>{SERVICES_HOW_WE_WORK.subtext}</p>
        </header>

        <div className={SERVICES_HOW_WE_WORK_TRACK_CLASS} data-testid="services-how-we-work-grid">
          {SERVICES_HOW_WE_WORK.steps.map((step, index) => {
            const Icon = STEP_ICONS[step.tone];
            const isLast = index === SERVICES_HOW_WE_WORK.steps.length - 1;

            return (
              <div key={step.index} className="services-how-we-work-track-item">
                <article
                  className={`${SERVICES_HOW_WE_WORK_CARD_CLASS} services-how-we-work-card--${step.tone}`}
                  data-testid="services-how-we-work-step"
                >
                  <span
                    className={`${SERVICES_HOW_WE_WORK_CARD_ICON_CLASS} services-how-we-work-card-icon--${step.tone}`}
                    aria-hidden
                  >
                    <Icon width={20} height={20} />
                  </span>
                  <p className={SERVICES_HOW_WE_WORK_STEP_INDEX_CLASS}>{step.index}</p>
                  <h3 className={SERVICES_HOW_WE_WORK_STEP_TITLE_CLASS}>
                    {"href" in step && step.href ? <Link to={step.href}>{step.title}</Link> : step.title}
                  </h3>
                  <p className={SERVICES_HOW_WE_WORK_STEP_BODY_CLASS}>{step.body}</p>
                </article>
                {!isLast ? (
                  <span className={SERVICES_HOW_WE_WORK_CONNECTOR_CLASS} aria-hidden="true">
                    <IconArrowRight width={14} height={14} />
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
