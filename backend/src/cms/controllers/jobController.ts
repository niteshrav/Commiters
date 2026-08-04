import type { Request, Response } from "express";
import type { SortOrder } from "mongoose";
import { JobPosition, isJobExpired, publicJobFilter, type JobPositionDocument } from "../models/JobPosition";
import { asyncHandler } from "../utils/asyncHandler";
import { buildPaginatedResponse, buildSearchFilter, parsePagination } from "../utils/pagination";
import { normalizeJobPayload, parseJobInput } from "../validation/jobValidation";
import { slugify, uniqueJobSlug } from "../utils/slugify";

function actorId(req: Request): string {
  return req.auth?.sub ?? req.auth?.email ?? "admin";
}

function serializeJob(doc: JobPositionDocument | Record<string, unknown>) {
  const job = typeof (doc as JobPositionDocument).toObject === "function" ? (doc as JobPositionDocument).toObject() : doc;
  const lastDate = job.lastDateToApply ? new Date(job.lastDateToApply as Date | string).toISOString() : null;
  return {
    ...job,
    order: job.displayOrder ?? job.order ?? 0,
    lastDateToApply: lastDate,
    isExpired: isJobExpired(job.lastDateToApply ? new Date(job.lastDateToApply as Date | string) : null),
  };
}

function buildAdminFilter(query: Record<string, unknown>) {
  return {
    ...buildSearchFilter(String(query.search ?? ""), [
      "title",
      "department",
      "roleOverview",
      "description",
      "location",
      "slug",
    ]),
    ...(query.status ? { status: query.status } : {}),
    ...(query.department ? { department: query.department } : {}),
    ...(query.workMode ? { workMode: query.workMode } : {}),
    ...(query.employmentType ? { employmentType: query.employmentType } : {}),
    ...(query.featured === "true" ? { featured: true } : {}),
  };
}

function buildPublicFilter(query: Record<string, unknown>) {
  return {
    ...publicJobFilter(),
    ...buildSearchFilter(String(query.search ?? ""), ["title", "department", "roleOverview", "location"]),
    ...(query.department ? { department: query.department } : {}),
    ...(query.workMode ? { workMode: query.workMode } : {}),
    ...(query.employmentType ? { employmentType: query.employmentType } : {}),
    ...(query.featured === "true" ? { featured: true } : {}),
  };
}

async function resolveSlug(title: string, requestedSlug: string | undefined, excludeId?: string) {
  if (requestedSlug?.trim()) {
    const normalized = slugify(requestedSlug);
    const existing = await JobPosition.findOne({ slug: normalized });
    if (existing && String(existing._id) !== excludeId) {
      throw new Error("Slug already exists.");
    }
    return normalized;
  }
  return uniqueJobSlug(title, async (slug) => JobPosition.findOne({ slug }).select("_id").lean(), excludeId);
}

export const listPublicJobs = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, sort, order } = parsePagination(req.query as Record<string, unknown>);
  const filter = buildPublicFilter(req.query as Record<string, unknown>);
  const sortField = sort || "featured";
  const sortSpec: Record<string, SortOrder> =
    sortField === "featured"
      ? { featured: -1, displayOrder: 1, createdAt: -1 }
      : { [sortField]: order === "asc" ? 1 : -1 };

  const [items, total] = await Promise.all([
    JobPosition.find(filter).sort(sortSpec).skip((page! - 1) * limit!).limit(limit!).lean(),
    JobPosition.countDocuments(filter),
  ]);

  return res.json(buildPaginatedResponse(items.map(serializeJob), total, page!, limit!));
});

export const getPublicJobBySlug = asyncHandler(async (req: Request, res: Response) => {
  const job = await JobPosition.findOne({ ...publicJobFilter(), slug: req.params.slug }).lean();
  if (!job) return res.status(404).json({ error: "Job not found." });

  const related = await JobPosition.find({
    ...publicJobFilter(),
    slug: { $ne: job.slug },
    $or: [{ department: job.department }, { employmentType: job.employmentType }],
  })
    .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
    .limit(3)
    .lean();

  return res.json({ job: serializeJob(job), relatedJobs: related.map(serializeJob) });
});

export const listAdminJobs = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, sort, order } = parsePagination(req.query as Record<string, unknown>);
  const filter = buildAdminFilter(req.query as Record<string, unknown>);
  const sortField = sort || "displayOrder";
  const sortOrder = order === "asc" ? 1 : -1;

  const [items, total] = await Promise.all([
    JobPosition.find(filter)
      .sort(sortField === "featured" ? { featured: -1, displayOrder: 1, createdAt: -1 } : { [sortField]: sortOrder })
      .skip((page! - 1) * limit!)
      .limit(limit!)
      .lean(),
    JobPosition.countDocuments(filter),
  ]);

  return res.json(buildPaginatedResponse(items.map(serializeJob), total, page!, limit!));
});

export const getAdminJobById = asyncHandler(async (req: Request, res: Response) => {
  const job = await JobPosition.findById(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found." });
  return res.json(serializeJob(job));
});

export const createJob = asyncHandler(async (req: Request, res: Response) => {
  const parsed = parseJobInput(req.body);
  const payload = normalizeJobPayload(parsed);
  const slug = await resolveSlug(payload.title, payload.slug);

  const job = await JobPosition.create({
    ...payload,
    slug,
    createdBy: actorId(req),
    updatedBy: actorId(req),
  });

  return res.status(201).json(serializeJob(job));
});

export const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const parsed = parseJobInput(req.body);
  const payload = normalizeJobPayload(parsed);
  const slug = await resolveSlug(payload.title, payload.slug, req.params.id);

  const job = await JobPosition.findByIdAndUpdate(
    req.params.id,
    { ...payload, slug, updatedBy: actorId(req) },
    { new: true, runValidators: true },
  );

  if (!job) return res.status(404).json({ error: "Job not found." });
  return res.json(serializeJob(job));
});

export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await JobPosition.findByIdAndDelete(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found." });
  return res.json({ ok: true });
});

export const duplicateJob = asyncHandler(async (req: Request, res: Response) => {
  const source = await JobPosition.findById(req.params.id).lean();
  if (!source) return res.status(404).json({ error: "Job not found." });

  const title = `${source.title} (Copy)`;
  const slug = await uniqueJobSlug(title, async (value) => JobPosition.findOne({ slug: value }).select("_id").lean());

  const { _id, createdAt, updatedAt, __v, slug: _slug, ...rest } = source;
  const copy = await JobPosition.create({
    ...rest,
    title,
    slug,
    status: "draft",
    featured: false,
    createdBy: actorId(req),
    updatedBy: actorId(req),
  });

  return res.status(201).json(serializeJob(copy));
});

export const publishJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await JobPosition.findByIdAndUpdate(
    req.params.id,
    { status: "open", updatedBy: actorId(req) },
    { new: true },
  );
  if (!job) return res.status(404).json({ error: "Job not found." });
  return res.json(serializeJob(job));
});

export const unpublishJob = asyncHandler(async (req: Request, res: Response) => {
  const status = req.body?.status === "closed" ? "closed" : "draft";
  const job = await JobPosition.findByIdAndUpdate(
    req.params.id,
    { status, updatedBy: actorId(req) },
    { new: true },
  );
  if (!job) return res.status(404).json({ error: "Job not found." });
  return res.json(serializeJob(job));
});

export const getJobFilterOptions = asyncHandler(async (_req: Request, res: Response) => {
  const [departments, workModes, employmentTypes] = await Promise.all([
    JobPosition.distinct("department", publicJobFilter()),
    JobPosition.distinct("workMode", publicJobFilter()),
    JobPosition.distinct("employmentType", publicJobFilter()),
  ]);

  return res.json({
    departments: departments.filter(Boolean).sort(),
    workModes: workModes.filter(Boolean).sort(),
    employmentTypes: employmentTypes.filter(Boolean).sort(),
  });
});
