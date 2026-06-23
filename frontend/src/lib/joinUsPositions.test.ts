import { describe, expect, it } from "vitest";
import {
  JOIN_US_POSITION_DEFAULT,
  JOIN_US_POSITION_OPTIONS,
} from "./joinUsPositions";

describe("joinUsPositions", () => {
  it("lists the Stitch Join Us application position options", () => {
    expect(JOIN_US_POSITION_OPTIONS).toEqual([
      "Full Stack Engineer",
      "AI Engineer",
      "QA Engineer",
      "Marketing Executive",
      "Other",
    ]);
  });

  it("uses a placeholder default for the position select", () => {
    expect(JOIN_US_POSITION_DEFAULT).toBe("Select a position");
    expect(JOIN_US_POSITION_OPTIONS).not.toContain(JOIN_US_POSITION_DEFAULT);
  });
});
