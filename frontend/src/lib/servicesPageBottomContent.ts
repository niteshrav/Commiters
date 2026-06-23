import { buildDiscoveryCallCalendarUrl } from "./siteContact";

export type ServicesProcessStep = {
  index: string;
  title: string;
  body: string;
};

export const SERVICES_HOW_WE_WORK = {
  title: "How We Work",
  subtext: "Our engineering process is designed for transparency, speed, and uncompromising quality.",
  steps: [
    {
      index: "01",
      title: "Discovery",
      body: "Technical audit of your current stack and requirements gathering.",
    },
    {
      index: "02",
      title: "Architecture",
      body: "Designing scalable systems and database schemas before a line of code is written.",
    },
    {
      index: "03",
      title: "Sprints",
      body: "Bi-weekly development cycles with constant staging updates for your review.",
    },
    {
      index: "04",
      title: "Handoff",
      body: "Deployment, rigorous QA testing, and full documentation for your team.",
    },
  ] as const satisfies readonly ServicesProcessStep[],
} as const;

export const SERVICES_BOTTOM_CTA = {
  title: "Ready to start building?",
  subtext: "Connect with us to discuss your project requirements and receive a technical proposal.",
  primaryLabel: "Book a Technical Call",
  primaryHref: buildDiscoveryCallCalendarUrl(),
} as const;

export const SERVICES_REJECTED_BOTTOM_CTA_SUBTEXT =
  "Connect with our engineering team to discuss your project requirements and receive a technical proposal." as const;
