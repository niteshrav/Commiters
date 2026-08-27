import { validateEmail } from "./contactValidation";
import { HOME_LEAD_MAGNET_COPY } from "./homeLeadMagnetContent";

export type HomeLeadMagnetPayload = {
  name: string;
  email: string;
  serviceNeeded: string;
  timeline: string;
  message: string;
};

export function validateHomeLeadMagnetEmail(
  email: string,
): { ok: true; payload: HomeLeadMagnetPayload } | { ok: false; error: string } {
  const emailError = validateEmail(email);
  if (emailError) return { ok: false, error: emailError };

  return {
    ok: true,
    payload: {
      name: HOME_LEAD_MAGNET_COPY.subscriberName,
      email: email.trim(),
      serviceNeeded: HOME_LEAD_MAGNET_COPY.serviceNeeded,
      timeline: HOME_LEAD_MAGNET_COPY.timeline,
      message: HOME_LEAD_MAGNET_COPY.requestMessage,
    },
  };
}
