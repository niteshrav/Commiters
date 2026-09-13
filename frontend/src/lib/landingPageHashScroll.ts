import { isOpsFlowPath } from "./opsFlowHashScroll";
import { ROUTES } from "./routes";
import { isTrustTapPath } from "./trustTapHashScroll";

export const LANDING_PAGE_HASH_SCROLL_DELAY_MS = 100 as const;
export const LANDING_PAGE_HASH_SCROLL_EXTRA_OFFSET_PX = 8 as const;
export const LANDING_PAGE_HASH_SCROLL_FALLBACK_HEADER_PX = 80 as const;

export function isServicesPath(pathname: string) {
  return pathname === ROUTES.services;
}

export function isAboutPath(pathname: string) {
  return pathname === ROUTES.about;
}

export function usesLandingPageHashScroll(pathname: string) {
  return isOpsFlowPath(pathname) || isTrustTapPath(pathname) || isServicesPath(pathname) || isAboutPath(pathname);
}

export function measureLandingPageHeaderHeight(header: { getBoundingClientRect: () => { height: number } } | null) {
  return header ? header.getBoundingClientRect().height : LANDING_PAGE_HASH_SCROLL_FALLBACK_HEADER_PX;
}

export function landingPageHashExtraOffset(_targetId?: string) {
  return LANDING_PAGE_HASH_SCROLL_EXTRA_OFFSET_PX;
}

export function landingPageHashOffsetTop(
  elementTop: number,
  pageYOffset: number,
  headerHeight: number,
  extraOffset: number = LANDING_PAGE_HASH_SCROLL_EXTRA_OFFSET_PX,
) {
  return Math.max(0, elementTop + pageYOffset - (headerHeight + extraOffset));
}

export function scrollWindowTo(top: number) {
  try {
    window.scrollTo({ top, behavior: "smooth" });
  } catch {
    window.scrollTo(0, top);
  }
}

export function resolveLandingPageScrollAnchor(element: Element): HTMLElement {
  const heroTitle = element.querySelector("h1");
  if (heroTitle instanceof HTMLElement) {
    return heroTitle;
  }

  const kicker = element.querySelector("[class*='kicker'], [class*='eyebrow']");
  if (kicker instanceof HTMLElement) {
    return kicker;
  }

  const heading = element.querySelector("h2, h3");
  if (heading instanceof HTMLElement) {
    return heading;
  }

  return element instanceof HTMLElement ? element : document.body;
}

export function scrollLandingPageAnchorIntoView(element: HTMLElement) {
  const header = document.querySelector("header");
  const headerHeight = measureLandingPageHeaderHeight(header);
  const extraClearance = landingPageHashExtraOffset(element.id);
  const anchor = resolveLandingPageScrollAnchor(element);
  const targetPosition = landingPageHashOffsetTop(
    anchor.getBoundingClientRect().top,
    window.pageYOffset,
    headerHeight,
    extraClearance,
  );
  scrollWindowTo(targetPosition);
}
