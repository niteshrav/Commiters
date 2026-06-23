import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ABOUT_CRAFTSMANSHIP_RULE_CLASS,
  ABOUT_CRAFTSMANSHIP_RULE_COLOR,
  ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS,
} from "./aboutCraftsmanshipContent";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("aboutSectionLayout", () => {
  it("frames craftsmanship with contained horizontal rules instead of full-bleed separators", () => {
    expect(ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS.top).toBe("about-craftsmanship-rule-top");
    expect(ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS.bottom).toBe("about-craftsmanship-rule-bottom");
    expect(css).toContain(`.${ABOUT_CRAFTSMANSHIP_RULE_CLASS}`);
    expect(css).toContain(`border-top: 1px solid ${ABOUT_CRAFTSMANSHIP_RULE_COLOR}`);
    expect(css).not.toContain(".about-page .home-section-separator");
  });
});
