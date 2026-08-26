import {
  CHAT_ASSISTANT_NAME,
  CHAT_DEFAULT_GREETING,
  CHAT_FALLBACK_REPLY,
  CHAT_KNOWLEDGE_BASE,
  type ChatKnowledgeEntry,
} from "./chatKnowledge";
import {
  isOutOfScopeUserMessage,
  resolveOutOfScopeReply,
  tokenizeForChat,
} from "./chatScope";

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

export type ChatAnswer = {
  reply: string;
  source: "openai" | "faq" | "static";
};

function tokenize(text: string): string[] {
  return tokenizeForChat(text);
}

function scoreEntry(messageTokens: string[], entry: ChatKnowledgeEntry): number {
  const questionTokens = tokenizeForChat(entry.question);
  let score = 0;

  for (const token of messageTokens) {
    if (entry.keywords.some((keyword) => keyword.includes(token) || token.includes(keyword))) {
      score += 2;
      continue;
    }
    if (questionTokens.some((word) => word === token || word.includes(token) || token.includes(word))) {
      score += 1;
    }
  }

  return score;
}

export function findFaqAnswer(message: string): ChatKnowledgeEntry | null {
  if (isOutOfScopeUserMessage(message)) {
    return null;
  }

  const tokens = tokenize(message);
  if (tokens.length === 0) return null;

  let best: ChatKnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of CHAT_KNOWLEDGE_BASE) {
    const score = scoreEntry(tokens, entry);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 2 ? best : null;
}

export function answerFromKnowledgeBase(message: string): ChatAnswer {
  if (isOutOfScopeUserMessage(message)) {
    return { reply: resolveOutOfScopeReply(message), source: "static" };
  }

  const match = findFaqAnswer(message);
  if (match) {
    return { reply: match.answer, source: "faq" };
  }
  return { reply: CHAT_FALLBACK_REPLY, source: "static" };
}

export function isOpenAiChatConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  return Boolean(env.OPENAI_API_KEY?.trim());
}

function getOpenAiModel(env: NodeJS.ProcessEnv = process.env): string {
  return env.OPENAI_CHAT_MODEL?.trim() || "gpt-4o-mini";
}

function buildSystemPrompt(): string {
  const faqContext = CHAT_KNOWLEDGE_BASE.map((entry) => `Q: ${entry.question}\nA: ${entry.answer}`).join("\n\n");
  return [
    `You are ${CHAT_ASSISTANT_NAME}, the Commiters website assistant for a software studio in Udaipur, India.`,
    "Only answer questions about Commiters: services, delivery process, careers, pricing, contact, and starting a project.",
    "If a question is general, unrelated, or outside Commiters (for example office visiting hours, weather, jokes, homework, or broad identity questions), politely decline.",
    "Say you can only help with Commiters-related topics and direct visitors to the Contact page or WhatsApp.",
    "Do not invent facts. Do not answer unrelated general knowledge questions.",
    "",
    "Reference knowledge:",
    faqContext,
  ].join("\n");
}

type OpenAiChatResponse = {
  choices?: Array<{ message?: { content?: string } }>;
};

export async function answerWithOpenAi(message: string, history: ChatHistoryItem[] = []): Promise<ChatAnswer> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return answerFromKnowledgeBase(message);
  }

  const recentHistory = history.slice(-6).map((item) => ({
    role: item.role,
    content: item.content.slice(0, 1200),
  }));

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: getOpenAiModel(),
      temperature: 0.4,
      max_tokens: 400,
      messages: [{ role: "system", content: buildSystemPrompt() }, ...recentHistory, { role: "user", content: message }],
    }),
  });

  if (!response.ok) {
    return answerFromKnowledgeBase(message);
  }

  const payload = (await response.json()) as OpenAiChatResponse;
  const reply = payload.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    return answerFromKnowledgeBase(message);
  }

  return { reply, source: "openai" };
}

export async function answerChatMessage(message: string, history: ChatHistoryItem[] = []): Promise<ChatAnswer> {
  const trimmed = message.trim();
  if (!trimmed) {
    return { reply: CHAT_DEFAULT_GREETING, source: "static" };
  }

  if (isOutOfScopeUserMessage(trimmed)) {
    return { reply: resolveOutOfScopeReply(trimmed), source: "static" };
  }

  if (isOpenAiChatConfigured()) {
    try {
      return await answerWithOpenAi(trimmed, history);
    } catch {
      return answerFromKnowledgeBase(trimmed);
    }
  }

  return answerFromKnowledgeBase(trimmed);
}

export { CHAT_DEFAULT_GREETING, CHAT_FALLBACK_REPLY };
