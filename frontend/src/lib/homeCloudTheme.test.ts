import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  HOME_CLOUD_KICKER_CLASS,
  HOME_CLOUD_LEAD_CLASS,
  HOME_CLOUD_THEME,
  HOME_CLOUD_THEME_CLASS,
  HOME_CLOUD_TITLE_ACCENT_CLASS,
  HOME_CLOUD_TITLE_CLASS,
  SITE_CLOUD_KICKER_SELECTORS,
  SITE_CLOUD_LEAD_SELECTORS,
  SITE_CLOUD_THEME_CLASS,
  SITE_CLOUD_TITLE_SELECTORS,
  withSiteCloudTheme,
} from "./homeCloudTheme";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");
const typeScale = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "..", "styles", "siteTypeScale.css"),
  "utf8",
);

describe("homeCloudTheme", () => {
  it("composes the site Cloud shell class without changing section padding", () => {
    expect(SITE_CLOUD_THEME_CLASS).toBe("site-cloud-theme");
    expect(withSiteCloudTheme("about-page")).toBe("site-cloud-theme about-page");
    expect(css).toContain(`.${SITE_CLOUD_THEME_CLASS}`);
    expect(css).not.toMatch(
      new RegExp(
        `\\.${SITE_CLOUD_THEME_CLASS.replace(/-/g, "\\-")}\\s*\\{[^}]*padding:\\s*${HOME_CLOUD_THEME.sectionPadding.replace(/[()]/g, "\\$&")}`,
      ),
    );
  });

  it("keeps Cloud, Built Right typography tokens as the shared home-band theme", () => {
    expect(HOME_CLOUD_THEME.heading).toBe("#0f172a");
    expect(HOME_CLOUD_THEME.body).toBe("#64748b");
    expect(HOME_CLOUD_THEME.kickerSize).toBe("0.75rem");
    expect(HOME_CLOUD_THEME.titleSize).toBe("clamp(2.2rem, 4vw, 3rem)");
    expect(HOME_CLOUD_THEME.sectionPadding).toBe("clamp(48px, 6vw, 80px) 0");
  });

  it("applies the Cloud, Built Right kicker, title, accent, and lead to all three home bands", () => {
    expect(css).toContain(`.${HOME_CLOUD_THEME_CLASS}`);
    expect(css).toContain(`.${HOME_CLOUD_KICKER_CLASS}`);
    expect(css).toContain(`.${HOME_CLOUD_TITLE_CLASS}`);
    expect(css).toContain(`.${HOME_CLOUD_TITLE_ACCENT_CLASS}`);
    expect(css).toContain(`.${HOME_CLOUD_LEAD_CLASS}`);

    expect(css).toMatch(
      new RegExp(
        `\\.${HOME_CLOUD_THEME_CLASS.replace(/-/g, "\\-")}[\\s\\S]*padding:\\s*${HOME_CLOUD_THEME.sectionPadding.replace(/[()]/g, "\\$&")}`,
      ),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.${HOME_CLOUD_KICKER_CLASS.replace(/-/g, "\\-")}[\\s\\S]*color:\\s*var\\(--stitch-blue`,
      ),
    );
    expect(css).toMatch(
      new RegExp(`\\.${HOME_CLOUD_TITLE_CLASS.replace(/-/g, "\\-")}[\\s\\S]*color:\\s*${HOME_CLOUD_THEME.heading}`),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.${HOME_CLOUD_TITLE_ACCENT_CLASS.replace(/-/g, "\\-")}[\\s\\S]*color:\\s*var\\(--stitch-blue`,
      ),
    );
    expect(css).toMatch(
      new RegExp(`\\.${HOME_CLOUD_LEAD_CLASS.replace(/-/g, "\\-")}[\\s\\S]*color:\\s*${HOME_CLOUD_THEME.body}`),
    );
    expect(typeScale).toContain(`.${HOME_CLOUD_TITLE_CLASS}`);
    expect(typeScale).toContain(`.${HOME_CLOUD_LEAD_CLASS}`);
    expect(typeScale).toContain(`.${HOME_CLOUD_KICKER_CLASS}`);
  });

  it("extends the Cloud, Built Right type theme to About, Services, and Work intros", () => {
    for (const selector of [
      ".about-intro-kicker",
      ".services-expertise-kicker",
      ".case-studies-intro-kicker",
      ".about-intro-title",
      ".services-expertise-title",
      ".case-studies-intro-title",
      ".about-intro-body",
      ".services-expertise-body",
      ".case-studies-intro-subtext",
    ]) {
      expect(typeScale).toContain(selector);
    }
    expect(css).toMatch(/\.about-intro-kicker\s*\{[^}]*color:\s*var\(--stitch-blue/);
    expect(css).not.toMatch(/\.about-intro-kicker\s*\{[^}]*color:\s*var\(--brand-gold\)/);
    expect(css).toMatch(/\.about-intro-title\s*\{[^}]*color:\s*#0f172a/);
    expect(css).toMatch(/\.about-intro-body\s*\{[^}]*color:\s*#64748b/);
    expect(css).toMatch(/\.services-expertise-title\s*\{[^}]*color:\s*#0f172a/);
    expect(css).toMatch(/\.services-expertise-body\s*\{[^}]*color:\s*#64748b/);
    expect(css).toMatch(/\.case-studies-intro-title\s*\{[^}]*color:\s*#0f172a/);
    expect(css).toMatch(/\.case-studies-intro-subtext\s*\{[^}]*color:\s*#64748b/);
    expect(css).toMatch(/\.case-studies-intro-kicker\s*\{[^}]*background:\s*transparent/);
  });

  it("applies Cloud, Built Right tokens to every About section and the site-wide page shell", () => {
    expect(css).toContain(`.${SITE_CLOUD_THEME_CLASS}`);
    expect(css).toMatch(
      new RegExp(`\\.${SITE_CLOUD_THEME_CLASS.replace(/-/g, "\\-")}[\\s\\S]*--text:\\s*${HOME_CLOUD_THEME.heading}`),
    );
    expect(css).toMatch(/\.about-principles-kicker\s*\{[^}]*font-size:\s*0\.75rem/);
    expect(css).toMatch(/\.about-principles-title\s*\{[^}]*color:\s*#0f172a/);
    expect(css).toMatch(/\.about-principles-subtext\s*\{[^}]*color:\s*#64748b/);
    expect(css).toMatch(/\.about-journey-kicker\s*\{[^}]*font-size:\s*0\.75rem/);
    expect(css).toMatch(/\.about-journey-title\s*\{[^}]*color:\s*#0f172a/);
    expect(css).toMatch(/\.about-craftsmanship-heading\s*\{[^}]*color:\s*#0f172a/);
    expect(css).toMatch(/\.about-craftsmanship-body\s*\{[^}]*color:\s*#64748b/);
    expect(css).toMatch(/\.about-bottom-cta-title\s*\{[^}]*color:\s*#0f172a/);
    expect(css).toMatch(/\.about-bottom-cta-subtext\s*\{[^}]*color:\s*#64748b/);
    for (const selector of SITE_CLOUD_KICKER_SELECTORS) {
      expect(typeScale).toContain(selector);
    }
    for (const selector of SITE_CLOUD_TITLE_SELECTORS) {
      expect(typeScale).toContain(selector);
    }
    for (const selector of SITE_CLOUD_LEAD_SELECTORS) {
      expect(typeScale).toContain(selector);
    }
  });
});
