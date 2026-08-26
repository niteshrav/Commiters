import { Router } from "express";
import { postChatMessage } from "../controllers/chatController";
import { chatRateLimit } from "../middleware/rateLimit";
import { requireJson } from "../middleware/requireJson";

export const chatRouter = Router();

chatRouter.post("/api/chat", chatRateLimit, requireJson, postChatMessage);
