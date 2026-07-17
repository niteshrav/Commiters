import mongoose, { Schema, type Document, type Model } from "mongoose";

export type SocialLink = { platform: string; url: string };

export type ContactSettingsDocument = Document & {
  companyName: string;
  address: string;
  email: string;
  phone: string;
  googleMapEmbedUrl: string;
  googleMapDirectionsUrl: string;
  socialLinks: SocialLink[];
  whatsappUrl?: string;
  calendarUrl?: string;
  updatedAt: Date;
  createdAt: Date;
};

const socialSchema = new Schema<SocialLink>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false },
);

const contactSchema = new Schema<ContactSettingsDocument>(
  {
    companyName: { type: String, default: "Commiters" },
    address: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    googleMapEmbedUrl: { type: String, default: "" },
    googleMapDirectionsUrl: { type: String, default: "" },
    socialLinks: { type: [socialSchema], default: [] },
    whatsappUrl: { type: String, default: "" },
    calendarUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

export const ContactSettings: Model<ContactSettingsDocument> =
  mongoose.models.ContactSettings ??
  mongoose.model<ContactSettingsDocument>("ContactSettings", contactSchema);
