import { Link } from "react-router-dom";
import { STUDIO_PRODUCTS } from "../lib/studioProducts";

export default function StudioProductsStrip({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="studio-products-strip" data-testid="studio-products-strip">
      <div className="sp-strip-inner">
        <div className="sp-kicker">{eyebrow}</div>
        <h2>{title}</h2>
        <p>{lead}</p>
        <div className="sp-strip-grid">
          {STUDIO_PRODUCTS.map((product) => (
            <article className="sp-strip-card" key={product.id}>
              <div className="sp-strip-visual">
                <img src={product.card.image} alt={product.card.alt} />
              </div>
              <div className="sp-strip-body">
                <span className="sp-strip-tag">{product.card.kicker}</span>
                <h3>{product.name}</h3>
                <p>{product.card.body}</p>
                <Link className="sp-strip-link" to={product.route}>
                  {product.card.cta} ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
