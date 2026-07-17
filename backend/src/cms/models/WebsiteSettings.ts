import mongoose, { Schema, type Document, type Model } from "mongoose";

export type WebsiteSettingsDocument = Document & {
  websiteName: string;
  seoTitle: string;
  metaDescription: string;
  favicon: string;
  openGraphImage: string;
  updatedAt: Date;
  createdAt: Date;
};

const settingsSchema = new Schema<WebsiteSettingsDocument>(
  {
    websiteName: { type: String, default: "Commiters" },
    seoTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    favicon: { type: String, default: "/assets/icons/favicon.svg" },
    openGraphImage: { type: String, default: "" },
  },
  { timestamps: true },
);

export const WebsiteSettings: Model<WebsiteSettingsDocument> =
  mongoose.models.WebsiteSettings ??
  mongoose.model<WebsiteSettingsDocument>("WebsiteSettings", settingsSchema);
