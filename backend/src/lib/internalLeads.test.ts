import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  isMongoConnected: vi.fn(),
  create: vi.fn(),
  find: vi.fn(),
}));

vi.mock("../cms/config/database", () => ({
  isMongoConnected: mocks.isMongoConnected,
}));

vi.mock("../models/Lead", () => ({
  Lead: {
    create: mocks.create,
    find: mocks.find,
  },
}));

import { buildInternalLeadRecord, listInternalLeads, saveInternalLead } from "./internalLeads";

describe("internalLeads", () => {
  beforeEach(() => {
    mocks.isMongoConnected.mockReset();
    mocks.create.mockReset();
    mocks.find.mockReset();
  });

  it("builds a NEW lead record with domain, interest, and next action", () => {
    const submittedAt = new Date("2026-09-06T10:00:00.000Z");
    expect(
      buildInternalLeadRecord({
        source: "lead",
        name: "Nitesh Rav",
        email: "Hello@Commiters.com",
        serviceNeeded: "Custom AI Pipeline Engineering",
        message: "Need GST parsing.",
        submittedAt,
      }),
    ).toEqual({
      status: "NEW",
      source: "lead",
      name: "Nitesh Rav",
      email: "hello@commiters.com",
      companyDomain: "commiters.com",
      interest: "Pipeline",
      suggestedNextAction: "Schedule Scoping Call",
      serviceNeeded: "Custom AI Pipeline Engineering",
      message: "Need GST parsing.",
      submittedAt,
    });
  });

  it("skips persist when Mongo is disconnected", async () => {
    mocks.isMongoConnected.mockReturnValue(false);

    await expect(
      saveInternalLead({
        source: "opsflow",
        name: "hello@acme.com",
        email: "hello@acme.com",
        serviceNeeded: "GST Invoices",
        message: "OpsFlow extract",
        submittedAt: new Date(),
      }),
    ).resolves.toBeNull();
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("persists the classified lead when Mongo is connected", async () => {
    mocks.isMongoConnected.mockReturnValue(true);
    mocks.create.mockResolvedValue({ id: "lead_mongo_1" });
    const submittedAt = new Date("2026-09-06T10:00:00.000Z");

    await saveInternalLead({
      source: "opsflow",
      name: "hello@acme.com",
      email: "hello@acme.com",
      serviceNeeded: "GST Invoices",
      message: "OpsFlow extract",
      submittedAt,
    });

    expect(mocks.create).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "NEW",
        source: "opsflow",
        email: "hello@acme.com",
        companyDomain: "acme.com",
        interest: "OpsFlow Lead",
        suggestedNextAction: "Send Audit Pitch",
        submittedAt,
      }),
    );
  });

  it("lists leads as table rows newest first", async () => {
    mocks.isMongoConnected.mockReturnValue(true);
    const lean = vi.fn().mockResolvedValue([
      {
        _id: { toString: () => "abc123" },
        status: "NEW",
        source: "lead",
        name: "Nitesh",
        email: "ops@acme.com",
        companyDomain: "acme.com",
        interest: "AI Audit",
        suggestedNextAction: "Send Audit Pitch",
        serviceNeeded: "AI Operational Audit",
        message: "Need a diagnostic",
        submittedAt: new Date("2026-09-06T10:00:00.000Z"),
        createdAt: new Date("2026-09-06T10:00:01.000Z"),
      },
    ]);
    const sort = vi.fn().mockReturnValue({ lean });
    mocks.find.mockReturnValue({ sort });

    await expect(listInternalLeads()).resolves.toEqual([
      {
        id: "abc123",
        status: "NEW",
        source: "lead",
        name: "Nitesh",
        email: "ops@acme.com",
        companyDomain: "acme.com",
        interest: "AI Audit",
        suggestedNextAction: "Send Audit Pitch",
        serviceNeeded: "AI Operational Audit",
        message: "Need a diagnostic",
        submittedAt: "2026-09-06T10:00:00.000Z",
        createdAt: "2026-09-06T10:00:01.000Z",
      },
    ]);
    expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
  });

  it("refuses to list leads when Mongo is down", async () => {
    mocks.isMongoConnected.mockReturnValue(false);
    await expect(listInternalLeads()).rejects.toThrow(/Mongo/i);
  });
});
