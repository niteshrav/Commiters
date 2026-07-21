import { Router } from "express";
import {
  getJobFilterOptions,
  getPublicJobBySlug,
  listPublicJobs,
} from "../cms/controllers/jobController";
import { isMongoConnected } from "../cms/config/database";

export const jobsRouter = Router();

jobsRouter.use((req, res, next) => {
  if (isMongoConnected()) return next();
  if (req.method === "GET") {
    if (req.path === "/filters") {
      return res.json({ departments: [], workModes: [], employmentTypes: [] });
    }
    if (req.params.slug) {
      return res.status(503).json({ error: "Jobs database is unavailable." });
    }
    return res.json({ items: [], total: 0, page: 1, limit: 12, totalPages: 1 });
  }
  return res.status(503).json({ error: "Jobs database is unavailable." });
});

jobsRouter.get("/filters", getJobFilterOptions);
jobsRouter.get("/", listPublicJobs);
jobsRouter.get("/:slug", getPublicJobBySlug);
