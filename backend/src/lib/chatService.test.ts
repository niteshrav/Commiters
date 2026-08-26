import { describe, expect, it } from "vitest";
import { answerFromKnowledgeBase, findFaqAnswer } from "./chatService";

describe("chatService knowledge base", () => {
  it("matches services questions to the services FAQ entry", () => {
    const match = findFaqAnswer("Do you build mobile apps and websites?");
    expect(match?.id).toBe("services");
  });

  it("matches careers questions to the careers FAQ entry", () => {
    const match = findFaqAnswer("Are you hiring interns?");
    expect(match?.id).toBe("careers");
  });

  it("returns a helpful fallback for unknown questions", () => {
    const answer = answerFromKnowledgeBase("xyzzy completely unknown topic");
    expect(answer.source).toBe("static");
    expect(answer.reply.length).toBeGreaterThan(20);
  });
});
