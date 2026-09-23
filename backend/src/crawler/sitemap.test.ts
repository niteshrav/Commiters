import { describe, expect, it } from "vitest";
import { discoverSitemapUrls } from "./sitemap";

describe("sitemap discovery", () => {
  it("extracts same-host loc URLs and follows a sitemap index with a cap", async () => {
    const urls = await discoverSitemapUrls(
      "https://example.com/",
      async (url) => {
        if (url.endsWith("/sitemap.xml")) {
          return {
            finalUrl: url,
            status: 200,
            contentType: "application/xml",
            body: `<sitemapindex><sitemap><loc>https://example.com/sitemap-pages.xml</loc></sitemap></sitemapindex>`,
          };
        }
        return {
          finalUrl: url,
          status: 200,
          contentType: "application/xml",
          body: `<urlset><loc>https://example.com/a</loc><loc>https://other.test/x</loc></urlset>`,
        };
      },
      1000,
    );
    expect(urls).toEqual(["https://example.com/a"]);
  });
});
