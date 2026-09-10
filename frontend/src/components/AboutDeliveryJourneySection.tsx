import { Link } from "react-router-dom";
import {
  ABOUT_DELIVERY_JOURNEY,
} from "../lib/aboutPageContent";
import {
  ABOUT_JOURNEY_HEADER_CLASS,
  ABOUT_JOURNEY_INNER_CLASS,
  ABOUT_JOURNEY_SECTION_CLASS,
  ABOUT_JOURNEY_STAGE_CLASS,
  ABOUT_JOURNEY_TRACK_CLASS,
} from "../lib/aboutJourneyLayout";

export default function AboutDeliveryJourneySection() {
  return (
    <section
      id="how-we-work"
      className={`${ABOUT_JOURNEY_SECTION_CLASS} reveal-on-scroll`}
      data-testid="about-journey-section"
      aria-labelledby="about-journey-title"
    >
      <div className={ABOUT_JOURNEY_INNER_CLASS}>
        <header className={ABOUT_JOURNEY_HEADER_CLASS}>
          <p className="about-journey-kicker">{ABOUT_DELIVERY_JOURNEY.kicker}</p>
          <h2 id="about-journey-title" className="about-journey-title">
            {ABOUT_DELIVERY_JOURNEY.titleLead}
            <span className="about-journey-title-accent">{ABOUT_DELIVERY_JOURNEY.titleAccent}</span>
          </h2>
          <p className="about-journey-subtext">{ABOUT_DELIVERY_JOURNEY.subtext}</p>
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
