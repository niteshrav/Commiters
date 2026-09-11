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
    "NFC and QR-based ground verification for logistics, field personnel tracking, and facility inspection auditing.",
  keywords:
    "TrustTap, ground verification, NFC, QR inspection, field tracking, logistics auditing, Commiters product",
  path: ROUTES.trustTap,
} as const;

export const TRUSTTAP_ADMIN_DASHBOARD_URL = "https://trusttap.commiters.com/admin" as const;

export const TRUSTTAP_HERO = {
  kicker: "PROPRIETARY CLOUD PRODUCT",
  titleLead: "TrustTap:",
  titleAccent: "Ground Verification & Physical Inspection Tracking",
  tagline:
    "NFC and QR-based ground verification system for logistics, field personnel tracking, and facility inspection auditing.",
  footnote: "Built for field operations — tamper-proof scans, offline sync, and live ops visibility.",
  primaryLabel: "Request Field Demo",
  primaryHref: ROUTES.contact,
  secondaryLabel: "Explore OpsFlow AI",
  secondaryHref: ROUTES.opsFlow,
} as const;

/** Hero right column — TrustTap product marketing visual. */
export const TRUSTTAP_HERO_SHOWCASE = {
  ariaLabel: "TrustTap marketing visual with QR stand, mobile feedback flow, analytics dashboard, and updated brand logo",
  image: {
    src: "/assets/trusttap/trusttap-hero-marketing.png",
    srcSet:
      "/assets/trusttap/trusttap-hero-marketing.png 1x, /assets/trusttap/trusttap-hero-marketing@2x.png 2x",
    alt: "TrustTap — Tap. Trust. Thrive. QR feedback, Google review path, live dashboard, and private customer notes for local businesses",
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
  kicker: "CAPABILITIES",
  title: "Built for the field",
  subtext: "Core capabilities for logistics, facility inspection, and personnel verification — with zero ambient authority.",
  items: [
    {
      id: "qr",
      index: "01",
      title: "Tamper-Proof Verification",
      body: "NFC tag scanning and geo-fenced QR verification for ground-truth inspection events.",
    },
    {
      id: "private-feedback",
      index: "02",
      title: "Offline-First Mobile Sync",
      body: "Field teams log inspections seamlessly without active cellular coverage, then sync under policy.",
    },
    {
      id: "google-reviews",
      index: "03",
      title: "Live Ops Dashboard",
      body: "Real-time ground status feeds for operations managers with session-scoped access.",
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
  title: "Why operations teams choose it",
  items: [
    {
      id: "reputation",
      title: "Prove presence",
      body: "Tamper-proof NFC and geo-fenced QR scans create an auditable ground-truth trail.",
    },
    {
      id: "professional",
      title: "Work offline",
      body: "Field teams keep logging inspections when coverage drops, then sync under policy.",
    },
    {
      id: "simple",
      title: "See live status",
      body: "Operations managers get real-time ground feeds without ambient data access.",
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
  title: "Ready to verify the ground truth?",
  subtext:
    "Request a field demo for logistics, facility inspection, or personnel tracking — or explore OpsFlow AI for document ingestion.",
  primaryLabel: "Request Field Demo",
  primaryHref: ROUTES.contact,
  secondaryLabel: "Explore OpsFlow AI",
  secondaryHref: ROUTES.opsFlow,
} as const;

export const TRUSTTAP_ABOUT = {
  kicker: "ABOUT",
  title: "Built for the field, not a slide deck.",
  body: "TrustTap gives operations teams NFC and QR ground verification: tamper-proof scans, offline inspection logs, and a live ops dashboard scoped by policy.",
  illustration: {
    src: "/assets/trusttap/trusttap-hero-showcase.png",
    srcSet:
      "/assets/trusttap/trusttap-hero-showcase.png 1x, /assets/trusttap/trusttap-hero-showcase@2x.png 2x",
    alt: "TrustTap product console with QR stand, mobile scan flow, and operations dashboard",
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
      alt: "TrustTap QR stand for in-store feedback",
      caption: "QR stand",
    },
    {
      id: "dashboard",
      src: "/assets/trusttap/trusttap-dashboard-preview.svg",
      alt: "TrustTap owner dashboard preview",
      caption: "Live dashboard",
    },
    {
      id: "locations",
      src: "/assets/trusttap/trusttap-locations-preview.svg",
      alt: "TrustTap multi-location coverage preview",
      caption: "Locations",
    },
  ],
} as const;
