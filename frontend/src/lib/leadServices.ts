/** Labels sent to POST /api/leads — must stay aligned with backend enum mapping. */
export const LEAD_SERVICE_LABELS = [
  "Website Development",
  "Web Application Development",
  "Mobile App Development",
  "MVP Development",
  "E-commerce Development",
  "Automation Tools",
  "AI Integration",
] as const;

export type LeadServiceLabel = (typeof LEAD_SERVICE_LABELS)[number];
