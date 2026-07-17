import jwt, { type SignOptions } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { isMongoConnected } from "../config/database";

export type AuthPayload = {
  sub: string;
  email: string;
  role: "admin";
};

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) throw new Error("JWT_SECRET is not configured.");
  return secret;
}

export function signAuthToken(payload: AuthPayload): string {
  const expiresIn = (process.env.JWT_EXPIRES_IN?.trim() || "7d") as SignOptions["expiresIn"];
  return jwt.sign(payload, getJwtSecret(), { expiresIn });
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required." });
  }

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as AuthPayload;
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Admin access required." });
    }
    req.auth = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.auth?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required." });
  }
  return next();
}

export function requireMongo(_req: Request, res: Response, next: NextFunction) {
  if (!isMongoConnected()) {
    return res.status(503).json({ error: "CMS database is unavailable." });
  }
  return next();
}
