import {
  FAQ_INTRO_BODY_CLASS,
  FAQ_INTRO_INNER_CLASS,
  FAQ_INTRO_SECTION_CLASS,
  FAQ_INTRO_TITLE_CLASS,
} from "../lib/faqPageLayout";
import { FAQ_PAGE_COPY } from "../lib/faqPageContent";

export default function FaqIntroSection() {
  return (
    <section
      className={`${FAQ_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="faq-intro-section"
      aria-labelledby="faq-intro-title"
    >
      <div className="container">
        <div className={FAQ_INTRO_INNER_CLASS}>
          <h1 id="faq-intro-title" className={FAQ_INTRO_TITLE_CLASS}>
            {FAQ_PAGE_COPY.title}
          </h1>
          <p className={FAQ_INTRO_BODY_CLASS}>{FAQ_PAGE_COPY.subtext}</p>
        </div>
      </div>
    </section>
  );
}
