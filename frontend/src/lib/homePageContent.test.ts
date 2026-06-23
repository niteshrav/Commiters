import { describe, expect, it } from "vitest";
import { HOME_PAGE_ASSETS, HOME_PAGE_COPY } from "./homePageContent";
import { ROUTES } from "./routes";

describe("homePageContent", () => {
  it("exposes cropped home photography paths", () => {
    expect(HOME_PAGE_ASSETS.heroMonitor).toBe("/assets/home/home-hero-monitor.png");
    expect(HOME_PAGE_ASSETS.heroMonitor2x).toBe("/assets/home/home-hero-monitor@2x.png");
    expect(HOME_PAGE_ASSETS.serverRacks).toBe("/assets/home/server-racks.png");
    expect(HOME_PAGE_ASSETS.serverRacks2x).toBe("/assets/home/server-racks@2x.png");
  });

  it("links the hero primary CTA to the Our Work page", () => {
    expect(HOME_PAGE_COPY.hero.ctaPrimary).toBe("Our Work");
    expect(HOME_PAGE_COPY.hero.ctaPrimaryTo).toBe(ROUTES.caseStudies);
  });

  it("matches Stitch home screenshot copy", () => {
    expect(HOME_PAGE_COPY.hero.title).toBe("Code Your Success");
    expect(HOME_PAGE_COPY.corePillars.title).toBe("Our Core Pillars");
    expect(HOME_PAGE_COPY.corePillars.quality.title).toBe("Quality-First Engineering");
    expect(HOME_PAGE_COPY.builtForScale.title).toBe("Built for Scale");
    expect(HOME_PAGE_COPY.builtForScale.features).toHaveLength(3);
    expect(HOME_PAGE_COPY.builtForScale.features[0].title).toBe("Cloud-Native Architecture");
    expect(HOME_PAGE_COPY.bottomCta.title).toBe("Ready to Build the Future?");
    expect(HOME_PAGE_COPY.bottomCta.subtext).toBe(
      "Join the ranks of high-performance companies powered by Commiters.",
    );
    expect(HOME_PAGE_COPY.bottomCta.buttonTo).toBe(ROUTES.contact);
  });

  it("describes founder-led delivery in the core pillars card", () => {
    expect(HOME_PAGE_COPY.corePillars.founderLed.body).toBe(
      "Every project is architected and overseen by our founder. No hand-offs to juniors, just direct communication with the expert building your vision.",
    );
  });

  it("nests quality-first engineering inside core pillars with four labeled metrics", () => {
    const { quality } = HOME_PAGE_COPY.corePillars;
    expect(quality.title).toBe("Quality-First Engineering");
    expect(quality.metrics.map((m) => m.value)).toEqual(["99.9%", "<200ms", "100%", "24/7"]);
    expect(quality.metrics.map((m) => m.label)).toEqual([
      "SYSTEM UPTIME",
      "API LATENCY",
      "TEST COVERAGE",
      "MONITORING",
    ]);
  });
});
