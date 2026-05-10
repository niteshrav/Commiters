/** Primary brand inbox */
export const COMMITERS_EMAIL_PRIMARY = "hello@commiters.com";
/** Secondary inbox (Udaipur / Gmail) */
export const COMMITERS_EMAIL_SECONDARY = "commitersudaipur@gmail.com";

/** Single-line display for contact strip (comma + space). */
export const COMMITERS_EMAIL_STRIP_DISPLAY = `${COMMITERS_EMAIL_PRIMARY}, ${COMMITERS_EMAIL_SECONDARY}`;

/** Default mail client opens with both inboxes — matches backend `teamInboxRecipientsJoined`. */
export function buildMailtoTeamInboxHref(): string {
  return `mailto:${COMMITERS_EMAIL_PRIMARY},${COMMITERS_EMAIL_SECONDARY}`;
}

/** E.164 digits only (India mobile). */
export const COMMITERS_PHONE_E164_DIGITS = "917891646568";

export function buildTelHref(): string {
  return `tel:+${COMMITERS_PHONE_E164_DIGITS}`;
}

/** Default prefilled WhatsApp message — URL-encoded when used in wa.me links. */
export const WHATSAPP_DEFAULT_MESSAGE = `Hi! 👋 Welcome to Commiters — Udaipur's custom software team.

We help businesses Commit, Code & Connect through:
🌐 Websites & Web Apps
📱 Mobile Applications
🤖 AI Tools & Automation
🚀 MVP Development

Tell us a little about your project and we'll get back to you shortly with a free consultation! ✅`;

export function buildWhatsAppUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${COMMITERS_PHONE_E164_DIGITS}?text=${encoded}`;
}
