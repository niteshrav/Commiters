import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const mocks = vi.hoisted(() => ({
  listInternalLeads: vi.fn(),
}));

vi.mock("../lib/internalLeads", () => ({
  listInternalLeads: mocks.listInternalLeads,
  saveInternalLead: vi.fn(),
}));

import { createApp } from "../app";

describe("GET /api/internal/leads", () => {
  const originalKey = process.env.INTERNAL_ADMIN_KEY;

  afterEach(() => {
    process.env.INTERNAL_ADMIN_KEY = originalKey;
    mocks.listInternalLeads.mockReset();
  });

  it("returns 503 when the admin key is not configured", async () => {
    delete process.env.INTERNAL_ADMIN_KEY;
    const app = createApp();
    const res = await request(app).get("/api/internal/leads").set("x-admin-key", "anything");

    expect(res.status).toBe(503);
    expect(res.body.error).toMatch(/not configured/i);
    expect(mocks.listInternalLeads).not.toHaveBeenCalled();
  });

  it("rejects missing or invalid x-admin-key headers", async () => {
    process.env.INTERNAL_ADMIN_KEY = "internal-secret";
    const app = createApp();

    const missing = await request(app).get("/api/internal/leads");
    expect(missing.status).toBe(401);

    const invalid = await request(app).get("/api/internal/leads").set("x-admin-key", "nope");
    expect(invalid.status).toBe(401);
    expect(mocks.listInternalLeads).not.toHaveBeenCalled();
  });

  it("returns a JSON table of internal leads when the admin key matches", async () => {
    process.env.INTERNAL_ADMIN_KEY = "internal-secret";
    mocks.listInternalLeads.mockResolvedValue([
      {
        id: "abc123",
        status: "NEW",
        source: "opsflow",
        name: "hello@acme.com",
        email: "hello@acme.com",
        companyDomain: "acme.com",
        interest: "OpsFlow Lead",
        suggestedNextAction: "Send Audit Pitch",
        serviceNeeded: "GST Invoices",
        message: "Extract",
        submittedAt: "2026-09-06T10:00:00.000Z",
        createdAt: "2026-09-06T10:00:01.000Z",
      },
    ]);
    const app = createApp();
    const res = await request(app).get("/api/internal/leads").set("x-admin-key", "internal-secret");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      leads: [
        expect.objectContaining({
          status: "NEW",
          source: "opsflow",
          email: "hello@acme.com",
          companyDomain: "acme.com",
          interest: "OpsFlow Lead",
          suggestedNextAction: "Send Audit Pitch",
        }),
      ],
    });
  });
});
