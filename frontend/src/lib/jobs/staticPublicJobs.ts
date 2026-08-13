import type { JobDetail, JobFiltersResponse, JobQuery, PaginatedJobs, PublicJob } from "./types";

const STATIC_POSTED = "2026-01-15T00:00:00.000Z";
const STATIC_UPDATED = "2026-02-01T00:00:00.000Z";
const APPLY_BY = "2026-12-31T23:59:59.000Z";

export const STATIC_JOB_FILTER_OPTIONS: JobFiltersResponse = {
  departments: ["Development", "Marketing", "Sales"],
  workModes: ["Remote"],
  employmentTypes: ["Internship"],
};

const STATIC_JOBS: JobDetail[] = [
  {
    _id: "static-marketing-executive",
    title: "Marketing Intern",
    slug: "marketing-executive",
    department: "Marketing",
    location: "Remote",
    workMode: "Remote",
    internshipType: "Paid Internship",
    stipendSalary: "₹8,000 / month",
    employmentType: "Internship",
    featured: true,
    lastDateToApply: APPLY_BY,
    createdAt: STATIC_POSTED,
    updatedAt: STATIC_UPDATED,
    experience: "0–1 year",
    duration: "6 months",
    numberOfOpenings: 1,
    aboutCompany:
      "Commiters is a founder-led engineering studio in Udaipur helping startups ship production-ready web, mobile, and AI products.",
    roleOverview:
      "Support demand generation, content, and campaign execution for Commiters services and products—including TrustTap and client success stories.",
    description:
      "You will help plan and run marketing programs that attract founders and product teams, from SEO and landing pages to email nurture and social proof.",
    responsibilities: [
      "Help publish content across blog, case studies, and social channels",
      "Support campaigns for services, careers, and product launches",
      "Coordinate with engineering on landing pages and analytics",
      "Track funnel metrics and iterate on messaging",
    ],
    requiredSkills: ["Content marketing", "SEO basics", "Campaign planning", "Written English"],
    preferredSkills: ["B2B SaaS", "LinkedIn", "Google Analytics", "Canva or Figma"],
    eligibility: "Students or recent graduates with a portfolio of content or campaign work.",
    benefits: ["Remote-friendly", "Learning budget", "Direct founder access", "Flexible hours"],
    learningOpportunities: "Work alongside engineers on real product launches and founder-led GTM.",
    selectionProcess: "Application review → Portfolio walkthrough → Culture fit interview",
    seo: {
      title: "Marketing Intern | Commiters Careers",
      description: "Remote marketing internship at Commiters—content, SEO, and campaigns for software products.",
    },
  },
  {
    _id: "static-sales-executive",
    title: "Sales Intern",
    slug: "sales-executive",
    department: "Sales",
    location: "Remote",
    workMode: "Remote",
    internshipType: "Paid Internship",
    stipendSalary: "₹8,000 / month",
    employmentType: "Internship",
    featured: false,
    lastDateToApply: APPLY_BY,
    createdAt: STATIC_POSTED,
    updatedAt: STATIC_UPDATED,
    experience: "0–1 year",
    duration: "6 months",
    numberOfOpenings: 2,
    aboutCompany:
      "Commiters partners with founders to deliver MVPs, SaaS platforms, and AI integrations with a precision-first delivery model.",
    roleOverview:
      "Support inbound lead qualification, discovery calls, and help founders choose the right engagement model for web, mobile, and AI work.",
    description:
      "You will learn the first human touch for many prospects—understanding goals, scoping conversations, and handing off cleanly to delivery leads.",
    responsibilities: [
      "Help respond to inbound leads from website, WhatsApp, and referrals",
      "Support discovery calls and document requirements",
      "Assist with proposals and follow up with decision makers",
      "Maintain CRM hygiene and pipeline notes",
    ],
    requiredSkills: ["Strong communication", "CRM usage", "Research skills", "Written English"],
    preferredSkills: ["B2B sales interest", "Technical aptitude", "Proposal writing"],
    eligibility: "Students or recent graduates interested in B2B services and founder partnerships.",
    benefits: ["Remote work", "Performance incentives", "Founder mentorship"],
    learningOpportunities: "Learn how custom software engagements are scoped and delivered.",
    selectionProcess: "Application review → Role-play discovery → Founder interview",
    seo: {
      title: "Sales Intern | Commiters Careers",
      description: "Remote sales internship at Commiters—discovery, proposals, and founder partnerships.",
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
