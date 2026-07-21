export type JobStatus = "open" | "closed" | "draft";
export type WorkMode = "Remote" | "Hybrid" | "Onsite";

export type PublicJob = {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  workMode: WorkMode;
  internshipType: string;
  stipendSalary: string;
  employmentType: string;
  featured: boolean;
  lastDateToApply: string | null;
  createdAt: string;
  updatedAt: string;
  isExpired?: boolean;
};

export type JobDetail = PublicJob & {
  experience: string;
  duration: string;
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
  seo: {
    title: string;
    description: string;
  };
};

export type PaginatedJobs<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type JobFiltersResponse = {
  departments: string[];
  workModes: string[];
  employmentTypes: string[];
};

export type JobQuery = {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  workMode?: string;
  employmentType?: string;
  featured?: boolean;
};
