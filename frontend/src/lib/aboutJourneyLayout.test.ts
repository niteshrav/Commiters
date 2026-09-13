import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ABOUT_JOURNEY_SECTION_CLASS,
  ABOUT_JOURNEY_STAGE_CLASS,
  ABOUT_JOURNEY_TRACK_CLASS,
  ABOUT_JOURNEY_TRACK_COLUMNS,
} from "./aboutJourneyLayout";
import { ABOUT_SECTION_SCROLL_SHELL_CLASS } from "./aboutPageContent";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("aboutJourneyLayout", () => {
  it("lays out four connected timeline stages", () => {
    const sectionStart = css.indexOf(`.${ABOUT_JOURNEY_SECTION_CLASS} {`);
    expect(sectionStart).toBeGreaterThan(-1);

    const trackStart = css.indexOf(`.${ABOUT_JOURNEY_TRACK_CLASS} {`, sectionStart);
    expect(trackStart).toBeGreaterThan(-1);
    const trackEnd = css.indexOf(`.${ABOUT_JOURNEY_TRACK_CLASS}::before {`, trackStart + 1);
    const track = css.slice(trackStart, trackEnd);
    expect(track).toContain("display: grid");
    expect(track).toContain(`grid-template-columns: ${ABOUT_JOURNEY_TRACK_COLUMNS}`);

    expect(css).toContain(".about-journey-dot");
    expect(css.indexOf(`.${ABOUT_JOURNEY_STAGE_CLASS} {`)).toBeGreaterThan(-1);
    expect(ABOUT_SECTION_SCROLL_SHELL_CLASS).toBe("pt-16 pb-16 w-full");
    expect(ABOUT_SECTION_SCROLL_SHELL_CLASS).not.toMatch(/scroll-mt-/);
    expect(css).toContain(".pt-16 {\n  padding-top: 4rem;");
    expect(css).toContain(".pb-16 {\n  padding-bottom: 4rem;");
  });
});
