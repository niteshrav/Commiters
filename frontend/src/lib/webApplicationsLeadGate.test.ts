import { describe, expect, it } from "vitest";
import { AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR } from "./aiOperationalAuditLeadGate";
import { validateWebApplicationsLead } from "./webApplicationsLeadGate";

describe("webApplicationsLeadGate", () => {
  it("requires name, work email, company, and project details", () => {
    expect(validateWebApplicationsLead({ name: "", email: "", company: "", project: "" }).ok).toBe(false);
    const blocked = validateWebApplicationsLead({
      name: "Nitesh",
      email: "ops@gmail.com",
      company: "Commiters",
      project: "Internal ops dashboard",
    });
    expect(blocked).toEqual({
      ok: false,
      error: AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR,
    });
  });

  it("accepts a complete company-email project request", () => {
    const result = validateWebApplicationsLead({
      name: "Nitesh Rav",
      email: "hello@commiters.com",
      company: "Commiters Softwares",
      project: "Role-based operations platform for field teams.",
    });
    expect(result).toEqual({
      ok: true,
      payload: {
        name: "Nitesh Rav",
        email: "hello@commiters.com",
        company: "Commiters Softwares",
        project: "Role-based operations platform for field teams.",
      },
    });
  });
});
