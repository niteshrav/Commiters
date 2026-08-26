export type ChatKnowledgeEntry = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
};

/** Site FAQ snippets used for assistant fallback when OpenAI is not configured. */
export const CHAT_KNOWLEDGE_BASE: readonly ChatKnowledgeEntry[] = [
  {
    id: "services",
    question: "What services does Commiters offer?",
    answer:
      "Commiters builds websites, web applications, mobile apps, e-commerce platforms, automation tools, AI integrations, and MVPs. Explore the Services page or contact us for a scoped proposal.",
    keywords: ["service", "website", "web", "mobile", "mvp", "ai", "automation", "ecommerce", "e-commerce", "build"],
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
    keywords: ["stack", "technology", "tech", "react", "node", "typescript", "mongodb"],
  },
  {
    id: "contact",
    question: "How can I contact Commiters?",
    answer:
      "Use the Contact page to submit a project inquiry, book a discovery call, or reach us on WhatsApp. We respond to serious project inquiries within one business day.",
    keywords: ["contact", "email", "whatsapp", "call", "discovery", "reach", "hello"],
  },
  {
    id: "careers",
    question: "Are you hiring?",
    answer:
      "Open roles are listed on the Careers page. You can apply for a listed position or send a general application through Join Us.",
    keywords: ["career", "job", "hiring", "intern", "apply", "open position", "join"],
  },
  {
    id: "pricing",
    question: "How does pricing work?",
    answer:
      "Pricing depends on scope, timeline, and engagement model. Share your project goals on the Contact form and we will recommend a fit-for-purpose estimate.",
    keywords: ["price", "pricing", "cost", "budget", "estimate", "quote"],
  },
];

export const CHAT_DEFAULT_GREETING =
  "Hi! I am the Commiters assistant. Ask about our services, process, careers, or how to start a project.";

export const CHAT_FALLBACK_REPLY =
  "I can help with services, delivery process, careers, and contact options. For a detailed answer, visit the Contact page or WhatsApp our team.";
