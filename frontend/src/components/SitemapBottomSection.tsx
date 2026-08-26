import { Link } from "react-router-dom";
import { SITEMAP_BOTTOM_BOX_CLASS, SITEMAP_BOTTOM_SECTION_CLASS } from "../lib/sitemapPageLayout";
import { SITEMAP_PAGE_COPY } from "../lib/sitemapPageContent";
import { IconArrowRight } from "./icons";

export default function SitemapBottomSection() {
  return (
    <section
      className={`${SITEMAP_BOTTOM_SECTION_CLASS} reveal-on-scroll`}
      data-testid="sitemap-bottom-section"
      aria-labelledby="sitemap-bottom-title"
    >
      <div className={SITEMAP_BOTTOM_BOX_CLASS}>
        <div>
          <h2 id="sitemap-bottom-title" className="sitemap-bottom-title">
            Need help navigating?
          </h2>
          <p className="sitemap-bottom-copy">{SITEMAP_PAGE_COPY.bottomNote}</p>
        </div>
        <Link to={SITEMAP_PAGE_COPY.bottomCtaTo} className="btn btn-primary sitemap-bottom-cta">
          {SITEMAP_PAGE_COPY.bottomCtaLabel}
          <IconArrowRight width={18} height={18} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
