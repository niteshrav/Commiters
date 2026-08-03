import { COMMITERS_HEADER_LOGO_SRC } from "../siteBrand";
import { getApiBaseUrl } from "../siteRuntime";

const PLACEHOLDER_LOGO_PATHS = new Set([
  "",
  "/assets/icons/favicon.svg",
  "/assets/icons/favicon.png",
  "/assets/icons/favicon-16x16.png",
  "/assets/icons/favicon-32x32.png",
]);

/** Turn CMS media paths (e.g. /uploads/...) into URLs the browser can load. */
export function resolveCmsMediaUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  if (path.startsWith("/uploads/")) {
    const apiBase = getApiBaseUrl();
    if (!apiBase) return COMMITERS_HEADER_LOGO_SRC;
    return `${apiBase}${path}`;
  }
  return path;
}

/** Prefer the bundled wordmark unless CMS provides a real uploaded logo. */
export function resolveBrandLogoSrc(cmsLogo: unknown): string {
  const raw = typeof cmsLogo === "string" ? cmsLogo.trim() : "";
  if (!raw || PLACEHOLDER_LOGO_PATHS.has(raw)) {
    return COMMITERS_HEADER_LOGO_SRC;
  }
  return resolveCmsMediaUrl(raw);
}

export function footerBrandLogoSrc(): string {
  return COMMITERS_HEADER_LOGO_SRC;
}
