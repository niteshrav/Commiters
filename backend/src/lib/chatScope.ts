import {
  CHAT_ASSISTANT_NAME,
  CHAT_IDENTITY_REPLY,
  CHAT_INJECTION_REFUSAL,
  CHAT_OUT_OF_SCOPE_REPLY,
} from "./chatSystemPrompt";

export { CHAT_ASSISTANT_NAME, CHAT_IDENTITY_REPLY, CHAT_INJECTION_REFUSAL, CHAT_OUT_OF_SCOPE_REPLY };

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
  "projects",
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
  "office",
  "hours",
  "location",
  "address",
  "operating",
  "visiting",
  "resume",
] as const;

const IN_SCOPE_PATTERNS: RegExp[] = [
  /\boperating hours?\b/i,
  /\boffice hours?\b/i,
  /\bvisiting hours?\b/i,
  /\bwhat time (?:do you|are you) open\b/i,
  /\bwhen (?:are you|is the office) open\b/i,
  /\bwhere (?:are you|is (?:your|the) office)\b/i,
  /\boffice location\b/i,
  /\bhow to (?:go to|reach|open) (?:the )?contact page\b/i,
  /\bwhatsapp number\b/i,
  /\bhow to contact\b/i,
];

const GENERAL_CURRENT_TIME_PATTERNS: RegExp[] = [
  /\bwhat(?:'s| is) the time(?: now)?\b/i,
  /\bwhat time is it\b/i,
  /\bcurrent time\b/i,
  /\btime now\b/i,
];

const OUT_OF_SCOPE_PATTERNS: RegExp[] = [
  ...GENERAL_CURRENT_TIME_PATTERNS,
  /\bweather\b/i,
  /\btell me a joke\b/i,
  /\bcapital of\b/i,
  /\bnews\b/i,
  /\brecipe\b/i,
  /\bmath problem\b/i,
  /\bsolve this\b/i,
  /\bstock market\b/i,
  /\bbitcoin\b/i,
];

const PROMPT_INJECTION_PATTERNS: RegExp[] = [
  /\bignore (?:all )?(?:previous|prior|above) instructions\b/i,
  /\bpretend you are\b/i,
  /\bDAN mode\b/i,
  /\byou are now a general assistant\b/i,
  /\breveal (?:your )?(?:system )?(?:prompt|instructions)\b/i,
  /\bshow (?:me )?(?:your )?system (?:prompt|instructions)\b/i,
];

export function tokenizeForChat(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !CHAT_STOP_WORDS.has(token));
}

function tokenMatchesSignal(token: string, signal: string): boolean {
  if (token === signal) return true;
  if (token.length < 5 || signal.length < 5) return false;
  return token.includes(signal) || signal.includes(token);
}

export function hasCommitersTopicSignal(message: string): boolean {
  const lower = message.toLowerCase();
  if (/\bcommiters?\b/.test(lower)) return true;

  const tokens = tokenizeForChat(message);
  return tokens.some((token) => CHAT_TOPIC_SIGNALS.some((signal) => tokenMatchesSignal(token, signal)));
}

export function isIdentityQuestion(message: string): boolean {
  return /\b(who (?:are|is) (?:you|this)|who you are|what (?:are|is) you|who am i talking to|tell me about yourself)\b/i.test(
    message,
  );
}

export function isPromptInjection(message: string): boolean {
  return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(message));
}

export function isGeneralCurrentTimeQuestion(message: string): boolean {
  return GENERAL_CURRENT_TIME_PATTERNS.some((pattern) => pattern.test(message));
}

export function isOutOfScopeUserMessage(message: string): boolean {
  const trimmed = message.trim();
  if (!trimmed) return false;
  if (isPromptInjection(trimmed) || isIdentityQuestion(trimmed)) return false;
  if (IN_SCOPE_PATTERNS.some((pattern) => pattern.test(trimmed))) return false;
  if (isGeneralCurrentTimeQuestion(trimmed)) return true;
  if (OUT_OF_SCOPE_PATTERNS.some((pattern) => pattern.test(trimmed))) return true;
  return !hasCommitersTopicSignal(trimmed);
}

export function resolveOutOfScopeReply(_message?: string): string {
  return CHAT_OUT_OF_SCOPE_REPLY;
}

export function resolveChatGuardReply(message: string): string | null {
  if (isPromptInjection(message)) return CHAT_INJECTION_REFUSAL;
  if (isIdentityQuestion(message)) return CHAT_IDENTITY_REPLY;
  if (isOutOfScopeUserMessage(message)) return CHAT_OUT_OF_SCOPE_REPLY;
  return null;
}
