import {
  ABOUT_INTRO_BODY_CLASS,
  ABOUT_INTRO_INNER_CLASS,
  ABOUT_INTRO_KICKER_CLASS,
  ABOUT_INTRO_SECTION_CLASS,
  ABOUT_INTRO_TITLE_CLASS,
} from "../lib/aboutIntroLayout";
import { useAboutContent } from "../lib/cms/hooks";

export default function AboutIntroSection() {
  const about = useAboutContent();

  return (
    <section
      className={`${ABOUT_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="about-intro-section"
      aria-labelledby="about-intro-title"
    >
      <div className={ABOUT_INTRO_INNER_CLASS} data-testid="about-intro-inner">
        <p className={ABOUT_INTRO_KICKER_CLASS}>{about.kicker}</p>
        <h1 id="about-intro-title" className={ABOUT_INTRO_TITLE_CLASS}>
          {about.title}
        </h1>
        <p className={ABOUT_INTRO_BODY_CLASS}>{about.subtext}</p>
      </div>
    </section>
  );
}
