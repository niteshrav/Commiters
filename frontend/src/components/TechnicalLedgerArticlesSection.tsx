import TechnicalLedgerArticleCard from "./TechnicalLedgerArticleCard";
import {
  TECHNICAL_LEDGER_ARTICLE_LIST_CLASS,
  TECHNICAL_LEDGER_ARTICLES_SECTION_CLASS,
  TECHNICAL_LEDGER_ARTICLES_STATUS_CLASS,
} from "../lib/technicalLedgerPageLayout";
import { TECHNICAL_LEDGER_PAGE_COPY } from "../lib/technicalLedgerPageContent";
import { useTechnicalLedgerArticles } from "../lib/useTechnicalLedgerArticles";

type Props = {
  refreshKey?: number;
};

export default function TechnicalLedgerArticlesSection({ refreshKey = 0 }: Props) {
  const { articles, loading, error } = useTechnicalLedgerArticles(refreshKey);

  return (
    <section
      className={`${TECHNICAL_LEDGER_ARTICLES_SECTION_CLASS} reveal-on-scroll`}
      data-testid="technical-ledger-articles"
      aria-label="Technical Ledger articles"
    >
      {loading ? (
        <p className={TECHNICAL_LEDGER_ARTICLES_STATUS_CLASS}>{TECHNICAL_LEDGER_PAGE_COPY.loadingArticlesLabel}</p>
      ) : null}
      {error ? (
        <p className={`${TECHNICAL_LEDGER_ARTICLES_STATUS_CLASS} technical-ledger-articles-status-warning`}>
          {TECHNICAL_LEDGER_PAGE_COPY.articlesErrorLabel}
        </p>
      ) : null}

      <div className={TECHNICAL_LEDGER_ARTICLE_LIST_CLASS}>
        {articles.length === 0 && !loading ? (
          <p className={TECHNICAL_LEDGER_ARTICLES_STATUS_CLASS}>{TECHNICAL_LEDGER_PAGE_COPY.emptyArticlesLabel}</p>
        ) : null}
        {articles.map((article) => (
          <TechnicalLedgerArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
