import { z } from "zod";
import { CRAWL_DEFAULTS, CRAWL_HARD_MAX, CRAWL_HARD_MIN } from "./limits";
import { normalizeUrl } from "./urlPolicy";
import { assertPublicHttpUrl } from "./ssrf";
import type { CrawlConfig } from "./types";

export const startCrawlSchema = z.object({
  startUrl: z.string().min(1).max(2048),
  maxPages: z.number().int().min(CRAWL_HARD_MIN.maxPages).max(CRAWL_HARD_MAX.maxPages).optional(),
  maxDepth: z.number().int().min(CRAWL_HARD_MIN.maxDepth).max(CRAWL_HARD_MAX.maxDepth).optional(),
  timeout: z.number().int().min(CRAWL_HARD_MIN.timeoutMs).max(CRAWL_HARD_MAX.timeoutMs).optional(),
  retries: z.number().int().min(0).max(CRAWL_HARD_MAX.retries).optional(),
  delay: z.number().int().min(CRAWL_HARD_MIN.delayMs).max(CRAWL_HARD_MAX.delayMs).optional(),
  sameSite: z.boolean().optional(),
  respectRobots: z.boolean().optional(),
  useSitemap: z.boolean().optional(),
});

export type StartCrawlInput = z.infer<typeof startCrawlSchema>;

export async function toCrawlConfig(input: StartCrawlInput): Promise<CrawlConfig> {
  const startUrl = normalizeUrl(input.startUrl);
  if (!startUrl) {
    throw new Error("Start URL must be a public HTTP or HTTPS URL without credentials.");
  }
  await assertPublicHttpUrl(startUrl);
  return {
    startUrl,
    maxPages: input.maxPages ?? CRAWL_DEFAULTS.maxPages,
    maxDepth: input.maxDepth ?? CRAWL_DEFAULTS.maxDepth,
    timeoutMs: input.timeout ?? CRAWL_DEFAULTS.timeoutMs,
    retries: input.retries ?? CRAWL_DEFAULTS.retries,
    delayMs: input.delay ?? CRAWL_DEFAULTS.delayMs,
    sameSite: input.sameSite ?? CRAWL_DEFAULTS.sameSite,
    respectRobots: input.respectRobots ?? CRAWL_DEFAULTS.respectRobots,
    useSitemap: input.useSitemap ?? CRAWL_DEFAULTS.useSitemap,
  };
}
