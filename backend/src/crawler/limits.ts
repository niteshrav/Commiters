export const CRAWLER_USER_AGENT = "CommitersBot/1.0 (+https://www.commiters.com)" as const;

export const CRAWL_DEFAULTS = {
  maxPages: 20,
  maxDepth: 2,
  timeoutMs: 10_000,
  retries: 2,
  delayMs: 500,
  sameSite: true,
  respectRobots: true,
  useSitemap: false,
} as const;

export const CRAWL_HARD_MAX = {
  maxPages: 50,
  maxDepth: 4,
  timeoutMs: 15_000,
  retries: 2,
  delayMs: 5_000,
  concurrentJobs: 1,
  redirectHops: 5,
  sitemapFiles: 5,
  sitemapUrls: 50,
  textChars: 20_000,
  headingCount: 40,
  linkCount: 200,
  imageCount: 100,
} as const;

export const CRAWL_HARD_MIN = {
  delayMs: 200,
  timeoutMs: 1_000,
  maxPages: 1,
  maxDepth: 0,
} as const;

export const TRACKING_QUERY_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "mc_eid",
  "igshid",
  "_hsenc",
  "_hsmi",
  "ref",
  "ref_src",
  "ncid",
]);
