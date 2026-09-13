/** Shared Cloud, Built Right theme for home and primary marketing pages. */
export const HOME_CLOUD_THEME_CLASS = "home-cloud-theme" as const;
export const SITE_CLOUD_THEME_CLASS = "site-cloud-theme" as const;
export const HOME_CLOUD_KICKER_CLASS = "home-cloud-kicker" as const;
export const HOME_CLOUD_TITLE_CLASS = "home-cloud-title" as const;
export const HOME_CLOUD_TITLE_ACCENT_CLASS = "home-cloud-title-accent" as const;
export const HOME_CLOUD_LEAD_CLASS = "home-cloud-lead" as const;

export const SITE_CLOUD_KICKER_SELECTORS = [
  ".home-cloud-kicker",
  ".about-intro-kicker",
  ".about-principles-kicker",
  ".about-journey-kicker",
  ".services-expertise-kicker",
  ".case-studies-intro-kicker",
  ".faq-intro-kicker",
  ".legal-intro-kicker",
  ".stitch-page-kicker",
  ".svc-detail-kicker",
  ".seo-landing-kicker",
  ".trusttap-kicker",
] as const;

export const SITE_CLOUD_TITLE_SELECTORS = [
  ".home-cloud-title",
  ".about-intro-title",
  ".about-principles-title",
  ".about-journey-title",
  ".about-craftsmanship-heading",
  ".about-bottom-cta-title",
  ".services-expertise-title",
  ".case-studies-intro-title",
  ".faq-intro-title",
  ".contact-intro-title",
  ".join-us-intro-title",
  ".legal-intro-title",
  ".technical-ledger-title",
  ".testimonials-intro-title",
  ".trusttap-hero-title",
  ".svc-detail-hero-title",
  ".stitch-page-title",
] as const;

export function withSiteCloudTheme(...classes: Array<string | false | null | undefined>): string {
  return [SITE_CLOUD_THEME_CLASS, ...classes].filter(Boolean).join(" ");
}

export const SITE_CLOUD_LEAD_SELECTORS = [
  ".home-cloud-lead",
  ".about-intro-body",
  ".about-principles-subtext",
  ".about-journey-subtext",
  ".about-craftsmanship-body",
  ".about-bottom-cta-subtext",
  ".services-expertise-body",
  ".case-studies-intro-subtext",
  ".faq-intro-body",
  ".contact-intro-body",
  ".join-us-intro-body",
  ".legal-intro-paragraph",
  ".technical-ledger-subtext",
  ".testimonials-intro-body",
  ".seo-landing-subtext",
] as const;

export const HOME_CLOUD_THEME = {
  heading: "#0f172a",
  body: "#64748b",
  kickerSize: "0.75rem",
  kickerWeight: "700",
  kickerTracking: "0.14em",
  titleSize: "clamp(2.2rem, 4vw, 3rem)",
  titleLineHeight: "1.08",
  titleTracking: "-0.03em",
  sectionPadding: "clamp(48px, 6vw, 80px) 0",
} as const;
