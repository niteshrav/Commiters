import { Link, Navigate, useParams } from "react-router-dom";
import ServiceDetailFinalCta from "../components/service-detail/ServiceDetailFinalCta";
import ServiceDetailHero, { serviceDocumentTitle } from "../components/service-detail/ServiceDetailHero";
import ServiceDetailTestimonials, {
  ServiceDetailFaqs,
} from "../components/service-detail/ServiceDetailEngagement";
import ServiceDetailPortfolio from "../components/service-detail/ServiceDetailPortfolio";
import {
  ServiceDetailAbout,
  ServiceDetailFeatures,
  ServiceDetailIndustries,
  ServiceDetailPricing,
  ServiceDetailProcess,
  ServiceDetailTechnologies,
  ServiceDetailTimeline,
  ServiceDetailWhyChoose,
} from "../components/service-detail/ServiceDetailSections";
import { usePageSeo, SITE_ORIGIN } from "../hooks/usePageSeo";
import { buildServiceDetailPath, getServiceBySlug } from "../lib/services";
import { ROUTES } from "../lib/routes";
import { pageTitle } from "../lib/siteMeta";

export default function ServiceDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);

  usePageSeo(
    service
      ? {
          title: serviceDocumentTitle(service),
          description: service.seo.description,
          keywords: service.seo.keywords,
          path: buildServiceDetailPath(service.slug),
          ogType: "website",
          structuredData: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.seo.description,
            provider: {
              "@type": "Organization",
              name: "Commiters",
              url: SITE_ORIGIN,
            },
            areaServed: "Worldwide",
            url: `${SITE_ORIGIN}${buildServiceDetailPath(service.slug)}`,
          },
        }
      : null,
  );

  if (!service) {
    return <Navigate to={ROUTES.notFound} replace />;
  }

  return (
    <div className="service-detail-page" data-testid="service-detail-page" data-service-slug={service.slug}>
      <nav className="svc-detail-breadcrumb" aria-label="Breadcrumb">
        <Link to={ROUTES.services}>Services</Link>
        <span aria-hidden>/</span>
        <span>{service.title}</span>
      </nav>

      <ServiceDetailHero service={service} />
      <ServiceDetailAbout service={service} />
      <ServiceDetailFeatures service={service} />
      <ServiceDetailTechnologies service={service} />
      <ServiceDetailProcess service={service} />
      <ServiceDetailTimeline service={service} />
      <ServiceDetailPricing service={service} />
      <ServiceDetailIndustries service={service} />
      <ServiceDetailWhyChoose service={service} />
      <ServiceDetailPortfolio service={service} />
      <ServiceDetailTestimonials service={service} />
      <ServiceDetailFaqs service={service} />
      <ServiceDetailFinalCta />
    </div>
  );
}

export function serviceDetailTitleForTests(slug: string): string {
  const service = getServiceBySlug(slug);
  return service ? serviceDocumentTitle(service) : pageTitle("Page not found");
}
