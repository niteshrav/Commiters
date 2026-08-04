import { z } from "zod";

const stringList = z.array(z.string().trim().min(1)).default([]);

export const jobInputSchema = z.object({
  title: z.string().trim().min(2, "Job title is required.").max(160),
  slug: z.string().trim().max(140).optional(),
  department: z.string().trim().max(80).optional(),
  employmentType: z.string().trim().max(80).optional(),
  internshipType: z.string().trim().max(80).optional(),
  experience: z.string().trim().max(120).optional(),
  location: z.string().trim().max(120).optional(),
  workMode: z.enum(["Remote", "Hybrid", "Onsite"]).optional(),
  duration: z.string().trim().max(80).optional(),
  stipendSalary: z.string().trim().max(120).optional(),
  numberOfOpenings: z.coerce.number().int().min(1).max(999).optional(),
  aboutCompany: z.string().trim().max(4000).optional(),
  roleOverview: z.string().trim().max(4000).optional(),
  description: z.string().trim().max(4000).optional(),
  responsibilities: stringList.optional(),
  requiredSkills: stringList.optional(),
  preferredSkills: stringList.optional(),
  eligibility: z.string().trim().max(2000).optional(),
  benefits: stringList.optional(),
  learningOpportunities: z.string().trim().max(2000).optional(),
  selectionProcess: z.string().trim().max(2000).optional(),
  lastDateToApply: z.union([z.literal(""), z.null(), z.string()]).optional(),
  status: z.enum(["open", "closed", "draft"]).optional(),
  featured: z.boolean().optional(),
  displayOrder: z.coerce.number().int().min(0).max(9999).optional(),
  requirements: stringList.optional(),
  seo: z
    .object({
      title: z.string().trim().max(160).optional(),
      description: z.string().trim().max(320).optional(),
    })
    .optional(),
});

export type JobInput = z.infer<typeof jobInputSchema>;

export function parseJobInput(body: unknown): JobInput {
  return jobInputSchema.parse(body);
}

export function normalizeJobPayload(input: JobInput) {
  const lastDate =
    input.lastDateToApply === "" || input.lastDateToApply == null
      ? null
      : new Date(input.lastDateToApply);

  return {
    ...input,
    lastDateToApply: lastDate,
    responsibilities: input.responsibilities ?? input.requirements ?? [],
    requirements: input.requirements ?? input.responsibilities ?? [],
    roleOverview: input.roleOverview ?? input.description ?? "",
    description: input.description ?? input.roleOverview ?? "",
    seo: {
      title: input.seo?.title ?? "",
      description: input.seo?.description ?? "",
    },
  };
}
