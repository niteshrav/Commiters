import type { JobDetail, JobFiltersResponse, JobQuery, PaginatedJobs, PublicJob } from "./types";

const STATIC_POSTED = "2026-01-15T00:00:00.000Z";
const STATIC_UPDATED = "2026-02-01T00:00:00.000Z";
const APPLY_BY = "2026-12-31T23:59:59.000Z";

export const STATIC_JOB_FILTER_OPTIONS: JobFiltersResponse = {
  departments: ["Development", "Marketing", "Sales"],
  workModes: ["Remote", "Hybrid"],
  employmentTypes: ["Full-time", "Internship"],
};

const STATIC_JOBS: JobDetail[] = [
  {
    _id: "static-marketing-executive",
    title: "Marketing Executive",
    slug: "marketing-executive",
    department: "Marketing",
    location: "Remote",
    workMode: "Remote",
    internshipType: "",
    stipendSalary: "₹4–8 LPA",
    employmentType: "Full-time",
    featured: true,
    lastDateToApply: APPLY_BY,
    createdAt: STATIC_POSTED,
    updatedAt: STATIC_UPDATED,
    experience: "1–3 years",
    duration: "Permanent",
    numberOfOpenings: 1,
    aboutCompany:
      "Commiters is a founder-led engineering studio in Udaipur helping startups ship production-ready web, mobile, and AI products.",
    roleOverview:
      "Own demand generation, content, and campaign execution for Commiters services and products—including TrustTap and client success stories.",
    description:
      "You will plan and run marketing programs that attract founders and product teams, from SEO and landing pages to email nurture and social proof.",
    responsibilities: [
      "Plan and publish content across blog, case studies, and social channels",
      "Run campaigns for services, careers, and product launches",
      "Coordinate with engineering on landing pages and analytics",
      "Track funnel metrics and iterate on messaging",
    ],
    requiredSkills: ["Content marketing", "SEO basics", "Campaign planning", "Written English"],
    preferredSkills: ["B2B SaaS", "LinkedIn", "Google Analytics", "Canva or Figma"],
    eligibility: "Bachelor's degree or equivalent experience with a portfolio of shipped campaigns or content.",
    benefits: ["Remote-friendly", "Learning budget", "Direct founder access", "Flexible hours"],
    learningOpportunities: "Work alongside engineers on real product launches and founder-led GTM.",
    selectionProcess: "Application review → Portfolio walkthrough → Culture fit interview",
    seo: {
      title: "Marketing Executive | Commiters Careers",
      description: "Remote marketing role at Commiters—content, SEO, and campaigns for software products.",
    },
  },
  {
    _id: "static-sales-executive",
    title: "Sales Executive",
    slug: "sales-executive",
    department: "Sales",
    location: "Hybrid · Udaipur",
    workMode: "Hybrid",
    internshipType: "",
    stipendSalary: "₹5–10 LPA + incentives",
    employmentType: "Full-time",
    featured: false,
    lastDateToApply: APPLY_BY,
    createdAt: STATIC_POSTED,
    updatedAt: STATIC_UPDATED,
    experience: "1–4 years",
    duration: "Permanent",
    numberOfOpenings: 2,
    aboutCompany:
      "Commiters partners with founders to deliver MVPs, SaaS platforms, and AI integrations with a precision-first delivery model.",
    roleOverview:
      "Qualify inbound leads, run discovery calls, and help founders choose the right engagement model for web, mobile, and AI work.",
    description:
      "You will be the first human touch for many prospects—understanding goals, scoping conversations, and handing off cleanly to delivery leads.",
    responsibilities: [
      "Respond to inbound leads from website, WhatsApp, and referrals",
      "Run discovery calls and document requirements",
      "Prepare proposals and follow up with decision makers",
      "Maintain CRM hygiene and pipeline forecasts",
    ],
    requiredSkills: ["B2B sales", "Discovery calls", "CRM usage", "Strong communication"],
    preferredSkills: ["Agency or studio sales", "Technical aptitude", "Proposal writing"],
    eligibility: "Proven experience closing or advancing B2B services deals.",
    benefits: ["Hybrid work", "Performance incentives", "Founder mentorship"],
    learningOpportunities: "Learn how custom software engagements are scoped and delivered.",
    selectionProcess: "Application review → Role-play discovery → Founder interview",
    seo: {
      title: "Sales Executive | Commiters Careers",
      description: "Hybrid sales role at Commiters—discovery, proposals, and founder partnerships.",
    },
  },
  {
    _id: "static-ai-engineer-intern",
    title: "AI Engineer Intern",
    slug: "ai-engineer-intern",
    department: "Development",
    location: "Remote",
    workMode: "Remote",
    internshipType: "Paid Internship",
    stipendSalary: "₹15,000 / month",
    employmentType: "Internship",
    featured: true,
    lastDateToApply: APPLY_BY,
    createdAt: STATIC_POSTED,
    updatedAt: STATIC_UPDATED,
    experience: "0–1 year",
    duration: "6 months",
    numberOfOpenings: 3,
    aboutCompany:
      "Commiters integrates LLM and automation features into real products for founders and enterprise teams.",
    roleOverview:
      "Support AI feature development, prompt engineering, and integration of LLM APIs into production workflows.",
    description:
      "Support AI feature development, prompt engineering, and integration of LLM APIs into production workflows.",
    responsibilities: [
      "Prototype AI features with OpenAI and similar APIs",
      "Help evaluate prompts and model outputs",
      "Document integration patterns",
      "Pair with senior engineers on production tasks",
    ],
    requiredSkills: ["Python", "JavaScript", "APIs"],
    preferredSkills: ["LangChain", "RAG", "Vector databases"],
    eligibility: "Students or recent graduates passionate about applied AI.",
    benefits: ["Certificate of completion", "Mentorship", "Full-time conversion path"],
    learningOpportunities: "Hands-on experience shipping AI features in live client projects.",
    selectionProcess: "Resume review → Take-home task → Technical interview",
    seo: {
      title: "AI Engineer Intern | Commiters Careers",
      description: "Paid AI engineering internship at Commiters with real product exposure.",
    },
  },
];

function matchesQuery(job: PublicJob, query: JobQuery): boolean {
  if (query.featured && !job.featured) return false;
  if (query.department && job.department !== query.department) return false;
  if (query.workMode && job.workMode !== query.workMode) return false;
  if (query.employmentType && job.employmentType !== query.employmentType) return false;
  const search = query.search?.trim().toLowerCase();
  if (search) {
    const haystack = `${job.title} ${job.department} ${job.location} ${job.employmentType}`.toLowerCase();
    if (!haystack.includes(search)) return false;
  }
  return true;
}

export function listStaticPublicJobs(query: JobQuery = {}): PaginatedJobs<PublicJob> {
  const limit = query.limit ?? 12;
  const page = query.page ?? 1;
  const filtered = STATIC_JOBS.filter((job) => matchesQuery(job, query));
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);
  return { items, total, page, limit, totalPages };
}

export function getStaticJobBySlug(slug: string): { job: JobDetail; relatedJobs: PublicJob[] } | null {
  const job = STATIC_JOBS.find((entry) => entry.slug === slug);
  if (!job) return null;
  const relatedJobs = STATIC_JOBS.filter((entry) => entry.slug !== slug && entry.department === job.department)
    .slice(0, 3)
    .map(({ _id, title, slug: s, department, location, workMode, internshipType, stipendSalary, employmentType, featured, lastDateToApply, createdAt, updatedAt }) => ({
      _id,
      title,
      slug: s,
      department,
      location,
      workMode,
      internshipType,
      stipendSalary,
      employmentType,
      featured,
      lastDateToApply,
      createdAt,
      updatedAt,
    }));
  return { job, relatedJobs };
}
