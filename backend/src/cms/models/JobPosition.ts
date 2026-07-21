import mongoose, { Schema, type Document, type Model } from "mongoose";

export type JobStatus = "open" | "closed" | "draft";
export type WorkMode = "Remote" | "Hybrid" | "Onsite";

export type JobPositionDocument = Document & {
  title: string;
  slug: string;
  department: string;
  employmentType: string;
  internshipType: string;
  experience: string;
  location: string;
  workMode: WorkMode;
  duration: string;
  stipendSalary: string;
  numberOfOpenings: number;
  aboutCompany: string;
  roleOverview: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  eligibility: string;
  benefits: string[];
  learningOpportunities: string;
  selectionProcess: string;
  lastDateToApply: Date | null;
  status: JobStatus;
  featured: boolean;
  displayOrder: number;
  requirements: string[];
  seo: {
    title: string;
    description: string;
  };
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
};

const jobSchema = new Schema<JobPositionDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    department: { type: String, default: "", trim: true },
    employmentType: { type: String, default: "Full-time", trim: true },
    internshipType: { type: String, default: "", trim: true },
    experience: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    workMode: { type: String, enum: ["Remote", "Hybrid", "Onsite"], default: "Hybrid" },
    duration: { type: String, default: "", trim: true },
    stipendSalary: { type: String, default: "", trim: true },
    numberOfOpenings: { type: Number, default: 1, min: 1 },
    aboutCompany: { type: String, default: "" },
    roleOverview: { type: String, default: "" },
    description: { type: String, default: "" },
    responsibilities: { type: [String], default: [] },
    requiredSkills: { type: [String], default: [] },
    preferredSkills: { type: [String], default: [] },
    eligibility: { type: String, default: "" },
    benefits: { type: [String], default: [] },
    learningOpportunities: { type: String, default: "" },
    selectionProcess: { type: String, default: "" },
    lastDateToApply: { type: Date, default: null },
    status: { type: String, enum: ["open", "closed", "draft"], default: "draft" },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    requirements: { type: [String], default: [] },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    createdBy: { type: String, default: "" },
    updatedBy: { type: String, default: "" },
  },
  { timestamps: true },
);

jobSchema.index({ title: "text", department: "text", roleOverview: "text", description: "text" });
jobSchema.index({ status: 1, featured: -1, displayOrder: 1, createdAt: -1 });
jobSchema.index({ slug: 1 });

jobSchema.pre("validate", function syncLegacyFields() {
  if (!this.roleOverview && this.description) {
    this.roleOverview = this.description;
  }
  if (!this.description && this.roleOverview) {
    this.description = this.roleOverview;
  }
  if ((!this.responsibilities || this.responsibilities.length === 0) && this.requirements?.length) {
    this.responsibilities = this.requirements;
  }
  if ((!this.requirements || this.requirements.length === 0) && this.responsibilities?.length) {
    this.requirements = this.responsibilities;
  }
  if (!this.seo?.title && this.title) {
    this.seo = { ...(this.seo ?? {}), title: `${this.title} | Commiters Careers` };
  }
  if (!this.seo?.description && this.roleOverview) {
    this.seo = { ...(this.seo ?? {}), description: this.roleOverview.slice(0, 160) };
  }
});

export const JobPosition: Model<JobPositionDocument> =
  mongoose.models.JobPosition ?? mongoose.model<JobPositionDocument>("JobPosition", jobSchema);

export function isJobExpired(lastDateToApply: Date | null | undefined): boolean {
  if (!lastDateToApply) return false;
  const end = new Date(lastDateToApply);
  end.setHours(23, 59, 59, 999);
  return end.getTime() < Date.now();
}

export function publicJobFilter() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return {
    status: "open" as const,
    $or: [{ lastDateToApply: null }, { lastDateToApply: { $gte: startOfToday } }],
  };
}
