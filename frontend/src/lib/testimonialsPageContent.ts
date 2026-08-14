import type { Testimonial } from "./siteTrustContent";

export const TESTIMONIALS_PAGE_COPY = {
  title: "Client Testimonials",
  subtext:
    "Founders and product leaders share what it is like to ship web applications, travel platforms, and SaaS products with Commiters.",
} as const;

export const BROWSE_MY_VACATION_TESTIMONIAL: Testimonial = {
  quote:
    "The team did an incredible job bringing BrowseMyVacation to life. They transformed our ideas into a fast, reliable, and user-friendly travel platform that our customers love using. Their technical expertise, fast turnarounds, and proactive communication made the entire development process smooth and stress-free. If you're looking for a dedicated tech partner to build top-tier web applications, I can't recommend them enough!",
  name: "Rahul Kumawat",
  company: "Founder / Product Lead, BrowseMyVacation",
  country: "India",
  countryCode: "IN",
  initials: "RK",
  accent: "teal",
};

/** Static testimonials on /testimonials (CMS-free). */
export const TESTIMONIALS_PAGE_ITEMS: readonly Testimonial[] = [BROWSE_MY_VACATION_TESTIMONIAL];
