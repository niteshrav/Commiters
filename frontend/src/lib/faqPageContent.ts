import { ROUTES } from "./routes";
import { buildDiscoveryCallCalendarUrl } from "./siteContact";

export type FaqCategoryId = "process" | "technical" | "engagements";

export type FaqCategory = {
  id: FaqCategoryId;
  label: string;
  anchor: string;
};

export type FaqItem = {
  id: string;
  category: FaqCategoryId;
  question: string;
  answer: string;
  order: number;
};

export const FAQ_PAGE_COPY = {
  title: "Frequently Asked Questions",
  subtext: "Everything you need to know about partnering with our engineering studio.",
  categoriesLabel: "Categories",
  bottomCta: {
    title: "Still have questions?",
    subtext: "Our team is ready to discuss your specific technical requirements and project goals.",
    buttonLabel: "Schedule a Call",
    buttonHref: buildDiscoveryCallCalendarUrl(),
  },
} as const;

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  { id: "process", label: "Process & Delivery", anchor: "process" },
  { id: "technical", label: "Technical Expertise", anchor: "technical" },
  { id: "engagements", label: "Engagements", anchor: "engagements" },
] as const;

export const FALLBACK_FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "process-1",
    category: "process",
    order: 1,
    question: "How do you handle project timelines and milestones?",
    answer:
      "We operate on two-week sprint cycles with clear deliverables at the end of each. Our process starts with a rigorous discovery phase, followed by architecture design, development, and weekly syncs to ensure we stay on track with your roadmap.",
  },
  {
    id: "process-2",
    category: "process",
    order: 2,
    question: "What does the handoff process look like?",
    answer:
      "Handoff is not a single event but a continuous process. We provide full source code ownership, comprehensive technical documentation, and CI/CD pipeline setups. We also offer a 30-day post-launch support window to ensure a smooth transition.",
  },
  {
    id: "technical-1",
    category: "technical",
    order: 1,
    question: "What is your primary technology stack?",
    answer:
      "While we are tech-agnostic based on project needs, our core expertise lies in TypeScript, React, Node.js, Rust, and Go. We leverage AWS and GCP for scalable cloud infrastructure and Kubernetes for container orchestration.",
  },
  {
    id: "technical-2",
    category: "technical",
    order: 2,
    question: "How do you ensure the security of our application?",
    answer:
      "Security is baked into our SDLC. We perform regular code audits, implement OWASP top 10 best practices, and use automated dependency scanning. For high-stakes projects, we coordinate with third-party penetration testing firms.",
  },
  {
    id: "engagements-1",
    category: "engagements",
    order: 1,
    question: "How do you structure your pricing?",
    answer:
      "We typically work on a time-and-materials basis for agile development, or fixed-fee for well-defined discovery phases. We provide transparent weekly burn reports so you always know where your budget is going.",
  },
  {
    id: "engagements-2",
    category: "engagements",
    order: 2,
    question: "Do you sign NDAs before initial discussions?",
    answer:
      "Absolutely. We understand the sensitivity of intellectual property. We are happy to sign your standard NDA or provide our own Mutual Non-Disclosure Agreement before diving into the details of your project.",
  },
] as const;

export const FAQ_ROUTE = ROUTES.faq;
