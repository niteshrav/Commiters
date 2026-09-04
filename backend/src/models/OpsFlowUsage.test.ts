import { describe, expect, it } from "vitest";
import { OpsFlowUsage } from "./OpsFlowUsage";

describe("OpsFlowUsage model", () => {
  it("indexes workEmail and utcDate and defaults count to 0", () => {
    const workEmail = OpsFlowUsage.schema.path("workEmail");
    const utcDate = OpsFlowUsage.schema.path("utcDate");
    const count = OpsFlowUsage.schema.path("count");
    const categories = OpsFlowUsage.schema.path("documentCategories");

    expect(workEmail).toBeTruthy();
    expect(utcDate).toBeTruthy();
    expect(count?.options.default).toBe(0);
    expect(categories?.instance).toBe("Array");

    const indexes = OpsFlowUsage.schema.indexes() as Array<
      [Record<string, number>, { unique?: boolean }]
    >;
    expect(
      indexes.some((entry) => Boolean(entry[0]?.workEmail) && Boolean(entry[0]?.utcDate) && Boolean(entry[1]?.unique)),
    ).toBe(true);
  });
});
