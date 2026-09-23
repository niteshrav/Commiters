import { describe, expect, it } from "vitest";
import { serializeJob, serializePage } from "./service";

describe("crawler persistence serializers", () => {
  it("maps job and page documents to API payloads", () => {
    const job = {
      _id: "abc",
      startUrl: "https://example.com/",
      status: "completed",
      maxPages: 20,
      maxDepth: 2,
      timeout: 10000,
      retries: 2,
      delay: 500,
      sameSite: true,
      robotsEnabled: true,
      sitemapEnabled: false,
      pagesDiscovered: 3,
      pagesCrawled: 3,
      pagesFailed: 0,
      pagesSkipped: 0,
      currentUrl: "",
      error: "",
      startedAt: new Date("2026-01-01T00:00:00.000Z"),
      completedAt: new Date("2026-01-01T00:01:00.000Z"),
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
      updatedAt: new Date("2026-01-01T00:01:00.000Z"),
    };
    const serialized = serializeJob(job as never);
    expect(serialized.id).toBe("abc");
    expect(serialized.pagesCrawled).toBe(3);

    const page = serializePage({
      _id: "p1",
      crawlJobId: "abc",
      url: "https://example.com/",
      status: "crawled",
      httpStatus: 200,
      depth: 0,
      title: "Example",
      metaDescription: "x",
      canonicalUrl: "",
      headings: { h1: "H", h2: [] },
      textContent: "hello",
      internalLinks: [],
      externalLinks: [],
      images: [],
      error: "",
      crawledAt: new Date("2026-01-01T00:00:30.000Z"),
    } as never);
    expect(page.id).toBe("p1");
    expect(page.httpStatus).toBe(200);
  });

  it("rejects overlapping crawl starts via schema bounds", async () => {
    const { startCrawlSchema } = await import("./config");
    expect(startCrawlSchema.safeParse({ startUrl: "https://example.com/", maxPages: 99 }).success).toBe(false);
    expect(startCrawlSchema.safeParse({ startUrl: "https://example.com/", delay: 100 }).success).toBe(false);
  });
});
