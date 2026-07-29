import { buildWhatsAppUrl } from "./siteContact";

export const WHATSAPP_FLOATING_ACTION_CLASS = "whatsapp-floating-action" as const;
export const WHATSAPP_FLOATING_ACTION_TEST_ID = "whatsapp-floating-action" as const;
export const WHATSAPP_FLOATING_ACTION_LABEL = "Chat with Commiters on WhatsApp" as const;

export function resolveWhatsAppHref(cmsWhatsappUrl?: string | null): string {
  const trimmed = cmsWhatsappUrl?.trim();
  return trimmed || buildWhatsAppUrl();
}
