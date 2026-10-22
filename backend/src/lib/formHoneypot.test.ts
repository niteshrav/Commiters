import { describe, expect, it } from "vitest";
import { isHoneypotTriggered, LEAD_HONEYPOT_FIELD } from "./formHoneypot";

describe("formHoneypot", () => {
  it("treats empty and whitespace as human submissions", () => {
    expect(LEAD_HONEYPOT_FIELD).toBe("website");
    expect(isHoneypotTriggered(undefined)).toBe(false);
    expect(isHoneypotTriggered("")).toBe(false);
    expect(isHoneypotTriggered("   ")).toBe(false);
  });

  it("treats any filled website value as a bot", () => {
    expect(isHoneypotTriggered("https://spam.example")).toBe(true);
    expect(isHoneypotTriggered("x")).toBe(true);
  });
});
