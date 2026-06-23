# Commiters Backend (Node + Express + Prisma)

This backend exposes an API for the website contact form.

## Environment variables

Copy `./.env.example` to `./.env`.

- `PORT` - API port (default: 4000)
- `CORS_ORIGIN` - frontend origin for local development
- `DATABASE_URL` - Supabase Postgres connection string for Prisma
- `SMTP_ENABLED` - optional; enable email notifications

When SMTP notifications are wired up, send staff alerts to **both** team inboxes (`hello@commiters.com` and `commitersudaipur@gmail.com`) with a PDF attachment. Shared helpers live in `src/lib/teamInboxes.ts` (`teamInboxRecipients`, `teamInboxRecipientsJoined`).

When `WHATSAPP_ENABLED=true`, Twilio sends the same PDF to `WHATSAPP_NOTIFY_TO` using a short-lived media URL from `NOTIFICATION_PUBLIC_BASE_URL`.

## Available endpoints (MVP)

- `GET /api/health` - health check
- `POST /api/leads` - stores lead/inquiry in Supabase

