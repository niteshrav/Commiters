import ServicesCoreCapabilities from "../components/ServicesCoreCapabilities";
import ServicesGovernanceStandards from "../components/ServicesGovernanceStandards";
import ServicesOverviewHero from "../components/ServicesOverviewHero";
import ServicesOverviewInquiry from "../components/ServicesOverviewInquiry";
import ServicesProductsShowcase from "../components/ServicesProductsShowcase";
import ServicesStrategicOfferings from "../components/ServicesStrategicOfferings";
import { usePageSeo } from "../hooks/usePageSeo";
import { servicesPageSeo } from "../lib/sitePageSeo";
import { SERVICES_OVERVIEW_PAGE_CLASS } from "../lib/servicesOverviewPageLayout";

export default function ServicesPage() {
  usePageSeo(servicesPageSeo());

  return (
    <div className={`services-page ${SERVICES_OVERVIEW_PAGE_CLASS}`} data-testid="services-page">
      <ServicesOverviewHero />
      <ServicesStrategicOfferings />
      <ServicesGovernanceStandards />
      <ServicesCoreCapabilities />
      <ServicesProductsShowcase />
      <ServicesOverviewInquiry />
    </div>
  );
}
