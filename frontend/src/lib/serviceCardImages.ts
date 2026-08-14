import { getServiceByGridId, getServiceBySlug } from "./services/catalog";

/** Card / hero art keyed by services grid section id (matches filenames under public/assets/services). */
export const SERVICE_CARD_IMAGE_BY_GRID_ID: Record<string, string> = {
  "website-development": "/assets/services/website-development.jpg",
  "web-applications": "/assets/services/web-applications.jpg",
  "mobile-applications": "/assets/services/mobile-applications.jpg",
  "e-commerce-development": "/assets/services/e-commerce-development.jpg",
  "ai-integration": "/assets/services/ai-integration.jpg",
  "automation-tools": "/assets/services/automation-tools.jpg",
  "mvp-development": "/assets/services/mvp-development.jpg",
};

const ICON_TO_GRID_ID: Record<string, string> = {
  website: "website-development",
  webapp: "web-applications",
  mobile: "mobile-applications",
  ecommerce: "e-commerce-development",
  ai: "ai-integration",
  automation: "automation-tools",
  mvp: "mvp-development",
};

export type ServiceCardImage = {
  src: string;
  alt: string;
};

export function resolveServiceCardImage(options: {
  gridId?: string;
  slug?: string;
  icon?: string;
  title?: string;
}): ServiceCardImage {
  const { gridId, slug, icon, title } = options;

  let resolvedGridId = gridId?.trim() || undefined;
  if (!resolvedGridId && slug) {
    resolvedGridId = getServiceBySlug(slug)?.gridId;
  }
  if (!resolvedGridId && icon && ICON_TO_GRID_ID[icon]) {
    resolvedGridId = ICON_TO_GRID_ID[icon];
  }

  const src =
    (resolvedGridId && SERVICE_CARD_IMAGE_BY_GRID_ID[resolvedGridId]) ||
    SERVICE_CARD_IMAGE_BY_GRID_ID["website-development"];

  const serviceTitle =
    title ||
    (resolvedGridId ? getServiceByGridId(resolvedGridId)?.title : undefined) ||
    (slug ? getServiceBySlug(slug)?.title : undefined) ||
    "Commiters service";

  return {
    src,
    alt: `${serviceTitle} — Commiters`,
  };
}

export function serviceCardImageForGridId(gridId: string, title: string): ServiceCardImage {
  return resolveServiceCardImage({ gridId, title });
}

export function serviceCardImageForDetail(slug: string): ServiceCardImage {
  const service = getServiceBySlug(slug);
  if (!service) {
    return resolveServiceCardImage({ slug });
  }
  return resolveServiceCardImage({
    gridId: service.gridId,
    slug: service.slug,
    icon: service.heroVisual,
    title: service.title,
  });
}
