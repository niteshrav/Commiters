# Commiters Website (React + Node + Supabase)

[![Repository](https://img.shields.io/badge/GitHub-niteshrav%2FCommitters-181717?logo=github)](https://github.com/niteshrav/Committers)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=white)](./frontend)
[![Backend](https://img.shields.io/badge/Backend-Node%20%2B%20Express-339933?logo=node.js&logoColor=white)](./backend)
[![Database](https://img.shields.io/badge/Database-Supabase%20Postgres-3ECF8E?logo=supabase&logoColor=white)](./database)

This repo is split into 3 folders:

- `frontend/` - React website (routing, UI, contact form)
- `backend/` - Node.js API (contact/leads endpoint)
- `database/` - Prisma schema for Supabase PostgreSQL

## Domain

- Public website URL: `https://www.commiters.com`
- Email: `hello@commiters.com`, `commitersudaipur@gmail.com`

## Run locally (after dependencies are installed)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Contact form behavior (MVP)

The frontend posts inquiry data to the backend API, which stores it in Supabase (Prisma).

Email notifications are optional and only work if SMTP env vars are enabled in `backend/.env`.

## Next steps to deploy

1. Deploy `frontend/` to Vercel.
2. Deploy `backend/` to Render.
3. Configure `backend/` to connect to Supabase Postgres.
4. Map domains:
   - `www.commiters.com` -> frontend
   - `api.commiters.com` -> backend

## Release and tag strategy

Use simple semantic versioning tags to keep deploys traceable:

- `vMAJOR.MINOR.PATCH` tags for releases (example: `v1.2.0`).
- `PATCH` for fixes only, `MINOR` for backward-compatible features, `MAJOR` for breaking changes.
- Tag only tested commits from `main`.
- Add short release notes for each tag (what changed and why).

Suggested workflow:

1. Merge feature/fix branches into `main`.
2. Run tests and type checks (`frontend` and `backend`).
3. Create tag and push:

```bash
git tag -a v0.1.0 -m "First public release"
git push origin v0.1.0
```

4. Create a GitHub Release from that tag and include:
   - highlights,
   - migration/env changes (if any),
   - rollback note (previous stable tag).
