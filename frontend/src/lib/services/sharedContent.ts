import type { ServicePricingModel, ServiceTimelineEntry, ServiceWhyChoose } from "./types";

export const SERVICE_PROCESS_STEPS = [
  "Requirement Gathering",
  "Research & Planning",
  "UI/UX Design",
  "Development",
  "Testing",
  "Deployment",
  "Support & Maintenance",
] as const;

export const SERVICE_DEFAULT_TIMELINE: ServiceTimelineEntry[] = [
  { label: "Basic Website", duration: "1–2 Weeks" },
  { label: "Business Website", duration: "2–4 Weeks" },
  { label: "Custom Web Application", duration: "1–3 Months" },
  { label: "Enterprise Solution", duration: "3–6 Months" },
];

export const SERVICE_DEFAULT_PRICING: ServicePricingModel[] = [
  {
    title: "Fixed Cost",
    description: "Defined scope, milestone-based delivery, and predictable billing for well-scoped projects.",
    bestFor: "MVPs, marketing sites, and feature-complete releases",
  },
  {
    title: "Hourly",
    description: "Flexible engagement for audits, enhancements, and advisory work with transparent time logs.",
    bestFor: "Consulting, integrations, and iterative improvements",
  },
  {
    title: "Dedicated Team",
    description: "Embedded engineers aligned to your roadmap with sprint rituals and shared ownership.",
    bestFor: "Long-term product development and scale-up phases",
  },
];

export const SERVICE_DEFAULT_INDUSTRIES = [
  "Healthcare",
  "Education",
  "Travel",
  "Real Estate",
  "E-commerce",
  "Manufacturing",
  "Finance",
  "Startups",
] as const;

export const SERVICE_DEFAULT_WHY_CHOOSE: ServiceWhyChoose[] = [
  {
    title: "Experienced Developers",
    description: "Founder-led engineering with production-grade delivery across web, mobile, and AI systems.",
  },
  {
    title: "Agile Development",
    description: "Bi-weekly sprints, staging previews, and feedback loops that keep momentum high.",
  },
  {
    title: "Transparent Communication",
    description: "Written updates, clear trade-offs, and direct access to the engineers building your product.",
  },
  {
    title: "On-Time Delivery",
    description: "Realistic estimates, scope discipline, and proactive risk management from day one.",
  },
  {
    title: "Secure Code",
    description: "Security-minded architecture, code review, and deployment practices built into every sprint.",
  },
  {
    title: "Post Launch Support",
    description: "Monitoring, maintenance retainers, and iteration support after your product goes live.",
  },
];

export function buildDefaultFaqs(serviceName: string): { question: string; answer: string }[] {
  return [
    {
      question: `How much does ${serviceName.toLowerCase()} cost?`,
      answer:
        "Pricing depends on scope, integrations, and timeline. We provide a transparent proposal after a short discovery call, with fixed-cost, hourly, or dedicated-team options.",
    },
    {
      question: "How long does it take?",
      answer:
        "Timelines vary by complexity. Marketing sites often ship in 1–4 weeks, while custom platforms typically run 1–6 months depending on features and compliance needs.",
    },
    {
      question: "Can you redesign my existing website or product?",
      answer:
        "Yes. We audit your current stack, identify performance and UX gaps, and deliver a phased migration plan that minimizes downtime.",
    },
    {
      question: "Will I get the source code?",
      answer:
        "Yes. You receive full source code, documentation, and deployment credentials for work we deliver under your agreement.",
    },
    {
      question: "Do you provide maintenance after launch?",
      answer:
        "We offer post-launch support retainers covering monitoring, security patches, feature iterations, and SLA-based response times.",
    },
    {
      question: "Can you work with our in-house team?",
      answer:
        "Absolutely. We integrate with your designers, PMs, and engineers using shared repos, standups, and your preferred tooling.",
    },
    {
      question: "Which technologies do you recommend?",
      answer:
        "We choose stacks based on your goals — React, Next.js, Node.js, PostgreSQL, AWS, and modern mobile frameworks are common starting points.",
    },
    {
      question: "Do you sign NDAs?",
      answer: "Yes. We routinely work under NDAs and can align with your procurement or legal review process.",
    },
    {
      question: "How do we get started?",
      answer:
        "Book a free consultation or request a quote. We run a discovery session, share a technical proposal, and agree on milestones before development begins.",
    },
    {
      question: "What makes Commiters different?",
      answer:
        "You work directly with experienced engineers — not a handoff chain. We prioritize architecture, speed, and long-term maintainability.",
    },
  ];
}
