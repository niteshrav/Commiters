import ServiceOfferCard from "../components/ServiceOfferCard";
import ServicesBottomCta from "../components/ServicesBottomCta";
import ServicesExpertiseSection from "../components/ServicesExpertiseSection";
import ServicesHowWeWorkSection from "../components/ServicesHowWeWorkSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { STITCH_SERVICES_GRID } from "../lib/stitchPageContent";
import { pageTitle } from "../lib/siteMeta";

export default function ServicesPage() {
  useDocumentTitle(pageTitle("Services"));

  return (
    <div className="services-page" data-testid="services-page">
      <ServicesExpertiseSection />

      <section className="section stitch-services-grid-section" data-testid="stitch-services-grid">
        <div className="stitch-services-grid">
          {STITCH_SERVICES_GRID.map((service) => (
            <ServiceOfferCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <ServicesHowWeWorkSection />
      <ServicesBottomCta />
    </div>
  );
}
