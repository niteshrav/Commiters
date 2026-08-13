import type { ComponentType, SVGProps } from "react";
import {
  IconBolt,
  IconChartLine,
  IconDevicePhone,
  IconMapPin,
  IconMedal,
  IconShieldCheck,
} from "../components/icons";
import { ROUTES } from "./routes";
import { buildDiscoveryCallCalendarUrl } from "./siteContact";
import { pageTitle } from "./siteMeta";

export const TRUSTTAP_DOCUMENT_TITLE = pageTitle("TrustTap");
export const TRUSTTAP_SEO = {
  title: TRUSTTAP_DOCUMENT_TITLE,
  description:
    "TrustTap helps local businesses collect Google reviews with QR codes, manage reputation, and track performance from one dashboard—built by Commiters.",
  keywords:
    "TrustTap, Google reviews, reputation management, QR reviews, local SEO, review collection, Commiters product",
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

/** Hero right column — live QR flow mockup + multi-location accent card. */
export const TRUSTTAP_HERO_SHOWCASE = {
  ariaLabel: "TrustTap customer feedback live preview and multi-location review insights",
  livePreview: {
    src: "/assets/trusttap/trusttap-qr-preview.svg",
    alt: "TrustTap mobile review flow with Google review, private feedback, and scan-to-open QR",
    width: 640,
    height: 400,
  },
  accent: {
    src: "/assets/trusttap/trusttap-locations-preview.svg",
    alt: "",
    width: 640,
    height: 400,
  },
  browserChromeUrl: "trusttap.commiters.com/r/cafe-edelweiss",
} as const;

export const TRUSTTAP_ABOUT = {
  kicker: "ABOUT",
  title: "Reputation growth, simplified",
  body:
    "TrustTap is Commiters’ product for local and multi-location brands that want a compliant, measurable review funnel—without juggling spreadsheets or generic survey tools.",
  illustration: {
    src: "/assets/case-studies/trusttap@2x.png",
    srcSet: "/assets/case-studies/trusttap.png 1x, /assets/case-studies/trusttap@2x.png 2x",
    alt: "TrustTap reputation dashboard showing review growth charts, location scores, and QR review collection",
    width: 1024,
    height: 1018,
  },
} as const;

export type TrustTapFeatureIcon =
  | "reviews"
  | "reputation"
  | "qr"
  | "analytics"
  | "locations"
  | "notifications";

const FEATURE_ICONS: Record<TrustTapFeatureIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  reviews: IconMedal,
  reputation: IconShieldCheck,
  qr: IconDevicePhone,
  analytics: IconChartLine,
  locations: IconMapPin,
  notifications: IconBolt,
};

export type TrustTapFeature = {
  id: TrustTapFeatureIcon;
  title: string;
  body: string;
};

export const TRUSTTAP_FEATURES = {
  kicker: "FEATURES",
  title: "Everything you need to earn trust at scale",
  items: [
    {
      id: "reviews",
      title: "Customer Reviews",
      body: "Capture authentic Google reviews right after a great experience with guided prompts and smart timing.",
    },
    {
      id: "reputation",
      title: "Reputation Management",
      body: "Monitor ratings, respond faster, and spot trends before they affect foot traffic or conversions.",
    },
    {
      id: "qr",
      title: "QR Review Collection",
      body: "Place QR codes at checkout, tables, or receipts—customers scan once and land on the right review flow.",
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      body: "Track review velocity, location benchmarks, and campaign performance in a single clean workspace.",
    },
    {
      id: "locations",
      title: "Multi-location Support",
      body: "Roll out consistent branding and workflows across franchises while giving each site local control.",
    },
    {
      id: "notifications",
      title: "Notifications",
      body: "Get alerts for new reviews, dips in rating, or locations that need a follow-up—on web and mobile.",
    },
  ] satisfies TrustTapFeature[],
} as const;

export function trustTapFeatureIcon(id: TrustTapFeatureIcon): ComponentType<SVGProps<SVGSVGElement>> {
  return FEATURE_ICONS[id];
}

export const TRUSTTAP_BENEFITS = {
  kicker: "BENEFITS",
  title: "Why teams choose TrustTap",
  items: [
    "Increase Google Reviews",
    "Build Customer Trust",
    "Improve Local SEO",
    "Easy Setup",
    "Better Customer Engagement",
  ],
} as const;

export const TRUSTTAP_HOW_IT_WORKS = {
  kicker: "HOW IT WORKS",
  title: "Live in three focused steps",
  steps: [
    {
      index: "01",
      title: "Connect your locations",
      body: "Add Google Business profiles, brand assets, and team roles. TrustTap maps each site to the right review destination.",
    },
    {
      index: "02",
      title: "Deploy QR touchpoints",
      body: "Print table tents, stickers, or receipt links. Customers scan, tap, and leave feedback in under a minute.",
    },
    {
      index: "03",
      title: "Measure and improve",
      body: "Watch reviews climb, compare locations, and act on alerts so every visit ends with proof of great service.",
    },
  ],
} as const;

export type TrustTapPreviewAsset = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

export const TRUSTTAP_PREVIEW = {
  kicker: "PRODUCT PREVIEW",
  title: "Built for clarity on every screen",
  subtext: "From the in-venue QR moment to the full TrustTap product story.",
  shots: [
    {
      id: "experience",
      src: "/assets/trusttap/trusttap-hero.png",
      alt: "TrustTap product experience with QR review collection and Google review prompts",
      caption: "Complete review experience",
    },
  ] satisfies TrustTapPreviewAsset[],
} as const;

export type TrustTapFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const TRUSTTAP_FAQ = {
  kicker: "FAQ",
  title: "Common questions",
  items: [
    {
      id: "google",
      question: "Does TrustTap work with Google Business Profile?",
      answer:
        "Yes. TrustTap routes customers to the correct Google review experience for each verified location you connect.",
    },
    {
      id: "setup",
      question: "How long does setup take?",
      answer:
        "Most teams launch their first location in under a day—add profiles, generate QR assets, and share them with staff.",
    },
    {
      id: "multi",
      question: "Can we manage many locations from one account?",
      answer:
        "Absolutely. Role-based access lets headquarters see every site while local managers focus on their own metrics.",
    },
    {
      id: "demo",
      question: "How do I book a demo?",
      answer:
        "Use Book Demo to pick a time on our calendar, or contact us with your locations and goals—we will tailor a walkthrough.",
    },
  ] satisfies TrustTapFaqItem[],
} as const;

export const TRUSTTAP_BOTTOM_CTA = {
  title: "Ready to grow reviews with TrustTap?",
  subtext: "Talk with Commiters about rollout, integrations, and pricing for your locations.",
  primaryLabel: "Book Demo",
  primaryHref: buildDiscoveryCallCalendarUrl(),
  secondaryLabel: "Contact Us",
  secondaryHref: ROUTES.contact,
} as const;
