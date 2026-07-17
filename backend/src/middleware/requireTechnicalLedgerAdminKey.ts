import { Request, Response, NextFunction } from "express";

export function requireTechnicalLedgerAdminKey(req: Request, res: Response, next: NextFunction) {
  const configured = process.env.TECHNICAL_LEDGER_ADMIN_KEY?.trim();
  if (!configured) {
    return res.status(503).json({
      error: "Technical Ledger publishing is not configured on the server.",
    });
  }

  const provided = req.header("x-technical-ledger-admin-key")?.trim();
  if (!provided || provided !== configured) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  return next();
}
