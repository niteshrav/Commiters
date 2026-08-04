import { HOME_PAGE_ASSETS, HOME_PAGE_COPY } from "../homePageContent";
import { ROUTES } from "../routes";
import { ADMIN_PANEL_URL } from "../siteAdmin";
import { hasCmsDoc } from "./api";
import { useCms } from "./CmsProvider";
import {
  resolveAbout,
  resolveContactStudio,
  resolveFooter,
  resolveJoinUsPositions,
  resolveLeadServices,
  resolveNavbar,
  resolveServicesGrid,
} from "./mappers";

export function useHeroContent() {
  const { bundle } = useCms();
  const fallback = HOME_PAGE_COPY.hero;

  if (!hasCmsDoc(bundle?.hero)) {
    return {
      title: fallback.title,
      subtext: fallback.subtext,
      ctaPrimary: fallback.ctaPrimary,
      ctaPrimaryTo: fallback.ctaPrimaryTo,
      ctaSecondary: fallback.ctaSecondary,
      ctaSecondaryTo: ROUTES.about,
      heroImage: HOME_PAGE_ASSETS.heroMonitor,
      heroImage2x: HOME_PAGE_ASSETS.heroMonitor2x,
      badgeText: undefined as string | undefined,
    };
  }

  const hero = bundle!.hero!;
  return {
    title: hero.heading || fallback.title,
    subtext: hero.description || fallback.subtext,
    ctaPrimary: hero.primaryButtonLabel || fallback.ctaPrimary,
    ctaPrimaryTo: hero.primaryButtonUrl || fallback.ctaPrimaryTo,
    ctaSecondary: hero.secondaryButtonLabel || fallback.ctaSecondary,
    ctaSecondaryTo: hero.secondaryButtonUrl || ROUTES.about,
    heroImage: hero.heroImage || HOME_PAGE_ASSETS.heroMonitor,
    heroImage2x: hero.heroImage || HOME_PAGE_ASSETS.heroMonitor2x,
    badgeText: hero.badgeText,
  };
}

export function useWebsiteSettings() {
  const { bundle } = useCms();
  const settings = bundle?.settings;
  return {
    websiteName: typeof settings?.websiteName === "string" ? settings.websiteName : "Commiters",
    seoTitle: typeof settings?.seoTitle === "string" ? settings.seoTitle : undefined,
    metaDescription: typeof settings?.metaDescription === "string" ? settings.metaDescription : undefined,
    favicon: typeof settings?.favicon === "string" ? settings.favicon : undefined,
    openGraphImage: typeof settings?.openGraphImage === "string" ? settings.openGraphImage : undefined,
  };
}

export function useNavbarContent() {
  const { bundle } = useCms();
  return resolveNavbar(bundle?.navbar ?? null);
}

export function useFooterContent() {
  const { bundle } = useCms();
  return resolveFooter(bundle?.footer ?? null);
}

export function useServicesGrid() {
  const { bundle } = useCms();
  return resolveServicesGrid(bundle?.services ?? null);
}

export function useAboutContent() {
  const { bundle } = useCms();
  return resolveAbout(bundle?.about ?? null);
}

export function useContactStudioContent() {
  const { bundle } = useCms();
  return resolveContactStudio(bundle?.contact ?? null);
}

export function useJoinUsPositions() {
  const { bundle } = useCms();
  return resolveJoinUsPositions(bundle?.jobs ?? null);
}

export function useLeadServiceOptions() {
  const { bundle } = useCms();
  return resolveLeadServices(bundle?.services ?? null);
}

export function useCmsTestimonials() {
  const { bundle } = useCms();
  return bundle?.testimonials?.length ? bundle.testimonials : null;
}

export function useCmsProjects() {
  const { bundle } = useCms();
  return bundle?.projects?.length ? bundle.projects : null;
}

export function useCmsFaqs() {
  const { bundle } = useCms();
  return bundle?.faqs?.length ? bundle.faqs : null;
}

export { useFaqPageContent } from "./faq";

export function useCmsBlogs() {
  const { bundle } = useCms();
  return bundle?.blogs?.length ? bundle.blogs : null;
}

export { ADMIN_PANEL_URL };
