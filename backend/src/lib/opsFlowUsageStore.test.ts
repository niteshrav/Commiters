import { beforeEach, describe, expect, it, vi } from "vitest";

const storeMocks = vi.hoisted(() => ({
  isMongoConnected: vi.fn(),
  findOne: vi.fn(),
  findOneAndUpdate: vi.fn(),
}));

vi.mock("../cms/config/database", () => ({
  isMongoConnected: storeMocks.isMongoConnected,
}));

vi.mock("../models/OpsFlowUsage", () => ({
  OpsFlowUsage: {
    findOne: storeMocks.findOne,
    findOneAndUpdate: storeMocks.findOneAndUpdate,
  },
}));

import { getOpsFlowDailyCount, recordOpsFlowExtraction } from "./opsFlowUsageStore";

describe("opsFlowUsageStore", () => {
  beforeEach(() => {
    storeMocks.isMongoConnected.mockReset();
    storeMocks.findOne.mockReset();
    storeMocks.findOneAndUpdate.mockReset();
  });

  it("throws when Mongo is disconnected so quota cannot be bypassed", async () => {
    storeMocks.isMongoConnected.mockReturnValue(false);

    await expect(getOpsFlowDailyCount("hello@commiters.com")).rejects.toThrow(/mongo/i);
    await expect(
      recordOpsFlowExtraction({ workEmail: "hello@commiters.com", category: "GST Invoices" }),
    ).rejects.toThrow(/mongo/i);
    expect(storeMocks.findOne).not.toHaveBeenCalled();
    expect(storeMocks.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it("returns the stored count for the UTC day", async () => {
    storeMocks.isMongoConnected.mockReturnValue(true);
    storeMocks.findOne.mockReturnValue({
      lean: () => Promise.resolve({ count: 3 }),
    });

    await expect(getOpsFlowDailyCount("Hello@Commiters.com", "2026-09-04")).resolves.toBe(3);
    expect(storeMocks.findOne).toHaveBeenCalledWith({
      workEmail: "hello@commiters.com",
      utcDate: "2026-09-04",
    });
  });

  it("returns 0 when no usage record exists yet", async () => {
    storeMocks.isMongoConnected.mockReturnValue(true);
    storeMocks.findOne.mockReturnValue({
      lean: () => Promise.resolve(null),
    });

    await expect(getOpsFlowDailyCount("ops@acme.com", "2026-09-04")).resolves.toBe(0);
  });

  it("increments count, records category, and returns remaining quota", async () => {
    storeMocks.isMongoConnected.mockReturnValue(true);
    storeMocks.findOneAndUpdate.mockResolvedValue({ count: 3 });

    const result = await recordOpsFlowExtraction({
      workEmail: "Ops@Acme.com",
      category: "GST Invoices",
      utcDate: "2026-09-04",
      extractedAt: new Date("2026-09-04T12:00:00.000Z"),
    });

    expect(result).toEqual({ count: 3, remaining: 7, utcDate: "2026-09-04" });
    expect(storeMocks.findOneAndUpdate).toHaveBeenCalledWith(
      { workEmail: "ops@acme.com", utcDate: "2026-09-04" },
      {
        $inc: { count: 1 },
        $set: { lastExtractedAt: new Date("2026-09-04T12:00:00.000Z") },
        $addToSet: { documentCategories: "GST Invoices" },
        $setOnInsert: { workEmail: "ops@acme.com", utcDate: "2026-09-04" },
      },
      { upsert: true, new: true },
    );
  });
});
