import fs from "node:fs";
import path from "node:path";
import type { Request, Response } from "express";
import { Media } from "../models";
import { getUploadDir, getUploadPublicUrl } from "../middleware/upload";
import { asyncHandler } from "../utils/asyncHandler";
import { buildPaginatedResponse, buildSearchFilter, parsePagination } from "../utils/pagination";

export const listMedia = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, search } = parsePagination(req.query as Record<string, unknown>);
  const filter = buildSearchFilter(search, ["originalName", "alt"]);
  const [items, total] = await Promise.all([
    Media.find(filter).sort({ createdAt: -1 }).skip((page! - 1) * limit!).limit(limit!),
    Media.countDocuments(filter),
  ]);
  return res.json(buildPaginatedResponse(items, total, page!, limit!));
});

export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded." });

  const url = getUploadPublicUrl(file.filename);
  const media = await Media.create({
    filename: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    url,
    alt: typeof req.body.alt === "string" ? req.body.alt : "",
    uploadedBy: req.auth?.email ?? "",
  });

  return res.status(201).json(media);
});

export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  const media = await Media.findById(req.params.id);
  if (!media) return res.status(404).json({ error: "Media not found." });

  const filePath = path.join(getUploadDir(), media.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await media.deleteOne();
  return res.json({ ok: true });
});
