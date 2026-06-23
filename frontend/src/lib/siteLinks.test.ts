import { describe, expect, it } from "vitest";
import { SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_MEDIUM_URL } from "./siteLinks";

describe("siteLinks", () => {
  it("uses the canonical LinkedIn company page URL", () => {
    expect(SITE_LINKEDIN_URL).toBe(
      "https://www.linkedin.com/company/commiters-softwares/?viewAsMember=true",
    );
  });

  it("keeps GitHub profile URL stable", () => {
    expect(SITE_GITHUB_URL).toBe("https://github.com/niteshrav");
  });

  it("uses the canonical Instagram profile URL", () => {
    expect(SITE_INSTAGRAM_URL).toBe("https://www.instagram.com/commitersconnect/");
  });

  it("uses the canonical Medium profile URL for footer social links", () => {
    expect(SITE_MEDIUM_URL).toBe("https://medium.com/@erniteshrav");
  });
});
