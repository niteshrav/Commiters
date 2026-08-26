import { getApiBaseUrl } from "./siteRuntime";
import { answerFromLocalKnowledge, type ChatHistoryItem } from "./chatFallback";

export type ChatAnswer = {
  reply: string;
  source: "openai" | "faq" | "static";
};

export async function sendChatMessage(message: string, history: ChatHistoryItem[] = []): Promise<ChatAnswer> {
  const apiBase = getApiBaseUrl();
  if (!apiBase) {
    return answerFromLocalKnowledge(message);
  }

  try {
    const res = await fetch(`${apiBase}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ message, history }),
    });

    if (!res.ok) {
      return answerFromLocalKnowledge(message);
    }

    return (await res.json()) as ChatAnswer;
  } catch {
    return answerFromLocalKnowledge(message);
  }
}
