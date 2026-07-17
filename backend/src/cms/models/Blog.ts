import mongoose, { Schema, type Document, type Model } from "mongoose";

export type BlogDocument = Document & {
  title: string;
  slug: string;
  author: string;
  coverImage: string;
  content: string;
  summary?: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
};

const blogSchema = new Schema<BlogDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    author: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    content: { type: String, default: "" },
    summary: { type: String, default: "" },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

blogSchema.index({ title: "text", content: "text", tags: "text" });

export const Blog: Model<BlogDocument> =
  mongoose.models.Blog ?? mongoose.model<BlogDocument>("Blog", blogSchema);
