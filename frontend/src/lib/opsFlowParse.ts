import { getApiBaseUrl } from "./siteRuntime";
import type { OpsFlowExtractPayload } from "./opsFlowLeadGate";

export const OPSFLOW_PARSE_PATH = "/api/opsflow/parse" as const;
export const OPSFLOW_DOWNLOAD_FILENAME = "OpsFlow_Extracted_Data.xlsx" as const;

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

export async function parseOpsFlowDocument(payload: OpsFlowExtractPayload): Promise<void> {
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
    throw new Error(payloadJson?.error ?? "Document extraction failed. Please try again.");
  }

  triggerXlsxDownload(await response.blob());
}
