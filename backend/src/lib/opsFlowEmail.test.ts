import { describe, expect, it } from "vitest";
import { OPSFLOW_PERSONAL_EMAIL_ERROR, validateOpsFlowWorkEmail } from "./opsFlowEmail";

describe("opsFlowEmail", () => {
  it("requires a work email", () => {
    expect(validateOpsFlowWorkEmail("")).toMatch(/work email/i);
    expect(validateOpsFlowWorkEmail("   ")).toMatch(/work email/i);
  });

  it("blocks personal inbox domains", () => {
    expect(validateOpsFlowWorkEmail("ops@gmail.com")).toBe(OPSFLOW_PERSONAL_EMAIL_ERROR);
    expect(validateOpsFlowWorkEmail("ops@yahoo.com")).toBe(OPSFLOW_PERSONAL_EMAIL_ERROR);
    expect(validateOpsFlowWorkEmail("ops@hotmail.com")).toBe(OPSFLOW_PERSONAL_EMAIL_ERROR);
    expect(validateOpsFlowWorkEmail("ops@outlook.com")).toBe(OPSFLOW_PERSONAL_EMAIL_ERROR);
  });

  it("accepts company domains", () => {
    expect(validateOpsFlowWorkEmail("hello@commiters.com")).toBeNull();
    expect(validateOpsFlowWorkEmail("  coo@acme.co.in  ")).toBeNull();
  });
});
