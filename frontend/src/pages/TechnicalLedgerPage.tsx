import TechnicalLedgerArticlesSection from "../components/TechnicalLedgerArticlesSection";
import TechnicalLedgerIntroSection from "../components/TechnicalLedgerIntroSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { TECHNICAL_LEDGER_PAGE_CLASS } from "../lib/technicalLedgerPageLayout";
import { technicalLedgerPageSeo } from "../lib/sitePageSeo";

export default function TechnicalLedgerPage() {
  usePageSeo(technicalLedgerPageSeo());

  return (
    <div className={TECHNICAL_LEDGER_PAGE_CLASS} data-testid="technical-ledger-page">
      <TechnicalLedgerIntroSection />
      <TechnicalLedgerArticlesSection refreshKey={0} />
    </div>
  );
}
