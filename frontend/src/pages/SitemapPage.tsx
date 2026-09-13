import SitemapBottomSection from "../components/SitemapBottomSection";
import SitemapGroupsSection from "../components/SitemapGroupsSection";
import SitemapIntroSection from "../components/SitemapIntroSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { SITEMAP_PAGE_CLASS } from "../lib/sitemapPageLayout";
import { sitemapPageSeo } from "../lib/sitePageSeo";

export default function SitemapPage() {
  usePageSeo(sitemapPageSeo());

  return (
    <div className={withSiteCloudTheme(SITEMAP_PAGE_CLASS)} data-testid="sitemap-page">
      <SitemapIntroSection />
      <SitemapGroupsSection />
      <SitemapBottomSection />
    </div>
  );
}
