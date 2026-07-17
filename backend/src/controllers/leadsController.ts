import { Request, Response } from "express";
import { z } from "zod";
import { dispatchInquiryNotifications } from "../lib/inquiryNotifications";
import { createSubmissionRef } from "../lib/inquirySubmissionRef";
import { LEAD_BUDGET_RANGE_VALUES } from "../lib/budgetRanges";

const leadSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-zA-Z\s'-]+$/, "Name must contain letters only."),
  email: z.string().email(),
  serviceNeeded: z.string().min(1).max(120),
  budgetRange: z.union([
    z.undefined(),
    z.literal(""),
    z.enum(LEAD_BUDGET_RANGE_VALUES as unknown as [string, ...string[]]),
  ]),
  timeline: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-zA-Z0-9\s-]+$/, "Timeline contains invalid characters."),
  referenceLinks: z.string().max(500).optional().or(z.literal("")),
  message: z.string().min(1).max(6000),
});

export async function createLead(req: Request, res: Response) {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input.", details: parsed.error.flatten() });
  }

  const data = parsed.data;
  const submission = createSubmissionRef();

  try {
    await dispatchInquiryNotifications({
      id: submission.id,
      kind: "project_inquiry",
      name: data.name,
      email: data.email,
      serviceOrPosition: data.serviceNeeded,
      budgetRange: data.budgetRange && data.budgetRange.length > 0 ? data.budgetRange : null,
      timeline: data.timeline,
      referenceLinks: data.referenceLinks ? data.referenceLinks || null : null,
      message: data.message,
      submittedAt: submission.submittedAt,
    });

    try {
      const { saveContactQuery } = await import("../cms/controllers/contactQueryController");
      await saveContactQuery({
        name: data.name,
        email: data.email,
        serviceNeeded: data.serviceNeeded,
        budgetRange: data.budgetRange,
        timeline: data.timeline,
        referenceLinks: data.referenceLinks,
        message: data.message,
        source: "lead",
      });
    } catch (storageError) {
      req.log?.warn({ err: storageError }, "Lead CMS storage skipped");
    }

    return res.status(201).json({ ok: true, id: submission.id });
  } catch (notificationError) {
    req.log?.error({ err: notificationError, submissionId: submission.id }, "Lead notification dispatch failed");
    return res.status(503).json({
      error: "Lead service is temporarily unavailable. Please try again shortly.",
    });
  }
}
