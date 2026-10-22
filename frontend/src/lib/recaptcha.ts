const SCRIPT_ID = "google-recaptcha-v3";
export const RECAPTCHA_ACTION = "contact";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function getRecaptchaSiteKey(): string | null {
  const key = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim();
  return key && key.length > 0 ? key : null;
}

export async function loadRecaptcha(): Promise<void> {
  const siteKey = getRecaptchaSiteKey();
  if (!siteKey || typeof document === "undefined") return;
  if (window.grecaptcha) return;

  await new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (window.grecaptcha) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Could not load reCAPTCHA.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load reCAPTCHA."));
    document.head.appendChild(script);
  });
}

export async function getRecaptchaToken(): Promise<string | undefined> {
  const siteKey = getRecaptchaSiteKey();
  if (!siteKey) return undefined;

  await loadRecaptcha();
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha) {
    throw new Error("reCAPTCHA is unavailable. Please try again.");
  }

  await new Promise<void>((resolve) => {
    grecaptcha.ready(() => resolve());
  });

  return grecaptcha.execute(siteKey, { action: RECAPTCHA_ACTION });
}
