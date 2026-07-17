import { describe, expect, it } from "vitest";
import { LEAD_SERVICE_LABELS } from "./leadServices";

describe("leadServices", () => {
  it("exposes every service label available on the contact form, including automation and AI", () => {
    expect(LEAD_SERVICE_LABELS).toEqual([
      "Website Development",
      "Web Application Development",
      "Mobile App Development",
      "MVP Development",
      "E-commerce Development",
      "Automation Tools",
      "AI Integration",
    ]);
  });
});
