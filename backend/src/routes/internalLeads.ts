import { Router } from "express";
import { getInternalLeads } from "../controllers/internalLeadsController";
import { requireInternalAdminKey } from "../middleware/requireInternalAdminKey";

export const internalLeadsRouter = Router();

internalLeadsRouter.get("/api/internal/leads", requireInternalAdminKey, getInternalLeads);
