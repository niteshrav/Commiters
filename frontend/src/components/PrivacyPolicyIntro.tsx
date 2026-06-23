import {
  PRIVACY_ACCENT_LINE_CLASS,
  PRIVACY_DIVIDER_CLASS,
  PRIVACY_INTRO_BODY_CLASS,
  PRIVACY_INTRO_INNER_CLASS,
  PRIVACY_INTRO_SECTION_CLASS,
  PRIVACY_LAST_UPDATED_CLASS,
  PRIVACY_TITLE_CLASS,
} from "../lib/privacyPageLayout";
import { PRIVACY_PAGE_COPY } from "../lib/privacyPageContent";

export default function PrivacyPolicyIntro() {
  return (
    <section
      className={PRIVACY_INTRO_SECTION_CLASS}
      data-testid="privacy-policy-intro"
      aria-labelledby="privacy-policy-title"
    >
      <div className={PRIVACY_INTRO_INNER_CLASS} data-testid="privacy-policy-intro-inner">
        <h1 id="privacy-policy-title" className={PRIVACY_TITLE_CLASS}>
          {PRIVACY_PAGE_COPY.title}
        </h1>
        <p className={PRIVACY_LAST_UPDATED_CLASS}>
          {PRIVACY_PAGE_COPY.lastUpdatedLabel} {PRIVACY_PAGE_COPY.lastUpdatedDate}
        </p>
        <div className={PRIVACY_ACCENT_LINE_CLASS} aria-hidden />
        <p className={PRIVACY_INTRO_BODY_CLASS}>
          {PRIVACY_PAGE_COPY.introBeforeBold}
          <strong>{PRIVACY_PAGE_COPY.introBold}</strong>
          {PRIVACY_PAGE_COPY.introAfterBold}
        </p>
        <hr className={PRIVACY_DIVIDER_CLASS} />
      </div>
    </section>
  );
}
