import { describe, expect, it } from "vitest";
import {
  sanitizeBudgetInput,
  sanitizeNameInput,
  sanitizeTimelineInput,
  validateBudgetOptional,
  validateEmail,
  validateName,
  validateTimelineOptional,
} from "./contactValidation";

describe("contactValidation", () => {
  describe("sanitizeNameInput", () => {
    it("keeps letters, spaces, hyphens, and apostrophes", () => {
      expect(sanitizeNameInput("Nitesh Rav")).toBe("Nitesh Rav");
      expect(sanitizeNameInput("Mary-Jane O'Brien")).toBe("Mary-Jane O'Brien");
    });

    it("strips digits and symbols", () => {
      expect(sanitizeNameInput("John123")).toBe("John");
      expect(sanitizeNameInput("A@B#C")).toBe("ABC");
    });
  });

  describe("validateEmail", () => {
    it("rejects empty email", () => {
      expect(validateEmail("")).toMatch(/email/i);
    });

    it("accepts common valid emails", () => {
      expect(validateEmail("hello@commiters.com")).toBeNull();
      expect(validateEmail("commitersudaipur@gmail.com")).toBeNull();
      expect(validateEmail("  a@b.co  ")).toBeNull();
    });

    it("rejects invalid patterns", () => {
      expect(validateEmail("not-an-email")).toMatch(/valid/i);
    });
  });

  describe("validateName", () => {
    it("accepts alphabetic names with allowed punctuation", () => {
      expect(validateName("Nitesh Rav")).toBeNull();
      expect(validateName("Mary-Jane")).toBeNull();
    });

    it("rejects empty trimmed names", () => {
      expect(validateName("   ")).toMatch(/name/i);
    });

    it("rejects names that still contain invalid characters after trim", () => {
      expect(validateName("Test99")).toMatch(/letters/i);
    });
  });

  describe("sanitizeBudgetInput", () => {
    it("keeps only digits and commas", () => {
      expect(sanitizeBudgetInput("50,000 INR")).toBe("50,000");
      expect(sanitizeBudgetInput("abc12,34def")).toBe("12,34");
    });
  });

  describe("validateBudgetOptional", () => {
    it("allows empty optional budget", () => {
      expect(validateBudgetOptional("")).toBeNull();
      expect(validateBudgetOptional("   ")).toBeNull();
    });

    it("allows comma-separated digits only", () => {
      expect(validateBudgetOptional("50,000")).toBeNull();
      expect(validateBudgetOptional("1,50,000")).toBeNull();
    });

    it("rejects letters or symbols", () => {
      expect(validateBudgetOptional("50k")).toMatch(/digits and commas/i);
    });

    it("rejects comma-only input", () => {
      expect(validateBudgetOptional(",,,")).toMatch(/digit/i);
    });
  });

  describe("sanitizeTimelineInput", () => {
    it("keeps letters, digits, spaces, and hyphens", () => {
      expect(sanitizeTimelineInput("4-8 weeks")).toBe("4-8 weeks");
      expect(sanitizeTimelineInput("12 weeks!")).toBe("12 weeks");
    });
  });

  describe("validateTimelineOptional", () => {
    it("allows empty timeline", () => {
      expect(validateTimelineOptional("")).toBeNull();
    });

    it("allows alphanumeric with spaces and hyphens", () => {
      expect(validateTimelineOptional("4-8 weeks")).toBeNull();
      expect(validateTimelineOptional("12 weeks")).toBeNull();
    });

    it("rejects invalid characters", () => {
      expect(validateTimelineOptional("2@weeks")).toMatch(/letters/i);
    });
  });
});
