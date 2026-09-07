import { CASE_STUDY_PROJECTS, isHiddenFromWorkPage, type CaseStudyProject } from "../caseStudiesPageContent";
import {
  applyWorkPageCaseStudyLayout,
  isWorkPagePortfolioProjectId,
  resolveWorkPageCaseStudyLayout,
  resolveWorkPagePortfolioProjectId,
} from "../caseStudiesWorkGridLayout";
import { caseStudyHasImage } from "../caseStudiesPageAssets";
import { TESTIMONIALS_PAGE_ITEMS } from "../testimonialsPageContent";
import { ROUTES } from "../routes";
import type { Testimonial } from "../siteTrustContent";
import { hasCmsItems } from "./api";

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeInternalPath(path: string): string {
  const normalized = path.replace(/\/+$/, "") || "/";
  if (normalized === "/open-position" || normalized === "/job-positions" || normalized === "/job-position") {
    return ROUTES.openPositions;
  }
  return normalized;
}

const LEGACY_CASE_STUDY_HREF: Record<string, string> = {
  [ROUTES.commitersCaseStudyLegacy]: ROUTES.commitersCaseStudy,
  [ROUTES.aiSummarizerCaseStudyLegacy]: ROUTES.aiSummarizerCaseStudy,
  [ROUTES.neardropCaseStudyLegacy]: ROUTES.neardropCaseStudy,
  [ROUTES.multiRoleCrmCaseStudyLegacy]: ROUTES.multiRoleCrmCaseStudy,
  [ROUTES.browseMyVacationCaseStudyLegacy]: ROUTES.browseMyVacationCaseStudy,
};

function normalizeCaseStudyHref(path: string): string {
  const normalized = normalizeInternalPath(path);
  return LEGACY_CASE_STUDY_HREF[normalized] ?? normalized;
}
function findCaseStudyFallback(project: Record<string, unknown>): CaseStudyProject | undefined {
  const slug = asString(project.slug) || slugify(asString(project.name));
  const projectUrl = normalizeCaseStudyHref(asString(project.projectUrl));
  const name = asString(project.name).trim();

  return CASE_STUDY_PROJECTS.find((entry) => {
    if (entry.id === slug) return true;
    if (projectUrl && entry.detailsHref === projectUrl) return true;
    if (name && (entry.title === name || entry.title.startsWith(`${name} —`) || entry.title.startsWith(name))) {
      return true;
    }
    if (slug.startsWith("commiters") && entry.id === "commiters") return true;
    return false;
  });
}

function caseStudyCardScore(project: CaseStudyProject): number {
  let score = 0;
  if (caseStudyHasImage(project.id)) score += 10;
  if (project.impact?.length) score += 5;
  if (project.problem.length > 60) score += 3;
  if (project.title.includes("—")) score += 2;
  return score;
}

function dedupeCaseStudyKey(project: CaseStudyProject): string {
  if (project.external) return `external::${project.detailsHref}::${project.id}`;
  if (CASE_STUDY_PROJECTS.some((entry) => entry.id === project.id) || isWorkPagePortfolioProjectId(project.id)) {
    return `portfolio-id::${project.id}`;
  }
  return `href::${normalizeInternalPath(project.detailsHref)}`;
}

function dedupeCaseStudyProjects(projects: CaseStudyProject[]): CaseStudyProject[] {
  const result: CaseStudyProject[] = [];
  const indexByKey = new Map<string, number>();

  for (const project of projects) {
    const key = dedupeCaseStudyKey(project);
    const existingIndex = indexByKey.get(key);
    if (existingIndex === undefined) {
      indexByKey.set(key, result.length);
      result.push(project);
      continue;
    }

    const existing = result[existingIndex];
    if (caseStudyCardScore(project) > caseStudyCardScore(existing)) {
      result[existingIndex] = project;
    }
  }

  return result;
}

export function mapCmsProjectToCaseStudy(project: Record<string, unknown>, index: number): CaseStudyProject {
  const fallback = findCaseStudyFallback(project);
  const name = asString(project.name, fallback?.title ?? `Project ${index + 1}`);
  const slug = asString(project.slug) || slugify(name);
  const projectUrl = asString(project.projectUrl);
  const normalizedUrl = projectUrl ? normalizeCaseStudyHref(projectUrl) : "";
  const description = asString(project.description, fallback?.solution ?? "");
  const category = asString(project.category);
  const technologies = Array.isArray(project.technologies)
    ? project.technologies.map((tag) => asString(tag)).filter(Boolean)
    : [];
  const tags = fallback?.tags.length
    ? [...fallback.tags]
    : technologies.length
      ? technologies
      : category
        ? [category]
        : [];
  const isFeatured = project.isFeatured === true;
  const portfolioId = resolveWorkPagePortfolioProjectId(slug, normalizedUrl, fallback?.id);
  const workLayout = resolveWorkPageCaseStudyLayout(portfolioId);

  return {
    id: portfolioId,
    title: fallback?.title ?? name,
    category: fallback?.category,
    tags,
    tagVariant: fallback?.tagVariant ?? (technologies.length ? "accent" : "pill"),
    tagsPlacement: fallback?.tagsPlacement,
    problem:
      fallback?.problem ??
      (category
        ? `${category} engagement requiring a reliable engineering partner.`
        : "A product challenge requiring focused engineering execution."),
    solution:
      fallback?.solution ||
      description ||
      "Delivered with Commiters' sprint-based delivery model.",
    impact: fallback?.impact,
    gridSpan: workLayout?.gridSpan ?? fallback?.gridSpan ?? (isFeatured ? "wide" : "narrow"),
    layout: workLayout?.layout ?? fallback?.layout ?? (isFeatured ? "horizontal" : "stacked"),
    detailsLabel: fallback?.detailsLabel ?? "View Project Details",
    detailsHref: normalizedUrl || fallback?.detailsHref || ROUTES.caseStudies,
    external: /^https?:\/\//i.test(projectUrl),
  };
}

function isSameCaseStudy(left: CaseStudyProject, right: CaseStudyProject): boolean {
  return left.id === right.id || left.detailsHref === right.detailsHref;
}

export function resolveCaseStudyProjects(cmsProjects: Record<string, unknown>[] | null | undefined): CaseStudyProject[] {
  if (!hasCmsItems(cmsProjects)) {
    return CASE_STUDY_PROJECTS.filter((project) => !isHiddenFromWorkPage(project)).map(applyWorkPageCaseStudyLayout);
  }

  const mapped = cmsProjects
    .filter((project) => asRecord(project) && project.isActive !== false)
    .sort((a, b) => {
      const aOrder = typeof a.order === "number" ? a.order : 0;
      const bOrder = typeof b.order === "number" ? b.order : 0;
      return aOrder - bOrder;
    })
    .map((project, index) => mapCmsProjectToCaseStudy(project, index));

  const extras = CASE_STUDY_PROJECTS.filter(
    (entry) => !mapped.some((project) => isSameCaseStudy(project, entry)),
  ).map(applyWorkPageCaseStudyLayout);

  return dedupeCaseStudyProjects(
    [...mapped, ...extras].filter((project) => !isHiddenFromWorkPage(project)),
  );
}

const TESTIMONIAL_ACCENTS: Testimonial["accent"][] = ["gold", "teal", "violet"];

const COUNTRY_CODES: Record<string, string> = {
  india: "IN",
  uk: "GB",
  "united kingdom": "GB",
  usa: "US",
  "united states": "US",
  global: "GL",
};

function testimonialInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "C";
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function resolveTestimonialMeta(company: string): Pick<Testimonial, "company" | "country" | "countryCode"> {
  const trimmed = company.trim();
  const lower = trimmed.toLowerCase();
  const countryCode = COUNTRY_CODES[lower];

  if (countryCode) {
    return {
      company: "Client",
      country: trimmed,
      countryCode,
    };
  }

  return {
    company: trimmed || "Client",
    country: "Global",
    countryCode: "GL",
  };
}

export function mapCmsTestimonial(testimonial: Record<string, unknown>, index: number): Testimonial | null {
  const quote = asString(testimonial.review);
  const name = asString(testimonial.clientName);
  if (!quote || !name) return null;

  const meta = resolveTestimonialMeta(asString(testimonial.company));

  return {
    quote,
    name,
    ...meta,
    initials: testimonialInitials(name),
    accent: TESTIMONIAL_ACCENTS[index % TESTIMONIAL_ACCENTS.length],
  };
}

export function resolveTestimonialsPageItems(
  cmsTestimonials: Record<string, unknown>[] | null | undefined,
): readonly Testimonial[] {
  if (!hasCmsItems(cmsTestimonials)) return TESTIMONIALS_PAGE_ITEMS;

  const mapped = cmsTestimonials
    .filter((item) => asRecord(item) && item.isActive !== false)
    .sort((a, b) => {
      const aOrder = typeof a.order === "number" ? a.order : 0;
      const bOrder = typeof b.order === "number" ? b.order : 0;
      return aOrder - bOrder;
    })
    .map((item, index) => mapCmsTestimonial(item, index))
    .filter((item): item is Testimonial => Boolean(item));

  return mapped.length ? mapped : TESTIMONIALS_PAGE_ITEMS;
}
