import { describe, expect, it } from "vitest";
import { isPathAllowed, parseRobotsTxt, robotsPolicyFromResponse } from "./robots";

describe("robots", () => {
  const sample = `
User-agent: *
Disallow: /secret
Allow: /secret/public
User-agent: CommitersBot
Disallow: /admin
`;

  it("uses the crawler user-agent group when present", () => {
    const rules = parseRobotsTxt(sample, "CommitersBot/1.0");
    expect(isPathAllowed("/admin", rules)).toBe(false);
    expect(isPathAllowed("/secret", rules)).toBe(true);
  });

  it("wildcard allow/disallow with longest match", () => {
    const rules = parseRobotsTxt(sample, "OtherBot/1.0");
    expect(isPathAllowed("/secret", rules)).toBe(false);
    expect(isPathAllowed("/secret/public", rules)).toBe(true);
    expect(isPathAllowed("/about", rules)).toBe(true);
  });

  it("treats 404 as allow and 403 as block", () => {
    const notFound = robotsPolicyFromResponse(404, "", "CommitersBot/1.0");
    expect(notFound.blocked).toBe(false);
    const forbidden = robotsPolicyFromResponse(403, "no", "CommitersBot/1.0");
    expect(forbidden.blocked).toBe(true);
  });
});
