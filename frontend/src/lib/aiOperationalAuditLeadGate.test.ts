import { describe, expect, it } from "vitest";
import {
  AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR,
  validateAiOperationalAuditLead,
} from "./aiOperationalAuditLeadGate";

describe("aiOperationalAuditLeadGate", () => {
  it("requires name, company work email, company, and bottleneck", () => {
    expect(validateAiOperationalAuditLead({ name: "", email: "", company: "", bottleneck: "" }).ok).toBe(false);
    const result = validateAiOperationalAuditLead({
      name: "Nitesh",
      email: "ops@gmail.com",
      company: "Commiters",
      bottleneck: "Invoice matching is manual",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe(AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR);
  });

  it("accepts a complete company-email booking request", () => {
    const result = validateAiOperationalAuditLead({
      name: "Nitesh Rav",
      email: "hello@commiters.com",
      company: "Commiters Softwares",
      bottleneck: "GST invoice matching across three spreadsheets.",
    });
    expect(result).toEqual({
      ok: true,
      payload: {
        name: "Nitesh Rav",
        email: "hello@commiters.com",
        company: "Commiters Softwares",
        bottleneck: "GST invoice matching across three spreadsheets.",
      },
    });
  });
});
