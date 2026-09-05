import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const mocks = vi.hoisted(() => ({
  sendPaymentReminderEmail: vi.fn(),
}));

vi.mock("../lib/invoiceReminder", async () => {
  const actual = await vi.importActual<typeof import("../lib/invoiceReminder")>("../lib/invoiceReminder");
  return {
    ...actual,
    sendPaymentReminderEmail: mocks.sendPaymentReminderEmail,
  };
});

import { createApp } from "../app";

const payload = {
  to: "priya@acme.com",
  clientName: "Priya Shah",
  projectName: "AI Operational Audit",
  pendingAmount: "$3,000",
  dueDate: "2026-09-15",
  bankDetails: {
    accountName: "Commiters Softwares",
    bankName: "HDFC Bank",
    accountNumber: "50100123456789",
    ifsc: "HDFC0001234",
  },
};

describe("POST /api/internal/send-reminder", () => {
  const originalKey = process.env.INTERNAL_ADMIN_KEY;

  beforeEach(() => {
    process.env.INTERNAL_ADMIN_KEY = "internal-secret";
    mocks.sendPaymentReminderEmail.mockReset();
    mocks.sendPaymentReminderEmail.mockResolvedValue({
      to: payload.to,
      subject: "Payment reminder: AI Operational Audit milestone",
    });
  });

  afterEach(() => {
    process.env.INTERNAL_ADMIN_KEY = originalKey;
  });

  it("rejects missing or invalid x-admin-key headers", async () => {
    const app = createApp();
    const missing = await request(app).post("/api/internal/send-reminder").send(payload);
    expect(missing.status).toBe(401);

    const invalid = await request(app)
      .post("/api/internal/send-reminder")
      .set("x-admin-key", "nope")
      .set("Content-Type", "application/json")
      .send(payload);
    expect(invalid.status).toBe(401);
    expect(mocks.sendPaymentReminderEmail).not.toHaveBeenCalled();
  });

  it("sends a structured reminder when the admin key matches", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/internal/send-reminder")
      .set("x-admin-key", "internal-secret")
      .set("Content-Type", "application/json")
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      ok: true,
      to: "priya@acme.com",
      subject: "Payment reminder: AI Operational Audit milestone",
    });
    expect(mocks.sendPaymentReminderEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "priya@acme.com",
        clientName: "Priya Shah",
        projectName: "AI Operational Audit",
        pendingAmount: "$3,000",
      }),
    );
  });

  it("returns 400 for incomplete reminder payloads", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/internal/send-reminder")
      .set("x-admin-key", "internal-secret")
      .set("Content-Type", "application/json")
      .send({ to: "priya@acme.com", clientName: "Priya" });

    expect(res.status).toBe(400);
    expect(mocks.sendPaymentReminderEmail).not.toHaveBeenCalled();
  });

  it("returns 503 when SMTP is unavailable", async () => {
    mocks.sendPaymentReminderEmail.mockRejectedValue(new Error("SMTP is not enabled."));
    const app = createApp();
    const res = await request(app)
      .post("/api/internal/send-reminder")
      .set("x-admin-key", "internal-secret")
      .set("Content-Type", "application/json")
      .send(payload);

    expect(res.status).toBe(503);
    expect(res.body.error).toMatch(/SMTP|unavailable/i);
  });
});
