export type JobStatus = "open" | "closed" | "draft";
export type WorkMode = "Remote" | "Hybrid" | "Onsite";

export type JobSeo = {
  title: string;
  description: string;
};

export type JobRecord = {
  _id: string;
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
  description?: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  eligibility: string;
  benefits: string[];
  learningOpportunities: string;
  selectionProcess: string;
  lastDateToApply: string | null;
  status: JobStatus;
  featured: boolean;
  displayOrder: number;
  order?: number;
  requirements?: string[];
  seo: JobSeo;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type PublicJobCard = Pick<
  JobRecord,
  | "_id"
  | "title"
  | "slug"
  | "department"
  | "location"
  | "workMode"
  | "internshipType"
  | "stipendSalary"
  | "employmentType"
  | "featured"
  | "lastDateToApply"
  | "createdAt"
  | "updatedAt"
>;
