import type { Request, Response } from "express";
import { isMongoConnected } from "../cms/config/database";
import { dispatchInquiryNotifications } from "../lib/inquiryNotifications";
import { createSubmissionRef } from "../lib/inquirySubmissionRef";
import { validateOpsFlowWorkEmail } from "../lib/opsFlowEmail";
import { extractDocumentFields, isOpsFlowGeminiConfigured } from "../lib/opsFlowGemini";
import { buildOpsFlowInquiryNotification } from "../lib/opsFlowLeadNotification";
import {
  isOpsFlowQuotaExceeded,
  OPSFLOW_DAILY_LIMIT,
  OPSFLOW_DAILY_LIMIT_HEADER,
  OPSFLOW_QUOTA_ERROR,
  OPSFLOW_REMAINING_HEADER,
  remainingOpsFlowExtractions,
} from "../lib/opsFlowQuota";
import { getOpsFlowDailyCount, recordOpsFlowExtraction } from "../lib/opsFlowUsageStore";
import { buildOpsFlowWorkbook } from "../lib/opsFlowWorkbook";

const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/png", "image/jpeg", "image/jpg"]);
const ALLOWED_EXTENSIONS = new Set([".pdf", ".png", ".jpg", ".jpeg"]);

export const OPSFLOW_XLSX_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" as const;
export const OPSFLOW_DOWNLOAD_FILENAME = "OpsFlow_Extracted_Data.xlsx" as const;

function fileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot).toLowerCase() : "";
}

function isAllowedUpload(file: Express.Multer.File): boolean {
  const type = file.mimetype.toLowerCase();
  return ALLOWED_MIME_TYPES.has(type) || ALLOWED_EXTENSIONS.has(fileExtension(file.originalname));
}

export async function parseOpsFlowDocument(req: Request, res: Response) {
  const workEmail = typeof req.body?.workEmail === "string" ? req.body.workEmail : "";
  const category = typeof req.body?.category === "string" ? req.body.category.trim() : "";
  const file = req.file;

  const emailError = validateOpsFlowWorkEmail(workEmail);
  if (emailError) {
    return res.status(400).json({ error: emailError });
  }
  if (!category) {
    return res.status(400).json({ error: "Please choose a document category." });
  }
  if (!file) {
    return res.status(400).json({ error: "Please attach a PDF, PNG, or JPG (max 10MB)." });
  }
  if (!isAllowedUpload(file)) {
    return res.status(400).json({ error: "Please attach a PDF, PNG, or JPG (max 10MB)." });
  }
  if (!isOpsFlowGeminiConfigured()) {
    return res.status(503).json({ error: "Document extraction is temporarily unavailable." });
  }
  if (!isMongoConnected()) {
    return res.status(503).json({ error: "Document extraction is temporarily unavailable." });
  }

  const normalizedEmail = workEmail.trim().toLowerCase();

  try {
    const usedCount = await getOpsFlowDailyCount(normalizedEmail);
    if (isOpsFlowQuotaExceeded(usedCount)) {
      return res.status(429).json({ success: false, error: OPSFLOW_QUOTA_ERROR });
    }

    const fields = await extractDocumentFields({
      buffer: file.buffer,
      mimeType: file.mimetype || "application/pdf",
      category,
    });
    const workbook = buildOpsFlowWorkbook(fields);

    let usageCount = usedCount + 1;
    let remaining = remainingOpsFlowExtractions(usageCount, OPSFLOW_DAILY_LIMIT);
    try {
      const recorded = await recordOpsFlowExtraction({
        workEmail: normalizedEmail,
        category,
      });
      usageCount = recorded.count;
      remaining = recorded.remaining;
    } catch (error) {
      req.log?.error({ err: error }, "OpsFlow quota persist failed");
    }

    const submission = createSubmissionRef();
    try {
      await dispatchInquiryNotifications(
        buildOpsFlowInquiryNotification({
          id: submission.id,
          workEmail: normalizedEmail,
          category,
          filename: file.originalname,
          usageCount,
          submittedAt: submission.submittedAt,
        }),
      );
    } catch (error) {
      req.log?.error({ err: error }, "OpsFlow lead notification failed");
    }

    res.setHeader("Content-Type", OPSFLOW_XLSX_CONTENT_TYPE);
    res.setHeader("Content-Disposition", `attachment; filename="${OPSFLOW_DOWNLOAD_FILENAME}"`);
    res.setHeader(OPSFLOW_REMAINING_HEADER, String(remaining));
    res.setHeader(OPSFLOW_DAILY_LIMIT_HEADER, String(OPSFLOW_DAILY_LIMIT));
    return res.status(200).send(workbook);
  } catch (error) {
    req.log?.error({ err: error }, "OpsFlow extraction failed");
    return res.status(503).json({ error: "Document extraction is temporarily unavailable." });
  }
}
