import mongoose, { Schema, type Document, type Model } from "mongoose";

export type JobPositionDocument = Document & {
  title: string;
  description: string;
  requirements: string[];
  location: string;
  status: "open" | "closed";
  order: number;
  updatedAt: Date;
  createdAt: Date;
};

const jobSchema = new Schema<JobPositionDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    requirements: { type: [String], default: [] },
    location: { type: String, default: "" },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

jobSchema.index({ title: "text", description: "text" });

export const JobPosition: Model<JobPositionDocument> =
  mongoose.models.JobPosition ?? mongoose.model<JobPositionDocument>("JobPosition", jobSchema);
