export type NavItem = {
  label: string;
  to: string;
  icon: string;
  end?: boolean;
};

export type NavSection = {
  heading?: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    items: [{ label: "Dashboard", to: "/", icon: "dashboard", end: true }],
  },
  {
    heading: "Content Management",
    items: [
      { label: "Hero", to: "/hero", icon: "home" },
      { label: "Navbar", to: "/navbar", icon: "menu" },
      { label: "About", to: "/about", icon: "info" },
      { label: "Services", to: "/services", icon: "design_services" },
      { label: "Projects", to: "/projects", icon: "rocket_launch" },
      { label: "Blogs", to: "/blogs", icon: "article" },
      { label: "Publish Article", to: "/technical-ledger", icon: "post_add" },
      { label: "Team", to: "/team", icon: "groups" },
      { label: "Testimonials", to: "/testimonials", icon: "reviews" },
      { label: "FAQs", to: "/faqs", icon: "quiz" },
      { label: "Footer", to: "/footer", icon: "vertical_align_bottom" },
      { label: "Media Library", to: "/media", icon: "perm_media" },
    ],
  },
  {
    heading: "Careers",
    items: [
      { label: "Job Positions", to: "/jobs", icon: "work" },
      { label: "Contact Queries", to: "/contact-queries", icon: "forum" },
    ],
  },
  {
    heading: "Settings",
    items: [
      { label: "Contact Settings", to: "/contact-settings", icon: "contact_mail" },
      { label: "Website Settings", to: "/website-settings", icon: "tune" },
      { label: "Admin Profile", to: "/profile", icon: "account_circle" },
    ],
  },
];
