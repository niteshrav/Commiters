import type { MediumRssItem } from "./technicalLedgerTypes";

const DEFAULT_CATEGORY = "ENGINEERING";

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripCdata(value: string): string {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
}

function readTag(block: string, tag: string): string | null {
  const pattern = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = block.match(pattern);
  if (!match?.[1]) return null;
  return decodeXmlEntities(stripCdata(match[1]).trim());
}

function readAllTags(block: string, tag: string): string[] {
  const pattern = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const values: string[] = [];
  let match: RegExpExecArray | null = pattern.exec(block);
  while (match) {
    values.push(decodeXmlEntities(stripCdata(match[1]).trim()));
    match = pattern.exec(block);
  }
  return values;
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractImageSrc(block: string, content: string | null): string | null {
  const thumbnail =
    block.match(/<media:thumbnail[^>]+url="([^"]+)"/i)?.[1] ??
    block.match(/<media:content[^>]+url="([^"]+)"/i)?.[1] ??
    null;
  if (thumbnail) return thumbnail;

  if (!content) return null;
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i);
  return imgMatch?.[1] ?? null;
}

function normalizeMediumLink(link: string): string {
  const url = new URL(link);
  url.search = "";
  return url.toString().replace(/\/$/, "");
}

function toSummary(content: string | null, description: string | null): string {
  const raw = content ?? description ?? "";
  const plain = stripHtml(raw);
  if (!plain) return "";
  const firstParagraph = plain.split(/(?<=[.!?])\s+/)[0] ?? plain;
  return firstParagraph.length > 280 ? `${firstParagraph.slice(0, 277).trim()}...` : firstParagraph;
}

function toCategory(categories: string[]): string {
  const tag = categories.find((value) => value && value.toLowerCase() !== "nitesh rav");
  if (!tag) return DEFAULT_CATEGORY;
  return tag.replace(/-/g, " ").toUpperCase();
}

export function parseMediumRss(xml: string): MediumRssItem[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

  return items
    .map((block) => {
      const title = readTag(block, "title");
      const link = readTag(block, "link");
      if (!title || !link) return null;

      const content = readTag(block, "content:encoded");
      const description = readTag(block, "description");
      const categories = readAllTags(block, "category");
      const pubDate = readTag(block, "pubDate") ?? new Date().toISOString();

      return {
        title,
        link: normalizeMediumLink(link),
        pubDate,
        summary: toSummary(content, description),
        category: toCategory(categories),
        imageSrc: extractImageSrc(block, content ?? description),
      } satisfies MediumRssItem;
    })
    .filter((item): item is MediumRssItem => item !== null);
}

type RssCache = {
  fetchedAt: number;
  items: MediumRssItem[];
};

let rssCache: RssCache | null = null;

export async function fetchMediumRssItems(feedUrl: string, cacheMs = 5 * 60 * 1000): Promise<MediumRssItem[]> {
  const now = Date.now();
  if (rssCache && now - rssCache.fetchedAt < cacheMs) {
    return rssCache.items;
  }

  const response = await fetch(feedUrl, {
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml, */*",
      "User-Agent": "CommitersTechnicalLedger/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Medium RSS feed request failed (${response.status}).`);
  }

  const xml = await response.text();
  const items = parseMediumRss(xml);
  rssCache = { fetchedAt: now, items };
  return items;
}

export function clearMediumRssCache(): void {
  rssCache = null;
}

export function normalizeMediumArticleUrl(url: string): string {
  return normalizeMediumLink(url);
}
