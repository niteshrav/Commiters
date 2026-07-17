export type TechnicalLedgerArticleSource = "medium" | "local";

export type TechnicalLedgerArticleRecord = {
  id: string;
  category: string;
  title: string;
  summary: string;
  href: string;
  imageSrc: string | null;
  imageAlt: string;
  source: TechnicalLedgerArticleSource;
  publishedAt: string;
  mediumPostId?: string;
};

export type LocalTechnicalLedgerArticle = {
  id: string;
  category: string;
  title: string;
  summary: string;
  contentMarkdown: string;
  tags: string[];
  imageSrc: string | null;
  imageAlt: string;
  publishedAt: string;
  mediumPostId?: string;
  mediumUrl?: string;
  syncStatus: "pending" | "published" | "failed";
  syncError?: string;
};

export type MediumRssItem = {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
  category: string;
  imageSrc: string | null;
};
