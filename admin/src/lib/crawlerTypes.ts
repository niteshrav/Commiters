export type CrawlJob = {
  id: string;
  startUrl: string;
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
  maxPages: number;
  maxDepth: number;
  timeout: number;
  retries: number;
  delay: number;
  sameSite: boolean;
  robotsEnabled: boolean;
  sitemapEnabled: boolean;
  pagesDiscovered: number;
  pagesCrawled: number;
  pagesFailed: number;
  pagesSkipped: number;
  currentUrl: string;
  error: string;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CrawledPage = {
  id: string;
  crawlJobId: string;
  url: string;
  status: "crawled" | "failed" | "skipped";
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
  crawledAt: string;
};

export type StartCrawlPayload = {
  startUrl: string;
  maxPages: number;
  maxDepth: number;
  timeout: number;
  retries: number;
  delay: number;
  sameSite: boolean;
  respectRobots: boolean;
  useSitemap: boolean;
};
