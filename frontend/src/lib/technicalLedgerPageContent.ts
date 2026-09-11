export type TechnicalLedgerArticle = {
  id: string;
  category: string;
  title: string;
  summary: string;
  href: string;
  image: {
    src: string;
    srcSet?: string;
    alt: string;
  };
};

export const TECHNICAL_LEDGER_PAGE_COPY = {
  title: "Technical Ledger",
  subtext:
    "Engineering insights, architectural deep-dives, and the future of founder-led software.",
  readOnMediumLabel: "Read on Medium",
  loadingArticlesLabel: "Loading articles from Medium…",
  emptyArticlesLabel: "No Technical Ledger articles yet.",
} as const;

export const TECHNICAL_LEDGER_CONTEXT_TRAP_MEDIUM_URL =
  "https://medium.com/@erniteshrav/the-context-trap-why-more-ai-code-isnt-leading-to-faster-shipping-8cdead376704" as const;

export const TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE: TechnicalLedgerArticle = {
  id: "context-trap-ai-shipping",
  category: "ENGINEERING",
  title: "The Context Trap: Why More AI Code Isn't Leading to Faster Shipping",
  summary:
    "Shifting the engineering paradigm from isolated AI automation to human-centric architectural orchestration.",
  href: TECHNICAL_LEDGER_CONTEXT_TRAP_MEDIUM_URL,
  image: {
    src: "/assets/case-studies/commiters.png",
    srcSet: "/assets/case-studies/commiters@2x.png 2x",
    alt: "Spec-driven engineering console used as the Technical Ledger cover",
  },
};

export const TECHNICAL_LEDGER_ARTICLES: TechnicalLedgerArticle[] = [
  TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE,
];
