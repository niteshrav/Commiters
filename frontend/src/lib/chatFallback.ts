export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

type KnowledgeEntry = {
  id: string;
  answer: string;
  keywords: string[];
};

const KNOWLEDGE: readonly KnowledgeEntry[] = [
  {
    id: "services",
    answer:
      "Commiters builds websites, web apps, mobile apps, e-commerce, automation tools, AI integrations, and MVPs.",
    keywords: ["service", "website", "web", "mobile", "mvp", "ai", "automation", "build"],
  },
  {
    id: "contact",
    answer: "Use the Contact page to submit an inquiry, book a discovery call, or message us on WhatsApp.",
    keywords: ["contact", "email", "whatsapp", "call", "reach"],
  },
  {
    id: "careers",
    answer: "See Open Positions for current roles, or apply generally through Join Us.",
    keywords: ["career", "job", "hiring", "intern", "apply"],
  },
];

const FALLBACK =
  "I can help with services, process, careers, and contact options. Visit the Contact page for a detailed conversation.";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

export function answerFromLocalKnowledge(message: string): { reply: string; source: "faq" | "static" } {
  const tokens = tokenize(message);
  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const token of tokens) {
      if (entry.keywords.some((keyword) => keyword.includes(token) || token.includes(keyword))) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore > 0) {
    return { reply: best.answer, source: "faq" };
  }

  return { reply: FALLBACK, source: "static" };
}
