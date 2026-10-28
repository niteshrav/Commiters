import type { ComponentType, SVGProps } from "react";
import {
  IconBolt,
  IconDevicePhone,
  IconMedal,
  IconShieldCheck,
} from "../components/icons";
import { ROUTES } from "./routes";
import { BRAND_HERO_EYEBROW_TEXT } from "./siteBrandChrome";

export const TRUSTTAP_LIVE_URL = "https://trusttap.commiters.com/" as const;
export const TRUSTTAP_DOCUMENT_TITLE = "Prooflyn";
export const TRUSTTAP_SEO = {
  title: TRUSTTAP_DOCUMENT_TITLE,
  description:
    "Smart NFC/QR touchpoints that scale 5-star Google reviews while intercepting customer complaints privately.",
  keywords:
    "Prooflyn, trustTap, NFC, QR, Google reviews, merchant reputation, sentiment routing, merchant intelligence, Commiters product",
  path: ROUTES.trustTap,
} as const;

export const TRUSTTAP_ADMIN_DASHBOARD_URL = "https://trusttap.commiters.com/admin" as const;

export const TRUSTTAP_HERO = {
  kicker: BRAND_HERO_EYEBROW_TEXT,
  title: "Engineering Public Trust at the Point of Service.",
  tagline:
    "Smart NFC/QR touchpoints that scale 5-star Google reviews while intercepting customer complaints privately.",
  footnote: "NFC hardware. Private grievance interception. Weekly merchant intelligence.",
  primaryLabel: "Deploy Prooflyn",
  primaryHref: ROUTES.contact,
  secondaryLabel: "Launch Merchant Portal",
  secondaryHref: TRUSTTAP_LIVE_URL,
  chips: [
    { id: "nfc", label: "NFC Touchpoint Hardware" },
    { id: "routing", label: "Private Grievance Interception" },
    { id: "digests", label: "Weekly Merchant Intelligence" },
  ],
} as const;

/** Hero right column — trustTap product marketing visual. */
export const TRUSTTAP_HERO_SHOWCASE = {
  ariaLabel: "Prooflyn marketing visual with QR stand, mobile feedback flow, analytics dashboard, and updated brand logo",
  image: {
    src: "/assets/trusttap/prooflyn-hero-v10.png",
    srcSet:
      "/assets/trusttap/prooflyn-hero-v10.png 1x, /assets/trusttap/prooflyn-hero-v10@2x.png 2x",
    alt: "Prooflyn — Happy customers, stronger business. QR feedback, Google review path, live dashboard, and private customer notes for local businesses",
    width: 1024,
    height: 682,
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
  kicker: "CORE PILLARS",
  title: "Built for Modern Merchants",
  items: [
    {
      id: "private-feedback",
      index: "01",
      title: "Automated Sentiment Routing",
      body: "Routes positive taps directly to Google Reviews and private feedback straight to management.",
    },
    {
      id: "qr",
      index: "02",
      title: "On-Premise Tap Hardware",
      body: "Architectural-grade NFC & QR counter stands for billing desks and tables.",
    },
    {
      id: "owner-alerts",
      index: "03",
      title: "Merchant Intelligence Digests",
      body: "Weekly and monthly email reports with clear staff performance action items.",
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
  title: "The Prooflyn Advantage",
  items: [
    {
      id: "google-proof",
      title: "Scale Authentic Google Proof",
      body: "Transform physical customer volume into a self-sustaining engine of 5-star public ratings.",
    },
    {
      id: "friction",
      title: "Private Friction Interception",
      body: "Resolve service failures internally on-site before they become public search liabilities.",
    },
    {
      id: "benchmarks",
      title: "Data-Driven Staff Benchmarks",
      body: "Turn recurring customer feedback into clear weekly action items for team leadership.",
    },
    {
      id: "nfc-touchpoint",
      title: "Zero-Friction NFC Touchpoint",
      body: "Instant tap interaction powered natively by iOS & Android with zero app downloads required.",
    },
  ] satisfies TrustTapBenefit[],
} as const;

export const TRUSTTAP_HOW_IT_WORKS = {
  kicker: "HOW IT WORKS",
  title: "How It Works",
  steps: [
    {
      index: "01",
      title: "Connect",
      body: "Link your Google Business profile.",
    },
    {
      index: "02",
      title: "Anchor",
      body: "Place NFC hardware at customer touchpoints.",
    },
    {
      index: "03",
      title: "Scale",
      body: "Watch 5-star reviews grow while acting on weekly reports.",
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
  subtext: "Answers on reputation routing, executive digests, and merchant hardware.",
  items: [
    {
      id: "reputation",
      question: "How does Prooflyn protect merchant reputation?",
      answer:
        "Prooflyn provides a dual-action experience: satisfied customers are guided straight to public rating platforms, while private channels allow management to handle grievances internally.",
    },
    {
      id: "digest",
      question: "What is included in the Weekly & Monthly Executive Digest?",
      answer:
        "Merchants receive structured reports summarizing total touchpoint scans, public conversion metrics, private issue resolution logs, and prioritized operational action items.",
    },
  ] satisfies TrustTapFaqItem[],
} as const;

export const TRUSTTAP_PORTAL_BANNER = {
  title: "Need deep platform specs & live dashboard previews?",
  subtext: "Explore our dedicated merchant portal for hardware options, enterprise tiers, and live demo access.",
  ctaLabel: "Explore Dedicated Platform",
  href: TRUSTTAP_LIVE_URL,
} as const;

export const TRUSTTAP_BOTTOM_CTA = {
  title: "Ready to protect and grow your on-premise reputation?",
  subtext: "Deploy Prooflyn hardware today or access our live merchant suite.",
  primaryLabel: "Deploy Prooflyn",
  primaryHref: ROUTES.contact,
  secondaryLabel: "Access Merchant Hub",
  secondaryHref: TRUSTTAP_LIVE_URL,
} as const;

export const TRUSTTAP_ABOUT = {
  kicker: "ABOUT",
  title: "Built for the point of service, not a slide deck.",
  body: "Prooflyn is an enterprise on-premise sentiment system: NFC and QR touchpoints intercept friction privately while converting peak satisfaction into verified Google proof.",
  illustration: {
    src: "/assets/trusttap/trusttap-hero-showcase.png",
    srcSet:
      "/assets/trusttap/trusttap-hero-showcase.png 1x, /assets/trusttap/trusttap-hero-showcase@2x.png 2x",
    alt: "Prooflyn product console with QR stand, mobile scan flow, and operations dashboard",
    width: 1024,
    height: 682,
  },
} as const;

export const TRUSTTAP_PREVIEW = {
  kicker: "PRODUCT PREVIEW",
  title: "See the feedback loop in one glance.",
  subtext: "QR stand, live dashboard, and location coverage — the same surfaces owners use after a visit.",
  shots: [
    {
      id: "qr",
      src: "/assets/trusttap/trusttap-qr-preview.svg",
      alt: "Prooflyn QR stand for in-store feedback",
      caption: "QR stand",
    },
    {
      id: "dashboard",
      src: "/assets/trusttap/trusttap-dashboard-preview.svg",
      alt: "Prooflyn owner dashboard preview",
      caption: "Live dashboard",
    },
    {
      id: "locations",
      src: "/assets/trusttap/trusttap-locations-preview.svg",
      alt: "Prooflyn multi-location coverage preview",
      caption: "Locations",
    },
  ],
} as const;
