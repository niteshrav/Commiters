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
import { login, me, registerInitialAdmin, updatePassword, updateProfile } from "../controllers/authController";
import { postTechnicalLedgerArticle } from "../../controllers/technicalLedgerController";
import { createCrudController, createSingletonController } from "../controllers/crudFactory";
import { getDashboardStats } from "../controllers/dashboardController";
import {
  deleteContactQuery,
  getContactQuery,
  listContactQueries,
  markContactQueryRead,
} from "../controllers/contactQueryController";
import { deleteMedia, listMedia, uploadMedia } from "../controllers/mediaController";
import { authenticate, requireAdmin, requireMongo } from "../middleware/auth";
import { requireJson } from "../../middleware/requireJson";
import { uploadImage } from "../middleware/upload";

export const adminRouter = Router();

adminRouter.use(requireMongo);
adminRouter.post("/auth/register", registerInitialAdmin);
adminRouter.post("/auth/login", login);
adminRouter.get("/auth/me", authenticate, requireAdmin, me);
adminRouter.patch("/auth/profile", authenticate, requireAdmin, updateProfile);
adminRouter.patch("/auth/password", authenticate, requireAdmin, updatePassword);

adminRouter.use(authenticate, requireAdmin);

adminRouter.get("/dashboard", getDashboardStats);
adminRouter.post("/technical-ledger/articles", requireJson, postTechnicalLedgerArticle);

const hero = createSingletonController(HeroSection);
const navbar = createSingletonController(Navbar);
const about = createSingletonController(AboutSection);
const contact = createSingletonController(ContactSettings);
const footer = createSingletonController(Footer);
const settings = createSingletonController(WebsiteSettings);

adminRouter.get("/hero", hero.getPublic);
adminRouter.put("/hero", hero.upsert);
adminRouter.get("/navbar", navbar.getPublic);
adminRouter.put("/navbar", navbar.upsert);
adminRouter.get("/about", about.getPublic);
adminRouter.put("/about", about.upsert);
adminRouter.get("/contact-settings", contact.getPublic);
adminRouter.put("/contact-settings", contact.upsert);
adminRouter.get("/footer", footer.getPublic);
adminRouter.put("/footer", footer.upsert);
adminRouter.get("/website-settings", settings.getPublic);
adminRouter.put("/website-settings", settings.upsert);

function mountCrud(path: string, controller: ReturnType<typeof createCrudController>) {
  adminRouter.get(path, controller.list);
  adminRouter.get(`${path}/:id`, controller.getById);
  adminRouter.post(path, controller.create);
  adminRouter.put(`${path}/:id`, controller.update);
  adminRouter.delete(`${path}/:id`, controller.remove);
}

mountCrud(
  "/services",
  createCrudController({ model: Service, searchFields: ["title", "description"], defaultSort: "order" }),
);
mountCrud(
  "/projects",
  createCrudController({ model: Project, searchFields: ["name", "category", "description"], defaultSort: "order" }),
);
mountCrud(
  "/blogs",
  createCrudController({ model: Blog, searchFields: ["title", "content", "tags"], defaultSort: "publishedAt" }),
);
mountCrud(
  "/team",
  createCrudController({ model: TeamMember, searchFields: ["name", "designation"], defaultSort: "order" }),
);
mountCrud(
  "/testimonials",
  createCrudController({ model: Testimonial, searchFields: ["clientName", "company", "review"], defaultSort: "order" }),
);
mountCrud(
  "/faqs",
  createCrudController({ model: Faq, searchFields: ["question", "answer"], defaultSort: "order" }),
);
mountCrud(
  "/jobs",
  createCrudController({ model: JobPosition, searchFields: ["title", "description"], defaultSort: "order" }),
);

adminRouter.get("/contact-queries", listContactQueries);
adminRouter.get("/contact-queries/:id", getContactQuery);
adminRouter.patch("/contact-queries/:id/read", markContactQueryRead);
adminRouter.delete("/contact-queries/:id", deleteContactQuery);

adminRouter.get("/media", listMedia);
adminRouter.post("/media/upload", uploadImage.single("file"), uploadMedia);
adminRouter.delete("/media/:id", deleteMedia);
