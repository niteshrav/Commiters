import {
  TERMS_DIVIDER_CLASS,
  TERMS_INTRO_INNER_CLASS,
  TERMS_INTRO_SECTION_CLASS,
  TERMS_LAST_UPDATED_CLASS,
  TERMS_TITLE_CLASS,
} from "../lib/termsPageLayout";
import { TERMS_PAGE_COPY } from "../lib/termsPageContent";

export default function TermsPageIntro() {
  return (
    <section
      className={TERMS_INTRO_SECTION_CLASS}
      data-testid="terms-intro"
      aria-labelledby="terms-title"
    >
      <div className={TERMS_INTRO_INNER_CLASS} data-testid="terms-intro-inner">
        <h1 id="terms-title" className={TERMS_TITLE_CLASS}>
          {TERMS_PAGE_COPY.title}
        </h1>
        <p className={TERMS_LAST_UPDATED_CLASS}>
          {TERMS_PAGE_COPY.lastUpdatedLabel} {TERMS_PAGE_COPY.lastUpdatedDate}
        </p>
        <hr className={TERMS_DIVIDER_CLASS} />
      </div>
    </section>
  );
}
