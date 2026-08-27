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

  it("returns official WhatsApp and email details for contact questions", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/chat")
      .set("Content-Type", "application/json")
      .send({ message: "give your whatsapp number" });

    expect(res.status).toBe(200);
    expect(res.body.reply).toMatch(/\+91 9024882899/);
    expect(res.body.reply).toMatch(/hello@commiters\.com/);
    expect(res.body.reply).toMatch(/\/contact/);
  });

  it("refuses general external questions with the Node out-of-scope reply", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/chat")
      .set("Content-Type", "application/json")
      .send({ message: "What is the time now?" });

    expect(res.status).toBe(200);
    expect(res.body.source).toBe("static");
    expect(res.body.reply).toMatch(/I am Node, the digital assistant for Commiters/);
    expect(res.body.reply).not.toMatch(/sprint/i);
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
