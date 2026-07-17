import mongoose, { Schema, type Document, type Model } from "mongoose";

export type ContactQueryDocument = Document & {
  name: string;
  email: string;
  serviceNeeded: string;
  budgetRange?: string;
  timeline?: string;
  referenceLinks?: string;
  message: string;
  source: "contact" | "lead";
  isRead: boolean;
  updatedAt: Date;
  createdAt: Date;
};

const querySchema = new Schema<ContactQueryDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    serviceNeeded: { type: String, default: "" },
    budgetRange: { type: String, default: "" },
    timeline: { type: String, default: "" },
    referenceLinks: { type: String, default: "" },
    message: { type: String, required: true },
    source: { type: String, enum: ["contact", "lead"], default: "contact" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

querySchema.index({ name: "text", email: "text", message: "text" });

export const ContactQuery: Model<ContactQueryDocument> =
  mongoose.models.ContactQuery ?? mongoose.model<ContactQueryDocument>("ContactQuery", querySchema);
