#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_ORIGIN = "https://www.commiters.com";
const SERVICE_SLUGS = [
  "website-development",
  "web-application-development",
  "mobile-app-development",
  "e-commerce-development",
  "ai-integration",
  "mvp-development",
  "automation-tools",
];

const paths = [
  "/",
  "/about",
  "/services",
  ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
  "/case-studies",
  "/case-studies/commiters",
  "/case-studies/ai-summarizer",
  "/case-studies/neardrop-mvp",
  "/case-studies/multi-role-crm",
  "/case-studies/nextsaas",
  "/products/trusttap",
  "/technical-ledger",
  "/contact",
  "/faq",
  "/testimonials",
  "/join-us",
  "/open-positions",
  "/website-development-udaipur",
  "/whatsapp-automation-udaipur",
  "/privacy-policy",
  "/cookie-policy",
  "/terms",
];

const urls = paths.map((path) => `  <url>\n    <loc>${SITE_ORIGIN}${path}</loc>\n  </url>`).join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
writeFileSync(join(root, "public/sitemap.xml"), xml, "utf8");
console.log(`Wrote ${paths.length} URLs to public/sitemap.xml`);
