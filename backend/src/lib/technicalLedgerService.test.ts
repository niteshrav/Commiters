import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearMediumRssCache } from "./mediumRss";

const SAMPLE_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><item>
<title><![CDATA[The Context Trap: Why More AI Code Isn't Leading to Faster Shipping]]></title>
<link>https://medium.com/@erniteshrav/the-context-trap-why-more-ai-code-isnt-leading-to-faster-shipping-8cdead376704</link>
<pubDate>Wed, 17 Jun 2026 06:31:59 GMT</pubDate>
<category><![CDATA[software-engineering]]></category>
<content:encoded><![CDATA[<p>Shifting the engineering paradigm from isolated AI automation to human-centric architectural orchestration.</p>]]></content:encoded>
</item></channel></rss>`;

describe("technicalLedgerService", () => {
  let tempDir = "";

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), "commiters-ledger-"));
    process.env.TECHNICAL_LEDGER_STORE_PATH = join(tempDir, "articles.json");
    clearMediumRssCache();
    vi.restoreAllMocks();
  });

  afterEach(async () => {
    delete process.env.TECHNICAL_LEDGER_STORE_PATH;
    delete process.env.MEDIUM_INTEGRATION_TOKEN;
    clearMediumRssCache();
    vi.restoreAllMocks();
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
  });

  it("merges Medium RSS articles with locally stored articles", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(SAMPLE_RSS, { status: 200, headers: { "Content-Type": "application/xml" } })),
    );

    const { createTechnicalLedgerArticle, listTechnicalLedgerArticles } = await import("./technicalLedgerService");

    await createTechnicalLedgerArticle({
      title: "Local Draft Article",
      summary: "A site-only article until Medium sync is configured.",
      contentMarkdown: "## Local Draft\n\nContent body.",
      publishToMedium: false,
    });

    const articles = await listTechnicalLedgerArticles();
    expect(articles.some((article) => article.title.includes("Context Trap"))).toBe(true);
    expect(articles.some((article) => article.title === "Local Draft Article")).toBe(true);
  });

  it("stores Medium publish metadata when integration token is configured", async () => {
    process.env.MEDIUM_INTEGRATION_TOKEN = "test-token";

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL, init?: RequestInit) => {
        const url = String(input);
        if (url.includes("/me")) {
          return new Response(JSON.stringify({ data: { id: "user-1", username: "erniteshrav" } }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        if (url.includes("/posts") && init?.method === "POST") {
          return new Response(
            JSON.stringify({
              data: {
                id: "post-1",
                url: "https://medium.com/@erniteshrav/new-post-abc123",
              },
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        }
        return new Response(SAMPLE_RSS, { status: 200, headers: { "Content-Type": "application/xml" } });
      }),
    );

    const { createTechnicalLedgerArticle, listTechnicalLedgerArticles } = await import("./technicalLedgerService");

    const created = await createTechnicalLedgerArticle({
      title: "New Post From Commiters",
      summary: "Published from the Technical Ledger admin form.",
      contentMarkdown: "## New Post\n\nBody copy.",
      tags: ["software-engineering"],
    });

    expect(created.syncStatus).toBe("published");
    expect(created.mediumUrl).toBe("https://medium.com/@erniteshrav/new-post-abc123");

    const articles = await listTechnicalLedgerArticles();
    expect(articles.some((article) => article.title === "New Post From Commiters")).toBe(true);
  });
});
