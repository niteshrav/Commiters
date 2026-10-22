import { afterEach, describe, expect, it, vi } from "vitest";
import { getRecaptchaSecret, verifyRecaptchaToken } from "./recaptcha";

describe("recaptcha", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("skips verification when no secret is configured", async () => {
    expect(getRecaptchaSecret({})).toBeNull();
    await expect(verifyRecaptchaToken(undefined, { env: {} })).resolves.toEqual({ ok: true });
  });

  it("requires a token when a secret is configured", async () => {
    const result = await verifyRecaptchaToken("", { env: { RECAPTCHA_SECRET_KEY: "test-secret" } });
    expect(result).toEqual({ ok: false, error: "reCAPTCHA verification is required." });
  });

  it("accepts a high-scoring contact token", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, score: 0.9, action: "contact" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await verifyRecaptchaToken("x".repeat(40), {
      env: { RECAPTCHA_SECRET_KEY: "test-secret" },
      remoteIp: "127.0.0.1",
    });

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.google.com/recaptcha/api/siteverify",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("rejects a low score", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, score: 0.1, action: "contact" }),
      }),
    );

    const result = await verifyRecaptchaToken("x".repeat(40), { env: { RECAPTCHA_SECRET_KEY: "test-secret" } });
    expect(result).toEqual({ ok: false, error: "reCAPTCHA verification failed." });
  });
});
