import mongoose, { Schema, type Document, type Model } from "mongoose";

export type FaqDocument = Document & {
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
};

const faqSchema = new Schema<FaqDocument>(
  {
    question: { type: String, required: true },
    answer: { type: String, default: "" },
    category: { type: String, default: "process" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

faqSchema.index({ question: "text", answer: "text" });

export const Faq: Model<FaqDocument> =
  mongoose.models.Faq ?? mongoose.model<FaqDocument>("Faq", faqSchema);
