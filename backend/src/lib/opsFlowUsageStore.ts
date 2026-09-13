import { isMongoConnected } from "../cms/config/database";
import { OpsFlowUsage } from "../models/OpsFlowUsage";
import {
  OPSFLOW_DAILY_LIMIT,
  opsFlowUtcDate,
  remainingOpsFlowExtractions,
} from "./opsFlowQuota";

const inMemoryCounts = new Map<string, number>();

function normalizeWorkEmail(workEmail: string): string {
  return workEmail.trim().toLowerCase();
}

function memoryKey(workEmail: string, utcDate: string): string {
  return `${normalizeWorkEmail(workEmail)}:${utcDate}`;
}

export function resetOpsFlowInMemoryUsage(): void {
  inMemoryCounts.clear();
}

function getInMemoryCount(workEmail: string, utcDate: string): number {
  return inMemoryCounts.get(memoryKey(workEmail, utcDate)) ?? 0;
}

function recordInMemoryExtraction(workEmail: string, utcDate: string): number {
  const key = memoryKey(workEmail, utcDate);
  const count = getInMemoryCount(workEmail, utcDate) + 1;
  inMemoryCounts.set(key, count);
  return count;
}

export async function getOpsFlowDailyCount(
  workEmail: string,
  utcDate: string = opsFlowUtcDate(),
): Promise<number> {
  if (!isMongoConnected()) {
    return getInMemoryCount(workEmail, utcDate);
  }
  const record = await OpsFlowUsage.findOne({ workEmail: normalizeWorkEmail(workEmail), utcDate }).lean();
  return record?.count ?? 0;
}

export async function recordOpsFlowExtraction(input: {
  workEmail: string;
  category: string;
  utcDate?: string;
  extractedAt?: Date;
}): Promise<{ count: number; remaining: number; utcDate: string }> {
  const utcDate = input.utcDate ?? opsFlowUtcDate();
  const workEmail = normalizeWorkEmail(input.workEmail);

  if (!isMongoConnected()) {
    const count = recordInMemoryExtraction(workEmail, utcDate);
    return {
      count,
      remaining: remainingOpsFlowExtractions(count, OPSFLOW_DAILY_LIMIT),
      utcDate,
    };
  }

  const extractedAt = input.extractedAt ?? new Date();

  const updated = await OpsFlowUsage.findOneAndUpdate(
    { workEmail, utcDate },
    {
      $inc: { count: 1 },
      $set: { lastExtractedAt: extractedAt },
      $addToSet: { documentCategories: input.category },
      $setOnInsert: { workEmail, utcDate },
    },
    { upsert: true, new: true },
  );

  const count = updated?.count ?? 1;
  return {
    count,
    remaining: remainingOpsFlowExtractions(count, OPSFLOW_DAILY_LIMIT),
    utcDate,
  };
}
