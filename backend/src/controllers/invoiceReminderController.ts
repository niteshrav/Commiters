import type { Request, Response } from "express";
import { z } from "zod";
import { sendPaymentReminderEmail } from "../lib/invoiceReminder";

const bankDetailsSchema = z.object({
  accountName: z.string().min(1).max(160),
  bankName: z.string().min(1).max(160),
  accountNumber: z.string().min(1).max(64),
  ifsc: z.string().max(32).optional().or(z.literal("")),
  upi: z.string().max(80).optional().or(z.literal("")),
});

const reminderSchema = z.object({
  to: z.string().email(),
  clientName: z.string().min(1).max(120),
  projectName: z.string().min(1).max(200),
  pendingAmount: z.union([z.string().min(1).max(40), z.number().positive()]),
  dueDate: z.union([z.string().min(1).max(40), z.coerce.date()]),
  bankDetails: bankDetailsSchema,
});

export async function postSendReminder(req: Request, res: Response) {
  const parsed = reminderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input.", details: parsed.error.flatten() });
  }

  try {
    const result = await sendPaymentReminderEmail(parsed.data);
    return res.status(200).json({
      ok: true,
      to: result.to,
      subject: result.subject,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send reminder.";
    if (/smtp/i.test(message)) {
      return res.status(503).json({ error: "SMTP is unavailable. Payment reminders cannot be sent." });
    }
    return res.status(500).json({ error: message });
  }
}
