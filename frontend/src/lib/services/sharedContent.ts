import type { ServicePricingModel, ServiceTimelineEntry } from "./types";

/** Lean delivery steps shown on every service detail page. */
export const SERVICE_PROCESS_STEPS = [
  "Discovery & scope",
  "UI/UX design",
  "Development",
  "Testing & QA",
  "Launch & handoff",
] as const;

export const SERVICE_DEFAULT_TIMELINE: ServiceTimelineEntry[] = [
  { label: "Basic Website", duration: "1–2 Weeks" },
  { label: "Business Website", duration: "2–4 Weeks" },
  { label: "Custom Web Application", duration: "1–3 Months" },
  { label: "Enterprise Solution", duration: "3–6 Months" },
];

export const SERVICE_DEFAULT_PRICING: ServicePricingModel[] = [
  {
    title: "Fixed cost",
    description: "Defined scope and milestone-based delivery for well-scoped projects.",
    bestFor: "MVPs, marketing sites, and feature-complete releases",
  },
  {
    title: "Hourly",
    description: "Flexible engagement for audits, enhancements, and advisory work.",
    bestFor: "Consulting, integrations, and iterative improvements",
  },
  {
    title: "Dedicated team",
    description: "Embedded engineers aligned to your roadmap with shared ownership.",
    bestFor: "Long-term product development and scale-up phases",
  },
];
