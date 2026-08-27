import AiSolutionsSection from "../components/AiSolutionsSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { aiSolutionsPageSeo } from "../lib/sitePageSeo";
import { AISOL_PAGE_CLASS } from "../lib/aiSolutionsPageLayout";

export default function AiSolutionsPage() {
  usePageSeo(aiSolutionsPageSeo());

  return (
    <div className={AISOL_PAGE_CLASS} data-testid="ai-solutions-page">
      <AiSolutionsSection />
    </div>
  );
}
