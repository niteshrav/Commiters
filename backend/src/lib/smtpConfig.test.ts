import { afterEach, describe, expect, it } from "vitest";
import {
  assertProductionEmailDeliveryReady,
  isSmtpEnabled,
  resolveSmtpConfig,
  resolveSmtpConfigOrNull,
} from "./smtpConfig";

const productionSmtpEnv = {
  NODE_ENV: "production",
  SMTP_ENABLED: "true",
  SMTP_HOST: "smtp.gmail.com",
  SMTP_PORT: "587",
  SMTP_USER: "commitersudaipur@gmail.com",
  SMTP_PASS: "gmail-app-password",
  SMTP_FROM: "Commiters Alerts <commitersudaipur@gmail.com>",
} as const;

describe("smtpConfig", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("detects when SMTP delivery is enabled", () => {
    expect(isSmtpEnabled({ SMTP_ENABLED: "true" })).toBe(true);
    expect(isSmtpEnabled({ SMTP_ENABLED: "false" })).toBe(false);
  });

  it("resolves Gmail SMTP settings for production delivery", () => {
    const config = resolveSmtpConfig({ ...productionSmtpEnv });

    expect(config).toEqual({
      host: "smtp.gmail.com",
      port: 587,
      user: "commitersudaipur@gmail.com",
      pass: "gmail-app-password",
      from: "Commiters Alerts <commitersudaipur@gmail.com>",
      secure: false,
    });
  });

  it("returns null when SMTP is disabled", () => {
    expect(resolveSmtpConfig({ SMTP_ENABLED: "false" })).toBeNull();
  });

  it("throws when SMTP is enabled but required fields are missing", () => {
    expect(() =>
      resolveSmtpConfig({
        SMTP_ENABLED: "true",
        SMTP_HOST: "smtp.gmail.com",
        SMTP_USER: "",
        SMTP_PASS: "secret",
      }),
    ).toThrow(/SMTP_HOST, SMTP_USER, or SMTP_PASS is missing/i);
  });

  it("treats an enabled but incomplete SMTP config as unusable", () => {
    expect(
      resolveSmtpConfigOrNull({
        SMTP_ENABLED: "true",
        SMTP_HOST: "smtp.gmail.com",
        SMTP_USER: "commitersudaipur@gmail.com",
        SMTP_PASS: "",
      }),
    ).toBeNull();
  });

  it("requires SMTP in production so forms can deliver to both team inboxes", () => {
    expect(() => assertProductionEmailDeliveryReady({ NODE_ENV: "production", SMTP_ENABLED: "false" })).toThrow(
      /Production requires SMTP_ENABLED=true/i,
    );

    expect(() =>
      assertProductionEmailDeliveryReady({
        NODE_ENV: "production",
        SMTP_ENABLED: "true",
        SMTP_HOST: "smtp.gmail.com",
        SMTP_USER: "commitersudaipur@gmail.com",
        SMTP_PASS: "gmail-app-password",
      }),
    ).not.toThrow();
  });

  it("allows local development without SMTP", () => {
    expect(() => assertProductionEmailDeliveryReady({ NODE_ENV: "development", SMTP_ENABLED: "false" })).not.toThrow();
  });
});
