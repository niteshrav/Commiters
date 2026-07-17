import type { TechnicalLedgerArticleRecord } from "./api";
import type { TechnicalLedgerArticle } from "./technicalLedgerPageContent";

export function mapTechnicalLedgerArticle(record: TechnicalLedgerArticleRecord): TechnicalLedgerArticle {
  return {
    id: record.id,
    category: record.category,
    title: record.title,
    summary: record.summary,
    href: record.href,
    image: {
      src: record.imageSrc,
      alt: record.imageAlt,
    },
  };
}
