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
  });
});
