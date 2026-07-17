import { createHash } from "node:crypto";
import { fetchMediumRssItems, normalizeMediumArticleUrl } from "./mediumRss";
import { isMediumPublishConfigured, publishToMedium } from "./mediumApi";
import { listLocalTechnicalLedgerArticles, saveLocalTechnicalLedgerArticle } from "./technicalLedgerStore";
import type {
  LocalTechnicalLedgerArticle,
  TechnicalLedgerArticleRecord,
  TechnicalLedgerArticleSource,
} from "./technicalLedgerTypes";

const DEFAULT_IMAGE_ALT = "Technical Ledger article cover image";
const DEFAULT_FALLBACK_IMAGE = "/assets/home/home-hero-monitor.png";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function articleIdFromUrl(url: string): string {
  return createHash("sha1").update(normalizeMediumArticleUrl(url)).digest("hex").slice(0, 12);
}

function toRecord(input: {
  id: string;
  category: string;
  title: string;
  summary: string;
  href: string;
  imageSrc: string | null;
  imageAlt?: string;
  source: TechnicalLedgerArticleSource;
  publishedAt: string;
  mediumPostId?: string;
}): TechnicalLedgerArticleRecord {
  return {
    id: input.id,
    category: input.category,
    title: input.title,
    summary: input.summary,
    href: input.href,
    imageSrc: input.imageSrc ?? DEFAULT_FALLBACK_IMAGE,
    imageAlt: input.imageAlt ?? DEFAULT_IMAGE_ALT,
    source: input.source,
    publishedAt: input.publishedAt,
    mediumPostId: input.mediumPostId,
  };
}

function getMediumFeedUrl(): string {
  return process.env.MEDIUM_RSS_URL?.trim() || "https://medium.com/feed/@erniteshrav";
}

function getRssCacheMs(): number {
  const configured = Number(process.env.MEDIUM_RSS_CACHE_MS ?? 5 * 60 * 1000);
  return Number.isFinite(configured) && configured > 0 ? configured : 5 * 60 * 1000;
}

export async function listTechnicalLedgerArticles(): Promise<TechnicalLedgerArticleRecord[]> {
  const [rssItems, localArticles] = await Promise.all([
    fetchMediumRssItems(getMediumFeedUrl(), getRssCacheMs()).catch(() => []),
    listLocalTechnicalLedgerArticles(),
  ]);

  const byHref = new Map<string, TechnicalLedgerArticleRecord>();

  for (const item of rssItems) {
    const href = normalizeMediumArticleUrl(item.link);
    byHref.set(href, toRecord({
      id: articleIdFromUrl(href),
      category: item.category,
      title: item.title,
      summary: item.summary,
      href,
      imageSrc: item.imageSrc,
      source: "medium",
      publishedAt: new Date(item.pubDate).toISOString(),
    }));
  }

  for (const local of localArticles) {
    const href = local.mediumUrl ? normalizeMediumArticleUrl(local.mediumUrl) : `/technical-ledger/${local.id}`;
    const normalizedHref = local.mediumUrl ? normalizeMediumArticleUrl(local.mediumUrl) : href;
    const existing = local.mediumUrl ? byHref.get(normalizedHref) : undefined;

    if (existing) continue;

    byHref.set(normalizedHref, toRecord({
      id: local.id,
      category: local.category,
      title: local.title,
      summary: local.summary,
      href: local.mediumUrl ?? href,
      imageSrc: local.imageSrc,
      imageAlt: local.imageAlt,
      source: "local",
      publishedAt: local.publishedAt,
      mediumPostId: local.mediumPostId,
    }));
  }

  return [...byHref.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export type CreateTechnicalLedgerArticleInput = {
  title: string;
  summary: string;
  contentMarkdown: string;
  category?: string;
  tags?: string[];
  imageSrc?: string | null;
  imageAlt?: string;
  publishToMedium?: boolean;
};

export async function createTechnicalLedgerArticle(
  input: CreateTechnicalLedgerArticleInput,
): Promise<LocalTechnicalLedgerArticle> {
  const now = new Date().toISOString();
  const id = `${slugify(input.title)}-${Date.now()}`;
  const tags = (input.tags?.length ? input.tags : ["software-engineering"]).slice(0, 5);

  let article: LocalTechnicalLedgerArticle = {
    id,
    category: (input.category ?? "ENGINEERING").toUpperCase(),
    title: input.title.trim(),
    summary: input.summary.trim(),
    contentMarkdown: input.contentMarkdown.trim(),
    tags,
    imageSrc: input.imageSrc ?? null,
    imageAlt: input.imageAlt?.trim() || DEFAULT_IMAGE_ALT,
    publishedAt: now,
    syncStatus: "pending",
  };

  const shouldPublish = input.publishToMedium !== false;
  if (shouldPublish && isMediumPublishConfigured()) {
    try {
      const published = await publishToMedium({
        title: article.title,
        contentMarkdown: article.contentMarkdown,
        tags: article.tags,
        publishStatus: "public",
      });
      article = {
        ...article,
        mediumPostId: published.postId,
        mediumUrl: published.url,
        syncStatus: "published",
      };
    } catch (error) {
      article = {
        ...article,
        syncStatus: "failed",
        syncError: error instanceof Error ? error.message : "Medium publish failed.",
      };
    }
  } else if (shouldPublish) {
    article = {
      ...article,
      syncStatus: "failed",
      syncError: "Medium integration token is not configured.",
    };
  } else {
    article = {
      ...article,
      syncStatus: "published",
    };
  }

  return saveLocalTechnicalLedgerArticle(article);
}
