import { describe, expect, it } from "vitest";
import { getNotificationMedia, registerNotificationMedia } from "./notificationMediaStore";

describe("notificationMediaStore", () => {
  it("registers and retrieves PDF media by token", () => {
    const pdf = Buffer.from("%PDF-test-content");
    const token = registerNotificationMedia(pdf);

    expect(token.length).toBeGreaterThan(20);
    expect(getNotificationMedia(token)).toEqual({
      buffer: pdf,
      contentType: "application/pdf",
    });
  });

  it("returns null for unknown or expired tokens", () => {
    expect(getNotificationMedia("missing-token")).toBeNull();
  });
});
