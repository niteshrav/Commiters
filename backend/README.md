# Commiters Backend (Node + Express + Prisma)

This backend exposes an API for the website contact form.

## Environment variables

Copy `./.env.example` to `./.env`.

- `PORT` - API port (default: 4000)
- `CORS_ORIGIN` - frontend origin for local development
- `DATABASE_URL` - Supabase Postgres connection string for Prisma
- `SMTP_ENABLED` - optional; enable email notifications

When SMTP notifications are wired up, send staff alerts to **both** team inboxes (`hello@commiters.com` and `commitersudaipur@gmail.com`). Shared helpers live in `src/lib/teamInboxes.ts` (`teamInboxRecipients`, `teamInboxRecipientsJoined`).

## Available endpoints (MVP)

- `GET /api/health` - health check
- `POST /api/leads` - stores lead/inquiry in Supabase

