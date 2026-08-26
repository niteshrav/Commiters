import { CHAT_ASSISTANT_NAME } from "./chatKnowledge";

export const CHAT_OUT_OF_SCOPE_REPLY =
  "I can only help with Commiters-related topics such as our services, delivery process, careers, pricing, and contact options. For anything outside that scope, please visit our Contact page or message us on WhatsApp.";

export const CHAT_SCOPE_IDENTITY_REPLY = `I'm ${CHAT_ASSISTANT_NAME}, the Commiters website assistant. I can help with questions about our software services, how we work, open roles, and how to reach the team—not general topics outside Commiters.`;

/** Tokens ignored when matching FAQ entries or topic signals. */
export const CHAT_STOP_WORDS = new Set([
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

export const CHAT_TOPIC_SIGNALS = [
  "commiters",
  "committer",
  "service",
  "services",
  "website",
  "web",
  "mobile",
  "app",
  "apps",
  "application",
  "mvp",
  "saas",
  "ecommerce",
  "commerce",
  "automation",
  "integration",
  "integrations",
  "ai",
  "software",
  "develop",
  "development",
  "build",
  "project",
  "timeline",
  "sprint",
  "process",
  "delivery",
  "handoff",
  "documentation",
  "stack",
  "technology",
  "tech",
  "react",
  "node",
  "typescript",
  "mongodb",
  "pricing",
  "price",
  "cost",
  "budget",
  "quote",
  "estimate",
  "contact",
  "whatsapp",
  "email",
  "discovery",
  "call",
  "career",
  "careers",
  "job",
  "jobs",
  "hiring",
  "hire",
  "intern",
  "internship",
  "apply",
  "application",
  "portfolio",
  "work",
  "case",
  "study",
  "testimonial",
  "faq",
  "udaipur",
  "studio",
  "engineering",
  "proposal",
  "consult",
  "consultation",
] as const;

const OUT_OF_SCOPE_PATTERNS: RegExp[] = [
  /\bvisiting hours?\b/i,
  /\boffice hours?\b/i,
  /\bopening hours?\b/i,
  /\bwhat time (?:do you|are you) open\b/i,
  /\bwhen (?:are you|is the office) open\b/i,
  /\bweather\b/i,
  /\btell me a joke\b/i,
  /\bwho (?:are|is) (?:you|this)\b/i,
  /\bwho you are\b/i,
  /\bwhat (?:are|is) you\b/i,
  /\bwhat can you do\b/i,
  /\bwho am i talking to\b/i,
  /\bcapital of\b/i,
  /\bnews\b/i,
  /\brecipe\b/i,
  /\bmath problem\b/i,
  /\bsolve this\b/i,
];

export function tokenizeForChat(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !CHAT_STOP_WORDS.has(token));
}

export function hasCommitersTopicSignal(message: string): boolean {
  const lower = message.toLowerCase();
  if (/\bcommiters?\b/.test(lower)) return true;

  const tokens = tokenizeForChat(message);
  return tokens.some((token) =>
    CHAT_TOPIC_SIGNALS.some((signal) => token.includes(signal) || signal.includes(token)),
  );
}

export function isIdentityQuestion(message: string): boolean {
  return /\b(who (?:are|is) (?:you|this)|who you are|what (?:are|is) you|who am i talking to|tell me about yourself)\b/i.test(
    message,
  );
}

export function isOutOfScopeUserMessage(message: string): boolean {
  const trimmed = message.trim();
  if (!trimmed) return false;

  if (isIdentityQuestion(trimmed) && !/\bcommiters?\b/i.test(trimmed)) {
    return true;
  }

  if (OUT_OF_SCOPE_PATTERNS.some((pattern) => pattern.test(trimmed))) {
    return !/\bcommiters?\b/i.test(trimmed);
  }

  return !hasCommitersTopicSignal(trimmed);
}

export function resolveOutOfScopeReply(message: string): string {
  if (isIdentityQuestion(message)) {
    return CHAT_SCOPE_IDENTITY_REPLY;
  }
  return CHAT_OUT_OF_SCOPE_REPLY;
}
