export const OPSFLOW_DAILY_LIMIT = 10 as const;

export const OPSFLOW_REMAINING_HEADER = "X-OpsFlow-Remaining-Extractions" as const;
export const OPSFLOW_DAILY_LIMIT_HEADER = "X-OpsFlow-Daily-Limit" as const;

export const OPSFLOW_QUOTA_ERROR =
  "Daily limit reached. You have used your 10 free extractions for today. Need high-volume automated pipelines? Contact us at hello@commiters.com." as const;

export function opsFlowUtcDate(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function remainingOpsFlowExtractions(count: number, limit = OPSFLOW_DAILY_LIMIT): number {
  return Math.max(0, limit - count);
}

export function isOpsFlowQuotaExceeded(count: number, limit = OPSFLOW_DAILY_LIMIT): boolean {
  return count >= limit;
}
