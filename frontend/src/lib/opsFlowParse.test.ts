import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("./siteRuntime", () => ({
  getApiBaseUrl: () => "http://localhost:4000",
}));

import { OPSFLOW_DOWNLOAD_FILENAME, OpsFlowQuotaError, parseOpsFlowDocument } from "./opsFlowParse";

describe("parseOpsFlowDocument", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("posts multipart form data and downloads the xlsx response", async () => {
    const blob = new Blob(["xlsx-bytes"], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({
        "X-OpsFlow-Remaining-Extractions": "9",
        "X-OpsFlow-Daily-Limit": "10",
      }),
      blob: async () => blob,
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(() => "blob:opsflow"),
      revokeObjectURL: vi.fn(),
    });

    const originalCreateElement = document.createElement.bind(document);
    const click = vi.fn();
    vi.spyOn(document.body, "appendChild").mockImplementation((node) => node);
    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      if (tag === "a") {
        return {
          click,
          href: "",
          download: "",
          rel: "",
          remove() {},
        } as unknown as HTMLAnchorElement;
      }
      return originalCreateElement(tag);
    });

    const file = new File(["%PDF"], "ticket.pdf", { type: "application/pdf" });
    const result = await parseOpsFlowDocument({
      file,
      category: "Other",
      workEmail: "hello@commiters.com",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:4000/api/opsflow/parse",
      expect.objectContaining({ method: "POST", body: expect.any(FormData) }),
    );
    const body = fetchMock.mock.calls[0]?.[1]?.body as FormData;
    expect(body.get("workEmail")).toBe("hello@commiters.com");
    expect(body.get("category")).toBe("Other");
    expect(body.get("file")).toBeInstanceOf(File);
    expect(click).toHaveBeenCalled();
    expect(OPSFLOW_DOWNLOAD_FILENAME).toBe("OpsFlow_Extracted_Data.xlsx");
    expect(result).toEqual({ remainingExtractions: 9, dailyLimit: 10 });
  });

  it("surfaces API errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: "Please enter your official work email." }),
      }),
    );

    await expect(
      parseOpsFlowDocument({
        file: new File(["%PDF"], "ticket.pdf", { type: "application/pdf" }),
        category: "Other",
        workEmail: "ops@gmail.com",
      }),
    ).rejects.toThrow(/work email/i);
  });

  it("throws OpsFlowQuotaError when the daily limit is reached", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        json: async () => ({
          success: false,
          error:
            "Daily limit reached. You have used your 10 free extractions for today. Need high-volume automated pipelines? Contact us at hello@commiters.com.",
        }),
      }),
    );

    const thrown = await parseOpsFlowDocument({
      file: new File(["%PDF"], "ticket.pdf", { type: "application/pdf" }),
      category: "Other",
      workEmail: "hello@commiters.com",
    }).catch((error: unknown) => error);

    expect(thrown).toBeInstanceOf(OpsFlowQuotaError);
    expect(thrown).toMatchObject({
      name: "OpsFlowQuotaError",
      status: 429,
    });
    expect((thrown as Error).message).toMatch(/Daily limit reached/i);
    expect((thrown as Error).message).toContain("hello@commiters.com");
  });
});
