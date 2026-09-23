import { describe, expect, it } from "vitest";
import { extractHtml, extractSitemapLocs } from "./htmlParser";

describe("htmlParser", () => {
  it("extracts title, meta, headings, links, and images", () => {
    const html = `
      <html><head>
        <title>Hello</title>
        <meta name="description" content="Desc" />
        <link rel="canonical" href="/canonical" />
      </head>
      <body>
        <h1>Main</h1>
        <h2>Sub</h2>
        <a href="/about">About</a>
        <a href="https://other.test/x">Out</a>
        <img src="/logo.png" />
        <p>Body copy</p>
      </body></html>
    `;
    const extracted = extractHtml(html, "https://example.com/");
    expect(extracted.title).toBe("Hello");
    expect(extracted.metaDescription).toBe("Desc");
    expect(extracted.canonicalUrl).toBe("https://example.com/canonical");
    expect(extracted.h1).toBe("Main");
    expect(extracted.h2).toEqual(["Sub"]);
    expect(extracted.links).toContain("/about");
    expect(extracted.images[0]).toBe("https://example.com/logo.png");
    expect(extracted.textContent).toMatch(/Body copy/);
  });

  it("reads sitemap loc entries and index files", () => {
    const xml = `<?xml version="1.0"?><urlset><loc>https://example.com/a</loc><loc>https://example.com/b</loc></urlset>`;
    expect(extractSitemapLocs(xml)).toEqual({
      isIndex: false,
      locs: ["https://example.com/a", "https://example.com/b"],
    });
    const index = `<sitemapindex><sitemap><loc>https://example.com/sitemap-1.xml</loc></sitemap></sitemapindex>`;
    expect(extractSitemapLocs(index).isIndex).toBe(true);
  });
});
