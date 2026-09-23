import type { Request, Response } from "express";
import { asyncHandler } from "../cms/utils/asyncHandler";
import { buildPaginatedResponse, parsePagination } from "../cms/utils/pagination";
import {
  cancelCrawlJob,
  getCrawlJob,
  getCrawlPage,
  listCrawlJobs,
  listCrawlPages,
  serializeJob,
  serializePage,
  startCrawlJob,
} from "./service";

function statusFromError(error: unknown): number {
  if (error && typeof error === "object" && "status" in error && typeof error.status === "number") {
    return error.status;
  }
  const message = error instanceof Error ? error.message : "";
  if (message.includes("private") || message.includes("credentials") || message.includes("Only HTTP")) {
    return 400;
  }
  return 500;
}

export const postCrawl = asyncHandler(async (req: Request, res: Response) => {
  try {
    const job = await startCrawlJob(req.body);
    return res.status(202).json({ job: serializeJob(job) });
  } catch (error) {
    return res.status(statusFromError(error)).json({
      error: error instanceof Error ? error.message : "Failed to start crawl.",
    });
  }
});

export const getCrawls = asyncHandler(async (req: Request, res: Response) => {
  const parsed = parsePagination(req.query as Record<string, unknown>, 20);
  const page = parsed.page ?? 1;
  const limit = parsed.limit ?? 20;
  const { items, total } = await listCrawlJobs(page, limit);
  return res.json(buildPaginatedResponse(items.map(serializeJob), total, page, limit));
});

export const getCrawl = asyncHandler(async (req: Request, res: Response) => {
  const job = await getCrawlJob(req.params.id ?? "");
  if (!job) return res.status(404).json({ error: "Crawl job not found." });
  return res.json({ job: serializeJob(job) });
});

export const getCrawlPages = asyncHandler(async (req: Request, res: Response) => {
  const job = await getCrawlJob(req.params.id ?? "");
  if (!job) return res.status(404).json({ error: "Crawl job not found." });
  const parsed = parsePagination(req.query as Record<string, unknown>, 50);
  const page = parsed.page ?? 1;
  const limit = parsed.limit ?? 50;
  const status = typeof req.query.status === "string" ? req.query.status : undefined;
  const { items, total } = await listCrawlPages(String(job._id), status, page, limit);
  return res.json(buildPaginatedResponse(items.map(serializePage), total, page, limit));
});

export const getCrawlPageDetail = asyncHandler(async (req: Request, res: Response) => {
  const page = await getCrawlPage(req.params.id ?? "", req.params.pageId ?? "");
  if (!page) return res.status(404).json({ error: "Crawled page not found." });
  return res.json({ page: serializePage(page) });
});

export const postCancelCrawl = asyncHandler(async (req: Request, res: Response) => {
  const job = await cancelCrawlJob(req.params.id ?? "");
  if (!job) return res.status(404).json({ error: "Crawl job not found." });
  return res.json({ job: serializeJob(job) });
});
