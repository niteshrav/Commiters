import type { NextFunction, Request, Response } from "express";

export const INTERNAL_ADMIN_KEY_HEADER = "x-admin-key" as const;

export function requireInternalAdminKey(req: Request, res: Response, next: NextFunction) {
  const configured = process.env.INTERNAL_ADMIN_KEY?.trim();
  if (!configured) {
    return res.status(503).json({
      error: "Internal access is not configured on the server.",
    });
  }

  const provided = req.header(INTERNAL_ADMIN_KEY_HEADER)?.trim();
  if (!provided || provided !== configured) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  return next();
}
