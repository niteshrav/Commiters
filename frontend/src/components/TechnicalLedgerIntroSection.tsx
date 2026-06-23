import { TECHNICAL_LEDGER_PAGE_COPY } from "../lib/technicalLedgerPageContent";
import {
  TECHNICAL_LEDGER_DIVIDER_CLASS,
  TECHNICAL_LEDGER_INTRO_INNER_CLASS,
  TECHNICAL_LEDGER_INTRO_SECTION_CLASS,
  TECHNICAL_LEDGER_SUBTEXT_CLASS,
  TECHNICAL_LEDGER_TITLE_CLASS,
} from "../lib/technicalLedgerPageLayout";

export default function TechnicalLedgerIntroSection() {
  return (
    <section
      className={`${TECHNICAL_LEDGER_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="technical-ledger-intro"
      aria-labelledby="technical-ledger-title"
    >
      <div className={TECHNICAL_LEDGER_INTRO_INNER_CLASS}>
        <h1 id="technical-ledger-title" className={TECHNICAL_LEDGER_TITLE_CLASS}>
          {TECHNICAL_LEDGER_PAGE_COPY.title}
        </h1>
        <p className={TECHNICAL_LEDGER_SUBTEXT_CLASS}>{TECHNICAL_LEDGER_PAGE_COPY.subtext}</p>
        <hr className={TECHNICAL_LEDGER_DIVIDER_CLASS} role="separator" />
      </div>
    </section>
  );
}
