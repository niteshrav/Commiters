import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buildSitemapPublicPaths } from "./sitemapPublicUrls";
import { SITE_ORIGIN } from "../hooks/usePageSeo";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

describe("sitemapPublicUrls", () => {
  it("lists every indexable marketing route", () => {
    const paths = buildSitemapPublicPaths();
    expect(paths).toContain("/products/trusttap");
    expect(paths).toContain("/faq");
    expect(paths).toContain("/cookie-policy");
    expect(paths).not.toContain("/thank-you");
    expect(paths).not.toContain("/404");
  });

  it("matches public/sitemap.xml loc entries", () => {
    const paths = buildSitemapPublicPaths();
    const xml = readFileSync(join(publicRoot, "sitemap.xml"), "utf8");
    for (const path of paths) {
      expect(xml).toContain(`<loc>${SITE_ORIGIN}${path}</loc>`);
    }
  });
});
