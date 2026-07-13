import { ROUTES } from "./routes";
import { STITCH_COPY } from "./stitchDesign";

export type CookieCategoryVariant = "necessary" | "performance" | "functional" | "targeting";

export type CookieCategoryCard = {
  variant: CookieCategoryVariant;
  label: string;
  description: string;
};

export type CookiePolicyNavItem = {
  id: string;
  label: string;
};

export type CookiePolicySection = {
  number: number;
  id: string;
  title: string;
  body?: string;
  intro?: string;
};

export const COOKIE_PAGE_COPY = {
  kicker: STITCH_COPY.cookie.kicker,
  title: STITCH_COPY.cookie.title,
  lastUpdatedLabel: STITCH_COPY.cookie.lastUpdatedLabel,
  lastUpdatedDate: STITCH_COPY.cookie.lastUpdatedDate,
} as const;

export const COOKIE_POLICY_NAV: readonly CookiePolicyNavItem[] = [
  { id: "what-are-cookies", label: "What are Cookies" },
  { id: "how-we-use-cookies", label: "How We Use Them" },
  { id: "types-of-cookies", label: "Types of Cookies" },
  { id: "managing-preferences", label: "Managing Preferences" },
] as const;

export const COOKIE_POLICY_SECTIONS: readonly CookiePolicySection[] = [
  {
    number: 1,
    id: "what-are-cookies",
    title: "What are cookies?",
    body: "Cookies are small text files stored on your device when you visit a website. They help websites work efficiently and provide reporting information. Commiters Softwares uses cookies to improve your experience on our site.",
  },
  {
    number: 2,
    id: "how-we-use-cookies",
    title: "How we use cookies",
    intro:
      "We use cookies to understand how visitors interact with our website, remember your preferences, and deliver a secure, reliable experience. The categories below describe how each type supports our services.",
  },
] as const;

export const COOKIE_CATEGORY_CARDS: readonly CookieCategoryCard[] = [
  {
    variant: "necessary",
    label: "STRICTLY NECESSARY",
    description:
      "These cookies are essential for security, network management, and accessibility. They cannot be switched off in our systems.",
  },
  {
    variant: "performance",
    label: "PERFORMANCE",
    description:
      "These cookies count visits and traffic sources anonymously so we can measure and improve site performance.",
  },
  {
    variant: "functional",
    label: "FUNCTIONAL",
    description:
      "These cookies enable enhanced functionality such as language preferences and personalized content.",
  },
  {
    variant: "targeting",
    label: "TARGETING",
    description:
      "These cookies may be set by advertising partners to build interest profiles and show relevant ads on other sites.",
  },
] as const;

export const COOKIE_MANAGE_CTA = {
  title: STITCH_COPY.cookie.manageCta.title,
  description: STITCH_COPY.cookie.manageCta.description,
  buttonLabel: STITCH_COPY.cookie.manageCta.buttonLabel,
  privacyLinkLabel: STITCH_COPY.cookie.manageCta.privacyLinkLabel,
  privacyHref: ROUTES.privacyPolicy,
} as const;

export const COOKIE_POLICY_DISCLAIMER = STITCH_COPY.cookie.disclaimer;
