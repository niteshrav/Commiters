import ServiceOfferCard from "../components/ServiceOfferCard";
import ServicesBottomCta from "../components/ServicesBottomCta";
import ServicesExpertiseSection from "../components/ServicesExpertiseSection";
import ServicesHowWeWorkSection from "../components/ServicesHowWeWorkSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { useServicesGrid } from "../lib/cms/hooks";
import { servicesPageSeo } from "../lib/sitePageSeo";

export default function ServicesPage() {
  usePageSeo(servicesPageSeo());
  const services = useServicesGrid();

  return (
    <div className="services-page" data-testid="services-page">
      <ServicesExpertiseSection />

      <section className="section stitch-services-grid-section" data-testid="stitch-services-grid">
        <div className="stitch-services-grid">
          {services.map((service) => (
            <ServiceOfferCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <ServicesHowWeWorkSection />
      <ServicesBottomCta />
    </div>
  );
}
