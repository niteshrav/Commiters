export const TECHNICAL_LEDGER_PUBLISH_COPY = {
  title: "Publish Technical Ledger Article",
  description:
    "Publish engineering articles to the public Technical Ledger page. Optionally sync to Medium when the integration token is configured.",
  titleLabel: "Title",
  summaryLabel: "Summary",
  contentLabel: "Article body (Markdown)",
  categoryLabel: "Category",
  tagsLabel: "Medium tags (comma separated)",
  publishToMediumLabel: "Also publish this article to Medium",
  publishButton: "Publish Article",
  publishing: "Publishing…",
  publishFailed: "Unable to publish article.",
  publishedToMedium: "Article published to Medium and Technical Ledger.",
  savedLocally: "Article saved to Technical Ledger.",
} as const;

export type PublishedTechnicalLedgerArticle = {
  id: string;
  syncStatus?: string;
  mediumUrl?: string;
  syncError?: string;
};
