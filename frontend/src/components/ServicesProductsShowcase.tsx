import { Link } from "react-router-dom";
import { FROSTED_GLASS_CLASS_NAME } from "../lib/frostedGlass";
import { SERVICES_OVERVIEW_DISPLAY } from "../lib/servicesOverviewPageDesign";
import {
  SERVICES_OVERVIEW_PRODUCTS,
  SERVICES_OVERVIEW_PRODUCTS_ANCHOR,
  SERVICES_OVERVIEW_PRODUCTS_TITLE,
} from "../lib/servicesOverviewPageContent";
import {
  SERVICES_OVERVIEW_PRODUCT_CARD_CLASS,
  SERVICES_OVERVIEW_PRODUCTS_GRID_CLASS,
  SERVICES_OVERVIEW_PRODUCTS_SECTION_CLASS,
} from "../lib/servicesOverviewPageLayout";

export default function ServicesProductsShowcase() {
  return (
    <section
      id={SERVICES_OVERVIEW_PRODUCTS_ANCHOR}
      className={`${SERVICES_OVERVIEW_PRODUCTS_SECTION_CLASS} reveal-on-scroll`}
      aria-labelledby="services-products-title"
    >
      <div className="services-overview-inner">
        <h2 id="services-products-title">{SERVICES_OVERVIEW_PRODUCTS_TITLE}</h2>
        <div className={SERVICES_OVERVIEW_PRODUCTS_GRID_CLASS} data-testid="services-products-showcase">
          {SERVICES_OVERVIEW_PRODUCTS.map((product) => (
            <article
              key={product.id}
              className={`${SERVICES_OVERVIEW_PRODUCT_CARD_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}
              data-testid="services-product-card"
            >
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <Link className="btn btn-secondary" to={product.to}>
                {product.ctaLabel}{" "}
                <span aria-hidden="true">{SERVICES_OVERVIEW_DISPLAY.ctaArrow}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
