import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  SERVICES_BOTTOM_CTA,
  SERVICES_HOW_WE_WORK,
  SERVICES_REJECTED_BOTTOM_CTA_SUBTEXT,
} from "./servicesPageBottomContent";
import { ROUTES } from "./routes";
import {
  SERVICES_BOTTOM_CTA_SECTION_CLASS,
  SERVICES_HOW_WE_WORK_CARD_CLASS,
  SERVICES_HOW_WE_WORK_SECTION_CLASS,
  SERVICES_HOW_WE_WORK_SEPARATOR_CLASS,
  SERVICES_HOW_WE_WORK_TRACK_CLASS,
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
      "Book a 2-week AI Operational Audit to map spreadsheet bottlenecks and leave with a working automation prototype.",
    );
    expect(SERVICES_BOTTOM_CTA.subtext).not.toBe(SERVICES_REJECTED_BOTTOM_CTA_SUBTEXT);
  });

  it("exposes the booking action and View Our Stack secondary link", () => {
    expect(SERVICES_BOTTOM_CTA.primaryLabel).toBe("Book Operational Audit");
    expect(SERVICES_BOTTOM_CTA.primaryHref).toBe(ROUTES.aiOperationalAudit);
    expect(SERVICES_BOTTOM_CTA.primaryHref).not.toContain("calendly.com");
    expect(SERVICES_BOTTOM_CTA.secondaryLabel).toBe("View Our Stack");
    expect(SERVICES_BOTTOM_CTA.secondaryHref).toBe(ROUTES.about);
  });

  it("lists the four governed delivery stages", () => {
    expect(SERVICES_HOW_WE_WORK.kicker).toBe("OUR PROCESS");
    expect(SERVICES_HOW_WE_WORK.titleAccent).toBe("Work");
    expect(SERVICES_HOW_WE_WORK.steps).toHaveLength(4);
    expect(SERVICES_HOW_WE_WORK.steps[0]).toMatchObject({
      index: "01",
      title: "AI Operational Audit",
      tone: "blue",
      href: ROUTES.aiOperationalAudit,
    });
    expect(SERVICES_HOW_WE_WORK.steps[1].title).toBe("Architecture & Policy Design");
    expect(SERVICES_HOW_WE_WORK.steps[2].title).toBe("Spec-Driven Sprints");
    expect(SERVICES_HOW_WE_WORK.steps[3].title).toBe("Governed Deployment & Handoff");
  });
});

describe("servicesPageBottomLayout", () => {
  it("styles the How We Work track and section separators", () => {
    expect(css).toContain(`.${SERVICES_HOW_WE_WORK_SECTION_CLASS}`);

    const track = ruleBlock(`.${SERVICES_HOW_WE_WORK_TRACK_CLASS} {`, `.${SERVICES_HOW_WE_WORK_CARD_CLASS} {`);
    expect(track).toContain("display: flex");

    const separator = ruleBlock(`.${SERVICES_HOW_WE_WORK_SEPARATOR_CLASS} {`, ".stitch-about-hero {");
    expect(separator).toContain(`border-top: 1px solid ${SERVICES_PAGE_SEPARATOR_COLOR}`);
    expect(separator).toContain("width: 100%");
  });
});
