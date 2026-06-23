import { Request, Response } from "express";
import { z } from "zod";
import { dispatchInquiryNotifications } from "../lib/inquiryNotifications";
import { createSubmissionRef } from "../lib/inquirySubmissionRef";

const POSITION_OPTIONS = [
  "Full Stack Engineer",
  "AI Engineer",
  "QA Engineer",
  "Marketing Executive",
  "Other",
] as const;

const RESUME_MAX_BYTES = 5 * 1024 * 1024;

const jobApplicationSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-zA-Z\s'-]+$/, "Name must contain letters only."),
  email: z.string().email(),
  phone: z
    .string()
    .min(7)
    .max(20)
    .regex(/^\+?[0-9\s()-]+$/, "Phone contains invalid characters."),
  positionAppliedFor: z.enum(POSITION_OPTIONS),
  linkedinProfile: z.union([z.literal(""), z.string().url()]).optional(),
  portfolioGitHub: z.union([z.literal(""), z.string().url()]).optional(),
  coverLetter: z.string().trim().min(1).max(10000),
  resumeFileName: z
    .string()
    .min(1)
    .max(255)
    .regex(/\.pdf$/i, "Resume file name must end with .pdf."),
  resumePdfBase64: z.string().min(1),
});

type JobApplicationData = z.infer<typeof jobApplicationSchema>;

function parseResumePdf(base64: string): { buffer: Buffer } | { error: string } {
  let buffer: Buffer;
  try {
    buffer = Buffer.from(base64, "base64");
  } catch {
    return { error: "Resume upload is invalid." };
  }

  if (buffer.length === 0) {
    return { error: "Please upload your resume as a PDF." };
  }

  if (buffer.length > RESUME_MAX_BYTES) {
    return { error: "Resume must be 5MB or smaller." };
  }

  if (!buffer.subarray(0, 4).toString("ascii").startsWith("%PDF")) {
    return { error: "Resume must be a valid PDF file." };
  }

  return { buffer };
}

function buildApplicationMessage(data: JobApplicationData): string {
  const lines = [
    `[Position Applied For: ${data.positionAppliedFor}]`,
    `Phone: ${data.phone}`,
  ];
  if (data.linkedinProfile) lines.push(`LinkedIn: ${data.linkedinProfile}`);
  if (data.portfolioGitHub) lines.push(`Portfolio/GitHub: ${data.portfolioGitHub}`);
  lines.push("", "Cover Letter:", data.coverLetter);
  return lines.join("\n");
}

function buildReferenceLinks(data: JobApplicationData): string | null {
  const links = [data.linkedinProfile, data.portfolioGitHub].filter(Boolean);
  return links.length > 0 ? links.join("\n") : null;
}

export async function createJobApplication(req: Request, res: Response) {
  const parsed = jobApplicationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input.", details: parsed.error.flatten() });
  }

  const data = parsed.data;
  const resumeParsed = parseResumePdf(data.resumePdfBase64);
  if ("error" in resumeParsed) {
    return res.status(400).json({ error: resumeParsed.error });
  }

  const message = buildApplicationMessage(data);
  const referenceLinks = buildReferenceLinks(data);
  const submission = createSubmissionRef();

  try {
    await dispatchInquiryNotifications({
      id: submission.id,
      kind: "job_application",
      name: data.name,
      email: data.email,
      phone: data.phone,
      serviceOrPosition: data.positionAppliedFor,
      timeline: "Job Application",
      referenceLinks,
      message,
      submittedAt: submission.submittedAt,
      resumeAttachment: {
        filename: data.resumeFileName,
        content: resumeParsed.buffer,
      },
    });

    return res.status(201).json({ ok: true, id: submission.id });
  } catch (notificationError) {
    req.log?.error(
      { err: notificationError, submissionId: submission.id },
      "Job application notification dispatch failed",
    );
    return res.status(503).json({
      error: "Application service is temporarily unavailable. Please try again shortly.",
    });
  }
}
