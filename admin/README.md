# Commiters Admin

The CMS admin panel can run **locally** or be deployed as its own static service on DC Deploy.

Production stack (see `dcdeploy.yaml`):

- `https://www.commiters.com` — public website
- `https://api.commiters.com` — backend API
- `https://admin.commiters.com` — CMS admin (recommended hostname)

## Local admin → production API

```bash
cd admin
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) and sign in with your production admin credentials.

Requests go to `https://api.commiters.com` through the Vite dev proxy (`/api`, `/uploads`).

## Local admin → local backend

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — admin
cd admin
cp .env.local-api.example .env.local-api
npm run dev:local-api
```

## Deploy admin live (DC Deploy)

1. Map `admin.commiters.com` to the `admin` service in DC Deploy.
2. Build with production env vars from `admin/.env.production.example`:
   - `VITE_API_BASE_URL=https://api.commiters.com`
   - `VITE_SITE_URL=https://www.commiters.com`
3. Ensure production API `CORS_ORIGIN` includes `https://admin.commiters.com`.
4. Set frontend production build `VITE_ADMIN_URL=https://admin.commiters.com` so the footer staff link opens the live admin console.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `ADMIN_DEV_API_PROXY_TARGET` | API origin for the Vite dev proxy (default: `https://api.commiters.com`) |
| `VITE_SITE_URL` | “View site” link in the admin header |
| `VITE_PUBLIC_SITE_URL` | Public URLs shown on job management pages |
| `VITE_API_BASE_URL` | Required for Docker / production `vite build` |

## Scripts

| Command | API target |
|---------|------------|
| `npm run dev` | Production API (via `.env` or default) |
| `npm run dev:local-api` | Local backend (`http://localhost:4000`) |
