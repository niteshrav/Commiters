import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  OPSFLOW_GEMINI_SYSTEM_PROMPT,
  parseOpsFlowDocumentJson,
  type OpsFlowDocumentFields,
} from "./opsFlowDocument";

/** Google AI Studio free Gemini API. Does not use Vertex AI or GCP credentials. */
export const OPSFLOW_GEMINI_DEFAULT_MODEL = "gemini-2.5-flash" as const;
export const OPSFLOW_GEMINI_FALLBACK_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-3.5-flash",
] as const;

export function resolveOpsFlowGeminiApiKey(env: NodeJS.ProcessEnv = process.env): string {
  return env.GEMINI_API_KEY?.trim() || "";
}

export function isOpsFlowGeminiConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  return Boolean(resolveOpsFlowGeminiApiKey(env));
}

export function resolveOpsFlowGeminiModel(env: NodeJS.ProcessEnv = process.env): string {
  return env.GEMINI_MODEL?.trim() || OPSFLOW_GEMINI_DEFAULT_MODEL;
}

export function resolveOpsFlowGeminiModelCandidates(env: NodeJS.ProcessEnv = process.env): string[] {
  const preferred = resolveOpsFlowGeminiModel(env);
  return [preferred, ...OPSFLOW_GEMINI_FALLBACK_MODELS].filter(
    (name, index, all) => Boolean(name) && all.indexOf(name) === index,
  );
}

function isGeminiModelNotFound(error: unknown): boolean {
  const status = typeof error === "object" && error && "status" in error ? Number(error.status) : 0;
  const message = error instanceof Error ? error.message : String(error);
  return status === 404 || /is not found for API version/i.test(message);
}

export async function extractDocumentFields(input: {
  buffer: Buffer;
  mimeType: string;
  category: string;
}): Promise<OpsFlowDocumentFields> {
  const apiKey = resolveOpsFlowGeminiApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const client = new GoogleGenerativeAI(apiKey);
  const parts = [
    {
      text: `${OPSFLOW_GEMINI_SYSTEM_PROMPT}\nDocument category: ${input.category}.\nRespond with a JSON object using keys documentDate, vendorName, taxIds {gst, pan}, invoiceNumber, lineItems [{description, quantity, unitPrice, total}], subtotal, taxAmounts {cgst, sgst, igst}, grandTotal.`,
    },
    {
      inlineData: {
        mimeType: input.mimeType,
        data: input.buffer.toString("base64"),
      },
    },
  ];

  let lastError: unknown;
  for (const modelName of resolveOpsFlowGeminiModelCandidates()) {
    try {
      const model = client.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(parts);
      return parseOpsFlowDocumentJson(result.response.text());
    } catch (error) {
      lastError = error;
      if (!isGeminiModelNotFound(error)) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Gemini model is not available.");
}
