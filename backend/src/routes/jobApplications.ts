import { Router } from "express";
import { createJobApplication } from "../controllers/jobApplicationsController";
import { leadsRateLimit } from "../middleware/rateLimit";
import { requireJson } from "../middleware/requireJson";

export const jobApplicationsRouter = Router();

jobApplicationsRouter.post("/api/job-applications", leadsRateLimit, requireJson, createJobApplication);
