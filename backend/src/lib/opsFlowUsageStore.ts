import { isMongoConnected } from "../cms/config/database";
import { OpsFlowUsage } from "../models/OpsFlowUsage";
import {
  OPSFLOW_DAILY_LIMIT,
  opsFlowUtcDate,
  remainingOpsFlowExtractions,
} from "./opsFlowQuota";

function normalizeWorkEmail(workEmail: string): string {
  return workEmail.trim().toLowerCase();
}

function assertMongoConnected(): void {
  if (!isMongoConnected()) {
    throw new Error("MongoDB is not connected.");
  }
}

export async function getOpsFlowDailyCount(
  workEmail: string,
  utcDate: string = opsFlowUtcDate(),
): Promise<number> {
  assertMongoConnected();
  const record = await OpsFlowUsage.findOne({ workEmail: normalizeWorkEmail(workEmail), utcDate }).lean();
  return record?.count ?? 0;
}

export async function recordOpsFlowExtraction(input: {
  workEmail: string;
  category: string;
  utcDate?: string;
  extractedAt?: Date;
}): Promise<{ count: number; remaining: number; utcDate: string }> {
  assertMongoConnected();
  const utcDate = input.utcDate ?? opsFlowUtcDate();
  const workEmail = normalizeWorkEmail(input.workEmail);
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
