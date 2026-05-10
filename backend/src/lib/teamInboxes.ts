/**
 * Staff notification addresses (mirrors frontend `siteContact` emails).
 * Use for SMTP To/Cc/Bcc when lead alerts are implemented — both always receive team mail.
 */
export const TEAM_INBOX_PRIMARY = "hello@commiters.com";
export const TEAM_INBOX_SECONDARY = "commitersudaipur@gmail.com";

export function teamInboxRecipients(): readonly [string, string] {
  return [TEAM_INBOX_PRIMARY, TEAM_INBOX_SECONDARY];
}

/** Comma-separated, no spaces — suitable for SMTP `to` or mailto URI path. */
export function teamInboxRecipientsJoined(): string {
  return `${TEAM_INBOX_PRIMARY},${TEAM_INBOX_SECONDARY}`;
}
