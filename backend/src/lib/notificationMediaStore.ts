import { randomBytes } from "node:crypto";

type StoredMedia = {
  buffer: Buffer;
  contentType: string;
  expiresAt: number;
};

const MEDIA_TTL_MS = 10 * 60 * 1000;
const store = new Map<string, StoredMedia>();

function purgeExpired(now = Date.now()) {
  for (const [token, entry] of store.entries()) {
    if (entry.expiresAt <= now) store.delete(token);
  }
}

export function registerNotificationMedia(buffer: Buffer): string {
  purgeExpired();
  const token = randomBytes(24).toString("hex");
  store.set(token, {
    buffer,
    contentType: "application/pdf",
    expiresAt: Date.now() + MEDIA_TTL_MS,
  });
  return token;
}

export function getNotificationMedia(token: string): { buffer: Buffer; contentType: string } | null {
  purgeExpired();
  const entry = store.get(token);
  if (!entry) return null;
  return { buffer: entry.buffer, contentType: entry.contentType };
}

/** Test helper */
export function clearNotificationMediaStore() {
  store.clear();
}
