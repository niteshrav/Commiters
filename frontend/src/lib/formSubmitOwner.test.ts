import { describe, expect, it } from "vitest";
import { getOwnerInboxForForms } from "./formSubmitOwner";
import { SITE_FORM_INBOX } from "./siteContact";

describe("formSubmitOwner", () => {
  it("delivers public forms to hello@commiters.com", () => {
    expect(SITE_FORM_INBOX).toBe("hello@commiters.com");
    expect(getOwnerInboxForForms()).toBe("hello@commiters.com");
  });
});
