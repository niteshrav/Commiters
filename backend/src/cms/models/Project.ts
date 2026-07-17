import mongoose, { Schema, type Document, type Model } from "mongoose";

export type ProjectDocument = Document & {
  name: string;
  category: string;
  description: string;
  images: string[];
  technologies: string[];
  projectUrl: string;
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  slug?: string;
  updatedAt: Date;
  createdAt: Date;
};

const projectSchema = new Schema<ProjectDocument>(
  {
    name: { type: String, required: true },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    images: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    projectUrl: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    slug: { type: String, trim: true },
  },
  { timestamps: true },
);

projectSchema.index({ order: 1 });
projectSchema.index({ name: "text", description: "text", category: "text" });

export const Project: Model<ProjectDocument> =
  mongoose.models.Project ?? mongoose.model<ProjectDocument>("Project", projectSchema);
