import { ROUTES } from "./routes";
import { STITCH_COPY } from "./stitchDesign";

export type PrivacyPolicyFeatureCard = {
  icon: "handshake" | "shield";
  title: string;
  description: string;
};

export type PrivacyPolicyRight = {
  title: string;
  description: string;
};

export type PrivacyPolicyBlock =
  | {
      kind: "identity";
      label: string;
      description: string;
      items: readonly string[];
    }
  | { kind: "paragraph"; text: string }
  | { kind: "cards"; cards: readonly PrivacyPolicyFeatureCard[] }
  | { kind: "callout"; text: string }
  | { kind: "rights"; items: readonly PrivacyPolicyRight[] };

export type PrivacyPolicySection = {
  number: string;
  title: string;
  blocks: readonly PrivacyPolicyBlock[];
};

export const PRIVACY_PAGE_COPY = {
  title: STITCH_COPY.privacy.title,
  lastUpdatedLabel: STITCH_COPY.privacy.lastUpdatedLabel,
  lastUpdatedDate: STITCH_COPY.privacy.lastUpdatedDate,
  introBeforeBold: STITCH_COPY.privacy.introBeforeBold,
  introBold: STITCH_COPY.privacy.introBold,
  introAfterBold: STITCH_COPY.privacy.introAfterBold,
  intro: `${STITCH_COPY.privacy.introBeforeBold}${STITCH_COPY.privacy.introBold}${STITCH_COPY.privacy.introAfterBold}`,
} as const;

export const PRIVACY_DPO_CTA = {
  title: STITCH_COPY.privacy.dpoCta.title,
  description: STITCH_COPY.privacy.dpoCta.description,
  buttonLabel: STITCH_COPY.privacy.dpoCta.buttonLabel,
  href: ROUTES.contact,
} as const;

export const PRIVACY_POLICY_SECTIONS: readonly PrivacyPolicySection[] = [
  {
    number: "01",
    title: "Data Collection",
    blocks: [
      {
        kind: "identity",
        label: "IDENTITY DATA",
        description:
          "Includes first name, last name, username or similar identifier, and title. We only collect what is strictly necessary for project initiation.",
        items: [
          "Direct interactions via project inquiry forms.",
          "Automated technical data including IP addresses and browser types.",
        ],
      },
    ],
  },
  {
    number: "02",
    title: "Usage & Purpose",
    blocks: [
      {
        kind: "paragraph",
        text: "We process your personal data only when we have a legal basis to do so. Our primary objective is the delivery of high-precision software solutions.",
      },
      {
        kind: "cards",
        cards: [
          {
            icon: "handshake",
            title: "Contract Performance",
            description: "Necessary for the execution of our service agreements.",
          },
          {
            icon: "shield",
            title: "Legal Compliance",
            description: "Fulfilling our regulatory and statutory obligations.",
          },
        ],
      },
    ],
  },
  {
    number: "03",
    title: "Cookies",
    blocks: [
      {
        kind: "paragraph",
        text: "Our website uses essential cookies to ensure system stability. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.",
      },
      {
        kind: "callout",
        text: "If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.",
      },
    ],
  },
  {
    number: "04",
    title: "Your Rights",
    blocks: [
      {
        kind: "rights",
        items: [
          {
            title: "Right to Access",
            description: "Request a copy of the personal data we hold about you.",
          },
          {
            title: "Right to Erasure",
            description:
              "Ask us to delete or remove personal data where there is no good reason for us continuing to process it.",
          },
          {
            title: "Right to Rectification",
            description: "Have any incomplete or inaccurate data we hold about you corrected.",
          },
        ],
      },
    ],
  },
];
