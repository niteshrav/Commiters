import mongoose, { Schema, type Document, type Model } from "mongoose";

export type ServiceDocument = Document & {
  icon: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
  slug?: string;
  updatedAt: Date;
  createdAt: Date;
};

const serviceSchema = new Schema<ServiceDocument>(
  {
    icon: { type: String, default: "code" },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    slug: { type: String, trim: true },
  },
  { timestamps: true },
);

serviceSchema.index({ order: 1 });
serviceSchema.index({ title: "text", description: "text" });

export const Service: Model<ServiceDocument> =
  mongoose.models.Service ?? mongoose.model<ServiceDocument>("Service", serviceSchema);
