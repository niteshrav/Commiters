import {
  LEGAL_INTRO_INNER_CLASS,
  LEGAL_INTRO_KICKER_CLASS,
  LEGAL_INTRO_META_CLASS,
  LEGAL_INTRO_SECTION_CLASS,
  LEGAL_INTRO_TITLE_CLASS,
} from "../lib/legalPageLayout";

type Props = {
  kicker?: string;
  title: string;
  effectiveDateLabel: string;
  effectiveDate: string;
};

export default function LegalIntroSection({ kicker, title, effectiveDateLabel, effectiveDate }: Props) {
  return (
    <section
      className={`${LEGAL_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="legal-intro-section"
      aria-labelledby="legal-intro-title"
    >
      <div className={LEGAL_INTRO_INNER_CLASS} data-testid="legal-intro-inner">
        {kicker ? <p className={LEGAL_INTRO_KICKER_CLASS}>{kicker}</p> : null}
        <h1 id="legal-intro-title" className={LEGAL_INTRO_TITLE_CLASS}>
          {title}
        </h1>
        <p className={LEGAL_INTRO_META_CLASS}>
          <strong>{effectiveDateLabel}</strong> {effectiveDate}
        </p>
      </div>
    </section>
  );
}
