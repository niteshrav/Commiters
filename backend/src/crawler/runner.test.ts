import { describe, expect, it, vi } from "vitest";
import { CrawlHttpError } from "./httpClient";
import { runCrawl } from "./runner";
import type { FetchResult } from "./types";
import type { SavedPageInput } from "./types";

function html(body: string, links: string[]): string {
  return `<html><head><title>${body}</title></head><body><h1>${body}</h1>${links
    .map((href) => `<a href="${href}">${href}</a>`)
    .join("")}</body></html>`;
}

function page(url: string, links: string[], status = 200): FetchResult {
  return {
    finalUrl: url,
    status,
    contentType: "text/html",
    body: html(url, links),
  };
}

describe("runCrawl", () => {
  it("fetches, extracts links, queues internals, and respects page/depth limits", async () => {
    const pages = new Map<string, FetchResult>([
      ["https://example.com/", page("https://example.com/", ["/a", "/b", "https://other.test/x"])],
      ["https://example.com/a", page("https://example.com/a", ["/deep"])],
      ["https://example.com/b", page("https://example.com/b", [])],
      ["https://example.com/deep", page("https://example.com/deep", [])],
    ]);
    const saved: SavedPageInput[] = [];
    const fetched: string[] = [];

    await runCrawl(
      {
        startUrl: "https://example.com/",
        maxPages: 2,
        maxDepth: 1,
        timeoutMs: 1000,
        retries: 0,
        delayMs: 200,
        sameSite: true,
        respectRobots: false,
        useSitemap: false,
      },
      {
        fetchPage: async (url) => {
          fetched.push(url);
          const hit = pages.get(url);
          if (!hit) throw new CrawlHttpError("missing", 404, false);
          return hit;
        },
        sleep: async () => undefined,
        savePage: async (item) => {
          saved.push(item);
        },
      },
    );

    expect(fetched[0]).toBe("https://example.com/");
    expect(saved.filter((item) => item.status === "crawled")).toHaveLength(2);
    expect(saved.some((item) => item.url === "https://other.test/x")).toBe(false);
    expect(saved.some((item) => item.url === "https://example.com/deep")).toBe(false);
    expect(saved.find((item) => item.url === "https://example.com/")?.internalLinks).toEqual(
      expect.arrayContaining(["https://example.com/a", "https://example.com/b"]),
    );
  });

  it("skips duplicate URLs and cancels mid-run", async () => {
    const saved: SavedPageInput[] = [];
    let stop = false;
    await runCrawl(
      {
        startUrl: "https://example.com/",
        maxPages: 20,
        maxDepth: 2,
        timeoutMs: 1000,
        retries: 0,
        delayMs: 200,
        sameSite: true,
        respectRobots: false,
        useSitemap: false,
      },
      {
        fetchPage: async (url) => page(url, ["/a", "/a", "/a"]),
        sleep: async () => undefined,
        shouldStop: async () => stop,
        savePage: async (item) => {
          saved.push(item);
          stop = true;
        },
      },
    );
    expect(saved.filter((item) => item.status === "crawled")).toHaveLength(1);
  });

  it("retries retryable failures then succeeds", async () => {
    const fetchPage = vi
      .fn()
      .mockRejectedValueOnce(new CrawlHttpError("timeout", null, true))
      .mockResolvedValueOnce(page("https://example.com/", []));

    const saved: SavedPageInput[] = [];
    await runCrawl(
      {
        startUrl: "https://example.com/",
        maxPages: 1,
        maxDepth: 0,
        timeoutMs: 1000,
        retries: 2,
        delayMs: 200,
        sameSite: true,
        respectRobots: false,
        useSitemap: false,
      },
      {
        fetchPage,
        sleep: async () => undefined,
        savePage: async (item) => {
          saved.push(item);
        },
      },
    );
    expect(fetchPage).toHaveBeenCalledTimes(2);
    expect(saved[0]?.status).toBe("crawled");
  });

  it("respects robots disallow and 403 robots.txt", async () => {
    const saved: SavedPageInput[] = [];
    await runCrawl(
      {
        startUrl: "https://example.com/secret",
        maxPages: 5,
        maxDepth: 1,
        timeoutMs: 1000,
        retries: 0,
        delayMs: 200,
        sameSite: true,
        respectRobots: true,
        useSitemap: false,
      },
      {
        fetchPage: async (url) => {
          if (url.endsWith("/robots.txt")) {
            return { finalUrl: url, status: 200, contentType: "text/plain", body: "User-agent: *\nDisallow: /secret\n" };
          }
          return page(url, []);
        },
        sleep: async () => undefined,
        savePage: async (item) => {
          saved.push(item);
        },
      },
    );
    expect(saved[0]?.status).toBe("skipped");

    const progress: string[] = [];
    await runCrawl(
      {
        startUrl: "https://example.com/",
        maxPages: 5,
        maxDepth: 1,
        timeoutMs: 1000,
        retries: 0,
        delayMs: 200,
        sameSite: true,
        respectRobots: true,
        useSitemap: false,
      },
      {
        fetchPage: async (url) => {
          if (url.endsWith("/robots.txt")) {
            return { finalUrl: url, status: 403, contentType: "text/plain", body: "no" };
          }
          return page(url, []);
        },
        sleep: async () => undefined,
        onProgress: async (update) => {
          if (update.status) progress.push(update.status);
        },
      },
    );
    expect(progress).toContain("failed");
  });

  it("records HTTP 404 as a failed page and times out retryably", async () => {
    const saved: SavedPageInput[] = [];
    await runCrawl(
      {
        startUrl: "https://example.com/missing",
        maxPages: 1,
        maxDepth: 0,
        timeoutMs: 1000,
        retries: 0,
        delayMs: 200,
        sameSite: true,
        respectRobots: false,
        useSitemap: false,
      },
      {
        fetchPage: async (url) => ({
          finalUrl: url,
          status: 404,
          contentType: "text/html",
          body: "missing",
        }),
        sleep: async () => undefined,
        savePage: async (item) => {
          saved.push(item);
        },
      },
    );
    expect(saved[0]?.status).toBe("failed");
    expect(saved[0]?.httpStatus).toBe(404);

    const timedOut: SavedPageInput[] = [];
    await runCrawl(
      {
        startUrl: "https://example.com/",
        maxPages: 1,
        maxDepth: 0,
        timeoutMs: 50,
        retries: 0,
        delayMs: 200,
        sameSite: true,
        respectRobots: false,
        useSitemap: false,
      },
      {
        fetchPage: async () => {
          throw new CrawlHttpError("Request timed out.", null, true);
        },
        sleep: async () => undefined,
        savePage: async (item) => {
          timedOut.push(item);
        },
      },
    );
    expect(timedOut[0]?.status).toBe("failed");
    expect(timedOut[0]?.error).toMatch(/timed out/i);
  });
});
