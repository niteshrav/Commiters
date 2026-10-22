import { describe, expect, it } from "vitest";
import { getRecaptchaSiteKey, getRecaptchaToken } from "./recaptcha";

describe("getRecaptchaToken", () => {
  it("returns undefined when no site key is configured", async () => {
    if (getRecaptchaSiteKey()) return;
    await expect(getRecaptchaToken()).resolves.toBeUndefined();
  });
});
