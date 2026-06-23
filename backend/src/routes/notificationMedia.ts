import { Router } from "express";
import { getNotificationMedia } from "../lib/notificationMediaStore";

export const notificationMediaRouter = Router();

notificationMediaRouter.get("/api/notification-media/:token", (req, res) => {
  const media = getNotificationMedia(req.params.token);
  if (!media) {
    return res.status(404).json({ error: "Notification media not found or expired." });
  }

  res.setHeader("Content-Type", media.contentType);
  res.setHeader("Content-Disposition", `inline; filename="commiters-inquiry.pdf"`);
  return res.send(media.buffer);
});
