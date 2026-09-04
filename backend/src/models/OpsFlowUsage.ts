import mongoose, { Schema, type Document, type Model } from "mongoose";

export type OpsFlowUsageDocument = Document & {
  workEmail: string;
  utcDate: string;
  count: number;
  lastExtractedAt: Date;
  documentCategories: string[];
  createdAt: Date;
  updatedAt: Date;
};

const opsFlowUsageSchema = new Schema<OpsFlowUsageDocument>(
  {
    workEmail: { type: String, required: true, lowercase: true, trim: true, index: true },
    utcDate: { type: String, required: true, index: true },
    count: { type: Number, required: true, default: 0, min: 0 },
    lastExtractedAt: { type: Date, required: true },
    documentCategories: { type: [String], default: [] },
  },
  { timestamps: true },
);

opsFlowUsageSchema.index({ workEmail: 1, utcDate: 1 }, { unique: true });

export const OpsFlowUsage: Model<OpsFlowUsageDocument> =
  mongoose.models.OpsFlowUsage ?? mongoose.model<OpsFlowUsageDocument>("OpsFlowUsage", opsFlowUsageSchema);
