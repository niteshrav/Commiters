export const RECAPTCHA_MIN_SCORE = 0.5;
export const RECAPTCHA_ACTION = "contact";
const SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export function getRecaptchaSecret(env: NodeJS.ProcessEnv = process.env): string | null {
  const secret = env.RECAPTCHA_SECRET_KEY?.trim() || env.RECAPTCHA_SECRET?.trim();
  return secret && secret.length > 0 ? secret : null;
}

export type RecaptchaVerifyResult = { ok: true } | { ok: false; error: string };

type SiteVerifyResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

export async function verifyRecaptchaToken(
  token: unknown,
  options: { remoteIp?: string; env?: NodeJS.ProcessEnv } = {},
): Promise<RecaptchaVerifyResult> {
  const secret = getRecaptchaSecret(options.env ?? process.env);
  if (!secret) return { ok: true };

  if (typeof token !== "string" || token.trim().length < 20) {
    return { ok: false, error: "reCAPTCHA verification is required." };
  }

  const body = new URLSearchParams({
    secret,
    response: token.trim(),
  });
  if (options.remoteIp) body.set("remoteip", options.remoteIp);

  let payload: SiteVerifyResponse;
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    payload = (await res.json().catch(() => ({}))) as SiteVerifyResponse;
    if (!res.ok) {
      return { ok: false, error: "reCAPTCHA verification failed." };
    }
  } catch {
    return { ok: false, error: "reCAPTCHA verification failed." };
  }

  if (!payload.success) {
    return { ok: false, error: "reCAPTCHA verification failed." };
  }
  if (typeof payload.score === "number" && payload.score < RECAPTCHA_MIN_SCORE) {
    return { ok: false, error: "reCAPTCHA verification failed." };
  }
  if (payload.action && payload.action !== RECAPTCHA_ACTION) {
    return { ok: false, error: "reCAPTCHA verification failed." };
  }
  return { ok: true };
}
