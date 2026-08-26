import { describe, expect, it } from "vitest";
import { isOutOfScopeUserMessage, resolveOutOfScopeReply } from "./chatScope";
import { answerFromKnowledgeBase, findFaqAnswer } from "./chatService";

describe("chatScope", () => {
  it("treats identity and visiting-hours questions as out of scope", () => {
    expect(isOutOfScopeUserMessage("Please tell me who you are")).toBe(true);
    expect(isOutOfScopeUserMessage("What are the visiting hours")).toBe(true);
    expect(resolveOutOfScopeReply("Please tell me who you are")).toMatch(/Commiters website assistant/i);
    expect(resolveOutOfScopeReply("What are the visiting hours")).toMatch(/only help with Commiters-related topics/i);
  });

  it("allows Commiters-related questions through", () => {
    expect(isOutOfScopeUserMessage("Do you build mobile apps and websites?")).toBe(false);
    expect(isOutOfScopeUserMessage("Are you hiring interns?")).toBe(false);
    expect(isOutOfScopeUserMessage("How can I contact Commiters?")).toBe(false);
  });
});

describe("chatService knowledge base", () => {
  it("matches services questions to the services FAQ entry", () => {
    const match = findFaqAnswer("Do you build mobile apps and websites?");
    expect(match?.id).toBe("services");
  });

  it("matches careers questions to the careers FAQ entry", () => {
    const match = findFaqAnswer("Are you hiring interns?");
    expect(match?.id).toBe("careers");
  });

  it("denies general questions instead of returning unrelated FAQ answers", () => {
    expect(findFaqAnswer("Please tell me who you are")).toBeNull();
    expect(findFaqAnswer("What are the visiting hours")).toBeNull();

    const identity = answerFromKnowledgeBase("Please tell me who you are");
    expect(identity.source).toBe("static");
    expect(identity.reply).toMatch(/Commiters website assistant/i);
    expect(identity.reply).not.toMatch(/Careers page/i);

    const hours = answerFromKnowledgeBase("What are the visiting hours");
    expect(hours.source).toBe("static");
    expect(hours.reply).toMatch(/only help with Commiters-related topics/i);
    expect(hours.reply).not.toMatch(/websites, web applications/i);
  });

  it("returns a helpful fallback for unknown but in-scope questions", () => {
    const answer = answerFromKnowledgeBase("Can Commiters help with a custom ERP integration?");
    expect(answer.source).toBe("static");
    expect(answer.reply.length).toBeGreaterThan(20);
  });
});
