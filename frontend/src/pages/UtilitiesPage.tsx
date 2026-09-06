import UtilitiesSection from "../components/UtilitiesSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { utilitiesPageSeo } from "../lib/sitePageSeo";
import { UTILITIES_PAGE_CLASS } from "../lib/utilitiesPageLayout";

export default function UtilitiesPage() {
  usePageSeo(utilitiesPageSeo());

  return (
    <div className={UTILITIES_PAGE_CLASS} data-testid="utilities-page">
      <UtilitiesSection />
    </div>
  );
}
