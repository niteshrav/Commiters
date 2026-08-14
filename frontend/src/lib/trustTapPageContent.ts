import type { ComponentType, SVGProps } from "react";
import {
  IconBolt,
  IconDevicePhone,
  IconMedal,
  IconShieldCheck,
} from "../components/icons";
import { ROUTES } from "./routes";

export const TRUSTTAP_LIVE_URL = "https://trusttap.commiters.com/" as const;
export const TRUSTTAP_DOCUMENT_TITLE = "TrustTap";
export const TRUSTTAP_SEO = {
  title: TRUSTTAP_DOCUMENT_TITLE,
  description:
    "QR-powered customer feedback that helps local businesses improve service and make Google reviews easy.",
  keywords:
    "TrustTap, Google reviews, QR feedback, reputation management, local business reviews, Commiters product",
  path: ROUTES.trustTap,
} as const;

export const TRUSTTAP_ADMIN_DASHBOARD_URL = "https://trusttap.commiters.com/admin" as const;

export const TRUSTTAP_HERO = {
  kicker: "COMMITERS TRUSTTAP",
  titleLead: "Collect better feedback.",
  titleAccent: "Grow Google reviews.",
  tagline:
    "QR-powered customer feedback for local businesses — private notes for you, an ungated Google review path for everyone.",
  footnote: "Compliant by design — we never gate Google reviews by rating.",
  primaryLabel: "Open admin dashboard",
  primaryHref: TRUSTTAP_ADMIN_DASHBOARD_URL,
  secondaryLabel: "See how it works",
  secondaryHref: "#trusttap-how-it-works",
} as const;

/** Hero right column — TrustTap product marketing visual. */
export const TRUSTTAP_HERO_SHOWCASE = {
  ariaLabel: "TrustTap marketing visual with QR stand, mobile review flow, and analytics dashboard",
  image: {
    src: "/assets/trusttap/trusttap-hero-showcase.png",
    srcSet:
      "/assets/trusttap/trusttap-hero-showcase.png 1x, /assets/trusttap/trusttap-hero-showcase@2x.png 2x",
    alt: "TrustTap product showcase with QR feedback, mobile review form, and live dashboard — Real Reviews, Real Growth",
    width: 560,
    height: 373,
  },
} as const;

export type TrustTapFeatureIcon = "qr" | "private-feedback" | "google-reviews" | "owner-alerts";

const FEATURE_ICONS: Record<TrustTapFeatureIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  qr: IconDevicePhone,
  "private-feedback": IconShieldCheck,
  "google-reviews": IconMedal,
  "owner-alerts": IconBolt,
};

export type TrustTapFeature = {
  id: TrustTapFeatureIcon;
  index: string;
  title: string;
  body: string;
};

export const TRUSTTAP_FEATURES = {
  kicker: "FEATURES",
  title: "Built for real counters",
  subtext: "Everything you need for Phase 1 pilots — without clutter or review-gating dark patterns.",
  items: [
    {
      id: "qr",
      index: "01",
      title: "QR-powered collection",
      body: "Print one QR code. Customers land on a clean mobile page in seconds.",
    },
    {
      id: "private-feedback",
      index: "02",
      title: "Private feedback first",
      body: "Capture honest ratings and comments privately so you can improve faster.",
    },
    {
      id: "google-reviews",
      index: "03",
      title: "Google reviews, ungated",
      body: "Every customer sees the same Google review option. No rating tricks.",
    },
    {
      id: "owner-alerts",
      index: "04",
      title: "Owner alerts",
      body: "Low ratings can trigger email alerts so you can follow up quickly.",
    },
  ] satisfies TrustTapFeature[],
} as const;

export function trustTapFeatureIcon(id: TrustTapFeatureIcon): ComponentType<SVGProps<SVGSVGElement>> {
  return FEATURE_ICONS[id];
}

export type TrustTapBenefit = {
  id: string;
  title: string;
  body: string;
};

export const TRUSTTAP_BENEFITS = {
  kicker: "BENEFITS",
  title: "Why businesses choose it",
  items: [
    {
      id: "reputation",
      title: "Protect reputation",
      body: "Private feedback catches issues early while Google stays open to everyone.",
    },
    {
      id: "professional",
      title: "Look professional",
      body: "Customers land on a trustworthy, branded mobile experience — not a form dump.",
    },
    {
      id: "simple",
      title: "Operate simply",
      body: "Admin tools for businesses, QR export, and feedback logs — no extra apps.",
    },
  ] satisfies TrustTapBenefit[],
} as const;

export const TRUSTTAP_HOW_IT_WORKS = {
  kicker: "HOW IT WORKS",
  title: "Three steps to go live",
  steps: [
    {
      index: "01",
      title: "Create a business",
      body: "Add your Google review link and owner contacts in admin.",
    },
    {
      index: "02",
      title: "Print the QR",
      body: "Download a high-quality PNG and place it at the counter.",
    },
    {
      index: "03",
      title: "Collect & improve",
      body: "Review private feedback and grow your public reputation.",
    },
  ],
} as const;

export type TrustTapFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const TRUSTTAP_FAQ = {
  kicker: "FAQ",
  title: "Frequently asked questions",
  subtext: "Quick answers about compliance, customer flow, and QR setup.",
  items: [
    {
      id: "gate",
      question: "Does TrustTap gate Google reviews by rating?",
      answer:
        "No. Every customer always sees the same Google review option. Private feedback is separate.",
    },
    {
      id: "account",
      question: "Do customers need to create an account?",
      answer: "No. The customer flow is anonymous and mobile-first — scan, rate, done.",
    },
    {
      id: "download",
      question: "Can I download QR codes?",
      answer: "Yes. Each business card in admin includes a one-click PNG download for print.",
    },
    {
      id: "audience",
      question: "Who is this for?",
      answer: "Local businesses that want cleaner feedback loops and easier Google review collection.",
    },
  ] satisfies TrustTapFaqItem[],
} as const;

export const TRUSTTAP_BOTTOM_CTA = {
  title: "Ready to launch your pilot?",
  subtext:
    "Sign in to the admin panel, create a business, download your QR, and start collecting feedback today.",
  primaryLabel: "Launch admin",
  primaryHref: TRUSTTAP_ADMIN_DASHBOARD_URL,
} as const;
