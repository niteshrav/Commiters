import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../app";
import { clearMediumRssCache } from "../lib/mediumRss";

const SAMPLE_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><item>
<title><![CDATA[The Context Trap: Why More AI Code Isn't Leading to Faster Shipping]]></title>
<link>https://medium.com/@erniteshrav/the-context-trap-why-more-ai-code-isnt-leading-to-faster-shipping-8cdead376704</link>
<pubDate>Wed, 17 Jun 2026 06:31:59 GMT</pubDate>
<category><![CDATA[software-engineering]]></category>
<content:encoded><![CDATA[<p>Shifting the engineering paradigm from isolated AI automation to human-centric architectural orchestration.</p>]]></content:encoded>
</item></channel></rss>`;

describe("technical ledger API", () => {
  let tempDir = "";
  const originalAdminKey = process.env.TECHNICAL_LEDGER_ADMIN_KEY;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), "commiters-ledger-api-"));
    process.env.TECHNICAL_LEDGER_STORE_PATH = join(tempDir, "articles.json");
    process.env.TECHNICAL_LEDGER_ADMIN_KEY = "ledger-admin-test";
    clearMediumRssCache();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(SAMPLE_RSS, { status: 200, headers: { "Content-Type": "application/xml" } })),
    );
  });

  afterEach(async () => {
    delete process.env.TECHNICAL_LEDGER_STORE_PATH;
    process.env.TECHNICAL_LEDGER_ADMIN_KEY = originalAdminKey;
    clearMediumRssCache();
    vi.restoreAllMocks();
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
  });

  it("returns synced Medium articles", async () => {
    const app = createApp();
    const res = await request(app).get("/api/technical-ledger/articles");

    expect(res.status).toBe(200);
    expect(res.body.articles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.stringContaining("Context Trap"),
          source: "medium",
        }),
      ]),
    );
  });

  it("creates a local article when admin key is valid", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/technical-ledger/articles")
      .set("Content-Type", "application/json")
      .set("x-technical-ledger-admin-key", "ledger-admin-test")
      .send({
        title: "Local Article",
        summary: "Saved from Technical Ledger admin.",
        contentMarkdown: "## Local Article\n\nBody.",
        publishToMedium: false,
      });

    expect(res.status).toBe(201);
    expect(res.body.article.title).toBe("Local Article");
    expect(res.body.article.syncStatus).toBe("published");
  });

  it("rejects article creation without admin key", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/technical-ledger/articles")
      .set("Content-Type", "application/json")
      .send({
        title: "Blocked Article",
        summary: "Should not save.",
        contentMarkdown: "Body",
      });

    expect(res.status).toBe(401);
  });
});
