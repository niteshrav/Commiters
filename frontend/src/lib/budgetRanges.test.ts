import { BUDGET_RANGE_OPTIONS } from "./budgetRanges";

describe("budgetRanges", () => {
  it("includes an empty option, USD tiers, and the deductible diagnostic price", () => {
    expect(BUDGET_RANGE_OPTIONS[0]).toBe("");
    expect(BUDGET_RANGE_OPTIONS).toHaveLength(8);
    expect(BUDGET_RANGE_OPTIONS).toContain("Under $1,000");
    expect(BUDGET_RANGE_OPTIONS).toContain("₹4,999 / $499");
    expect(BUDGET_RANGE_OPTIONS).toContain("Not sure yet");
  });
});
