import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  SERVICES_BOTTOM_CTA,
  SERVICES_HOW_WE_WORK,
  SERVICES_REJECTED_BOTTOM_CTA_SUBTEXT,
} from "./servicesPageBottomContent";
import { buildDiscoveryCallCalendarUrl } from "./siteContact";
import { ROUTES } from "./routes";
import {
  SERVICES_BOTTOM_CTA_SECTION_CLASS,
  SERVICES_HOW_WE_WORK_GRID_CLASS,
  SERVICES_HOW_WE_WORK_GRID_COLUMNS,
  SERVICES_HOW_WE_WORK_GRID_GAP,
  SERVICES_HOW_WE_WORK_SECTION_CLASS,
  SERVICES_HOW_WE_WORK_SEPARATOR_CLASS,
  SERVICES_PAGE_SEPARATOR_COLOR,
} from "./servicesPageBottomLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("servicesPageBottomContent", () => {
  it("uses the services CTA copy from the Stitch screenshot", () => {
    expect(SERVICES_BOTTOM_CTA.subtext).toBe(
      "Connect with our engineering team to discuss your project requirements and receive a technical proposal.",
    );
    expect(SERVICES_BOTTOM_CTA.subtext).not.toBe(SERVICES_REJECTED_BOTTOM_CTA_SUBTEXT);
  });

  it("exposes the booking action and View Our Stack secondary link", () => {
    expect(SERVICES_BOTTOM_CTA.primaryLabel).toBe("Book a Technical Call");
    expect(SERVICES_BOTTOM_CTA.primaryHref).toBe(buildDiscoveryCallCalendarUrl());
    expect(SERVICES_BOTTOM_CTA.primaryHref).not.toContain("calendly.com");
    expect(SERVICES_BOTTOM_CTA.secondaryLabel).toBe("View Our Stack");
    expect(SERVICES_BOTTOM_CTA.secondaryHref).toBe(ROUTES.about);
  });

  it("lists the four Stitch process steps", () => {
    expect(SERVICES_HOW_WE_WORK.steps).toHaveLength(4);
    expect(SERVICES_HOW_WE_WORK.steps[0]).toMatchObject({
      index: "01",
      title: "Discovery",
    });
    expect(SERVICES_HOW_WE_WORK.steps[3].title).toBe("Handoff");
  });
});

describe("servicesPageBottomLayout", () => {
  it("styles the How We Work grid and section separators", () => {
    expect(css).toContain(`.${SERVICES_HOW_WE_WORK_SECTION_CLASS}`);

    const grid = ruleBlock(`.${SERVICES_HOW_WE_WORK_GRID_CLASS} {`, `.${SERVICES_BOTTOM_CTA_SECTION_CLASS} {`);
    expect(grid).toContain(`grid-template-columns: ${SERVICES_HOW_WE_WORK_GRID_COLUMNS}`);
    expect(grid).toContain(`gap: ${SERVICES_HOW_WE_WORK_GRID_GAP}`);

    const separator = ruleBlock(`.${SERVICES_HOW_WE_WORK_SEPARATOR_CLASS} {`, ".stitch-about-hero {");
    expect(separator).toContain(`border-top: 1px solid ${SERVICES_PAGE_SEPARATOR_COLOR}`);
    expect(separator).toContain("width: 100%");
  });
});
