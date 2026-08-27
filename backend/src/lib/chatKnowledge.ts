import {
  CHAT_ASSISTANT_NAME,
  CHAT_CAREERS_PATH,
  CHAT_CONTACT_EMAIL,
  CHAT_CONTACT_PATH,
  CHAT_CONTACT_WHATSAPP_DISPLAY,
  CHAT_CONTACT_WHATSAPP_URL,
  CHAT_JOIN_US_PATH,
  CHAT_OFFICE_ADDRESS,
  CHAT_PORTFOLIO_PATH,
} from "./chatSystemPrompt";

export { CHAT_ASSISTANT_NAME };

export type ChatKnowledgeEntry = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
};

const CONTACT_ANSWER =
  `You can reach our team directly on WhatsApp at ${CHAT_CONTACT_WHATSAPP_DISPLAY} (${CHAT_CONTACT_WHATSAPP_URL}) or email ${CHAT_CONTACT_EMAIL}. Visit the Contact page at ${CHAT_CONTACT_PATH} to submit a project inquiry.`;

/** Site FAQ snippets used for assistant fallback when OpenAI is not configured. */
export const CHAT_KNOWLEDGE_BASE: readonly ChatKnowledgeEntry[] = [
  {
    id: "services",
    question: "What services does Commiters offer?",
    answer:
      "Commiters builds full-stack web applications, custom software, generative AI integrations, mobile apps, database platforms, and automation tools. Explore /services or contact us for a scoped proposal.",
    keywords: ["service", "website", "web", "mobile", "mvp", "ai", "automation", "ecommerce", "e-commerce", "build"],
  },
  {
    id: "company",
    question: "Where is Commiters located and what are the operating hours?",
    answer:
      `Commiters is a founder-led engineering studio at ${CHAT_OFFICE_ADDRESS}. The team typically replies within 4 business hours on weekdays. Schedule a studio visit or discovery call through ${CHAT_CONTACT_PATH}. Core values: Innovation First, Quality Delivered, Client Focused, and Async-Friendly.`,
    keywords: ["office", "location", "address", "hours", "operating", "visiting", "udaipur", "studio"],
  },
  {
    id: "process",
    question: "How do you handle project timelines?",
    answer:
      "We work in two-week sprint cycles with discovery, architecture, development, and weekly syncs so milestones stay visible and predictable.",
    keywords: ["timeline", "sprint", "process", "delivery", "milestone", "schedule"],
  },
  {
    id: "handoff",
    question: "What does handoff look like?",
    answer:
      "You receive full source ownership, documentation, and CI/CD setup, plus a 30-day post-launch support window for a smooth transition.",
    keywords: ["handoff", "documentation", "support", "source", "ownership"],
  },
  {
    id: "stack",
    question: "What is your technology stack?",
    answer:
      "Our core stack includes TypeScript, React, Node.js, MongoDB, PostgreSQL, and cloud-native deployment on modern hosting platforms.",
    keywords: ["stack", "technology", "tech", "react", "typescript", "mongodb"],
  },
  {
    id: "contact",
    question: "How can I contact Commiters?",
    answer: CONTACT_ANSWER,
    keywords: ["contact", "email", "whatsapp", "call", "discovery", "reach", "hello", "number", "page"],
  },
  {
    id: "portfolio",
    question: "What projects has Commiters worked on?",
    answer:
      `Commiters has shipped custom web platforms, e-commerce solutions, local business automation, hospitality tools such as TrustTap, and MVPs. Explore case studies on ${CHAT_PORTFOLIO_PATH}.`,
    keywords: ["portfolio", "project", "projects", "work", "case", "study", "hospitality", "mvp"],
  },
  {
    id: "careers",
    question: "Are you hiring?",
    answer:
      `Open roles are listed at ${CHAT_CAREERS_PATH}. Apply for a listed position or submit a resume through ${CHAT_JOIN_US_PATH}.`,
    keywords: ["career", "job", "hiring", "intern", "apply", "open", "position", "join", "resume"],
  },
  {
    id: "pricing",
    question: "How does pricing work?",
    answer:
      `Pricing depends on scope, timeline, and engagement model. Share your project goals at ${CHAT_CONTACT_PATH} and we will recommend a fit-for-purpose estimate.`,
    keywords: ["price", "pricing", "cost", "budget", "estimate", "quote"],
  },
];

export const CHAT_DEFAULT_GREETING =
  `Hi! I'm ${CHAT_ASSISTANT_NAME}. Ask about our services, portfolio, careers, or how to start a project.`;

export const CHAT_FALLBACK_REPLY =
  `I can help with services, portfolio, careers, and contact options. Email ${CHAT_CONTACT_EMAIL}, WhatsApp ${CHAT_CONTACT_WHATSAPP_DISPLAY}, or visit ${CHAT_CONTACT_PATH}.`;
