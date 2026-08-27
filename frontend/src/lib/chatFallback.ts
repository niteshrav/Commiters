const OUT_OF_SCOPE =
  "I am Node, the digital assistant for Commiters. I am specialized in helping with our software engineering services, portfolio, project inquiries, and careers. I cannot answer general external questions. How can I assist you with your software project today?";

const IDENTITY =
  "I'm Node, the official website AI assistant for Commiters. I help with our software engineering services, portfolio, project inquiries, and careers.";

const INJECTION =
  "I'm Node, the official website AI assistant for Commiters. I can help with our software engineering services, portfolio, project inquiries, and careers. How can I assist you with your software project today?";

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
  "give",
  "has",
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
  "now",
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
  "projects",
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
  "portfolio",
  "work",
  "office",
  "hours",
  "location",
  "operating",
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function tokenMatchesSignal(token: string, signal: string): boolean {
  if (token === signal) return true;
  if (token.length < 5 || signal.length < 5) return false;
  return token.includes(signal) || signal.includes(token);
}

function hasTopicSignal(message: string): boolean {
  const lower = message.toLowerCase();
  if (/\bcommiters?\b/.test(lower)) return true;
  const tokens = tokenize(message);
  return tokens.some((token) => TOPIC_SIGNALS.some((signal) => tokenMatchesSignal(token, signal)));
}

function isIdentityQuestion(message: string): boolean {
  return /\b(who (?:are|is) (?:you|this)|who you are|what (?:are|is) you|who am i talking to|tell me about yourself)\b/i.test(
    message,
  );
}

function isPromptInjection(message: string): boolean {
  return (
    /\bignore (?:all )?(?:previous|prior|above) instructions\b/i.test(message) ||
    /\bpretend you are\b/i.test(message) ||
    /\bDAN mode\b/i.test(message) ||
    /\bshow (?:me )?(?:your )?system (?:prompt|instructions)\b/i.test(message)
  );
}

function isGeneralCurrentTime(message: string): boolean {
  return (
    /\bwhat(?:'s| is) the time(?: now)?\b/i.test(message) ||
    /\bwhat time is it\b/i.test(message) ||
    /\bcurrent time\b/i.test(message)
  );
}

function isOutOfScope(message: string): boolean {
  if (isPromptInjection(message) || isIdentityQuestion(message)) return false;
  if (/\boperating hours?\b/i.test(message) || /\boffice hours?\b/i.test(message) || /\bvisiting hours?\b/i.test(message)) {
    return false;
  }
  if (isGeneralCurrentTime(message) || /\bweather\b/i.test(message) || /\bcapital of\b/i.test(message)) return true;
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
    answer:
      "You can reach our team directly on WhatsApp at +91 9024882899 (https://wa.me/919024882899) or email hello@commiters.com. Visit /contact to send a project inquiry.",
    keywords: ["contact", "email", "whatsapp", "call", "reach", "number", "page"],
  },
  {
    id: "portfolio",
    answer:
      "Commiters has shipped custom web platforms, e-commerce solutions, local business automation, hospitality tools, and MVPs. Explore /work.",
    keywords: ["portfolio", "project", "projects", "work", "case"],
  },
  {
    id: "careers",
    answer: "See /open-positions for current roles, or apply generally through /join-us.",
    keywords: ["career", "job", "hiring", "intern", "apply"],
  },
];

const FALLBACK =
  "I can help with services, portfolio, careers, and contact options. Email hello@commiters.com, WhatsApp +91 9024882899, or visit /contact.";

function tokenHitsKeyword(token: string, keyword: string): boolean {
  if (token === keyword) return true;
  if (token.length < 5 || keyword.length < 5) return false;
  return keyword.includes(token) || token.includes(keyword);
}

export function answerFromLocalKnowledge(message: string): { reply: string; source: "faq" | "static" } {
  if (isPromptInjection(message)) {
    return { reply: INJECTION, source: "static" };
  }
  if (isIdentityQuestion(message)) {
    return { reply: IDENTITY, source: "static" };
  }
  if (isOutOfScope(message)) {
    return { reply: OUT_OF_SCOPE, source: "static" };
  }

  const tokens = tokenize(message);
  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const token of tokens) {
      if (entry.keywords.some((keyword) => tokenHitsKeyword(token, keyword))) {
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
