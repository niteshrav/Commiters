import mongoose, { Schema, type Document, type Model } from "mongoose";

export type HeroSectionDocument = Document & {
  badgeText: string;
  heading: string;
  description: string;
  heroImage: string;
  primaryButtonLabel: string;
  primaryButtonUrl: string;
  secondaryButtonLabel: string;
  secondaryButtonUrl: string;
  sprintLabel?: string;
  sprintValue?: string;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
};

const heroSchema = new Schema<HeroSectionDocument>(
  {
    badgeText: { type: String, default: "" },
    heading: { type: String, required: true },
    description: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    primaryButtonLabel: { type: String, default: "" },
    primaryButtonUrl: { type: String, default: "" },
    secondaryButtonLabel: { type: String, default: "" },
    secondaryButtonUrl: { type: String, default: "" },
    sprintLabel: { type: String, default: "" },
    sprintValue: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const HeroSection: Model<HeroSectionDocument> =
  mongoose.models.HeroSection ?? mongoose.model<HeroSectionDocument>("HeroSection", heroSchema);
