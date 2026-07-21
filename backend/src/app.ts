import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { jobApplicationsRouter } from "./routes/jobApplications";
import { leadsRouter } from "./routes/leads";
import { notificationMediaRouter } from "./routes/notificationMedia";
import { cmsPublicRouter } from "./cms/routes/cmsPublic";
import { adminRouter } from "./cms/routes/admin";
import { getUploadDir } from "./cms/middleware/upload";
import { jobsRouter } from "./routes/jobs";

function normalizeOrigin(origin: string): string {
  return origin.replace(/\/+$/, "");
}

function withLoopbackAliases(origins: string[]): string[] {
  const expanded = new Set(origins.map(normalizeOrigin));
  for (const origin of [...expanded]) {
    try {
      const url = new URL(origin);
      if (url.hostname === "localhost") {
        const alias = new URL(origin);
        alias.hostname = "127.0.0.1";
        expanded.add(normalizeOrigin(alias.toString()));
      } else if (url.hostname === "127.0.0.1") {
        const alias = new URL(origin);
        alias.hostname = "localhost";
        expanded.add(normalizeOrigin(alias.toString()));
      }
    } catch {
      // Ignore malformed origins and keep explicit values only.
    }
  }
  return [...expanded];
}

function withWwwApexAliases(origins: string[]): string[] {
  const expanded = new Set(origins.map(normalizeOrigin));
  for (const origin of [...expanded]) {
    try {
      const url = new URL(origin);
      if (url.hostname.startsWith("www.")) {
        const apex = new URL(origin);
        apex.hostname = url.hostname.slice(4);
        expanded.add(normalizeOrigin(apex.toString()));
      } else if (
        url.hostname !== "localhost" &&
        url.hostname !== "127.0.0.1" &&
        !/^\d+\.\d+\.\d+\.\d+$/.test(url.hostname)
      ) {
        const www = new URL(origin);
        www.hostname = `www.${url.hostname}`;
        expanded.add(normalizeOrigin(www.toString()));
      }
    } catch {
      // Ignore malformed origins and keep explicit values only.
    }
  }
  return [...expanded];
}

function getAllowedCorsOrigins(): string[] {
  const configured = process.env.CORS_ORIGIN?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  if (configured?.length) return withWwwApexAliases(withLoopbackAliases(configured));
  return withLoopbackAliases([
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
  ]);
}

export function createApp() {
  const app = express();
  const allowedOrigins = getAllowedCorsOrigins();

  app.use(helmet());
  app.use(
    cors({
      origin: (requestOrigin, callback) => {
        if (!requestOrigin) return callback(null, true);
        const normalizedOrigin = normalizeOrigin(requestOrigin);
        if (allowedOrigins.includes(normalizedOrigin)) return callback(null, normalizedOrigin);
        return callback(null, false);
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    }),
  );
  app.use(express.json({ limit: "256kb" }));
  app.use(pinoHttp());

  app.use("/uploads", express.static(getUploadDir()));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/cms", cmsPublicRouter);
  app.use("/api/jobs", jobsRouter);
  app.use("/api/admin", adminRouter);

  app.use(leadsRouter);
  app.use(jobApplicationsRouter);
  app.use(notificationMediaRouter);

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const message = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ error: message });
  });

  return app;
}

