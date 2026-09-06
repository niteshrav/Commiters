import { describe, expect, it } from "vitest";
import { AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR } from "./aiOperationalAuditLeadGate";
import { validateServicesOverviewLead } from "./servicesOverviewLeadGate";

describe("validateServicesOverviewLead", () => {
  it("requires a work email, company, interest, and scoping details", () => {
    expect(validateServicesOverviewLead({ name: "", email: "", company: "", interest: "", details: "" }).ok).toBe(false);

    const blocked = validateServicesOverviewLead({
      name: "Nitesh",
      email: "ops@gmail.com",
      company: "Commiters",
      interest: "AI Operational Audit (2-Week Blueprint)",
      details: "Spreadsheet bottleneck in finance close.",
    });
    expect(blocked).toEqual({ ok: false, error: AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR });
  });

  it("accepts an AI audit scoping request", () => {
    const result = validateServicesOverviewLead({
      name: "Nitesh Rav",
      email: "hello@commiters.com",
      company: "Commiters Softwares",
      interest: "AI Operational Audit (2-Week Blueprint)",
      details: "Manual GST invoice entry across three spreadsheets.",
    });
    expect(result).toEqual({
      ok: true,
      payload: {
        name: "Nitesh Rav",
        email: "hello@commiters.com",
        company: "Commiters Softwares",
        interest: "AI Operational Audit (2-Week Blueprint)",
        details: "Manual GST invoice entry across three spreadsheets.",
        serviceNeeded: "AI Operational Audit (2-Week Blueprint)",
        timeline: "2-week diagnostic",
      },
    });
  });

  it("accepts a governed AI or custom enterprise scoping request", () => {
    const result = validateServicesOverviewLead({
      name: "Nitesh Rav",
      email: "hello@commiters.com",
      company: "Commiters Softwares",
      interest: "Custom Cloud Enterprise Software / Utilities",
      details: "Shopify replacement with GST invoice automation.",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.serviceNeeded).toBe("Custom Cloud Enterprise Software / Utilities");
      expect(result.payload.timeline).toBe("To be scoped");
    }
  });
});
