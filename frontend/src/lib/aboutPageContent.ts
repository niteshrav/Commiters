import { ROUTES } from "./routes";

export const ABOUT_REJECTED_CTA_SUBTEXT =
  "We are currently accepting new projects for Q3 2024." as const;

export type AboutPrincipleIcon = "innovation" | "quality" | "client" | "async";

export type AboutOperatingPrinciple = {
  id: string;
  title: string;
  body: string;
  icon: AboutPrincipleIcon;
};

export const ABOUT_OPERATING_PRINCIPLES: AboutOperatingPrinciple[] = [
  {
    id: "innovation-first",
    title: "Innovation First",
    body: "We adopt modern stacks and proven patterns so your product stays ahead without chasing novelty for its own sake.",
    icon: "innovation",
  },
  {
    id: "quality-delivered",
    title: "Quality Delivered",
    body: "Every release is tested, documented, and production-ready — not a prototype dressed up as a launch.",
    icon: "quality",
  },
  {
    id: "client-focused",
    title: "Client Focused",
    body: "Founder-led communication keeps scope honest, timelines clear, and decisions tied to business outcomes.",
    icon: "client",
  },
  {
    id: "async-friendly",
    title: "Async-Friendly",
    body: "Structured updates, written specs, and timezone-aware collaboration keep momentum without constant meetings.",
    icon: "async",
  },
];

export const ABOUT_PAGE_COPY = {
  principles: {
    title: "Our Core Operating Principles",
    viewAllLabel: "VIEW ALL WORK",
    viewAllTo: ROUTES.caseStudies,
  },
  bottomCta: {
    title: "Ready to build something monumental?",
    subtext: "Let's discuss your technical roadmap.",
    primaryLabel: "Start a Project",
    primaryTo: ROUTES.contact,
    secondaryLabel: "View the Portfolio",
    secondaryTo: ROUTES.services,
  },
} as const;
