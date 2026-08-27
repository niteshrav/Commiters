import rateLimit from "express-rate-limit";

export const leadsRateLimit = rateLimit({
  windowMs: Number(process.env.LEADS_RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
  max: Number(process.env.LEADS_RATE_LIMIT_MAX ?? 20),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

export const chatRateLimit = rateLimit({
  windowMs: Number(process.env.CHAT_RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
  max: Number(process.env.CHAT_RATE_LIMIT_MAX ?? 30),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many chat requests. Please try again later." },
});

export const opsFlowRateLimit = rateLimit({
  windowMs: Number(process.env.OPSFLOW_RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
  max: Number(process.env.OPSFLOW_RATE_LIMIT_MAX ?? 20),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many extraction requests. Please try again later." },
});

