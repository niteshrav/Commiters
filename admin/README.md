# Commiters Admin (local only)

The CMS admin panel is **not deployed on DC Deploy**. Run it on your machine when you need to edit content.

Production deploys only `frontend` and `api` (see `dcdeploy.yaml`).

## Quick start — local admin → production API

```bash
cd admin
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) and sign in with your production admin credentials.

Requests go to `https://api.commiters.com` through the Vite dev proxy (`/api`, `/uploads`), so you do **not** need to change production `CORS_ORIGIN`.

## Local admin → local backend

Use this when developing API or CMS changes end-to-end:

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — admin
cd admin
cp .env.local-api.example .env.local-api
npm run dev:local-api
```

## Environment variables

| Variable | Purpose |
|----------|---------|
| `ADMIN_DEV_API_PROXY_TARGET` | API origin for the Vite dev proxy (default: `https://api.commiters.com`) |
| `VITE_SITE_URL` | “View site” link in the admin header |
| `VITE_PUBLIC_SITE_URL` | Public URLs shown on job management pages |
| `VITE_API_BASE_URL` | Only for a static `vite build` preview/deploy — leave unset for `npm run dev` |

## Scripts

| Command | API target |
|---------|------------|
| `npm run dev` | Production API (via `.env` or default) |
| `npm run dev:local-api` | Local backend (`http://localhost:4000`) |
