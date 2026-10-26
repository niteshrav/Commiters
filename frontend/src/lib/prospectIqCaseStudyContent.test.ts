import { describe, expect, it } from "vitest";
import { PROSPECTIQ_LIVE_URL, PROSPECT_IQ_CASE_STUDY_COPY } from "./prospectIqCaseStudyContent";
import { ROUTES } from "./routes";

describe("prospectIqCaseStudyContent", () => {
  it("matches the GitHub ProspectIQ loan-intelligence copy", () => {
    expect(PROSPECT_IQ_CASE_STUDY_COPY.kicker).toBe("TECHNICAL CASE STUDY: LENDING DECISION SUPPORT");
    expect(PROSPECT_IQ_CASE_STUDY_COPY.title).toBe("ProspectIQ AI — Loan Prospect Intelligence Platform");
    expect(PROSPECT_IQ_CASE_STUDY_COPY.subtitle).toMatch(/Gemini sequential multi-agent/i);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.coreStack.items.map((item) => item.title)).toEqual([
      "Python",
      "Streamlit",
      "Google ADK",
      "Gemini 2.5 Flash",
      "Vertex AI / Cloud Run",
    ]);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.metrics.map((item) => item.value)).toEqual([
      "5 Sequential ADK Agents",
      "Deterministic Source of Truth",
      "Human-in-the-Loop Underwriting",
    ]);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.architecture.sections.map((section) => section.title)).toEqual([
      "Deterministic Scoring Engine",
      "Sequential Google ADK Agents",
      "Human-in-the-Loop Underwriting",
    ]);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.architecture.sections[1].body).toMatch(/Decision Report/i);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.overview.body).toMatch(/does not approve or reject loans/i);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.bottomCta.primaryLabel).toBe("Start an AI Project");
    expect(PROSPECT_IQ_CASE_STUDY_COPY.bottomCta.primaryTo).toBe(ROUTES.contact);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.bottomCta.secondaryTo).toBe(ROUTES.caseStudies);
    expect(PROSPECTIQ_LIVE_URL).toBe("https://prospectiq-ai-rprbeonp4a-el.a.run.app");
  });
});
