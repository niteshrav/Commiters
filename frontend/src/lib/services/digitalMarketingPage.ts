import type { ServiceFeature } from "./types";
import type { TechLogoDef } from "../homeTechStack";

const v13 = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${slug}.svg`;

export const DIGITAL_MARKETING_FEATURES: ServiceFeature[] = [
  {
    title: "Search Engine Optimization (SEO)",
    description: "Search work for high-intent queries.",
    icon: "seo",
    points: ["Technical SEO", "On-page SEO", "Keywords", "Local SEO", "Audits", "Growth plan"],
  },
  {
    title: "Performance Marketing & Paid Ads",
    description: "Google and Meta ads for qualified leads.",
    icon: "mvp",
    points: ["Google Ads", "Meta Ads", "Campaigns", "Targeting", "Retargeting", "Ad optimization"],
  },
  {
    title: "Social Media Marketing",
    description: "A planned presence where buyers already are.",
    icon: "maintain",
    points: ["Strategy", "Instagram", "Facebook", "Content plan", "Community", "Tracking"],
  },
  {
    title: "Content Marketing",
    description: "Pages and articles the channels can share.",
    icon: "responsive",
    points: ["Strategy", "Website copy", "Articles", "Campaigns", "Distribution", "Brand story"],
  },
  {
    title: "Conversion Rate Optimization (CRO)",
    description: "Pages and forms tested for completed leads.",
    icon: "performance",
    points: ["Landing pages", "Audits", "CTAs", "A/B tests", "Journeys", "Lead forms"],
  },
  {
    title: "Marketing Automation & CRM",
    description: "Follow-up by email, WhatsApp, and CRM.",
    icon: "automation",
    points: ["Email", "WhatsApp", "Follow-ups", "Nurturing", "CRM", "Retention"],
  },
  {
    title: "Website & Landing Page Optimization",
    description: "Faster pages built to capture a lead.",
    icon: "scale",
    points: ["Landing pages", "Site speed", "Mobile", "Lead forms", "UX"],
  },
  {
    title: "Analytics & Reporting",
    description: "Tracking for traffic, leads, and spend.",
    icon: "secure",
    points: ["GA4", "Tag Manager", "Conversions", "Campaign data", "Dashboards", "Reports"],
  },
];

export const DIGITAL_MARKETING_PILLARS = [
  {
    title: "Attract the right audience",
    body: "Reach potential customers through search engines, paid campaigns, and social platforms.",
  },
  {
    title: "Convert traffic into leads",
    body: "Optimize landing pages, user journeys, and conversion funnels.",
  },
  {
    title: "Measure and improve",
    body: "Track campaign performance, customer acquisition, and business outcomes.",
  },
] as const;

export const DIGITAL_MARKETING_FUNNEL = [
  { title: "Awareness", body: "SEO, social media, paid advertising" },
  { title: "Acquisition", body: "Landing pages, campaigns, traffic generation" },
  { title: "Conversion", body: "Lead forms, CRO, CTA optimization" },
  { title: "Nurturing", body: "Email marketing, WhatsApp follow-ups, CRM" },
  { title: "Retention", body: "Remarketing, engagement, customer loyalty" },
] as const;

export const DIGITAL_MARKETING_PROCESS = [
  {
    title: "Discovery & business analysis",
    body: "Understand business goals, target audience, and current marketing performance.",
  },
  {
    title: "Research & strategy",
    body: "Research competitors, keywords, customer behavior, and opportunities.",
  },
  {
    title: "Campaign planning",
    body: "Create marketing strategies, channel plans, and conversion funnels.",
  },
  {
    title: "Execution & launch",
    body: "Implement campaigns, SEO improvements, content, and landing pages.",
  },
  {
    title: "Tracking & analysis",
    body: "Monitor conversions, traffic, leads, and campaign performance.",
  },
  {
    title: "Optimization & growth",
    body: "Continuously improve campaigns based on real performance data.",
  },
] as const;

export const DIGITAL_MARKETING_STACK: { label: string; items: { name: string; logo?: TechLogoDef }[] }[] = [
  {
    label: "Search & analytics",
    items: [
      { name: "Google Analytics 4", logo: { slug: "googleanalytics", alt: "Google Analytics" } },
      { name: "Google Search Console", logo: { slug: "googlesearchconsole", alt: "Google Search Console" } },
      { name: "Google Tag Manager", logo: { slug: "googletagmanager", alt: "Google Tag Manager" } },
      { name: "SEMrush", logo: { slug: "semrush", alt: "SEMrush" } },
      { name: "Ahrefs" },
    ],
  },
  {
    label: "Advertising",
    items: [
      { name: "Google Ads", logo: { slug: "googleads", alt: "Google Ads" } },
      { name: "Meta Ads", logo: { slug: "meta", alt: "Meta" } },
      { name: "LinkedIn Ads", logo: { slug: "linkedin", alt: "LinkedIn", iconSrc: v13("linkedin") } },
    ],
  },
  {
    label: "Social media",
    items: [
      { name: "Instagram", logo: { slug: "instagram", alt: "Instagram" } },
      { name: "Facebook", logo: { slug: "facebook", alt: "Facebook" } },
      { name: "LinkedIn", logo: { slug: "linkedin", alt: "LinkedIn", iconSrc: v13("linkedin") } },
    ],
  },
  {
    label: "Marketing automation",
    items: [
      { name: "HubSpot", logo: { slug: "hubspot", alt: "HubSpot" } },
      { name: "Mailchimp", logo: { slug: "mailchimp", alt: "Mailchimp" } },
      { name: "Brevo", logo: { slug: "brevo", alt: "Brevo" } },
    ],
  },
  {
    label: "Creative & content",
    items: [
      { name: "Canva", logo: { slug: "canva", alt: "Canva", iconSrc: v13("canva") } },
      { name: "Adobe Creative Cloud", logo: { slug: "adobe", alt: "Adobe", iconSrc: v13("adobe") } },
    ],
  },
];

export const DIGITAL_MARKETING_INDUSTRIES = [
  { title: "Startups & SaaS", body: "Position the product, capture demo requests, and keep trial users in a follow-up sequence." },
  { title: "Hospitality & hotels", body: "Turn search and social demand into direct booking inquiries instead of depending only on marketplaces." },
  { title: "Healthcare & wellness", body: "Reach local patients with clear service pages, compliant forms, and tracked appointment requests." },
  { title: "E-commerce & retail", body: "Connect product pages, paid campaigns, and retargeting so browsing can become a purchase." },
  { title: "Local businesses", body: "Show up for nearby searches and give every visit a simple way to call, book, or enquire." },
  { title: "Professional services", body: "Explain the offer, capture qualified consultations, and follow up before the lead goes cold." },
] as const;

export const DIGITAL_MARKETING_WHY = [
  { title: "Performance-driven strategies", body: "Channel choices follow the offer and the cost of a qualified lead." },
  { title: "Full-funnel marketing approach", body: "Awareness, capture, follow-up, and retention sit in one plan." },
  { title: "Data-based decision making", body: "Changes come from tracked behavior, not from a new creative guess." },
  { title: "Transparent reporting", body: "Reports name traffic, leads, and spend so the numbers can be checked." },
  { title: "Continuous optimization", body: "Live campaigns are reviewed and adjusted after launch." },
  { title: "Integrated marketing solutions", body: "Search, ads, content, pages, and CRM follow-up are scoped together." },
] as const;

export const DIGITAL_MARKETING_METRICS = [
  "Website traffic",
  "Qualified leads",
  "Conversion rate",
  "Cost per lead",
  "Customer acquisition cost",
  "Return on ad spend",
] as const;

export const DIGITAL_MARKETING_FAQS = [
  {
    question: "What digital marketing services does Commiters offer?",
    answer:
      "SEO, paid ads on Google and Meta, social and content, conversion work on pages and forms, marketing automation, and the analytics that tie those channels to leads.",
  },
  {
    question: "How does SEO help businesses grow?",
    answer:
      "SEO makes the pages that describe your offer easier to find for searches that already show intent. It compounds after the technical and content work is in place.",
  },
  {
    question: "What is performance marketing?",
    answer:
      "Paid campaigns managed against a business result, usually a qualified lead or a sale, rather than impressions or clicks on their own.",
  },
  {
    question: "How long does SEO take to show results?",
    answer:
      "Paid and landing-page changes can show signal in days or weeks. Organic rankings usually take longer and are scoped by channel before work starts.",
  },
  {
    question: "Do you manage Google and Meta advertising campaigns?",
    answer: "Yes. Google Ads and Meta Ads are set up, targeted, and reviewed against the lead or sale the campaign is meant to produce.",
  },
  {
    question: "Can you help generate qualified business leads?",
    answer:
      "Yes. The work covers the page, the form or booking step, and the follow-up so an inquiry is someone the business can actually talk to.",
  },
  {
    question: "Do you provide marketing analytics and reporting?",
    answer:
      "Yes. Google Analytics 4, Tag Manager, and campaign data are used to report traffic, leads, and spend. We do not attach unnamed case-study results to this page.",
  },
  {
    question: "Can you create a customized digital marketing strategy?",
    answer:
      "Yes. The plan starts from the offer, the audience, and the channels you already have, then chooses the mix of search, ads, content, and follow-up.",
  },
];
