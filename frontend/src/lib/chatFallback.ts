const OUT_OF_SCOPE =
  "I can only help with Commiters-related topics such as our services, delivery process, careers, pricing, and contact options.";

const IDENTITY =
  "I'm the Commiters website assistant. I can help with questions about our software services";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "any",
  "are",
  "ask",
  "at",
  "be",
  "can",
  "could",
  "do",
  "does",
  "for",
  "from",
  "have",
  "how",
  "i",
  "if",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "our",
  "please",
  "tell",
  "that",
  "the",
  "this",
  "to",
  "us",
  "we",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "will",
  "with",
  "you",
  "your",
]);

const TOPIC_SIGNALS = [
  "service",
  "services",
  "website",
  "web",
  "mobile",
  "app",
  "apps",
  "mvp",
  "automation",
  "ai",
  "software",
  "develop",
  "development",
  "build",
  "project",
  "contact",
  "whatsapp",
  "email",
  "career",
  "careers",
  "job",
  "jobs",
  "hiring",
  "hire",
  "intern",
  "apply",
  "commiters",
  "committer",
  "pricing",
  "price",
  "cost",
  "budget",
  "quote",
  "process",
  "delivery",
  "stack",
  "technology",
  "tech",
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function hasTopicSignal(message: string): boolean {
  const lower = message.toLowerCase();
  if (/\bcommiters?\b/.test(lower)) return true;
  const tokens = tokenize(message);
  return tokens.some((token) => TOPIC_SIGNALS.some((signal) => token.includes(signal) || signal.includes(token)));
}

function isIdentityQuestion(message: string): boolean {
  return /\b(who (?:are|is) (?:you|this)|who you are|what (?:are|is) you|who am i talking to|tell me about yourself)\b/i.test(
    message,
  );
}

function isOutOfScope(message: string): boolean {
  if (isIdentityQuestion(message) && !/\bcommiters?\b/i.test(message)) return true;
  if (/\bvisiting hours?\b/i.test(message) || /\boffice hours?\b/i.test(message)) return true;
  return !hasTopicSignal(message);
}

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

export function answerFromLocalKnowledge(message: string): { reply: string; source: "faq" | "static" } {
  if (isOutOfScope(message)) {
    return {
      reply: isIdentityQuestion(message) ? IDENTITY : OUT_OF_SCOPE,
      source: "static",
    };
  }

  const tokens = tokenize(message);
  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const token of tokens) {
      if (entry.keywords.some((keyword) => keyword.includes(token) || token.includes(keyword))) {
        score += 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore >= 2) {
    return { reply: best.answer, source: "faq" };
  }

  return { reply: FALLBACK, source: "static" };
}
