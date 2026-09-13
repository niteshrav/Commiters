import BrandWatermark from "./BrandWatermark";
import {
  ABOUT_INTRO_BODY_CLASS,
  ABOUT_INTRO_INNER_CLASS,
  ABOUT_INTRO_KICKER_CLASS,
  ABOUT_INTRO_SECTION_CLASS,
  ABOUT_INTRO_TITLE_CLASS,
} from "../lib/aboutIntroLayout";
import { ABOUT_STUDIO_ID } from "../lib/aboutPageContent";
import { useAboutContent } from "../lib/cms/hooks";
import { HOME_CLOUD_KICKER_CLASS, HOME_CLOUD_LEAD_CLASS, HOME_CLOUD_TITLE_CLASS } from "../lib/homeCloudTheme";

export default function AboutIntroSection() {
  const about = useAboutContent();

  return (
    <section
      id={ABOUT_STUDIO_ID}
      className={`${ABOUT_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="about-intro-section"
      aria-labelledby="about-intro-title"
    >
      <BrandWatermark />
      <div className={ABOUT_INTRO_INNER_CLASS} data-testid="about-intro-inner">
        <p className={`${ABOUT_INTRO_KICKER_CLASS} ${HOME_CLOUD_KICKER_CLASS}`}>{about.kicker}</p>
        <h1 id="about-intro-title" className={`${ABOUT_INTRO_TITLE_CLASS} ${HOME_CLOUD_TITLE_CLASS}`}>
          {about.title}
        </h1>
        <p className={`${ABOUT_INTRO_BODY_CLASS} ${HOME_CLOUD_LEAD_CLASS}`}>{about.subtext}</p>
      </div>
    </section>
  );
}
