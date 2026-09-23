import { CrawledPage, CrawlJob, type CrawledPageDocument, type CrawlJobDocument } from "./models";
import { isMongoConnected } from "../cms/config/database";
import { createFetchPage } from "./httpClient";
import { CRAWL_HARD_MAX } from "./limits";
import { runCrawl } from "./runner";
import { startCrawlSchema, toCrawlConfig, type StartCrawlInput } from "./config";
import type { CrawlProgress, SavedPageInput } from "./types";

const activeJobs = new Set<string>();

export function serializeJob(job: CrawlJobDocument) {
  return {
    id: String(job._id),
    startUrl: job.startUrl,
    status: job.status,
    maxPages: job.maxPages,
    maxDepth: job.maxDepth,
    timeout: job.timeout,
    retries: job.retries,
    delay: job.delay,
    sameSite: job.sameSite,
    robotsEnabled: job.robotsEnabled,
    sitemapEnabled: job.sitemapEnabled,
    pagesDiscovered: job.pagesDiscovered,
    pagesCrawled: job.pagesCrawled,
    pagesFailed: job.pagesFailed,
    pagesSkipped: job.pagesSkipped,
    currentUrl: job.currentUrl,
    error: job.error,
    startedAt: job.startedAt ?? null,
    completedAt: job.completedAt ?? null,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  };
}

export function serializePage(page: CrawledPageDocument) {
  return {
    id: String(page._id),
    crawlJobId: String(page.crawlJobId),
    url: page.url,
    status: page.status,
    httpStatus: page.httpStatus,
    depth: page.depth,
    title: page.title,
    metaDescription: page.metaDescription,
    canonicalUrl: page.canonicalUrl,
    headings: page.headings,
    textContent: page.textContent,
    internalLinks: page.internalLinks,
    externalLinks: page.externalLinks,
    images: page.images,
    error: page.error,
    crawledAt: page.crawledAt,
  };
}

async function applyProgress(jobId: string, progress: CrawlProgress): Promise<void> {
  await CrawlJob.findByIdAndUpdate(jobId, progress);
}

export async function persistPage(jobId: string, page: SavedPageInput): Promise<void> {
  await CrawledPage.findOneAndUpdate(
    { crawlJobId: jobId, url: page.url },
    { ...page, crawlJobId: jobId, crawledAt: new Date() },
    { upsert: true, returnDocument: "after" },
  );
}

export async function failInterruptedJobs(): Promise<number> {
  if (!isMongoConnected()) return 0;
  const result = await CrawlJob.updateMany(
    { status: { $in: ["pending", "running"] } },
    {
      status: "failed",
      error: "Interrupted by server restart.",
      completedAt: new Date(),
    },
  );
  return result.modifiedCount;
}

async function executeJob(jobId: string): Promise<void> {
  const job = await CrawlJob.findById(jobId);
  if (!job) return;
  try {
    await runCrawl(
      {
        startUrl: job.startUrl,
        maxPages: job.maxPages,
        maxDepth: job.maxDepth,
        timeoutMs: job.timeout,
        retries: job.retries,
        delayMs: job.delay,
        sameSite: job.sameSite,
        respectRobots: job.robotsEnabled,
        useSitemap: job.sitemapEnabled,
      },
      {
        fetchPage: createFetchPage(),
        shouldStop: async () => {
          const latest = await CrawlJob.findById(jobId).select("status").lean();
          return latest?.status === "cancelled";
        },
        onProgress: (progress) => applyProgress(jobId, progress),
        savePage: (page) => persistPage(jobId, page),
      },
    );
    const latest = await CrawlJob.findById(jobId).select("status").lean();
    if (latest?.status === "running" || latest?.status === "pending") {
      await CrawlJob.findByIdAndUpdate(jobId, { status: "completed", completedAt: new Date(), currentUrl: "" });
    }
  } catch (error) {
    const latest = await CrawlJob.findById(jobId).select("status").lean();
    if (latest?.status === "cancelled") return;
    await CrawlJob.findByIdAndUpdate(jobId, {
      status: "failed",
      error: error instanceof Error ? error.message : "Crawl failed.",
      completedAt: new Date(),
    });
  } finally {
    activeJobs.delete(jobId);
  }
}

export async function startCrawlJob(input: StartCrawlInput) {
  const parsed = startCrawlSchema.safeParse(input);
  if (!parsed.success) {
    throw Object.assign(new Error("Invalid crawl payload."), { status: 400 });
  }

  const running = await CrawlJob.countDocuments({ status: { $in: ["pending", "running"] } });
  if (running >= CRAWL_HARD_MAX.concurrentJobs || activeJobs.size >= CRAWL_HARD_MAX.concurrentJobs) {
    throw Object.assign(new Error("A crawl is already running. Cancel it or wait for it to finish."), { status: 409 });
  }

  const config = await toCrawlConfig(parsed.data);
  const job = await CrawlJob.create({
    startUrl: config.startUrl,
    status: "pending",
    maxPages: config.maxPages,
    maxDepth: config.maxDepth,
    timeout: config.timeoutMs,
    retries: config.retries,
    delay: config.delayMs,
    sameSite: config.sameSite,
    robotsEnabled: config.respectRobots,
    sitemapEnabled: config.useSitemap,
  });

  const id = String(job._id);
  activeJobs.add(id);
  setImmediate(() => {
    void executeJob(id);
  });
  return job;
}

export async function listCrawlJobs(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    CrawlJob.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    CrawlJob.countDocuments(),
  ]);
  return { items, total };
}

export async function getCrawlJob(id: string) {
  return CrawlJob.findById(id);
}

export async function listCrawlPages(jobId: string, status: string | undefined, page: number, limit: number) {
  const filter: Record<string, unknown> = { crawlJobId: jobId };
  if (status) filter.status = status;
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    CrawledPage.find(filter).sort({ crawledAt: -1 }).skip(skip).limit(limit),
    CrawledPage.countDocuments(filter),
  ]);
  return { items, total };
}

export async function getCrawlPage(jobId: string, pageId: string) {
  return CrawledPage.findOne({ _id: pageId, crawlJobId: jobId });
}

export async function cancelCrawlJob(id: string) {
  const job = await CrawlJob.findById(id);
  if (!job) return null;
  if (job.status === "completed" || job.status === "failed" || job.status === "cancelled") {
    return job;
  }
  job.status = "cancelled";
  job.completedAt = new Date();
  job.error = job.error || "Cancelled by admin.";
  await job.save();
  return job;
}
