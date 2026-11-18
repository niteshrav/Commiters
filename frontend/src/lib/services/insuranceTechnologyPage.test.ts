import { describe, expect, it } from "vitest";
import {
  INSURANCE_TECH_DESK,
  INSURANCE_TECH_FAQS,
  INSURANCE_TECH_METRICS,
  INSURANCE_TECH_SEGMENTS,
} from "./insuranceTechnologyPage";

describe("insuranceTechnologyPage", () => {
  it("positions desk cards for US Personal and Commercial Lines agency operations", () => {
    expect(INSURANCE_TECH_DESK.map((item) => item.title)).toEqual([
      "COI Issuance & Holder Updates",
      "Policy Endorsements & Changes",
      "Carrier Portal & AMS Entry",
      "Renewals & Remarketing Prep",
      "SOP & Document Automation",
      "Who This Is For",
    ]);
    expect(INSURANCE_TECH_DESK[0].body).toContain("Certificates of Insurance");
    expect(INSURANCE_TECH_DESK[1].body).toContain("Personal and Commercial");
    expect(INSURANCE_TECH_DESK[2].body).toContain("Applied Epic");
    expect(INSURANCE_TECH_DESK[2].body).toContain("AMS360");
    expect(INSURANCE_TECH_DESK[3].body).toContain("30-");
    expect(INSURANCE_TECH_DESK[4].body).toContain("OCR/LLM");
    expect(INSURANCE_TECH_DESK[5].body).toContain("US P&C");
  });

  it("uses US P&C segment terminology", () => {
    expect(INSURANCE_TECH_SEGMENTS.map((item) => item.title)).toEqual([
      "Life insurance",
      "Health insurance",
      "Personal & Commercial Auto",
      "Homeowners & Commercial Property",
      "Commercial Lines & General Liability",
      "Travel insurance",
    ]);
    expect(INSURANCE_TECH_SEGMENTS.find((item) => item.title === "Personal & Commercial Auto")?.body).toContain(
      "commercial fleet",
    );
    expect(INSURANCE_TECH_SEGMENTS.map((item) => item.title)).not.toContain("Motor insurance");
  });

  it("ships operational SLA metric cards with distinct icon ids", () => {
    expect(INSURANCE_TECH_METRICS.map((item) => item.title)).toEqual([
      "Same-Day COI Turnaround",
      "30/60/90-Day Renewal Pipeline",
      "Daily Cancellation Watch",
      "AMS & Portal Sync Accuracy",
      "Automated Dec-Page Extraction",
      "Dedicated Desk Coverage",
    ]);
    expect(new Set(INSURANCE_TECH_METRICS.map((item) => item.icon)).size).toBe(6);
    expect(INSURANCE_TECH_METRICS.every((item) => item.body.length > 20)).toBe(true);
  });

  it("answers US agency buyer FAQs without InsurTech filler", () => {
    expect(INSURANCE_TECH_FAQS).toHaveLength(6);
    expect(INSURANCE_TECH_FAQS.map((item) => item.question)).toEqual([
      "Which Agency Management Systems (AMS) and carrier portals do you support?",
      "Do your specialists handle licensed insurance activities?",
      "Can you support both Personal Lines and Commercial Lines?",
      "What is your typical turnaround time for COIs and endorsements?",
      "How do you ensure data security and client confidentiality?",
      "Can you also automate repetitive agency workflows using AI?",
    ]);
    expect(INSURANCE_TECH_FAQS[1].answer).toContain("non-licensed");
    expect(INSURANCE_TECH_FAQS.some((item) => /InsurTech|What is Insurance Software/i.test(item.question))).toBe(
      false,
    );
  });
});
