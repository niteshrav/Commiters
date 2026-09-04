import { describe, expect, it } from "vitest";
import {
  OPSFLOW_DAILY_LIMIT,
  OPSFLOW_QUOTA_ERROR,
  isOpsFlowQuotaExceeded,
  opsFlowUtcDate,
  remainingOpsFlowExtractions,
} from "./opsFlowQuota";

describe("opsFlowQuota", () => {
  it("formats the UTC calendar day as YYYY-MM-DD", () => {
    expect(opsFlowUtcDate(new Date("2026-09-04T23:15:00.000Z"))).toBe("2026-09-04");
    expect(opsFlowUtcDate(new Date("2026-01-01T00:00:00.000Z"))).toBe("2026-01-01");
  });

  it("treats 10 extractions as the daily sandbox cap", () => {
    expect(OPSFLOW_DAILY_LIMIT).toBe(10);
    expect(isOpsFlowQuotaExceeded(9)).toBe(false);
    expect(isOpsFlowQuotaExceeded(10)).toBe(true);
    expect(isOpsFlowQuotaExceeded(11)).toBe(true);
    expect(remainingOpsFlowExtractions(0)).toBe(10);
    expect(remainingOpsFlowExtractions(3)).toBe(7);
    expect(remainingOpsFlowExtractions(10)).toBe(0);
  });

  it("exposes the 429 copy for exhausted daily quota", () => {
    expect(OPSFLOW_QUOTA_ERROR).toMatch(/Daily limit reached/i);
    expect(OPSFLOW_QUOTA_ERROR).toMatch(/10 free extractions/i);
    expect(OPSFLOW_QUOTA_ERROR).toContain("hello@commiters.com");
  });
});
