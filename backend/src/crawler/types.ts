export const CRAWL_JOB_STATUSES = ["pending", "running", "completed", "failed", "cancelled"] as const;
export type CrawlJobStatus = (typeof CRAWL_JOB_STATUSES)[number];

export const CRAWLED_PAGE_STATUSES = ["crawled", "failed", "skipped"] as const;
export type CrawledPageStatus = (typeof CRAWLED_PAGE_STATUSES)[number];

export type CrawlConfig = {
  startUrl: string;
  maxPages: number;
  maxDepth: number;
  timeoutMs: number;
  retries: number;
  delayMs: number;
  sameSite: boolean;
  respectRobots: boolean;
  useSitemap: boolean;
};

export type QueueItem = {
  url: string;
  depth: number;
};

export type ExtractedHtml = {
  title: string;
  metaDescription: string;
  canonicalUrl: string | null;
  h1: string;
  h2: string[];
  textContent: string;
  links: string[];
  images: string[];
};

export type FetchResult = {
  finalUrl: string;
  status: number;
  contentType: string;
  body: string;
};

export type SavedPageInput = {
  url: string;
  status: CrawledPageStatus;
  httpStatus: number | null;
  depth: number;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  headings: { h1: string; h2: string[] };
  textContent: string;
  internalLinks: string[];
  externalLinks: string[];
  images: string[];
  error: string;
};

export type CrawlProgress = {
  status?: CrawlJobStatus;
  currentUrl?: string;
  pagesDiscovered?: number;
  pagesCrawled?: number;
  pagesFailed?: number;
  pagesSkipped?: number;
  error?: string;
  startedAt?: Date;
  completedAt?: Date | null;
};
