import { describe, expect, it } from "vitest";
import {
  JOIN_US_RESUME_MAX_BYTES,
  readResumeAsBase64,
  validateResumeFile,
} from "./joinUsResumeUpload";

describe("joinUsResumeUpload", () => {
  it("requires a PDF within the Stitch 5MB limit", () => {
    expect(validateResumeFile(null)).toMatch(/upload your resume/i);
    expect(
      validateResumeFile(new File(["%PDF-1.4"], "resume.pdf", { type: "application/pdf" })),
    ).toBeNull();
    expect(
      validateResumeFile(new File(["hello"], "resume.txt", { type: "text/plain" })),
    ).toMatch(/PDF file/i);
    expect(
      validateResumeFile(
        new File([new Uint8Array(JOIN_US_RESUME_MAX_BYTES + 1)], "resume.pdf", {
          type: "application/pdf",
        }),
      ),
    ).toMatch(/5MB/i);
  });

  it("reads resume files as base64 payloads", async () => {
    const file = new File(["%PDF-1.4"], "resume.pdf", { type: "application/pdf" });
    const base64 = await readResumeAsBase64(file);
    expect(base64.length).toBeGreaterThan(0);
    expect(atob(base64)).toContain("%PDF");
  });
});
