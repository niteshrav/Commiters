import type { Request, Response } from "express";
import type { Model } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import {
  buildPaginatedResponse,
  buildSearchFilter,
  parsePagination,
} from "../utils/pagination";

type CrudOptions<T> = {
  model: Model<T>;
  searchFields?: string[];
  defaultSort?: string;
  publicFilter?: Record<string, unknown>;
};

export function createCrudController<T extends { _id: unknown }>(options: CrudOptions<T>) {
  const { model, searchFields = [], defaultSort = "createdAt", publicFilter = {} } = options;

  const list = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, search, sort, order } = parsePagination(req.query as Record<string, unknown>);
    const filter = {
      ...publicFilter,
      ...buildSearchFilter(search, searchFields),
      ...(req.query.isActive !== undefined ? { isActive: req.query.isActive === "true" } : {}),
      ...(req.query.isPublished !== undefined ? { isPublished: req.query.isPublished === "true" } : {}),
      ...(req.query.status ? { status: req.query.status } : {}),
      ...(req.query.isFeatured !== undefined ? { isFeatured: req.query.isFeatured === "true" } : {}),
      ...(req.query.isRead !== undefined ? { isRead: req.query.isRead === "true" } : {}),
    };

    const sortField = sort || defaultSort;
    const sortOrder = order === "asc" ? 1 : -1;

    const [items, total] = await Promise.all([
      model.find(filter).sort({ [sortField]: sortOrder }).skip((page! - 1) * limit!).limit(limit!).lean(),
      model.countDocuments(filter),
    ]);

    return res.json(buildPaginatedResponse(items, total, page!, limit!));
  });

  const getById = asyncHandler(async (req: Request, res: Response) => {
    const item = await model.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found." });
    return res.json(item);
  });

  const create = asyncHandler(async (req: Request, res: Response) => {
    const item = await model.create(req.body);
    return res.status(201).json(item);
  });

  const update = asyncHandler(async (req: Request, res: Response) => {
    const item = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ error: "Not found." });
    return res.json(item);
  });

  const remove = asyncHandler(async (req: Request, res: Response) => {
    const item = await model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found." });
    return res.json({ ok: true });
  });

  return { list, getById, create, update, remove };
}

export function createSingletonController<T extends { _id: unknown }>(
  model: Model<T>,
  publicFilter: Record<string, unknown> = {},
) {
  const getPublic = asyncHandler(async (_req: Request, res: Response) => {
    const item = await model.findOne(publicFilter).sort({ updatedAt: -1 }).lean();
    if (!item) return res.json(null);
    return res.json(item);
  });

  const upsert = asyncHandler(async (req: Request, res: Response) => {
    const existing = await model.findOne().sort({ updatedAt: -1 });
    if (existing) {
      Object.assign(existing, req.body);
      await existing.save();
      return res.json(existing);
    }
    const created = await model.create(req.body);
    return res.status(201).json(created);
  });

  return { getPublic, upsert };
}
