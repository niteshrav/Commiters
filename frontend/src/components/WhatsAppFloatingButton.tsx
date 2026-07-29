import { useContactStudioContent } from "../lib/cms/hooks";
import { IconWhatsApp } from "./icons";
import {
  WHATSAPP_FLOATING_ACTION_CLASS,
  WHATSAPP_FLOATING_ACTION_LABEL,
  WHATSAPP_FLOATING_ACTION_TEST_ID,
  resolveWhatsAppHref,
} from "../lib/whatsappFloatingAction";

export default function WhatsAppFloatingButton() {
  const studio = useContactStudioContent();
  const href = resolveWhatsAppHref(studio.whatsappUrl);

  return (
    <a
      className={WHATSAPP_FLOATING_ACTION_CLASS}
      data-testid={WHATSAPP_FLOATING_ACTION_TEST_ID}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={WHATSAPP_FLOATING_ACTION_LABEL}
      title={WHATSAPP_FLOATING_ACTION_LABEL}
    >
      <IconWhatsApp width={28} height={28} aria-hidden />
    </a>
  );
}
