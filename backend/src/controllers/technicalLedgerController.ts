import { Request, Response } from "express";
import { z } from "zod";
import { createTechnicalLedgerArticle, listTechnicalLedgerArticles } from "../lib/technicalLedgerService";

const createArticleSchema = z.object({
  title: z.string().trim().min(1).max(200),
  summary: z.string().trim().min(1).max(500),
  contentMarkdown: z.string().trim().min(1).max(50000),
  category: z.string().trim().min(1).max(40).optional(),
  tags: z.array(z.string().trim().min(1).max(40)).max(5).optional(),
  imageSrc: z.union([z.literal(""), z.string().url()]).optional(),
  imageAlt: z.string().trim().min(1).max(160).optional(),
  publishToMedium: z.boolean().optional(),
});

export async function getTechnicalLedgerArticles(_req: Request, res: Response) {
  try {
    const articles = await listTechnicalLedgerArticles();
    return res.json({ articles });
  } catch (error) {
    return res.status(503).json({
      error: error instanceof Error ? error.message : "Unable to load Technical Ledger articles.",
    });
  }
}

export async function postTechnicalLedgerArticle(req: Request, res: Response) {
  const parsed = createArticleSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input.", details: parsed.error.flatten() });
  }

  try {
    const article = await createTechnicalLedgerArticle({
      ...parsed.data,
      imageSrc: parsed.data.imageSrc === "" ? null : parsed.data.imageSrc ?? null,
    });
    return res.status(201).json({ article });
  } catch (error) {
    return res.status(503).json({
      error: error instanceof Error ? error.message : "Unable to publish Technical Ledger article.",
    });
  }
}
