import {
  ABOUT_INTRO_BODY_CLASS,
  ABOUT_INTRO_INNER_CLASS,
  ABOUT_INTRO_KICKER_CLASS,
  ABOUT_INTRO_SECTION_CLASS,
  ABOUT_INTRO_TITLE_CLASS,
} from "../lib/aboutIntroLayout";
import { STITCH_COPY } from "../lib/stitchDesign";

export default function AboutIntroSection() {
  return (
    <section
      className={`${ABOUT_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="about-intro-section"
      aria-labelledby="about-intro-title"
    >
      <div className={ABOUT_INTRO_INNER_CLASS} data-testid="about-intro-inner">
        <p className={ABOUT_INTRO_KICKER_CLASS}>{STITCH_COPY.engineeringPrecision}</p>
        <h1 id="about-intro-title" className={ABOUT_INTRO_TITLE_CLASS}>
          {STITCH_COPY.about.title}
        </h1>
        <p className={ABOUT_INTRO_BODY_CLASS}>{STITCH_COPY.about.subtext}</p>
      </div>
    </section>
  );
}
