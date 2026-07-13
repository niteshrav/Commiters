import { COOKIE_CATEGORY_CARDS } from "./cookiePageContent";
import { ROUTES } from "./routes";
import { STITCH_COPY } from "./stitchDesign";
import type { OptionalCookieCategory } from "./cookieConsentStorage";

export type CookiePreferenceOption = {
  id: OptionalCookieCategory;
  label: string;
  description: string;
  required: false;
};

export type CookieNecessaryOption = {
  id: "necessary";
  label: string;
  description: string;
  required: true;
};

export type CookiePreferenceRow = CookiePreferenceOption | CookieNecessaryOption;

export const COOKIE_CONSENT_BANNER_COPY = {
  title: STITCH_COPY.cookie.consentBanner.title,
  description: STITCH_COPY.cookie.consentBanner.description,
  acceptAllLabel: STITCH_COPY.cookie.consentBanner.acceptAllLabel,
  essentialOnlyLabel: STITCH_COPY.cookie.consentBanner.essentialOnlyLabel,
  manageLabel: STITCH_COPY.cookie.consentBanner.manageLabel,
  policyLinkLabel: STITCH_COPY.cookie.consentBanner.policyLinkLabel,
  policyHref: ROUTES.cookiePolicy,
} as const;

export const COOKIE_PREFERENCES_PANEL_COPY = {
  title: STITCH_COPY.cookie.preferencesPanel.title,
  description: STITCH_COPY.cookie.preferencesPanel.description,
  saveLabel: STITCH_COPY.cookie.preferencesPanel.saveLabel,
  cancelLabel: STITCH_COPY.cookie.preferencesPanel.cancelLabel,
  necessaryStatusLabel: STITCH_COPY.cookie.preferencesPanel.necessaryStatusLabel,
} as const;

const necessaryCard = COOKIE_CATEGORY_CARDS.find((card) => card.variant === "necessary")!;
const performanceCard = COOKIE_CATEGORY_CARDS.find((card) => card.variant === "performance")!;
const functionalCard = COOKIE_CATEGORY_CARDS.find((card) => card.variant === "functional")!;
const targetingCard = COOKIE_CATEGORY_CARDS.find((card) => card.variant === "targeting")!;

export const COOKIE_PREFERENCE_ROWS: readonly CookiePreferenceRow[] = [
  {
    id: "necessary",
    label: necessaryCard.label,
    description: necessaryCard.description,
    required: true,
  },
  {
    id: "performance",
    label: performanceCard.label,
    description: performanceCard.description,
    required: false,
  },
  {
    id: "functional",
    label: functionalCard.label,
    description: functionalCard.description,
    required: false,
  },
  {
    id: "targeting",
    label: targetingCard.label,
    description: targetingCard.description,
    required: false,
  },
] as const;
