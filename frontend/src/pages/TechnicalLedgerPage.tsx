import TechnicalLedgerArticlesSection from "../components/TechnicalLedgerArticlesSection";
import TechnicalLedgerIntroSection from "../components/TechnicalLedgerIntroSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { TECHNICAL_LEDGER_PAGE_COPY } from "../lib/technicalLedgerPageContent";
import { TECHNICAL_LEDGER_PAGE_CLASS } from "../lib/technicalLedgerPageLayout";
import { pageTitle } from "../lib/siteMeta";

export default function TechnicalLedgerPage() {
  useDocumentTitle(pageTitle(TECHNICAL_LEDGER_PAGE_COPY.title));

  return (
    <div className={TECHNICAL_LEDGER_PAGE_CLASS} data-testid="technical-ledger-page">
      <TechnicalLedgerIntroSection />
      <TechnicalLedgerArticlesSection refreshKey={0} />
    </div>
  );
}
