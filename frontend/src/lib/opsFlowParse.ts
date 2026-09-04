import { getApiBaseUrl } from "./siteRuntime";
import type { OpsFlowExtractPayload } from "./opsFlowLeadGate";
import { OPSFLOW_DAILY_LIMIT, OPSFLOW_QUOTA_BODY } from "./opsFlowPageContent";

export const OPSFLOW_PARSE_PATH = "/api/opsflow/parse" as const;
export const OPSFLOW_DOWNLOAD_FILENAME = "OpsFlow_Extracted_Data.xlsx" as const;
export const OPSFLOW_REMAINING_HEADER = "X-OpsFlow-Remaining-Extractions" as const;
export const OPSFLOW_DAILY_LIMIT_HEADER = "X-OpsFlow-Daily-Limit" as const;

export type OpsFlowParseResult = {
  remainingExtractions: number;
  dailyLimit: number;
};

export class OpsFlowQuotaError extends Error {
  readonly status = 429 as const;

  constructor(message: string) {
    super(message);
    this.name = "OpsFlowQuotaError";
  }
}

function readHeader(headers: Headers | undefined, name: string): string | null {
  if (!headers || typeof headers.get !== "function") return null;
  return headers.get(name);
}

function readQuotaHeaders(headers: Headers | undefined): OpsFlowParseResult {
  const remaining = Number.parseInt(readHeader(headers, OPSFLOW_REMAINING_HEADER) ?? "", 10);
  const dailyLimit = Number.parseInt(readHeader(headers, OPSFLOW_DAILY_LIMIT_HEADER) ?? "", 10);
  return {
    remainingExtractions: Number.isFinite(remaining) ? remaining : OPSFLOW_DAILY_LIMIT,
    dailyLimit: Number.isFinite(dailyLimit) && dailyLimit > 0 ? dailyLimit : OPSFLOW_DAILY_LIMIT,
  };
}

export function triggerXlsxDownload(blob: Blob, filename = OPSFLOW_DOWNLOAD_FILENAME): void {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

export async function parseOpsFlowDocument(payload: OpsFlowExtractPayload): Promise<OpsFlowParseResult> {
  const apiBase = getApiBaseUrl();
  if (!apiBase) {
    throw new Error("OpsFlow API is not configured. Set VITE_API_BASE_URL to extract documents.");
  }

  const body = new FormData();
  body.append("file", payload.file);
  body.append("workEmail", payload.workEmail);
  body.append("category", payload.category);

  const response = await fetch(`${apiBase}${OPSFLOW_PARSE_PATH}`, {
    method: "POST",
    body,
  });

  if (!response.ok) {
    const payloadJson = (await response.json().catch(() => null)) as { error?: string } | null;
    const message = payloadJson?.error ?? "Document extraction failed. Please try again.";
    if (response.status === 429) {
      throw new OpsFlowQuotaError(message || OPSFLOW_QUOTA_BODY);
    }
    throw new Error(message);
  }

  const quota = readQuotaHeaders(response.headers);
  triggerXlsxDownload(await response.blob());
  return quota;
}
