export type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  secure: boolean;
};

export function isSmtpEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.SMTP_ENABLED === "true";
}

export function resolveSmtpConfig(env: NodeJS.ProcessEnv = process.env): SmtpConfig | null {
  if (!isSmtpEnabled(env)) return null;

  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS?.trim();
  if (!host || !user || !pass) {
    throw new Error("SMTP is enabled but SMTP_HOST, SMTP_USER, or SMTP_PASS is missing.");
  }

  const port = Number(env.SMTP_PORT ?? "587");
  const from = env.SMTP_FROM?.trim() || user;

  return {
    host,
    port,
    user,
    pass,
    from,
    secure: port === 465,
  };
}

export function resolveSmtpConfigOrNull(env: NodeJS.ProcessEnv = process.env): SmtpConfig | null {
  if (!isSmtpEnabled(env)) return null;

  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS?.trim();
  if (!host || !user || !pass) return null;

  return resolveSmtpConfig(env);
}

export function assertProductionEmailDeliveryReady(env: NodeJS.ProcessEnv = process.env): void {
  if (env.NODE_ENV !== "production") return;

  if (!isSmtpEnabled(env)) {
    throw new Error("Production requires SMTP_ENABLED=true so inquiry forms can send email.");
  }

  resolveSmtpConfig(env);
}
