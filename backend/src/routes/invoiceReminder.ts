import { Router } from "express";
import { postSendReminder } from "../controllers/invoiceReminderController";
import { requireInternalAdminKey } from "../middleware/requireInternalAdminKey";
import { requireJson } from "../middleware/requireJson";

export const invoiceReminderRouter = Router();

invoiceReminderRouter.post(
  "/api/internal/send-reminder",
  requireInternalAdminKey,
  requireJson,
  postSendReminder,
);
