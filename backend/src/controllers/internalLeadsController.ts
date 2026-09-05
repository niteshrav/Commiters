import type { Request, Response } from "express";
import { listInternalLeads } from "../lib/internalLeads";

export async function getInternalLeads(_req: Request, res: Response) {
  try {
    const leads = await listInternalLeads();
    return res.status(200).json({ leads });
  } catch {
    return res.status(503).json({ error: "Lead service is temporarily unavailable. Please try again shortly." });
  }
}
