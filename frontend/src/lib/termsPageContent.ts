import { ROUTES } from "./routes";
import { STITCH_COPY } from "./stitchDesign";

export type TermsPageAccent = "blue" | "gold";

export type TermsPageBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "checklist"; items: readonly string[] }
  | { kind: "highlight"; text: string };

export type TermsPageSection = {
  number: string;
  title: string;
  accent: TermsPageAccent;
  blocks: readonly TermsPageBlock[];
};

export const TERMS_PAGE_COPY = {
  title: STITCH_COPY.terms.title,
  lastUpdatedLabel: STITCH_COPY.terms.lastUpdatedLabel,
  lastUpdatedDate: STITCH_COPY.terms.lastUpdatedDate,
} as const;

export const TERMS_PAGE_SECTIONS: readonly TermsPageSection[] = [
  {
    number: "01",
    title: "Acceptance of Terms",
    accent: "blue",
    blocks: [
      {
        kind: "paragraph",
        text: 'By accessing or using the services provided by Commiters Softwares ("we," "us," or "our"), you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Commiters Softwares. If you do not agree to these terms, you must immediately cease all use of our services.',
      },
    ],
  },
  {
    number: "02",
    title: "Service Description",
    accent: "gold",
    blocks: [
      {
        kind: "paragraph",
        text: "Commiters Softwares provides premium custom software development, technical consulting, and digital architecture services. Our engagement models include fixed-price projects, time-and-materials consulting, and dedicated engineering teams.",
      },
      {
        kind: "checklist",
        items: [
          "Custom Web & Mobile Engineering",
          "Cloud Infrastructure & DevOps",
          "Technical Strategy Consulting",
        ],
      },
    ],
  },
  {
    number: "03",
    title: "Intellectual Property",
    accent: "blue",
    blocks: [
      {
        kind: "paragraph",
        text: "Upon full and final payment, the specific deliverables created solely for the client shall become the property of the client. However, Commiters Softwares retains ownership of all pre-existing tools, libraries, code snippets, and general technical knowledge used or developed during the project. We reserve the right to use our general knowledge and expertise for other clients.",
      },
    ],
  },
  {
    number: "04",
    title: "Limitation of Liability",
    accent: "gold",
    blocks: [
      {
        kind: "highlight",
        text: "To the maximum extent permitted by law, Commiters Softwares shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, or goodwill, arising out of your use of our services. Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim.",
      },
    ],
  },
  {
    number: "05",
    title: "Governing Law",
    accent: "blue",
    blocks: [
      {
        kind: "paragraph",
        text: "These terms and any disputes related to them shall be governed by and construed in accordance with the laws of the jurisdiction in which Commiters Softwares is registered, without regard to its conflict of law principles.",
      },
    ],
  },
];

export const TERMS_ENTERPRISE_CTA = {
  title: STITCH_COPY.terms.enterpriseCta.title,
  description: STITCH_COPY.terms.enterpriseCta.description,
  buttonLabel: STITCH_COPY.terms.enterpriseCta.buttonLabel,
  href: ROUTES.contact,
} as const;

export const TERMS_PAGE_SECTION_TITLES = TERMS_PAGE_SECTIONS.map((section) => section.title);
