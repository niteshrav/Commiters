import type { Request, Response } from "express";
import { ContactQuery } from "../models";
import { createCrudController } from "./crudFactory";
import { asyncHandler } from "../utils/asyncHandler";

const crud = createCrudController({
  model: ContactQuery,
  searchFields: ["name", "email", "message", "serviceNeeded"],
  defaultSort: "createdAt",
});

export const listContactQueries = crud.list;
export const getContactQuery = crud.getById;
export const deleteContactQuery = crud.remove;

export const markContactQueryRead = asyncHandler(async (req: Request, res: Response) => {
  const item = await ContactQuery.findByIdAndUpdate(
    req.params.id,
    { isRead: req.body.isRead ?? true },
    { new: true },
  );
  if (!item) return res.status(404).json({ error: "Not found." });
  return res.json(item);
});

export async function saveContactQuery(input: {
  name: string;
  email: string;
  serviceNeeded: string;
  budgetRange?: string;
  timeline?: string;
  referenceLinks?: string;
  message: string;
  source?: "contact" | "lead";
}) {
  const { isMongoConnected } = await import("../config/database");
  if (!isMongoConnected()) return null;

  return ContactQuery.create({
    ...input,
    source: input.source ?? "contact",
    isRead: false,
  });
}
