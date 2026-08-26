import { Request, Response } from "express";
import { z } from "zod";
import { answerChatMessage } from "../lib/chatService";

const historyItemSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const chatSchema = z.object({
  message: z.string().trim().min(1).max(1000),
  history: z.array(historyItemSchema).max(12).optional(),
});

export async function postChatMessage(req: Request, res: Response) {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid chat message.", details: parsed.error.flatten() });
  }

  try {
    const answer = await answerChatMessage(parsed.data.message, parsed.data.history ?? []);
    return res.json(answer);
  } catch (error) {
    req.log?.error({ err: error }, "Chat assistant failed");
    return res.status(503).json({ error: "Chat assistant is temporarily unavailable." });
  }
}
