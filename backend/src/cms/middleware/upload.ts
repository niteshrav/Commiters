import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const uploadDir = process.env.CMS_UPLOAD_DIR?.trim() || path.resolve(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, "-");
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

export const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowed.has(file.mimetype)) {
      cb(new Error("Only image uploads are allowed."));
      return;
    }
    cb(null, true);
  },
});

export function getUploadPublicUrl(filename: string): string {
  const base = process.env.CMS_UPLOAD_BASE_URL?.trim() || "/uploads";
  return `${base}/${filename}`;
}

export function getUploadDir(): string {
  return uploadDir;
}
