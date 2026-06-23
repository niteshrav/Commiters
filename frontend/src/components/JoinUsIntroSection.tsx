import {
  JOIN_US_INTRO_BODY_CLASS,
  JOIN_US_INTRO_INNER_CLASS,
  JOIN_US_INTRO_KICKER_CLASS,
  JOIN_US_INTRO_SECTION_CLASS,
  JOIN_US_INTRO_TITLE_CLASS,
} from "../lib/joinUsPageLayout";
import { JOIN_US_PAGE_COPY } from "../lib/joinUsPageContent";

export default function JoinUsIntroSection() {
  const { intro } = JOIN_US_PAGE_COPY;

  return (
    <section
      className={`${JOIN_US_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="join-us-intro-section"
      aria-labelledby="join-us-intro-title"
    >
      <div className={JOIN_US_INTRO_INNER_CLASS} data-testid="join-us-intro-inner">
        <p className={JOIN_US_INTRO_KICKER_CLASS}>{intro.kicker}</p>
        <h1 id="join-us-intro-title" className={JOIN_US_INTRO_TITLE_CLASS}>
          {intro.title}
        </h1>
        <p className={JOIN_US_INTRO_BODY_CLASS}>{intro.subtext}</p>
      </div>
    </section>
  );
}
