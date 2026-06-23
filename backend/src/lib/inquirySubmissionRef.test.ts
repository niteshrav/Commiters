import { describe, expect, it } from "vitest";
import { createSubmissionRef } from "./inquirySubmissionRef";

describe("createSubmissionRef", () => {
  it("returns a unique hex id and submission timestamp", () => {
    const ref = createSubmissionRef(() => 1_714_000_000_000);

    expect(ref.id).toMatch(/^[a-f0-9]{24}$/);
    expect(ref.submittedAt).toEqual(new Date(1_714_000_000_000));
  });

  it("generates different ids on successive calls", () => {
    const first = createSubmissionRef();
    const second = createSubmissionRef();

    expect(first.id).not.toBe(second.id);
  });
});
