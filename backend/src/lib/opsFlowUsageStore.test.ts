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

import {
  getOpsFlowDailyCount,
  recordOpsFlowExtraction,
  resetOpsFlowInMemoryUsage,
} from "./opsFlowUsageStore";

describe("opsFlowUsageStore", () => {
  beforeEach(() => {
    storeMocks.isMongoConnected.mockReset();
    storeMocks.findOne.mockReset();
    storeMocks.findOneAndUpdate.mockReset();
    resetOpsFlowInMemoryUsage();
  });

  it("enforces the daily quota in memory when Mongo is disconnected", async () => {
    storeMocks.isMongoConnected.mockReturnValue(false);

    await expect(getOpsFlowDailyCount("hello@commiters.com", "2026-09-04")).resolves.toBe(0);
    await expect(
      recordOpsFlowExtraction({
        workEmail: "Hello@Commiters.com",
        category: "GST Invoices",
        utcDate: "2026-09-04",
      }),
    ).resolves.toEqual({ count: 1, remaining: 9, utcDate: "2026-09-04" });
    await expect(getOpsFlowDailyCount("hello@commiters.com", "2026-09-04")).resolves.toBe(1);
    expect(storeMocks.findOne).not.toHaveBeenCalled();
    expect(storeMocks.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it("reaches the daily limit in memory so the next extract is blocked", async () => {
    storeMocks.isMongoConnected.mockReturnValue(false);

    for (let i = 0; i < 10; i += 1) {
      await recordOpsFlowExtraction({
        workEmail: "ops@acme.com",
        category: "GST Invoices",
        utcDate: "2026-09-04",
      });
    }

    await expect(getOpsFlowDailyCount("ops@acme.com", "2026-09-04")).resolves.toBe(10);
    await expect(getOpsFlowDailyCount("ops@acme.com", "2026-09-05")).resolves.toBe(0);
    await expect(getOpsFlowDailyCount("hello@commiters.com", "2026-09-04")).resolves.toBe(0);
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
