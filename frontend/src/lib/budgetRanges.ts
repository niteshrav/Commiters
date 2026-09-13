/** Lead budget tiers — must stay aligned with backend `LEAD_BUDGET_RANGE_VALUES`. */
export const BUDGET_RANGE_OPTIONS = [
  "",
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "₹4,999 / $499",
  "Not sure yet",
] as const;

export type BudgetRangeOption = (typeof BUDGET_RANGE_OPTIONS)[number];
