import ServiceOfferCard from "../components/ServiceOfferCard";
import ServicesBottomCta from "../components/ServicesBottomCta";
import ServicesExpertiseSection from "../components/ServicesExpertiseSection";
import ServicesHowWeWorkSection from "../components/ServicesHowWeWorkSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useServicesGrid } from "../lib/cms/hooks";
import { pageTitle } from "../lib/siteMeta";

export default function ServicesPage() {
  useDocumentTitle(pageTitle("Services"));
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
