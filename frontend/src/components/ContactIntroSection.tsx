import {
  CONTACT_INTRO_BODY_CLASS,
  CONTACT_INTRO_INNER_CLASS,
  CONTACT_INTRO_SECTION_CLASS,
  CONTACT_INTRO_TITLE_CLASS,
} from "../lib/contactIntroLayout";
import { STITCH_COPY } from "../lib/stitchDesign";

export default function ContactIntroSection() {
  return (
    <section
      className={`${CONTACT_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="contact-intro-section"
      aria-labelledby="contact-intro-title"
    >
      <div className={CONTACT_INTRO_INNER_CLASS} data-testid="contact-intro-inner">
        <h1 id="contact-intro-title" className={CONTACT_INTRO_TITLE_CLASS}>
          {STITCH_COPY.contact.title}
        </h1>
        <p className={CONTACT_INTRO_BODY_CLASS}>{STITCH_COPY.contact.subtext}</p>
      </div>
    </section>
  );
}
