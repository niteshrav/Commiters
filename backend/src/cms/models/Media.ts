import mongoose, { Schema, type Document, type Model } from "mongoose";

export type MediaDocument = Document & {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  uploadedBy?: string;
  updatedAt: Date;
  createdAt: Date;
};

const mediaSchema = new Schema<MediaDocument>(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    alt: { type: String, default: "" },
    uploadedBy: { type: String, default: "" },
  },
  { timestamps: true },
);

mediaSchema.index({ originalName: "text", alt: "text" });

export const Media: Model<MediaDocument> =
  mongoose.models.Media ?? mongoose.model<MediaDocument>("Media", mediaSchema);
