import { COOKIE_PAGE_COPY } from "../lib/cookiePageContent";
import {
  COOKIE_DIVIDER_CLASS,
  COOKIE_INTRO_INNER_CLASS,
  COOKIE_INTRO_KICKER_CLASS,
  COOKIE_INTRO_SECTION_CLASS,
  COOKIE_LAST_UPDATED_CLASS,
  COOKIE_TITLE_CLASS,
} from "../lib/cookiePageLayout";

export default function CookiePolicyIntro() {
  return (
    <section
      className={COOKIE_INTRO_SECTION_CLASS}
      data-testid="cookie-policy-intro"
      aria-labelledby="cookie-policy-title"
    >
      <div className={COOKIE_INTRO_INNER_CLASS} data-testid="cookie-policy-intro-inner">
        <p className={COOKIE_INTRO_KICKER_CLASS}>{COOKIE_PAGE_COPY.kicker}</p>
        <h1 id="cookie-policy-title" className={COOKIE_TITLE_CLASS}>
          {COOKIE_PAGE_COPY.title}
        </h1>
        <p className={COOKIE_LAST_UPDATED_CLASS}>
          {COOKIE_PAGE_COPY.lastUpdatedLabel} {COOKIE_PAGE_COPY.lastUpdatedDate}
        </p>
        <hr className={COOKIE_DIVIDER_CLASS} role="separator" />
      </div>
    </section>
  );
}
