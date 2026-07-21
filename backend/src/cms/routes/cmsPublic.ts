import { Router } from "express";
import {
  AboutSection,
  Blog,
  ContactSettings,
  Faq,
  Footer,
  HeroSection,
  JobPosition,
  Navbar,
  Project,
  Service,
  TeamMember,
  Testimonial,
  WebsiteSettings,
} from "../models";
import { createCrudController, createSingletonController } from "../controllers/crudFactory";
import { getPublicJobBySlug } from "../controllers/jobController";
import { asyncHandler } from "../utils/asyncHandler";
import { isMongoConnected } from "../config/database";
import { publicJobFilter } from "../models/JobPosition";
import type { Request, Response, NextFunction } from "express";

export const cmsPublicRouter = Router();

const emptyBundle = {
  hero: null,
  navbar: null,
  about: null,
  contact: null,
  footer: null,
  settings: null,
  services: [],
  projects: [],
  blogs: [],
  team: [],
  testimonials: [],
  faqs: [],
  jobs: [],
};

cmsPublicRouter.use((req: Request, res: Response, next: NextFunction) => {
  if (isMongoConnected()) return next();

  if (req.path === "/bundle") {
    return res.json(emptyBundle);
  }

  if (req.method === "GET" && !req.path.includes("/")) {
    // singleton paths like /hero handled below via early return in handlers
  }

  if (req.method === "GET" && (req.path === "/hero" || req.path === "/navbar" || req.path === "/about" || req.path === "/contact" || req.path === "/footer" || req.path === "/settings")) {
    return res.json(null);
  }

  if (req.method === "GET") {
    return res.json({ items: [], total: 0, page: 1, limit: 20, totalPages: 1 });
  }

  return res.status(503).json({ error: "CMS database is unavailable." });
});

const hero = createSingletonController(HeroSection, { isActive: true });
const navbar = createSingletonController(Navbar, { isActive: true });
const about = createSingletonController(AboutSection, { isActive: true });
const contact = createSingletonController(ContactSettings);
const footer = createSingletonController(Footer);
const settings = createSingletonController(WebsiteSettings);

cmsPublicRouter.get("/hero", hero.getPublic);
cmsPublicRouter.get("/navbar", navbar.getPublic);
cmsPublicRouter.get("/about", about.getPublic);
cmsPublicRouter.get("/contact", contact.getPublic);
cmsPublicRouter.get("/footer", footer.getPublic);
cmsPublicRouter.get("/settings", settings.getPublic);

const services = createCrudController({ model: Service, searchFields: ["title", "description"], publicFilter: { isActive: true } });
const projects = createCrudController({ model: Project, searchFields: ["name", "category", "description"], publicFilter: { isActive: true } });
const blogs = createCrudController({ model: Blog, searchFields: ["title", "content", "tags"], publicFilter: { isPublished: true } });
const team = createCrudController({ model: TeamMember, searchFields: ["name", "designation"], publicFilter: { isActive: true } });
const testimonials = createCrudController({ model: Testimonial, searchFields: ["clientName", "company", "review"], publicFilter: { isActive: true } });
const faqs = createCrudController({ model: Faq, searchFields: ["question", "answer"], publicFilter: { isActive: true } });
const jobs = createCrudController({ model: JobPosition, searchFields: ["title", "description"], publicFilter: publicJobFilter() });

cmsPublicRouter.get("/services", services.list);
cmsPublicRouter.get("/services/:id", services.getById);
cmsPublicRouter.get("/projects", projects.list);
cmsPublicRouter.get("/projects/:id", projects.getById);
cmsPublicRouter.get("/blogs", blogs.list);
cmsPublicRouter.get("/blogs/:id", blogs.getById);
cmsPublicRouter.get("/blogs/slug/:slug", asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
  if (!blog) return res.status(404).json({ error: "Not found." });
  return res.json(blog);
}));
cmsPublicRouter.get("/team", team.list);
cmsPublicRouter.get("/team/:id", team.getById);
cmsPublicRouter.get("/testimonials", testimonials.list);
cmsPublicRouter.get("/testimonials/:id", testimonials.getById);
cmsPublicRouter.get("/faqs", faqs.list);
cmsPublicRouter.get("/faqs/:id", faqs.getById);
cmsPublicRouter.get("/jobs", jobs.list);
cmsPublicRouter.get("/jobs/slug/:slug", getPublicJobBySlug);
cmsPublicRouter.get("/jobs/:id", jobs.getById);

cmsPublicRouter.get("/bundle", asyncHandler(async (_req: Request, res: Response) => {
  const [
    heroDoc,
    navbarDoc,
    aboutDoc,
    contactDoc,
    footerDoc,
    settingsDoc,
    servicesDocs,
    projectsDocs,
    blogsDocs,
    teamDocs,
    testimonialsDocs,
    faqsDocs,
    jobsDocs,
  ] = await Promise.all([
    HeroSection.findOne({ isActive: true }).sort({ updatedAt: -1 }),
    Navbar.findOne({ isActive: true }).sort({ updatedAt: -1 }),
    AboutSection.findOne({ isActive: true }).sort({ updatedAt: -1 }),
    ContactSettings.findOne().sort({ updatedAt: -1 }),
    Footer.findOne().sort({ updatedAt: -1 }),
    WebsiteSettings.findOne().sort({ updatedAt: -1 }),
    Service.find({ isActive: true }).sort({ order: 1 }),
    Project.find({ isActive: true }).sort({ order: 1 }),
    Blog.find({ isPublished: true }).sort({ publishedAt: -1 }),
    TeamMember.find({ isActive: true }).sort({ order: 1 }),
    Testimonial.find({ isActive: true }).sort({ order: 1 }),
    Faq.find({ isActive: true }).sort({ order: 1 }),
    JobPosition.find(publicJobFilter()).sort({ featured: -1, displayOrder: 1, createdAt: -1 }),
  ]);

  return res.json({
    hero: heroDoc,
    navbar: navbarDoc,
    about: aboutDoc,
    contact: contactDoc,
    footer: footerDoc,
    settings: settingsDoc,
    services: servicesDocs,
    projects: projectsDocs,
    blogs: blogsDocs,
    team: teamDocs,
    testimonials: testimonialsDocs,
    faqs: faqsDocs,
    jobs: jobsDocs,
  });
}));
