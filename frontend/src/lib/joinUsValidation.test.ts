import { describe, expect, it } from "vitest";
import {
  validateCoverLetter,
  validateOptionalUrl,
  validatePhone,
  validatePositionAppliedFor,
} from "./joinUsValidation";
import { JOIN_US_POSITION_DEFAULT } from "./joinUsPositions";

describe("joinUsValidation", () => {
  it("requires a position selection", () => {
    expect(validatePositionAppliedFor("")).toMatch(/select the position/i);
    expect(validatePositionAppliedFor(JOIN_US_POSITION_DEFAULT)).toMatch(/select the position/i);
  });

  it("accepts each listed position option", () => {
    expect(validatePositionAppliedFor("Full Stack Engineer")).toBeNull();
    expect(validatePositionAppliedFor("AI Engineer")).toBeNull();
    expect(validatePositionAppliedFor("QA Engineer")).toBeNull();
    expect(validatePositionAppliedFor("Marketing Executive")).toBeNull();
    expect(validatePositionAppliedFor("Other")).toBeNull();
  });

  it("requires a valid phone number", () => {
    expect(validatePhone("")).toMatch(/phone number/i);
    expect(validatePhone("+91 98765 43210")).toBeNull();
    expect(validatePhone("abc")).toMatch(/valid phone/i);
  });

  it("requires a cover letter", () => {
    expect(validateCoverLetter("")).toMatch(/cover letter/i);
    expect(validateCoverLetter("   ")).toMatch(/cover letter/i);
    expect(validateCoverLetter("I build reliable systems.")).toBeNull();
  });

  it("validates optional profile URLs when provided", () => {
    expect(validateOptionalUrl("", "LinkedIn")).toBeNull();
    expect(validateOptionalUrl("https://linkedin.com/in/jane", "LinkedIn")).toBeNull();
    expect(validateOptionalUrl("not-a-url", "GitHub")).toMatch(/valid GitHub URL/i);
  });
});
