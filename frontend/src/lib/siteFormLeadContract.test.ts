import { describe, expect, it } from "vitest";
import { AI_OPERATIONAL_AUDIT_FORM } from "./aiOperationalAuditPageContent";
import { AI_SOLUTIONS_FORM } from "./aiSolutionsPageContent";
import { buildLeadMailto } from "./api";
import { BUDGET_RANGE_OPTIONS } from "./budgetRanges";
import { validateBudgetOptional, validateTimelineOptional } from "./contactValidation";
import { getOwnerInboxForForms } from "./formSubmitOwner";
import { HOME_LEAD_MAGNET_COPY } from "./homeLeadMagnetContent";
import { SITE_FORM_INBOX } from "./siteContact";
import { WEB_APPLICATIONS_FORM } from "./webApplicationsPageContent";
import { WORKFLOW_AUTOMATION_FORM } from "./workflowAutomationPageContent";

const PAGE_FORM_DEFAULTS = [
  AI_OPERATIONAL_AUDIT_FORM,
  WORKFLOW_AUTOMATION_FORM,
  WEB_APPLICATIONS_FORM,
  AI_SOLUTIONS_FORM,
  HOME_LEAD_MAGNET_COPY,
] as const;

describe("siteFormLeadContract", () => {
  it("sends every public form to hello@commiters.com", () => {
    expect(SITE_FORM_INBOX).toBe("hello@commiters.com");
    expect(getOwnerInboxForForms()).toBe("hello@commiters.com");
  });

  it("delivers the home Send Benchmark Request to hello@commiters.com", () => {
    expect(HOME_LEAD_MAGNET_COPY.submitLabel).toBe("Send Benchmark Request");
    const mailto = buildLeadMailto({
      name: HOME_LEAD_MAGNET_COPY.subscriberName,
      email: "founder@acme.io",
      serviceNeeded: HOME_LEAD_MAGNET_COPY.serviceNeeded,
      timeline: HOME_LEAD_MAGNET_COPY.timeline,
      message: HOME_LEAD_MAGNET_COPY.requestMessage,
    });
    expect(mailto.startsWith("mailto:hello@commiters.com?")).toBe(true);
    expect(decodeURIComponent(mailto)).toContain(HOME_LEAD_MAGNET_COPY.requestMessage);
  });

  it("keeps hidden lead fields compatible with API budget and timeline rules", () => {
    expect(BUDGET_RANGE_OPTIONS).toContain(AI_OPERATIONAL_AUDIT_FORM.budgetRange);
    expect(BUDGET_RANGE_OPTIONS).toContain(WORKFLOW_AUTOMATION_FORM.budgetRange);

    for (const form of PAGE_FORM_DEFAULTS) {
      expect(form.serviceNeeded.trim().length).toBeGreaterThan(0);
      expect("timeline" in form && typeof form.timeline === "string").toBe(true);
      expect(validateTimelineOptional(form.timeline)).toBeNull();
    }

    expect(validateBudgetOptional(AI_OPERATIONAL_AUDIT_FORM.budgetRange)).toBeNull();
    expect(validateBudgetOptional(WORKFLOW_AUTOMATION_FORM.budgetRange)).toBeNull();
  });
});
