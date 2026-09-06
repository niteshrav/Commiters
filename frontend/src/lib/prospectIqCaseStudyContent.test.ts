import { describe, expect, it } from "vitest";
import { PROSPECT_IQ_CASE_STUDY_COPY } from "./prospectIqCaseStudyContent";
import { ROUTES } from "./routes";

describe("prospectIqCaseStudyContent", () => {
  it("matches the governed B2B prospecting case study copy", () => {
    expect(PROSPECT_IQ_CASE_STUDY_COPY.kicker).toBe("TECHNICAL CASE STUDY: GOVERNED AI & WORKFLOW SYSTEM");
    expect(PROSPECT_IQ_CASE_STUDY_COPY.title).toBe(
      "ProspectIQ AI: Automated B2B Sales Intelligence & Intent Scoring",
    );
    expect(PROSPECT_IQ_CASE_STUDY_COPY.subtitle).toMatch(/Model Context Protocol/);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.coreStack.items.map((item) => item.title)).toEqual([
      "Python 3.11",
      "FastAPI",
      "MCP Protocol",
      "OpenAI / Anthropic APIs",
      "PostgreSQL",
    ]);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.metrics.map((item) => item.label)).toEqual([
      "Lead Processing Velocity",
      "Verification Accuracy",
      "Governance Standard",
    ]);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.metrics.map((item) => item.value)).toEqual([
      "10x Faster",
      "99.4% Validated Email & Firmographics",
      "100% Policy-Gated MCP Execution",
    ]);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.architecture.sections.map((section) => section.title)).toEqual([
      "Multi-Agent Lead Enrichment Engine",
      "Model Context Protocol (MCP) & Policy Gateways",
      "Deterministic Output & Human-in-the-Loop (\"Vibe Diff\")",
    ]);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.architecture.sections[1].body).toMatch(/scoped MCP sockets/i);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.architecture.sections[2].body).toMatch(/human confirmation/i);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.bottomCta.primaryLabel).toBe("Scope Your Custom AI Pipeline");
    expect(PROSPECT_IQ_CASE_STUDY_COPY.bottomCta.primaryTo).toBe(ROUTES.aiSolutions);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.bottomCta.secondaryTo).toBe(ROUTES.caseStudies);
    expect(PROSPECT_IQ_CASE_STUDY_COPY.bottomCta.primaryVariant).toBe("cyan-glow");
  });
});
