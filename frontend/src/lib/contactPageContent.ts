import { COMMITERS_EMAIL_PRIMARY, COMMITERS_PHONE_DISPLAY, buildMailtoPrimaryHref, buildTelHref } from "./siteContact";

/** Contact page studio panel copy from the Stitch screenshot. */
export const CONTACT_STUDIO = {
  title: "Udaipur Engineering Studio",
  addressLines: [
    "82, Sobhagya Nagar,",
    "Nakoda Nagar,",
    "Udaipur, Rajasthan, India",
  ],
  email: COMMITERS_EMAIL_PRIMARY,
  emailHref: buildMailtoPrimaryHref(),
  phone: COMMITERS_PHONE_DISPLAY,
  phoneHref: buildTelHref(),
} as const;
