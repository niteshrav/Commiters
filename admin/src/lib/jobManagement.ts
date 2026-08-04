import type { JobStatus, WorkMode } from "../types/jobTypes";

export type JobFormValues = {
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
  responsibilitiesText: string;
  requiredSkillsText: string;
  preferredSkillsText: string;
  eligibility: string;
  benefitsText: string;
  learningOpportunities: string;
  selectionProcess: string;
  lastDateToApply: string;
  status: JobStatus;
  featured: boolean;
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
};

export const EMPTY_JOB_FORM: JobFormValues = {
  title: "",
  slug: "",
  department: "Engineering",
  employmentType: "Full-time",
  internshipType: "",
  experience: "1-3 years",
  location: "Udaipur, Rajasthan",
  workMode: "Hybrid",
  duration: "",
  stipendSalary: "Competitive",
  numberOfOpenings: 1,
  aboutCompany:
    "Commiters is a founder-led engineering studio building high-performance web, mobile, and AI products for ambitious teams.",
  roleOverview: "",
  responsibilitiesText: "",
  requiredSkillsText: "",
  preferredSkillsText: "",
  eligibility: "",
  benefitsText: "",
  learningOpportunities: "",
  selectionProcess: "Application review → Technical conversation → Offer",
  lastDateToApply: "",
  status: "draft",
  featured: false,
  displayOrder: 0,
  seoTitle: "",
  seoDescription: "",
};

export function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function listToLines(value: string[] | undefined): string {
  return (value ?? []).join("\n");
}

export function tagsToList(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function listToTags(value: string[] | undefined): string {
  return (value ?? []).join(", ");
}

export function jobToForm(job: Record<string, unknown>): JobFormValues {
  const seo = (job.seo as Record<string, unknown> | undefined) ?? {};
  return {
    title: String(job.title ?? ""),
    slug: String(job.slug ?? ""),
    department: String(job.department ?? ""),
    employmentType: String(job.employmentType ?? "Full-time"),
    internshipType: String(job.internshipType ?? ""),
    experience: String(job.experience ?? ""),
    location: String(job.location ?? ""),
    workMode: (job.workMode as WorkMode) ?? "Hybrid",
    duration: String(job.duration ?? ""),
    stipendSalary: String(job.stipendSalary ?? ""),
    numberOfOpenings: Number(job.numberOfOpenings ?? 1),
    aboutCompany: String(job.aboutCompany ?? ""),
    roleOverview: String(job.roleOverview ?? job.description ?? ""),
    responsibilitiesText: listToLines((job.responsibilities as string[]) ?? (job.requirements as string[])),
    requiredSkillsText: listToTags(job.requiredSkills as string[]),
    preferredSkillsText: listToTags(job.preferredSkills as string[]),
    eligibility: String(job.eligibility ?? ""),
    benefitsText: listToLines(job.benefits as string[]),
    learningOpportunities: String(job.learningOpportunities ?? ""),
    selectionProcess: String(job.selectionProcess ?? ""),
    lastDateToApply: job.lastDateToApply ? String(job.lastDateToApply).slice(0, 10) : "",
    status: (job.status as JobStatus) ?? "draft",
    featured: Boolean(job.featured),
    displayOrder: Number(job.displayOrder ?? job.order ?? 0),
    seoTitle: String(seo.title ?? ""),
    seoDescription: String(seo.description ?? ""),
  };
}

export function formToPayload(form: JobFormValues) {
  return {
    title: form.title.trim(),
    slug: form.slug.trim(),
    department: form.department.trim(),
    employmentType: form.employmentType.trim(),
    internshipType: form.internshipType.trim(),
    experience: form.experience.trim(),
    location: form.location.trim(),
    workMode: form.workMode,
    duration: form.duration.trim(),
    stipendSalary: form.stipendSalary.trim(),
    numberOfOpenings: form.numberOfOpenings,
    aboutCompany: form.aboutCompany.trim(),
    roleOverview: form.roleOverview.trim(),
    description: form.roleOverview.trim(),
    responsibilities: linesToList(form.responsibilitiesText),
    requirements: linesToList(form.responsibilitiesText),
    requiredSkills: tagsToList(form.requiredSkillsText),
    preferredSkills: tagsToList(form.preferredSkillsText),
    eligibility: form.eligibility.trim(),
    benefits: linesToList(form.benefitsText),
    learningOpportunities: form.learningOpportunities.trim(),
    selectionProcess: form.selectionProcess.trim(),
    lastDateToApply: form.lastDateToApply || null,
    status: form.status,
    featured: form.featured,
    displayOrder: form.displayOrder,
    seo: {
      title: form.seoTitle.trim(),
      description: form.seoDescription.trim(),
    },
  };
}

export function slugifyTitle(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}
