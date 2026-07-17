import mongoose, { Schema, type Document, type Model } from "mongoose";

export type StatItem = { value: string; label: string };

export type AboutSectionDocument = Document & {
  heading: string;
  description: string;
  mission: string;
  vision: string;
  images: string[];
  statistics: StatItem[];
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
};

const statSchema = new Schema<StatItem>(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false },
);

const aboutSchema = new Schema<AboutSectionDocument>(
  {
    heading: { type: String, required: true },
    description: { type: String, default: "" },
    mission: { type: String, default: "" },
    vision: { type: String, default: "" },
    images: { type: [String], default: [] },
    statistics: { type: [statSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const AboutSection: Model<AboutSectionDocument> =
  mongoose.models.AboutSection ?? mongoose.model<AboutSectionDocument>("AboutSection", aboutSchema);
