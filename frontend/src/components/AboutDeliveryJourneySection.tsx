import { Link } from "react-router-dom";
import { NAV_SECTION_ALIAS_CLASS } from "../lib/navSections";
import {
  ABOUT_DELIVERY_JOURNEY,
  ABOUT_JOURNEY_ID,
  ABOUT_SECTION_SCROLL_SHELL_CLASS,
} from "../lib/aboutPageContent";
import {
  ABOUT_JOURNEY_HEADER_CLASS,
  ABOUT_JOURNEY_INNER_CLASS,
  ABOUT_JOURNEY_SECTION_CLASS,
  ABOUT_JOURNEY_STAGE_CLASS,
  ABOUT_JOURNEY_TRACK_CLASS,
} from "../lib/aboutJourneyLayout";
import {
  HOME_CLOUD_KICKER_CLASS,
  HOME_CLOUD_LEAD_CLASS,
  HOME_CLOUD_TITLE_ACCENT_CLASS,
  HOME_CLOUD_TITLE_CLASS,
} from "../lib/homeCloudTheme";

export default function AboutDeliveryJourneySection() {
  return (
    <section
      id={ABOUT_JOURNEY_ID}
      className={`${ABOUT_JOURNEY_SECTION_CLASS} reveal-on-scroll ${ABOUT_SECTION_SCROLL_SHELL_CLASS}`}
      data-testid="about-journey-section"
      aria-labelledby="about-journey-title"
    >
      <span id="how-we-work" className={NAV_SECTION_ALIAS_CLASS} />
      <span id="process" className={NAV_SECTION_ALIAS_CLASS} />
      <div className={ABOUT_JOURNEY_INNER_CLASS}>
        <header className={ABOUT_JOURNEY_HEADER_CLASS}>
          <p className={`about-journey-kicker ${HOME_CLOUD_KICKER_CLASS}`}>{ABOUT_DELIVERY_JOURNEY.kicker}</p>
          <h2 id="about-journey-title" className={`about-journey-title ${HOME_CLOUD_TITLE_CLASS}`}>
            {ABOUT_DELIVERY_JOURNEY.titleLead}
            <span className={`about-journey-title-accent ${HOME_CLOUD_TITLE_ACCENT_CLASS}`}>
              {ABOUT_DELIVERY_JOURNEY.titleAccent}
            </span>
          </h2>
          <p className={`about-journey-subtext ${HOME_CLOUD_LEAD_CLASS}`}>{ABOUT_DELIVERY_JOURNEY.subtext}</p>
        </header>

        <ol className={ABOUT_JOURNEY_TRACK_CLASS} data-testid="about-journey-track">
          {ABOUT_DELIVERY_JOURNEY.stages.map((stage) => (
            <li key={stage.id} className={ABOUT_JOURNEY_STAGE_CLASS} data-testid="about-journey-stage">
              <span className="about-journey-dot" aria-hidden="true" />
              <p className="about-journey-index">{stage.index}</p>
              <h3 className="about-journey-stage-title">
                {"href" in stage && stage.href ? <Link to={stage.href}>{stage.title}</Link> : stage.title}
              </h3>
              <p className="about-journey-stage-body">{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
