import type { TechnicalLedgerArticle } from "../lib/technicalLedgerPageContent";
import { TECHNICAL_LEDGER_PAGE_COPY } from "../lib/technicalLedgerPageContent";
import {
  TECHNICAL_LEDGER_ARTICLE_CARD_CLASS,
  TECHNICAL_LEDGER_ARTICLE_CATEGORY_CLASS,
  TECHNICAL_LEDGER_ARTICLE_COPY_CLASS,
  TECHNICAL_LEDGER_ARTICLE_IMAGE_CLASS,
  TECHNICAL_LEDGER_ARTICLE_LINK_CLASS,
  TECHNICAL_LEDGER_ARTICLE_MEDIA_CLASS,
  TECHNICAL_LEDGER_ARTICLE_SUMMARY_CLASS,
  TECHNICAL_LEDGER_ARTICLE_TITLE_CLASS,
} from "../lib/technicalLedgerPageLayout";
import { IconExternalLink } from "./icons";

type Props = {
  article: TechnicalLedgerArticle;
};

export default function TechnicalLedgerArticleCard({ article }: Props) {
  return (
    <article className={TECHNICAL_LEDGER_ARTICLE_CARD_CLASS} data-testid="technical-ledger-article-card">
      <div className={TECHNICAL_LEDGER_ARTICLE_MEDIA_CLASS}>
        <img
          className={TECHNICAL_LEDGER_ARTICLE_IMAGE_CLASS}
          src={article.image.src}
          srcSet={article.image.srcSet}
          sizes="(min-width: 900px) 420px, 100vw"
          alt={article.image.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={TECHNICAL_LEDGER_ARTICLE_COPY_CLASS}>
        <p className={TECHNICAL_LEDGER_ARTICLE_CATEGORY_CLASS}>{article.category}</p>
        <h2 className={TECHNICAL_LEDGER_ARTICLE_TITLE_CLASS}>{article.title}</h2>
        <p className={TECHNICAL_LEDGER_ARTICLE_SUMMARY_CLASS}>{article.summary}</p>
        <a
          className={TECHNICAL_LEDGER_ARTICLE_LINK_CLASS}
          href={article.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{TECHNICAL_LEDGER_PAGE_COPY.readOnMediumLabel}</span>
          <IconExternalLink width={16} height={16} />
        </a>
      </div>
    </article>
  );
}
