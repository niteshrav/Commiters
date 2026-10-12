import { describe, expect, it } from "vitest";
import { SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_MEDIUM_URL, SITE_YOUTUBE_URL } from "./siteLinks";

describe("siteLinks", () => {
  it("uses the canonical LinkedIn company page URL", () => {
    expect(SITE_LINKEDIN_URL).toBe("https://www.linkedin.com/company/commiters-softwares/");
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

  it("uses the brand YouTube channel URL for footer social icons", () => {
    expect(SITE_YOUTUBE_URL).toBe("https://www.youtube.com/@commitersconnect");
  });
});
