import { describe, expect, it } from "vitest";
import { AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR } from "./aiOperationalAuditLeadGate";
import { validateWorkflowAutomationLead } from "./workflowAutomationLeadGate";

describe("workflowAutomationLeadGate", () => {
  it("requires name, work email, company, and bottleneck details", () => {
    expect(validateWorkflowAutomationLead({ name: "", email: "", company: "", bottleneck: "" }).ok).toBe(false);
    const blocked = validateWorkflowAutomationLead({
      name: "Nitesh",
      email: "ops@gmail.com",
      company: "Commiters",
      bottleneck: "Copy-pasting invoices into Tally",
    });
    expect(blocked).toEqual({
      ok: false,
      error: AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR,
    });
  });

  it("accepts a complete company-email audit booking from the workflow page", () => {
    const result = validateWorkflowAutomationLead({
      name: "Nitesh Rav",
      email: "hello@commiters.com",
      company: "Commiters Softwares",
      bottleneck: "WhatsApp order updates are sent by hand every evening.",
    });
    expect(result).toEqual({
      ok: true,
      payload: {
        name: "Nitesh Rav",
        email: "hello@commiters.com",
        company: "Commiters Softwares",
        bottleneck: "WhatsApp order updates are sent by hand every evening.",
      },
    });
  });
});
