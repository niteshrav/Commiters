# Commiters CMS — Setup & Migration Guide

This document describes the CMS architecture added to the Commiters monorepo. The public website **continues to work exactly as before** when MongoDB is empty or unavailable — all existing hardcoded TypeScript content remains the fallback.

---

## 1. Folder Structure

```
Committers/
├── admin/                          # NEW — React Admin Panel (port 5174)
│   ├── src/
│   │   ├── components/AdminLayout.tsx
│   │   ├── lib/api.ts
│   │   ├── pages/                  # Dashboard, CRUD modules, Media, Login
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   └── src/
│       ├── cms/                    # NEW — CMS module (MVC)
│       │   ├── config/database.ts
│       │   ├── controllers/
│       │   │   ├── authController.ts
│       │   │   ├── crudFactory.ts
│       │   │   ├── dashboardController.ts
│       │   │   ├── mediaController.ts
│       │   │   └── contactQueryController.ts
│       │   ├── middleware/
│       │   │   ├── auth.ts         # JWT + admin role
│       │   │   └── upload.ts       # Multer image uploads
│       │   ├── models/             # Mongoose schemas (16 collections)
│       │   ├── routes/
│       │   │   ├── admin.ts        # Protected admin APIs
│       │   │   └── cmsPublic.ts    # Public read APIs
│       │   ├── utils/
│       │   └── seed.ts             # Seed hardcoded defaults into MongoDB
│       ├── app.ts                  # MODIFIED — mounts CMS + serves /uploads
│       └── index.ts                # MODIFIED — connects MongoDB on startup
│
├── frontend/
│   └── src/lib/cms/                # NEW — CMS client with fallback
│       ├── api.ts
│       ├── CmsProvider.tsx
│       ├── hooks.ts
│       └── types.ts
│
└── CMS_SETUP.md                    # This file
```

---

## 2. MongoDB Schemas

| Collection | Purpose | Key Fields |
|-----------|---------|------------|
| `users` | Admin authentication | email, passwordHash, role (`admin`) |
| `herosections` | Home hero (singleton) | badgeText, heading, description, heroImage, buttons |
| `navbars` | Navigation (singleton) | logo, navLinks[], ctaLabel, ctaUrl |
| `aboutsections` | About (singleton) | heading, description, mission, vision, images[], statistics[] |
| `services` | Services CRUD | icon, title, description, order, isActive |
| `projects` | Portfolio CRUD | name, category, description, images[], technologies[], projectUrl, isFeatured |
| `blogs` | Technical Ledger CRUD | title, slug, author, coverImage, content, tags[], isPublished |
| `teammembers` | Team CRUD | name, designation, bio, image, linkedin, github, order |
| `testimonials` | Testimonials CRUD | clientName, company, review, rating, photo, order |
| `faqs` | FAQ CRUD | question, answer, order, isActive |
| `jobpositions` | Careers CRUD | title, description, requirements[], location, status |
| `contactsettings` | Contact (singleton) | companyName, address, email, phone, map URLs, socialLinks[] |
| `footers` | Footer (singleton) | logo, description, copyright, socialLinks[], quickLinks[] |
| `websitesettings` | SEO (singleton) | websiteName, seoTitle, metaDescription, favicon, openGraphImage |
| `media` | Media library | filename, url, mimeType, size, alt |
| `contactqueries` | Form submissions | name, email, serviceNeeded, message, isRead, source |

---

## 3. API Endpoints

### Public CMS (no auth) — `/api/cms`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cms/bundle` | All CMS content in one response (used by frontend) |
| GET | `/api/cms/hero` | Hero section |
| GET | `/api/cms/navbar` | Navbar |
| GET | `/api/cms/about` | About section |
| GET | `/api/cms/contact` | Contact settings |
| GET | `/api/cms/footer` | Footer |
| GET | `/api/cms/settings` | Website settings |
| GET | `/api/cms/services` | Active services (paginated, searchable) |
| GET | `/api/cms/projects` | Active projects |
| GET | `/api/cms/blogs` | Published blogs |
| GET | `/api/cms/blogs/slug/:slug` | Blog by slug |
| GET | `/api/cms/team` | Active team members |
| GET | `/api/cms/testimonials` | Active testimonials |
| GET | `/api/cms/faqs` | Active FAQs |
| GET | `/api/cms/jobs` | Open job positions |

Query params for list endpoints: `page`, `limit`, `search`, `sort`, `order`, plus module filters (`isActive`, `isPublished`, `status`, `isFeatured`, `isRead`).

### Admin (JWT required) — `/api/admin`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/auth/register` | Create first admin (only when no users exist) |
| POST | `/api/admin/auth/login` | Login → JWT token |
| GET | `/api/admin/auth/me` | Current admin profile |
| GET | `/api/admin/dashboard` | Dashboard counts |
| GET/PUT | `/api/admin/hero` | Hero singleton |
| GET/PUT | `/api/admin/navbar` | Navbar singleton |
| GET/PUT | `/api/admin/about` | About singleton |
| GET/PUT | `/api/admin/contact-settings` | Contact singleton |
| GET/PUT | `/api/admin/footer` | Footer singleton |
| GET/PUT | `/api/admin/website-settings` | SEO singleton |
| CRUD | `/api/admin/services` | Services |
| CRUD | `/api/admin/projects` | Projects |
| CRUD | `/api/admin/blogs` | Blogs |
| CRUD | `/api/admin/team` | Team members |
| CRUD | `/api/admin/testimonials` | Testimonials |
| CRUD | `/api/admin/faqs` | FAQs |
| CRUD | `/api/admin/jobs` | Job positions |
| GET | `/api/admin/contact-queries` | View enquiries |
| PATCH | `/api/admin/contact-queries/:id/read` | Mark read/unread |
| DELETE | `/api/admin/contact-queries/:id` | Delete enquiry |
| GET | `/api/admin/media` | List uploaded media |
| POST | `/api/admin/media/upload` | Upload image (multipart `file`) |
| DELETE | `/api/admin/media/:id` | Delete media |

### Existing APIs (unchanged)

- `POST /api/leads` — now also saves to `contactqueries` when MongoDB is available
- `POST /api/job-applications`
- `GET /api/health`

---

## 4. Files Modified / Added

### Added
- `admin/` — full admin React app
- `backend/src/cms/**` — CMS backend module
- `frontend/src/lib/cms/**` — CMS client + hooks
- `CMS_SETUP.md`

### Modified
- `backend/package.json` — mongoose, bcryptjs, jsonwebtoken, multer + `cms:seed` script
- `backend/.env.example` — MongoDB + JWT vars
- `backend/src/app.ts` — CMS routes, `/uploads` static, admin CORS ports
- `backend/src/index.ts` — MongoDB connection
- `backend/src/controllers/leadsController.ts` — persist leads to MongoDB
- `frontend/src/components/Layout.tsx` — wraps site in `CmsProvider`
- `frontend/src/components/HomeHeroStitch.tsx` — uses CMS hero with hardcoded fallback

### Not modified (UI preserved)
- All CSS/styles
- All page layouts and component markup (except data source wiring for hero)
- All existing hardcoded lib content files remain as fallbacks

---

## 5. Setup Instructions

### Prerequisites
- Node.js 22+
- MongoDB running locally or MongoDB Atlas URI

### 1. Backend

```bash
cd backend
cp .env.example .env
# Set MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run cms:seed      # Creates admin user + default CMS content
npm run dev           # http://localhost:4000
```

### 2. Frontend (public site)

```bash
cd frontend
npm install
npm run dev           # http://localhost:5173
```

### 3. Admin Panel

```bash
cd admin
cp .env.example .env
npm install
npm run dev           # http://localhost:5174
```

Login with the credentials from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in backend `.env`.

### Production notes
- Set strong `JWT_SECRET` and `ADMIN_PASSWORD`
- Add admin origin to `CORS_ORIGIN` (e.g. `https://admin.commiters.com`)
- Persist `uploads/` volume or use S3-compatible storage (future enhancement)
- Deploy admin as separate service on port 5174 or static build behind auth proxy

---

## 6. Migration Plan (Zero-Downtime)

### Phase 1 — Deploy infrastructure (safe, no visible change)
1. Deploy backend with `MONGODB_URI` configured
2. Do **not** run seed on production yet
3. Public site continues using hardcoded fallbacks (MongoDB empty → API returns `null`/empty arrays)

### Phase 2 — Seed content in staging
1. Run `npm run cms:seed` against staging MongoDB
2. Verify `/api/cms/bundle` returns data
3. Confirm public site renders CMS hero/content where wired, identical to hardcoded

### Phase 3 — Admin content editing
1. Deploy admin panel
2. Editors refine content in admin (images, copy, services, testimonials)
3. Each module can be migrated independently

### Phase 4 — Wire remaining frontend sections
The CMS layer is ready. Wire additional sections using the same pattern:

```typescript
// Example pattern (already used for hero)
const { bundle } = useCms();
const data = bundle?.services?.length ? mapCmsServices(bundle.services) : STITCH_SERVICES_GRID;
```

Recommended wiring order:
1. Hero ✅ (done)
2. Navbar + Footer
3. Services grid
4. Testimonials + Projects
5. About section
6. Contact settings
7. Join Us job positions
8. Technical Ledger blogs
9. Website settings (document title, meta tags)

### Phase 4 — Production seed
1. Run seed OR manually enter content via admin
2. Monitor: if MongoDB fails, site automatically falls back to hardcoded data

### Rollback
- Remove `MONGODB_URI` from backend env → CMS disabled, site uses hardcoded content only
- No database migration affects existing Prisma/email flows

---

## Fallback Behavior

| Condition | Public website behavior |
|-----------|------------------------|
| MongoDB not configured | Hardcoded content only |
| MongoDB empty | Hardcoded content only |
| MongoDB has partial data | CMS data where present; hardcoded for empty modules |
| MongoDB has full data | CMS data everywhere wired |
| API error / timeout | Hardcoded content (silent fallback) |

---

## Default Admin Credentials (after seed)

- Email: `admin@commiters.com` (or `ADMIN_EMAIL` env)
- Password: `ChangeMe123!` (or `ADMIN_PASSWORD` env)

**Change immediately in production.**
