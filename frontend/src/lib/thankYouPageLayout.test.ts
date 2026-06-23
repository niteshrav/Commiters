import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  THANK_YOU_ACTIONS_CLASS,
  THANK_YOU_CONTENT_CLASS,
  THANK_YOU_INFRASTRUCTURE_CLASS,
  THANK_YOU_INFRASTRUCTURE_LOGO_CLASS,
  THANK_YOU_MESSAGE_CLASS,
  THANK_YOU_PAGE_CLASS,
  THANK_YOU_SUCCESS_ICON_CLASS,
  THANK_YOU_TITLE_CLASS,
} from "./thankYouPageLayout";

const css = readFileSync(resolve(__dirname, "../styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("thankYouPageLayout", () => {
  it("defines Stitch thank-you page classes in styles.css", () => {
    expect(css).toContain(`.${THANK_YOU_PAGE_CLASS}`);
    expect(css).toContain(`.${THANK_YOU_CONTENT_CLASS}`);
    expect(css).toContain(`.${THANK_YOU_SUCCESS_ICON_CLASS}`);
    expect(css).toContain(`.${THANK_YOU_TITLE_CLASS}`);
    expect(css).toContain(`.${THANK_YOU_MESSAGE_CLASS}`);
    expect(css).toContain(`.${THANK_YOU_ACTIONS_CLASS}`);
    expect(css).toContain(`.${THANK_YOU_INFRASTRUCTURE_CLASS}`);
    expect(css).not.toContain(".thank-you-view-toggle");
  });

  it("renders the infrastructure logo in full colour without a grayscale treatment", () => {
    const logo = ruleBlock(`.${THANK_YOU_INFRASTRUCTURE_LOGO_CLASS} {`, "@media (prefers-reduced-motion: reduce)");
    expect(logo).not.toContain("grayscale");
    expect(logo).not.toContain("opacity: 0.18");
  });
});
