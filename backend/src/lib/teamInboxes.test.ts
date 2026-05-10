import { describe, expect, it } from "vitest";
import {
  TEAM_INBOX_PRIMARY,
  TEAM_INBOX_SECONDARY,
  teamInboxRecipients,
  teamInboxRecipientsJoined,
} from "./teamInboxes";

describe("teamInboxes", () => {
  it("lists hello@ and Gmail together for notifications", () => {
    expect(teamInboxRecipients()).toEqual([
      "hello@commiters.com",
      "commitersudaipur@gmail.com",
    ]);
    expect(TEAM_INBOX_PRIMARY).toBe("hello@commiters.com");
    expect(TEAM_INBOX_SECONDARY).toBe("commitersudaipur@gmail.com");
  });

  it("joins recipients for SMTP multi-recipient fields", () => {
    expect(teamInboxRecipientsJoined()).toBe(
      "hello@commiters.com,commitersudaipur@gmail.com",
    );
  });
});
