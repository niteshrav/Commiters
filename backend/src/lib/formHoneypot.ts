/** Hidden contact-form field bots typically fill. Humans leave it empty. */
export const LEAD_HONEYPOT_FIELD = "website" as const;

export function isHoneypotTriggered(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
