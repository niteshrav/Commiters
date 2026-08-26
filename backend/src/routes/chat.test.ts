import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app";

describe("chat API", () => {
  it("returns a FAQ-backed answer for services questions", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/chat")
      .set("Content-Type", "application/json")
      .send({ message: "Do you build mobile apps?" });

    expect(res.status).toBe(200);
    expect(res.body.reply).toMatch(/mobile|website|web/i);
    expect(["faq", "static", "openai"]).toContain(res.body.source);
  });

  it("rejects empty messages", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/chat")
      .set("Content-Type", "application/json")
      .send({ message: "   " });

    expect(res.status).toBe(400);
  });
});
