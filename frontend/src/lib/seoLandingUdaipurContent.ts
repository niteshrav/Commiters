import { ROUTES } from "./routes";
import { buildServiceDetailPath } from "./services";

export type SeoLandingSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type SeoLandingFaq = {
  question: string;
  answer: string;
};

export type SeoLandingPageContent = {
  path: string;
  testId: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    schemaServiceType: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtext: string;
  };
  sections: readonly SeoLandingSection[];
  faqs: readonly SeoLandingFaq[];
  cta: {
    title: string;
    subtext: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

export const WEBSITE_DEVELOPMENT_UDAPUR: SeoLandingPageContent = {
  path: ROUTES.websiteDevelopmentUdaipur,
  testId: "seo-landing-website-development-udaipur",
  seo: {
    title: "Website Development Company in Udaipur | Commiters Softwares",
    description:
      "Custom website development in Udaipur, Rajasthan—fast, SEO-ready marketing sites and web apps built by Commiters Softwares for startups and growing brands.",
    keywords:
      "website development Udaipur, web development company Udaipur, website design Udaipur, custom website Rajasthan, Commiters Softwares",
    schemaServiceType: "Website Development",
  },
  hero: {
    kicker: "Udaipur · Rajasthan",
    title: "Website development in Udaipur that ships production-ready",
    subtext:
      "We design and build premium marketing sites, product landing pages, and full-stack web applications for founders who need speed, clarity, and maintainable code.",
  },
  sections: [
    {
      title: "Why Udaipur teams choose Commiters",
      paragraphs: [
        "Commiters is an engineering studio in Udaipur focused on custom software—not templates. We pair sharp UX with modern React stacks, performance budgets, and SEO foundations so your site ranks and converts.",
      ],
      bullets: [
        "Responsive UI aligned with your brand",
        "Core Web Vitals and accessibility baked in",
        "CMS-ready or fully static deploy options",
        "Clear milestones from discovery to launch",
      ],
    },
    {
      title: "What we deliver",
      paragraphs: [
        "From corporate websites to SaaS marketing sites, we handle architecture, implementation, analytics hooks, and handoff documentation your team can extend.",
      ],
      bullets: [
        "Marketing & brochure websites",
        "Product landing pages and lead funnels",
        "Headless CMS or static content workflows",
        "Integrations with CRM, forms, and automation",
      ],
    },
  ],
  faqs: [
    {
      question: "Do you only work with Udaipur clients?",
      answer:
        "We are based in Udaipur but partner with teams worldwide. Local clients can meet in person; remote engagements use the same delivery process.",
    },
    {
      question: "How long does a typical website project take?",
      answer:
        "Marketing sites often ship in 4–8 weeks depending on scope, content readiness, and integrations. We share a timeline after discovery.",
    },
    {
      question: "Can you migrate or rebuild an existing site?",
      answer:
        "Yes. We audit performance, SEO, and content, then rebuild on a modern stack with redirects and analytics preserved.",
    },
  ],
  cta: {
    title: "Plan your Udaipur website project",
    subtext: "Tell us about your goals—we'll reply with next steps and a realistic build plan.",
    primaryLabel: "Contact Commiters",
    primaryHref: ROUTES.contact,
    secondaryLabel: "View website development service",
    secondaryHref: buildServiceDetailPath("website-development"),
  },
};

export const WHATSAPP_AUTOMATION_UDAPUR: SeoLandingPageContent = {
  path: ROUTES.whatsappAutomationUdaipur,
  testId: "seo-landing-whatsapp-automation-udaipur",
  seo: {
    title: "WhatsApp Automation in Udaipur | Commiters Softwares",
    description:
      "WhatsApp Business automation in Udaipur—lead capture, notifications, CRM sync, and custom bots built by Commiters Softwares for Rajasthan businesses.",
    keywords:
      "WhatsApp automation Udaipur, WhatsApp Business API Udaipur, chatbot Udaipur, workflow automation Rajasthan, Commiters Softwares",
    schemaServiceType: "WhatsApp Automation",
  },
  hero: {
    kicker: "Udaipur · Automation",
    title: "WhatsApp automation that keeps sales and support in sync",
    subtext:
      "We connect WhatsApp Business workflows to your CRM, forms, and internal tools so leads get instant replies and your team spends less time on manual follow-up.",
  },
  sections: [
    {
      title: "Automation built for real operations",
      paragraphs: [
        "Whether you run a local service business or a product company in Udaipur, we design automations that match how your team actually works—not generic blast messages.",
      ],
      bullets: [
        "Lead routing from ads and website forms",
        "Template messages and opt-in compliant flows",
        "CRM and spreadsheet sync",
        "Human handoff when conversations need a person",
      ],
    },
    {
      title: "Integrations we commonly ship",
      paragraphs: [
        "Commiters engineers connect WhatsApp with the rest of your stack using secure APIs, webhooks, and monitored background jobs.",
      ],
      bullets: [
        "Meta WhatsApp Business Platform",
        "Google Sheets and Airtable",
        "Custom admin dashboards",
        "Payment and booking reminders",
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need WhatsApp Business API?",
      answer:
        "For scalable automation and CRM integration, yes. We help you choose the right tier and set up verification with Meta or a BSP partner.",
    },
    {
      question: "Can you automate replies for my Udaipur storefront?",
      answer:
        "Yes—catalog inquiries, appointment booking, and FAQ bots are common. We scope flows around your hours, languages, and compliance needs.",
    },
    {
      question: "Is this separate from your web development work?",
      answer:
        "Automation often pairs with a website or internal tool. Commiters can deliver both from one roadmap.",
    },
  ],
  cta: {
    title: "Discuss WhatsApp automation in Udaipur",
    subtext: "Share your current process—we'll outline automations that save time without hurting customer trust.",
    primaryLabel: "Talk to our team",
    primaryHref: ROUTES.contact,
    secondaryLabel: "Explore automation tools service",
    secondaryHref: buildServiceDetailPath("automation-tools"),
  },
};

export function seoLandingServiceSchema(content: SeoLandingPageContent, origin: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.seo.schemaServiceType,
    description: content.seo.description,
    provider: {
      "@type": "Organization",
      name: "Commiters Softwares",
      url: origin,
    },
    areaServed: {
      "@type": "City",
      name: "Udaipur",
      containedInPlace: {
        "@type": "State",
        name: "Rajasthan",
      },
    },
    url: `${origin}${content.path}`,
  };
}
