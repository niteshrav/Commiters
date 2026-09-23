import { parse } from "node-html-parser";
import { CRAWL_HARD_MAX } from "./limits";
import type { ExtractedHtml } from "./types";

function attr(el: { getAttribute(name: string): string | undefined } | null, name: string): string {
  return el?.getAttribute(name)?.trim() ?? "";
}

function textOf(el: { text: string } | null): string {
  return el?.text.replace(/\s+/g, " ").trim() ?? "";
}

export function extractHtml(html: string, pageUrl: string): ExtractedHtml {
  const root = parse(html);
  const title = textOf(root.querySelector("title"));
  const metaDescription =
    attr(root.querySelector('meta[name="description"]'), "content") ||
    attr(root.querySelector('meta[property="og:description"]'), "content");
  const canonicalRaw = attr(root.querySelector('link[rel="canonical"]'), "href");
  let canonicalUrl: string | null = null;
  if (canonicalRaw) {
    try {
      canonicalUrl = new URL(canonicalRaw, pageUrl).toString();
    } catch {
      canonicalUrl = null;
    }
  }

  const h1 = textOf(root.querySelector("h1"));
  const h2 = root
    .querySelectorAll("h2")
    .map((node) => textOf(node))
    .filter(Boolean)
    .slice(0, CRAWL_HARD_MAX.headingCount);

  const links = root
    .querySelectorAll("a")
    .map((node) => attr(node, "href"))
    .filter(Boolean)
    .slice(0, CRAWL_HARD_MAX.linkCount);

  const images = root
    .querySelectorAll("img")
    .map((node) => {
      const src = attr(node, "src") || attr(node, "data-src");
      if (!src) return "";
      try {
        return new URL(src, pageUrl).toString();
      } catch {
        return "";
      }
    })
    .filter(Boolean)
    .slice(0, CRAWL_HARD_MAX.imageCount);

  const body = root.querySelector("body") ?? root;
  const textContent = body.text.replace(/\s+/g, " ").trim().slice(0, CRAWL_HARD_MAX.textChars);

  return { title, metaDescription, canonicalUrl, h1, h2, textContent, links, images };
}

export function extractSitemapLocs(xml: string): { locs: string[]; isIndex: boolean } {
  const isIndex = /<sitemapindex[\s>]/i.test(xml);
  const locs: string[] = [];
  const pattern = /<loc>\s*([^<]+)\s*<\/loc>/gi;
  let match: RegExpExecArray | null = pattern.exec(xml);
  while (match) {
    const value = match[1]?.trim();
    if (value) locs.push(value);
    match = pattern.exec(xml);
  }
  return { locs, isIndex };
}
