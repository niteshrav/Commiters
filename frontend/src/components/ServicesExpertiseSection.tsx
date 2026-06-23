import {
  SERVICES_EXPERTISE_BODY_CLASS,
  SERVICES_EXPERTISE_INNER_CLASS,
  SERVICES_EXPERTISE_KICKER_CLASS,
  SERVICES_EXPERTISE_SECTION_CLASS,
  SERVICES_EXPERTISE_SEPARATOR_CLASS,
  SERVICES_EXPERTISE_SEPARATOR_TEST_ID,
  SERVICES_EXPERTISE_TITLE_CLASS,
} from "../lib/servicesIntroLayout";
import { STITCH_COPY } from "../lib/stitchDesign";

export default function ServicesExpertiseSection() {
  const { kicker, title, subtext } = STITCH_COPY.services;

  return (
    <section
      className={`${SERVICES_EXPERTISE_SECTION_CLASS} reveal-on-scroll`}
      data-testid="services-expertise-section"
      aria-labelledby="services-expertise-title"
    >
      <div className="container">
        <div className={SERVICES_EXPERTISE_INNER_CLASS} data-testid="services-expertise-inner">
          <p className={SERVICES_EXPERTISE_KICKER_CLASS}>{kicker}</p>
          <h1 id="services-expertise-title" className={SERVICES_EXPERTISE_TITLE_CLASS}>
            {title}
          </h1>
          <p className={SERVICES_EXPERTISE_BODY_CLASS}>{subtext}</p>
        </div>
        <hr
          className={SERVICES_EXPERTISE_SEPARATOR_CLASS}
          data-testid={SERVICES_EXPERTISE_SEPARATOR_TEST_ID}
        />
      </div>
    </section>
  );
}
