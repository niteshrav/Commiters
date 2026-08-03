# Static website deploy (no database or admin)

Deploy **only** the `frontend` folder. Pages, SEO assets, and marketing content work without MongoDB or the API.

## Build

```bash
cd frontend
npm ci
npm run build
```

Output: `frontend/dist/` — upload this folder to your host, or connect the repo with root directory `frontend`.

Do **not** set `VITE_API_BASE_URL` or `VITE_ADMIN_URL` until the backend and admin are live. Production builds without those variables will:

- Use built-in page copy (no CMS fetch)
- Show an empty Open Positions list (no error)
- Email **Contact** and **Join Us** submissions to **hello@commiters.com** (via FormSubmit; mailto backup if needed)
- Show a clear message on Join Us if API submissions are disabled
- Hide the footer staff admin link

## Host settings

| Platform | Notes |
|----------|--------|
| **Netlify** | Base directory: `frontend`, build: `npm run build`, publish: `dist`. SPA redirect is in `public/_redirects`. |
| **Vercel** | Root: `frontend`, `vercel.json` included for SPA routes. |
| **Any static host** | Serve `dist` and rewrite all routes to `index.html`. |

## Google Search Console

Verification file: `public/google990190344b1517ae.html` (copied into `dist` on build).

## Later: enable API + admin

Create `frontend/.env.production`:

```
VITE_API_BASE_URL=https://your-api-host
VITE_ADMIN_URL=https://your-admin-host
```

Rebuild and redeploy.

## Form email (hello@commiters.com)

Submissions use [FormSubmit](https://formsubmit.co). The **first** time someone submits from your live domain, FormSubmit may email **hello@commiters.com** an activation link — open it once so future form data is delivered to that inbox.

## Local dev without backend

```bash
# in frontend/.env.local
VITE_ENABLE_BACKEND=false
```
