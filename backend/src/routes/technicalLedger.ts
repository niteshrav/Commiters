import { Router } from "express";
import {
  getTechnicalLedgerArticles,
  postTechnicalLedgerArticle,
} from "../controllers/technicalLedgerController";
import { leadsRateLimit } from "../middleware/rateLimit";
import { requireJson } from "../middleware/requireJson";
import { requireTechnicalLedgerAdminKey } from "../middleware/requireTechnicalLedgerAdminKey";

export const technicalLedgerRouter = Router();

technicalLedgerRouter.get("/api/technical-ledger/articles", getTechnicalLedgerArticles);
technicalLedgerRouter.post(
  "/api/technical-ledger/articles",
  leadsRateLimit,
  requireTechnicalLedgerAdminKey,
  requireJson,
  postTechnicalLedgerArticle,
);
