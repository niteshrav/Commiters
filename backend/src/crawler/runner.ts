import { classifyLink, normalizeUrl, originOf } from "./urlPolicy";
import { extractHtml } from "./htmlParser";
import { CrawlHttpError, isRetryableStatus, type FetchPageFn } from "./httpClient";
import { CRAWLER_USER_AGENT, CRAWL_HARD_MIN } from "./limits";
import { CrawlQueue } from "./queue";
import { isPathAllowed, robotsPolicyFromResponse, type RobotsPolicy } from "./robots";
import { discoverSitemapUrls } from "./sitemap";
import type { CrawlConfig, CrawlProgress, FetchResult, SavedPageInput } from "./types";

export type CrawlRunnerDeps = {
  fetchPage: FetchPageFn;
  sleep?: (ms: number) => Promise<void>;
  shouldStop?: () => Promise<boolean>;
  onProgress?: (progress: CrawlProgress) => Promise<void>;
  savePage?: (page: SavedPageInput) => Promise<void>;
};

function emptyPage(url: string, depth: number, status: SavedPageInput["status"], error: string, httpStatus: number | null = null): SavedPageInput {
  return {
    url,
    status,
    httpStatus,
    depth,
    title: "",
    metaDescription: "",
    canonicalUrl: "",
    headings: { h1: "", h2: [] },
    textContent: "",
    internalLinks: [],
    externalLinks: [],
    images: [],
    error,
  };
}

async function defaultSleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadRobots(origin: string, fetchPage: FetchPageFn, timeoutMs: number): Promise<RobotsPolicy> {
  try {
    const result = await fetchPage(`${origin.replace(/\/$/, "")}/robots.txt`, timeoutMs);
    return robotsPolicyFromResponse(result.status, result.body, CRAWLER_USER_AGENT);
  } catch (error) {
    const message = error instanceof Error ? error.message : "robots.txt request failed.";
    if (message.includes("private") || message.includes("credentials")) {
      return { sourceStatus: 0, blocked: true, reason: message, rules: [] };
    }
    return { sourceStatus: 0, blocked: false, reason: "", rules: [] };
  }
}

async function fetchWithRetry(
  url: string,
  fetchPage: FetchPageFn,
  timeoutMs: number,
  retries: number,
  sleep: (ms: number) => Promise<void>,
): Promise<FetchResult> {
  let lastError: Error | null = null;
  const attempts = retries + 1;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const result = await fetchPage(url, timeoutMs);
      if (isRetryableStatus(result.status) && attempt < attempts - 1) {
        await sleep(Math.max(CRAWL_HARD_MIN.delayMs, 250 * (attempt + 1)));
        continue;
      }
      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Fetch failed.");
      const retryable = error instanceof CrawlHttpError ? error.retryable : true;
      if (!retryable || attempt >= attempts - 1) throw lastError;
      await sleep(Math.max(CRAWL_HARD_MIN.delayMs, 250 * (attempt + 1)));
    }
  }
  throw lastError ?? new Error("Fetch failed.");
}

export async function runCrawl(config: CrawlConfig, deps: CrawlRunnerDeps): Promise<void> {
  const sleep = deps.sleep ?? defaultSleep;
  const startUrl = normalizeUrl(config.startUrl);
  if (!startUrl) throw new Error("Start URL is invalid.");
  const origin = originOf(startUrl);
  if (!origin) throw new Error("Start URL origin is invalid.");

  const queue = new CrawlQueue();
  queue.enqueue(startUrl, 0);

  let robots: RobotsPolicy = { sourceStatus: 0, blocked: false, reason: "", rules: [] };
  if (config.respectRobots) {
    robots = await loadRobots(origin, deps.fetchPage, config.timeoutMs);
    if (robots.blocked) {
      await deps.onProgress?.({
        status: "failed",
        error: robots.reason,
        completedAt: new Date(),
      });
      return;
    }
    const startPath = new URL(startUrl).pathname;
    if (!isPathAllowed(startPath, robots.rules)) {
      await deps.savePage?.(emptyPage(startUrl, 0, "skipped", "Blocked by robots.txt."));
      await deps.onProgress?.({
        status: "failed",
        pagesSkipped: 1,
        pagesDiscovered: 1,
        error: "Start URL is disallowed by robots.txt.",
        completedAt: new Date(),
      });
      return;
    }
  }

  if (config.useSitemap) {
    const sitemapUrls = await discoverSitemapUrls(startUrl, deps.fetchPage, config.timeoutMs);
    for (const url of sitemapUrls) {
      queue.enqueue(url, 0);
    }
  }

  let crawled = 0;
  let failed = 0;
  let skipped = 0;

  await deps.onProgress?.({
    status: "running",
    startedAt: new Date(),
    pagesDiscovered: queue.discovered,
  });

  while (queue.size > 0 && crawled < config.maxPages) {
    if (await deps.shouldStop?.()) {
      await deps.onProgress?.({
        status: "cancelled",
        completedAt: new Date(),
        pagesDiscovered: queue.discovered,
        pagesCrawled: crawled,
        pagesFailed: failed,
        pagesSkipped: skipped,
      });
      return;
    }

    const item = queue.dequeue();
    if (!item) break;
    await deps.onProgress?.({ currentUrl: item.url, pagesDiscovered: queue.discovered });

    if (item.depth > config.maxDepth) {
      skipped += 1;
      await deps.savePage?.(emptyPage(item.url, item.depth, "skipped", "Exceeded max depth."));
      continue;
    }

    if (config.respectRobots && !isPathAllowed(new URL(item.url).pathname, robots.rules)) {
      skipped += 1;
      await deps.savePage?.(emptyPage(item.url, item.depth, "skipped", "Blocked by robots.txt."));
      continue;
    }

    try {
      const result = await fetchWithRetry(item.url, deps.fetchPage, config.timeoutMs, config.retries, sleep);
      const htmlLike = /html|xml|text\/plain/i.test(result.contentType) || result.body.trimStart().startsWith("<");
      if (result.status >= 400) {
        failed += 1;
        await deps.savePage?.(emptyPage(item.url, item.depth, "failed", `HTTP ${result.status}`, result.status));
      } else if (!htmlLike) {
        skipped += 1;
        await deps.savePage?.(emptyPage(item.url, item.depth, "skipped", "Not an HTML document.", result.status));
      } else {
        const extracted = extractHtml(result.body, result.finalUrl);
        const internalLinks: string[] = [];
        const externalLinks: string[] = [];
        for (const href of extracted.links) {
          const classified = classifyLink(href, result.finalUrl, startUrl);
          if (classified.kind === "internal" && classified.url) {
            internalLinks.push(classified.url);
            if (item.depth < config.maxDepth) {
              queue.enqueue(classified.url, item.depth + 1);
            }
          } else if (classified.kind === "external" && classified.url) {
            externalLinks.push(classified.url);
            if (!config.sameSite && item.depth < config.maxDepth) {
              queue.enqueue(classified.url, item.depth + 1);
            }
          }
        }
        crawled += 1;
        await deps.savePage?.({
          url: result.finalUrl,
          status: "crawled",
          httpStatus: result.status,
          depth: item.depth,
          title: extracted.title,
          metaDescription: extracted.metaDescription,
          canonicalUrl: extracted.canonicalUrl ?? "",
          headings: { h1: extracted.h1, h2: extracted.h2 },
          textContent: extracted.textContent,
          internalLinks: [...new Set(internalLinks)],
          externalLinks: [...new Set(externalLinks)],
          images: extracted.images,
          error: "",
        });
      }
    } catch (error) {
      failed += 1;
      const message = error instanceof Error ? error.message : "Crawl failed.";
      await deps.savePage?.(emptyPage(item.url, item.depth, "failed", message));
    }

    await deps.onProgress?.({
      pagesDiscovered: queue.discovered,
      pagesCrawled: crawled,
      pagesFailed: failed,
      pagesSkipped: skipped,
    });

    if (queue.size > 0 && crawled < config.maxPages) {
      await sleep(config.delayMs);
    }
  }

  await deps.onProgress?.({
    status: "completed",
    currentUrl: "",
    pagesDiscovered: queue.discovered,
    pagesCrawled: crawled,
    pagesFailed: failed,
    pagesSkipped: skipped,
    completedAt: new Date(),
  });
}
