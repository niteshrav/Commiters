import { Router } from "express";
import multer from "multer";
import { parseOpsFlowDocument } from "../controllers/opsFlowController";
import { opsFlowRateLimit } from "../middleware/rateLimit";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = new Set(["application/pdf", "image/png", "image/jpeg", "image/jpg"]);
    const name = file.originalname.toLowerCase();
    if (
      allowed.has(file.mimetype) ||
      name.endsWith(".pdf") ||
      name.endsWith(".png") ||
      name.endsWith(".jpg") ||
      name.endsWith(".jpeg")
    ) {
      cb(null, true);
      return;
    }
    cb(new Error("Please attach a PDF, PNG, or JPG (max 10MB)."));
  },
});

export const opsFlowRouter = Router();

opsFlowRouter.post("/api/opsflow/parse", opsFlowRateLimit, (req, res) => {
  upload.single("file")(req, res, (error) => {
    if (!error) {
      void parseOpsFlowDocument(req, res);
      return;
    }
    const message = error instanceof Error ? error.message : "Upload failed.";
    res.status(400).json({ error: message });
  });
});
