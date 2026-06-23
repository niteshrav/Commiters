import { TECHNICAL_LEDGER_ARTICLES } from "../lib/technicalLedgerPageContent";
import {
  TECHNICAL_LEDGER_ARTICLE_LIST_CLASS,
  TECHNICAL_LEDGER_ARTICLES_SECTION_CLASS,
} from "../lib/technicalLedgerPageLayout";
import TechnicalLedgerArticleCard from "./TechnicalLedgerArticleCard";

export default function TechnicalLedgerArticlesSection() {
  return (
    <section
      className={`${TECHNICAL_LEDGER_ARTICLES_SECTION_CLASS} reveal-on-scroll`}
      data-testid="technical-ledger-articles"
      aria-label="Technical Ledger articles"
    >
      <div className={TECHNICAL_LEDGER_ARTICLE_LIST_CLASS}>
        {TECHNICAL_LEDGER_ARTICLES.map((article) => (
          <TechnicalLedgerArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
