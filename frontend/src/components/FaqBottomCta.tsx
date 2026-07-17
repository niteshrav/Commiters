import { IconPhone } from "./icons";
import {
  FAQ_BOTTOM_CTA_ACTIONS_CLASS,
  FAQ_BOTTOM_CTA_BOX_CLASS,
  FAQ_BOTTOM_CTA_COPY_CLASS,
  FAQ_BOTTOM_CTA_SECTION_CLASS,
  FAQ_BOTTOM_CTA_SUBTEXT_CLASS,
  FAQ_BOTTOM_CTA_TITLE_CLASS,
} from "../lib/faqPageLayout";
import { FAQ_PAGE_COPY } from "../lib/faqPageContent";

export default function FaqBottomCta() {
  const { bottomCta } = FAQ_PAGE_COPY;

  return (
    <section
      className={`${FAQ_BOTTOM_CTA_SECTION_CLASS} reveal-on-scroll`}
      data-testid="faq-bottom-cta"
      aria-labelledby="faq-bottom-cta-title"
    >
      <div className="container">
        <div className={FAQ_BOTTOM_CTA_BOX_CLASS}>
          <div className={FAQ_BOTTOM_CTA_COPY_CLASS}>
            <h2 id="faq-bottom-cta-title" className={FAQ_BOTTOM_CTA_TITLE_CLASS}>
              {bottomCta.title}
            </h2>
            <p className={FAQ_BOTTOM_CTA_SUBTEXT_CLASS}>{bottomCta.subtext}</p>
          </div>
          <div className={FAQ_BOTTOM_CTA_ACTIONS_CLASS}>
            <a
              className="btn btn-primary faq-bottom-cta-btn"
              href={bottomCta.buttonHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bottomCta.buttonLabel}
              <IconPhone width={18} height={18} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
