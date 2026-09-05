import { describe, expect, it } from "vitest";
import { Lead } from "./Lead";

describe("Lead model", () => {
  it("requires NEW status, source, contact fields, and timestamps", () => {
    const status = Lead.schema.path("status");
    const source = Lead.schema.path("source");
    const email = Lead.schema.path("email");
    const companyDomain = Lead.schema.path("companyDomain");
    const interest = Lead.schema.path("interest");
    const nextAction = Lead.schema.path("suggestedNextAction");

    expect(status?.options.default).toBe("NEW");
    expect(status?.options.enum).toEqual(["NEW"]);
    expect(source?.options.enum).toEqual(["lead", "opsflow"]);
    expect(email?.options.required).toBe(true);
    expect(companyDomain).toBeTruthy();
    expect(interest?.options.enum).toEqual(["OpsFlow Lead", "AI Audit", "Pipeline", "Web App"]);
    expect(nextAction?.options.enum).toEqual(["Send Audit Pitch", "Schedule Scoping Call"]);
    expect(Lead.schema.get("timestamps")).toBe(true);
  });
});
