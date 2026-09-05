import mongoose, { Schema, type Document, type Model } from "mongoose";
import {
  LEAD_INTERESTS,
  LEAD_NEXT_ACTIONS,
  LEAD_SOURCES,
  LEAD_STATUSES,
  type LeadInterest,
  type LeadNextAction,
  type LeadSource,
  type LeadStatus,
} from "../lib/b2bLeadCard";

export type LeadDocument = Document & {
  status: LeadStatus;
  source: LeadSource;
  name: string;
  email: string;
  companyDomain: string;
  interest: LeadInterest;
  suggestedNextAction: LeadNextAction;
  serviceNeeded: string;
  message: string;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

const leadSchema = new Schema<LeadDocument>(
  {
    status: { type: String, enum: LEAD_STATUSES, default: "NEW", required: true },
    source: { type: String, enum: LEAD_SOURCES, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    companyDomain: { type: String, default: "", lowercase: true, trim: true, index: true },
    interest: { type: String, enum: LEAD_INTERESTS, required: true },
    suggestedNextAction: { type: String, enum: LEAD_NEXT_ACTIONS, required: true },
    serviceNeeded: { type: String, default: "" },
    message: { type: String, default: "" },
    submittedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

leadSchema.index({ createdAt: -1 });

export const Lead: Model<LeadDocument> = mongoose.models.Lead ?? mongoose.model<LeadDocument>("Lead", leadSchema);
