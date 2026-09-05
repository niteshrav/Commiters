import { describe, expect, it } from "vitest";
import {
  buildB2bLeadCard,
  classifyLeadInterest,
  companyDomainFromEmail,
} from "./b2bLeadCard";

describe("b2bLeadCard", () => {
  it("extracts the company domain from a work email", () => {
    expect(companyDomainFromEmail("Jane.Ops@Acme.co.in")).toBe("acme.co.in");
    expect(companyDomainFromEmail("not-an-email")).toBe("");
  });

  it("classifies OpsFlow, AI Audit, Pipeline, and Web App interests", () => {
    expect(classifyLeadInterest({ source: "opsflow" })).toEqual({
      interest: "OpsFlow Lead",
      suggestedNextAction: "Send Audit Pitch",
    });
    expect(classifyLeadInterest({ source: "lead", serviceNeeded: "AI Operational Audit" })).toEqual({
      interest: "AI Audit",
      suggestedNextAction: "Send Audit Pitch",
    });
    expect(classifyLeadInterest({ source: "lead", serviceNeeded: "Custom AI Pipeline Engineering" })).toEqual({
      interest: "Pipeline",
      suggestedNextAction: "Schedule Scoping Call",
    });
    expect(classifyLeadInterest({ source: "lead", serviceNeeded: "B2B Web Applications" })).toEqual({
      interest: "Web App",
      suggestedNextAction: "Schedule Scoping Call",
    });
  });

  it("formats a B2B Lead Card for the internal hello@ inbox", () => {
    const card = buildB2bLeadCard({
      email: "ops@acme.com",
      serviceNeeded: "AI Operational Audit",
      source: "lead",
    });

    expect(card.clientEmail).toBe("ops@acme.com");
    expect(card.companyDomain).toBe("acme.com");
    expect(card.interest).toBe("AI Audit");
    expect(card.suggestedNextAction).toBe("Send Audit Pitch");
    expect(card.text).toBe(
      [
        "B2B Lead Card",
        "Client Email: ops@acme.com",
        "Company Domain: acme.com",
        "Interest: AI Audit",
        "Suggested Next Action: Send Audit Pitch",
      ].join("\n"),
    );
  });
});
