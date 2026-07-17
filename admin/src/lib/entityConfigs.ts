export type FieldType = "text" | "textarea" | "number" | "checkbox" | "select" | "tags" | "image" | "images";

export type FieldConfig = {
  key: string;
  label: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  rows?: number;
};

export type StudioTableConfig = {
  primaryKey: string;
  primaryLabel: string;
  categoryKey?: string;
  categoryLabel?: string;
  imageKey?: string;
  imageFromArray?: string;
  statusKey?: string;
  statusPublishedValues?: unknown[];
  statusPublishedLabel?: string;
  statusDraftLabel?: string;
  dateKey?: "updatedAt" | "createdAt";
};

export type EntityConfig = {
  title: string;
  description?: string;
  addButtonLabel?: string;
  singularName?: string;
  endpoint: string;
  columns: string[];
  fields: FieldConfig[];
  defaultValues?: Record<string, unknown>;
  studio?: StudioTableConfig;
};

export const ENTITY_CONFIGS: Record<string, EntityConfig> = {
  services: {
    title: "Services",
    description: "Manage service offerings shown on the public website.",
    addButtonLabel: "Add Service",
    singularName: "Service",
    endpoint: "/api/admin/services",
    columns: ["title", "icon", "order", "isActive"],
    studio: {
      primaryKey: "title",
      primaryLabel: "Service",
      categoryKey: "icon",
      categoryLabel: "Icon",
      statusKey: "isActive",
      statusPublishedValues: [true],
      statusPublishedLabel: "Active",
      statusDraftLabel: "Hidden",
      dateKey: "updatedAt",
    },
    fields: [
      { key: "title", label: "Title" },
      { key: "icon", label: "Icon", placeholder: "website | webapp | mobile | ecommerce | ai | mvp | automation" },
      { key: "description", label: "Description", type: "textarea", rows: 4 },
      { key: "slug", label: "Slug" },
      { key: "order", label: "Order", type: "number" },
      { key: "isActive", label: "Active", type: "checkbox" },
    ],
    defaultValues: { order: 0, isActive: true, icon: "code" },
  },
  projects: {
    title: "Our Work",
    description: "Manage your studio portfolio, case studies, and engineering highlights.",
    addButtonLabel: "Add New Project",
    singularName: "Project",
    endpoint: "/api/admin/projects",
    columns: ["name", "category", "isFeatured", "isActive"],
    studio: {
      primaryKey: "name",
      primaryLabel: "Project Name",
      categoryKey: "category",
      categoryLabel: "Category",
      imageFromArray: "images",
      statusKey: "isActive",
      statusPublishedValues: [true],
      statusPublishedLabel: "Published",
      statusDraftLabel: "Draft",
      dateKey: "updatedAt",
    },
    fields: [
      { key: "name", label: "Project Title", placeholder: "e.g. Commiters.com" },
      { key: "category", label: "Category", placeholder: "Web Platform" },
      { key: "description", label: "Case Study Summary", type: "textarea", rows: 4, placeholder: "Describe the challenge and solution..." },
      { key: "images", label: "Project Hero Image", type: "images" },
      { key: "technologies", label: "Technologies (comma-separated)", type: "tags" },
      { key: "projectUrl", label: "Project URL" },
      { key: "slug", label: "Slug" },
      { key: "order", label: "Order", type: "number" },
      { key: "isFeatured", label: "Featured", type: "checkbox" },
      { key: "isActive", label: "Active", type: "checkbox" },
    ],
    defaultValues: { order: 0, isFeatured: false, isActive: true, images: [], technologies: [] },
  },
  blogs: {
    title: "Technical Ledger",
    description: "Manage blog posts and technical articles for the public site.",
    addButtonLabel: "Post Blog Entry",
    singularName: "Blog Post",
    endpoint: "/api/admin/blogs",
    columns: ["title", "slug", "author", "isPublished"],
    studio: {
      primaryKey: "title",
      primaryLabel: "Title",
      categoryKey: "author",
      categoryLabel: "Author",
      imageKey: "coverImage",
      statusKey: "isPublished",
      statusPublishedValues: [true],
      dateKey: "updatedAt",
    },
    fields: [
      { key: "title", label: "Title" },
      { key: "slug", label: "Slug" },
      { key: "author", label: "Author" },
      { key: "summary", label: "Summary", type: "textarea", rows: 2 },
      { key: "content", label: "Content (Rich Text / HTML / Markdown)", type: "textarea", rows: 12 },
      { key: "coverImage", label: "Cover Image", type: "image" },
      { key: "tags", label: "Tags (comma-separated)", type: "tags" },
      { key: "isPublished", label: "Published", type: "checkbox" },
    ],
    defaultValues: { isPublished: false, tags: [] },
  },
  team: {
    title: "Team Members",
    description: "Manage team profiles displayed on the website.",
    addButtonLabel: "Add Team Member",
    singularName: "Team Member",
    endpoint: "/api/admin/team",
    columns: ["name", "designation", "order", "isActive"],
    studio: {
      primaryKey: "name",
      primaryLabel: "Name",
      categoryKey: "designation",
      categoryLabel: "Role",
      imageKey: "image",
      statusKey: "isActive",
      statusPublishedValues: [true],
      dateKey: "updatedAt",
    },
    fields: [
      { key: "name", label: "Name" },
      { key: "designation", label: "Designation" },
      { key: "bio", label: "Bio", type: "textarea", rows: 4 },
      { key: "image", label: "Profile Photo", type: "image" },
      { key: "linkedin", label: "LinkedIn URL" },
      { key: "github", label: "GitHub URL" },
      { key: "order", label: "Order", type: "number" },
      { key: "isActive", label: "Active", type: "checkbox" },
    ],
    defaultValues: { order: 0, isActive: true },
  },
  testimonials: {
    title: "Testimonials",
    description: "Manage client testimonials and social proof content.",
    addButtonLabel: "Add Testimonial",
    singularName: "Testimonial",
    endpoint: "/api/admin/testimonials",
    columns: ["clientName", "company", "rating", "isActive"],
    studio: {
      primaryKey: "clientName",
      primaryLabel: "Client",
      categoryKey: "company",
      categoryLabel: "Company",
      imageKey: "photo",
      statusKey: "isActive",
      statusPublishedValues: [true],
      dateKey: "updatedAt",
    },
    fields: [
      { key: "clientName", label: "Client Name" },
      { key: "company", label: "Company" },
      { key: "review", label: "Review", type: "textarea", rows: 4 },
      { key: "rating", label: "Rating (1-5)", type: "number" },
      { key: "photo", label: "Client Photo", type: "image" },
      { key: "order", label: "Order", type: "number" },
      { key: "isActive", label: "Active", type: "checkbox" },
    ],
    defaultValues: { rating: 5, order: 0, isActive: true },
  },
  faqs: {
    title: "FAQs",
    description: "Manage frequently asked questions for the website.",
    addButtonLabel: "Add FAQ",
    singularName: "FAQ",
    endpoint: "/api/admin/faqs",
    columns: ["question", "category", "order", "isActive"],
    studio: {
      primaryKey: "question",
      primaryLabel: "Question",
      statusKey: "isActive",
      statusPublishedValues: [true],
      dateKey: "updatedAt",
    },
    fields: [
      { key: "question", label: "Question" },
      { key: "answer", label: "Answer", type: "textarea", rows: 4 },
      {
        key: "category",
        label: "Category",
        type: "select",
        options: [
          { value: "process", label: "Process & Delivery" },
          { value: "technical", label: "Technical Expertise" },
          { value: "engagements", label: "Engagements" },
        ],
      },
      { key: "order", label: "Order", type: "number" },
      { key: "isActive", label: "Active", type: "checkbox" },
    ],
    defaultValues: { category: "process", order: 0, isActive: true },
  },
  jobs: {
    title: "Careers",
    description: "Manage open roles shown on the Join Us page.",
    addButtonLabel: "Add Position",
    singularName: "Position",
    endpoint: "/api/admin/jobs",
    columns: ["title", "location", "status", "order"],
    studio: {
      primaryKey: "title",
      primaryLabel: "Position",
      categoryKey: "location",
      categoryLabel: "Location",
      statusKey: "status",
      statusPublishedValues: ["open"],
      statusPublishedLabel: "Open",
      statusDraftLabel: "Closed",
      dateKey: "updatedAt",
    },
    fields: [
      { key: "title", label: "Job Title" },
      { key: "description", label: "Description", type: "textarea", rows: 4 },
      { key: "requirements", label: "Requirements (one per line)", type: "textarea", rows: 4 },
      { key: "location", label: "Location" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "open", label: "Open" },
          { value: "closed", label: "Closed" },
        ],
      },
      { key: "order", label: "Order", type: "number" },
    ],
    defaultValues: { status: "open", order: 0, requirements: [] },
  },
};

export type SingletonConfig = {
  title: string;
  endpoint: string;
  fields: FieldConfig[];
};

export const SINGLETON_CONFIGS: Record<string, SingletonConfig> = {
  hero: {
    title: "Hero Section",
    endpoint: "/api/admin/hero",
    fields: [
      { key: "badgeText", label: "Badge Text" },
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", type: "textarea" as const, rows: 4 },
      { key: "heroImage", label: "Hero Image", type: "image" as const },
      { key: "primaryButtonLabel", label: "Primary Button Label" },
      { key: "primaryButtonUrl", label: "Primary Button URL" },
      { key: "secondaryButtonLabel", label: "Secondary Button Label" },
      { key: "secondaryButtonUrl", label: "Secondary Button URL" },
      { key: "sprintLabel", label: "Sprint Label" },
      { key: "sprintValue", label: "Sprint Value" },
    ],
  },
  about: {
    title: "About Section",
    endpoint: "/api/admin/about",
    fields: [
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", type: "textarea" as const, rows: 4 },
      { key: "mission", label: "Mission", type: "textarea" as const, rows: 3 },
      { key: "vision", label: "Vision", type: "textarea" as const, rows: 3 },
      { key: "images", label: "About Images", type: "images" as const },
    ],
  },
  contact: {
    title: "Contact Settings",
    endpoint: "/api/admin/contact-settings",
    fields: [
      { key: "companyName", label: "Company Name" },
      { key: "address", label: "Address", type: "textarea" as const, rows: 3 },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "googleMapEmbedUrl", label: "Google Map Embed URL" },
      { key: "googleMapDirectionsUrl", label: "Google Map Directions URL" },
      { key: "whatsappUrl", label: "WhatsApp URL" },
      { key: "calendarUrl", label: "Calendar URL" },
    ],
  },
  footer: {
    title: "Footer",
    endpoint: "/api/admin/footer",
    fields: [
      { key: "logo", label: "Footer Logo", type: "image" as const },
      { key: "description", label: "Description", type: "textarea" as const, rows: 3 },
      { key: "copyright", label: "Copyright" },
    ],
  },
  settings: {
    title: "Website Settings",
    endpoint: "/api/admin/website-settings",
    fields: [
      { key: "websiteName", label: "Website Name" },
      { key: "seoTitle", label: "SEO Title" },
      { key: "metaDescription", label: "Meta Description", type: "textarea" as const, rows: 3 },
      { key: "favicon", label: "Favicon", type: "image" as const },
      { key: "openGraphImage", label: "Open Graph Image", type: "image" as const },
    ],
  },
};
