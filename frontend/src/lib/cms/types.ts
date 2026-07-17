export type CmsHero = {
  badgeText?: string;
  heading?: string;
  description?: string;
  heroImage?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
};

export type CmsBundle = {
  hero: CmsHero | null;
  navbar: Record<string, unknown> | null;
  about: Record<string, unknown> | null;
  contact: Record<string, unknown> | null;
  footer: Record<string, unknown> | null;
  settings: Record<string, unknown> | null;
  services: Record<string, unknown>[];
  projects: Record<string, unknown>[];
  blogs: Record<string, unknown>[];
  team: Record<string, unknown>[];
  testimonials: Record<string, unknown>[];
  faqs: Record<string, unknown>[];
  jobs: Record<string, unknown>[];
};

export type CmsContextValue = {
  bundle: CmsBundle | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};
