import mongoose, { Schema, type Document, type Model } from "mongoose";

export type FooterLink = { label: string; url: string; order: number };

export type FooterDocument = Document & {
  logo: string;
  description: string;
  copyright: string;
  socialLinks: { platform: string; url: string }[];
  quickLinks: FooterLink[];
  navigationLinks: FooterLink[];
  legalLinks: FooterLink[];
  updatedAt: Date;
  createdAt: Date;
};

const linkSchema = new Schema<FooterLink>(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { _id: false },
);

const footerSchema = new Schema<FooterDocument>(
  {
    logo: { type: String, default: "" },
    description: { type: String, default: "" },
    copyright: { type: String, default: "" },
    socialLinks: { type: [{ platform: String, url: String }], default: [] },
    quickLinks: { type: [linkSchema], default: [] },
    navigationLinks: { type: [linkSchema], default: [] },
    legalLinks: { type: [linkSchema], default: [] },
  },
  { timestamps: true },
);

export const Footer: Model<FooterDocument> =
  mongoose.models.Footer ?? mongoose.model<FooterDocument>("Footer", footerSchema);
