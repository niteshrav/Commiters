import {
  CHAT_DEFAULT_GREETING,
  CHAT_FALLBACK_REPLY,
  CHAT_KNOWLEDGE_BASE,
  type ChatKnowledgeEntry,
} from "./chatKnowledge";
import {
  isOutOfScopeUserMessage,
  resolveChatGuardReply,
  tokenizeForChat,
} from "./chatScope";
import { buildChatSystemPrompt } from "./chatSystemPrompt";

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

function tokenHitsKeyword(token: string, keyword: string): boolean {
  if (token === keyword) return true;
  if (token.length < 5 || keyword.length < 5) return false;
  return keyword.includes(token) || token.includes(keyword);
}

function scoreEntry(messageTokens: string[], entry: ChatKnowledgeEntry): number {
  const questionTokens = tokenizeForChat(entry.question);
  let score = 0;

  for (const token of messageTokens) {
    if (entry.keywords.some((keyword) => tokenHitsKeyword(token, keyword))) {
      score += 2;
      continue;
    }
    if (questionTokens.some((word) => word === token)) {
      score += 1;
    }
  }

  return score;
}

export function findFaqAnswer(message: string): ChatKnowledgeEntry | null {
  if (resolveChatGuardReply(message) || isOutOfScopeUserMessage(message)) {
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
  const guard = resolveChatGuardReply(message);
  if (guard) {
    return { reply: guard, source: "static" };
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

export function buildSystemPrompt(): string {
  const faqContext = CHAT_KNOWLEDGE_BASE.map((entry) => `Q: ${entry.question}\nA: ${entry.answer}`).join("\n\n");
  return `${buildChatSystemPrompt()}\n\nReference knowledge:\n${faqContext}`;
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

  const guard = resolveChatGuardReply(trimmed);
  if (guard) {
    return { reply: guard, source: "static" };
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
