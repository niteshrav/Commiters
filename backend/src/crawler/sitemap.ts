import { CRAWL_HARD_MAX } from "./limits";
import { extractSitemapLocs } from "./htmlParser";
import { originOf, normalizeUrl, isSameHostname } from "./urlPolicy";
import type { FetchPageFn } from "./httpClient";

export async function discoverSitemapUrls(
  startUrl: string,
  fetchPage: FetchPageFn,
  timeoutMs: number,
): Promise<string[]> {
  const origin = originOf(startUrl);
  if (!origin) return [];
  const discovered: string[] = [];
  const files = [`${origin.replace(/\/$/, "")}/sitemap.xml`];

  for (const file of files) {
    if (discovered.length >= CRAWL_HARD_MAX.sitemapUrls) break;
    let result;
    try {
      result = await fetchPage(file, timeoutMs);
    } catch {
      continue;
    }
    if (result.status >= 400) continue;
    const { locs, isIndex } = extractSitemapLocs(result.body);
    if (isIndex) {
      for (const loc of locs.slice(0, CRAWL_HARD_MAX.sitemapFiles)) {
        if (files.length >= CRAWL_HARD_MAX.sitemapFiles + 1) break;
        if (isSameHostname(loc, startUrl)) files.push(loc);
      }
      continue;
    }
    for (const loc of locs) {
      if (discovered.length >= CRAWL_HARD_MAX.sitemapUrls) break;
      const normalized = normalizeUrl(loc);
      if (normalized && isSameHostname(normalized, startUrl)) {
        discovered.push(normalized);
      }
    }
  }

  return [...new Set(discovered)];
}
