import {
  SITEMAP_INTRO_INNER_CLASS,
  SITEMAP_INTRO_SECTION_CLASS,
  SITEMAP_KICKER_CLASS,
  SITEMAP_META_BAR_CLASS,
  SITEMAP_META_LINK_CLASS,
  SITEMAP_META_STAT_CLASS,
  SITEMAP_SUBTEXT_CLASS,
  SITEMAP_TITLE_CLASS,
} from "../lib/sitemapPageLayout";
import { SITEMAP_PAGE_COPY, SITEMAP_XML_PATH, countSitemapLinks } from "../lib/sitemapPageContent";
import { IconExternalLink } from "./icons";

export default function SitemapIntroSection() {
  const linkCount = countSitemapLinks();

  return (
    <section
      className={`${SITEMAP_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="sitemap-intro-section"
      aria-labelledby="sitemap-page-title"
    >
      <div className={SITEMAP_INTRO_INNER_CLASS}>
        <p className={SITEMAP_KICKER_CLASS}>{SITEMAP_PAGE_COPY.kicker}</p>
        <h1 id="sitemap-page-title" className={SITEMAP_TITLE_CLASS}>
          {SITEMAP_PAGE_COPY.title}
        </h1>
        <p className={SITEMAP_SUBTEXT_CLASS}>{SITEMAP_PAGE_COPY.subtext}</p>

        <div className={SITEMAP_META_BAR_CLASS} data-testid="sitemap-meta-bar">
          <p className={SITEMAP_META_STAT_CLASS}>
            <strong>{linkCount}</strong> {SITEMAP_PAGE_COPY.statsLabel}
          </p>
          <a className={SITEMAP_META_LINK_CLASS} href={SITEMAP_XML_PATH} target="_blank" rel="noopener noreferrer">
            {SITEMAP_PAGE_COPY.xmlLabel}
            <IconExternalLink width={16} height={16} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
