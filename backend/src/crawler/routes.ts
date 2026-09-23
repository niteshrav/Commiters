import { Router } from "express";
import { requireJson } from "../middleware/requireJson";
import {
  getCrawl,
  getCrawlPageDetail,
  getCrawlPages,
  getCrawls,
  postCancelCrawl,
  postCrawl,
} from "./controller";

export const crawlAdminRouter = Router();

crawlAdminRouter.post("/crawls", requireJson, postCrawl);
crawlAdminRouter.get("/crawls", getCrawls);
crawlAdminRouter.get("/crawls/:id", getCrawl);
crawlAdminRouter.get("/crawls/:id/pages", getCrawlPages);
crawlAdminRouter.get("/crawls/:id/pages/:pageId", getCrawlPageDetail);
crawlAdminRouter.post("/crawls/:id/cancel", postCancelCrawl);
