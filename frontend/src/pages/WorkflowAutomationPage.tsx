import WorkflowAutomationSection from "../components/WorkflowAutomationSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { workflowAutomationPageSeo } from "../lib/sitePageSeo";
import { WFLOW_PAGE_CLASS } from "../lib/workflowAutomationPageLayout";

export default function WorkflowAutomationPage() {
  usePageSeo(workflowAutomationPageSeo());

  return (
    <div className={WFLOW_PAGE_CLASS} data-testid="workflow-automation-page">
      <WorkflowAutomationSection />
    </div>
  );
}
