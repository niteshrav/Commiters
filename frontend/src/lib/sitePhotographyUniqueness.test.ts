import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ABOUT_FOUNDER_PHOTO_SRC } from "./aboutCraftsmanshipContent";
import { AI_SUMMARIZER_CASE_STUDY_COPY } from "./aiSummarizerCaseStudyContent";
import { BROWSE_MY_VACATION_CASE_STUDY_COPY } from "./browseMyVacationCaseStudyContent";
import { CASE_STUDY_IMAGE_ASSETS } from "./caseStudiesPageAssets";
import { ECO_ROUTE_CASE_STUDY_COPY } from "./ecoRouteCaseStudyContent";
import { HOME_PAGE_ASSETS } from "./homePageContent";
import { JOIN_US_PAGE_ASSETS } from "./joinUsPageContent";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "./multiRoleCrmCaseStudyContent";
import { NEARDROP_CASE_STUDY_COPY } from "./neardropCaseStudyContent";
import { PROSPECT_IQ_CASE_STUDY_COPY } from "./prospectIqCaseStudyContent";
import { SERVICE_CARD_IMAGE_BY_GRID_ID } from "./serviceCardImages";
import { TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE } from "./technicalLedgerPageContent";
import { TRUSTTAP_ABOUT, TRUSTTAP_HERO_SHOWCASE } from "./trustTapPageContent";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

function fileHash(src: string): string {
  return createHash("sha256").update(readFileSync(join(publicRoot, src.replace(/^\//, "")))).digest("hex");
}

describe("site photography uniqueness", () => {
  it("does not reuse the same photo bytes across marketing surfaces", () => {
    const displayedSrcs = [
      HOME_PAGE_ASSETS.heroMonitor,
      HOME_PAGE_ASSETS.serverRacks,
      ABOUT_FOUNDER_PHOTO_SRC,
      JOIN_US_PAGE_ASSETS.officePhoto.src,
      TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.image.src,
      TRUSTTAP_HERO_SHOWCASE.image.src,
      TRUSTTAP_ABOUT.illustration.src,
      AI_SUMMARIZER_CASE_STUDY_COPY.heroImage.src,
      MULTI_ROLE_CRM_CASE_STUDY_COPY.heroImage.src,
      NEARDROP_CASE_STUDY_COPY.heroImage.src,
      PROSPECT_IQ_CASE_STUDY_COPY.heroImage.src,
      ECO_ROUTE_CASE_STUDY_COPY.heroImage.src,
      BROWSE_MY_VACATION_CASE_STUDY_COPY.introHeroImage.src,
      BROWSE_MY_VACATION_CASE_STUDY_COPY.visualBreak.image.src,
      ...BROWSE_MY_VACATION_CASE_STUDY_COPY.collageTiles.map((tile) => tile.src),
      ...CASE_STUDY_IMAGE_ASSETS.map((asset) => asset.src),
      ...Object.values(SERVICE_CARD_IMAGE_BY_GRID_ID),
    ];

    const hashes = displayedSrcs.map((src) => ({ src, hash: fileHash(src) }));
    const byHash = new Map<string, string[]>();
    for (const entry of hashes) {
      const list = byHash.get(entry.hash) ?? [];
      list.push(entry.src);
      byHash.set(entry.hash, list);
    }

    const duplicates = [...byHash.values()].filter((srcs) => srcs.length > 1);
    expect(duplicates).toEqual([]);
  });
});
