import { afterEach, describe, expect, it, vi } from "vitest";
import { clearMediumRssCache, normalizeMediumArticleUrl, parseMediumRss } from "./mediumRss";

const SAMPLE_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <item>
      <title><![CDATA[The Context Trap: Why More AI Code Isn't Leading to Faster Shipping]]></title>
      <link>https://medium.com/@erniteshrav/the-context-trap-why-more-ai-code-isnt-leading-to-faster-shipping-8cdead376704?source=rss</link>
      <pubDate>Wed, 17 Jun 2026 06:31:59 GMT</pubDate>
      <category><![CDATA[software-engineering]]></category>
      <category><![CDATA[Nitesh Rav]]></category>
      <content:encoded><![CDATA[<img src="https://cdn-images-1.medium.com/example.jpg"/><p>Shifting the engineering paradigm from isolated AI automation to human-centric architectural orchestration.</p>]]></content:encoded>
    </item>
  </channel>
</rss>`;

describe("mediumRss", () => {
  afterEach(() => {
    clearMediumRssCache();
    vi.restoreAllMocks();
  });

  it("parses Medium RSS items with summary, category, and image", () => {
    const items = parseMediumRss(SAMPLE_RSS);
    expect(items).toHaveLength(1);
    expect(items[0]?.title).toContain("Context Trap");
    expect(items[0]?.summary).toMatch(/human-centric architectural orchestration/i);
    expect(items[0]?.category).toBe("SOFTWARE ENGINEERING");
    expect(items[0]?.imageSrc).toBe("https://cdn-images-1.medium.com/example.jpg");
  });

  it("normalizes Medium links by removing query params", () => {
    expect(
      normalizeMediumArticleUrl(
        "https://medium.com/@erniteshrav/the-context-trap-why-more-ai-code-isnt-leading-to-faster-shipping-8cdead376704?source=rss",
      ),
    ).toBe(
      "https://medium.com/@erniteshrav/the-context-trap-why-more-ai-code-isnt-leading-to-faster-shipping-8cdead376704",
    );
  });

  it("caches RSS responses for the configured window", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(SAMPLE_RSS, { status: 200, headers: { "Content-Type": "application/xml" } }));
    vi.stubGlobal("fetch", fetchMock);

    const { fetchMediumRssItems } = await import("./mediumRss");
    const first = await fetchMediumRssItems("https://medium.com/feed/@erniteshrav", 60_000);
    const second = await fetchMediumRssItems("https://medium.com/feed/@erniteshrav", 60_000);

    expect(first).toHaveLength(1);
    expect(second).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
