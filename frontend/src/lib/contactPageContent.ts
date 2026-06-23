import {
  COMMITERS_EMAIL_LEGAL_DISPLAY,
  COMMITERS_PHONE_DISPLAY,
  buildMailtoTeamInboxHref,
  buildTelHref,
} from "./siteContact";

/** Contact page studio panel copy from the Stitch screenshot. */
export const CONTACT_STUDIO = {
  title: "Udaipur Engineering Studio",
  addressLines: [
    "82, Sobhagya Nagar,",
    "Nakoda Nagar,",
    "Udaipur, Rajasthan, India",
  ],
  email: COMMITERS_EMAIL_LEGAL_DISPLAY,
  emailHref: buildMailtoTeamInboxHref(),
  phone: COMMITERS_PHONE_DISPLAY,
  phoneHref: buildTelHref(),
} as const;
