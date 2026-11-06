import { Link } from "react-router-dom";
import Reveal from "./motion/Reveal";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import type { StudioProduct } from "../lib/studioProducts";
import "../styles/studioProduct.css";

export default function StudioProductPage({ product }: { product: StudioProduct }) {
  return (
    <article className={withSiteCloudTheme("studio-product-page")} data-testid={product.pageTestId}>
      <section className="sp-hero" id="product-overview">
        <div className="sp-wrap sp-hero-grid">
          <div>
            <div className="sp-kicker">{product.eyebrow}</div>
            <p className="sp-name">{product.name}</p>
            <h1>{product.headline}</h1>
            <p className="sp-lead">{product.lead}</p>
            <div className="sp-actions">
              <a className="sp-btn primary" href={product.liveDemo.href} target="_blank" rel="noopener noreferrer">
                {product.liveDemo.label} ↗
              </a>
              <Link className="sp-btn secondary" to={product.primaryCta.to}>
                {product.primaryCta.label} ↗
              </Link>
              <Link className="sp-btn secondary" to={product.secondaryCta.to}>
                {product.secondaryCta.label} ↗
              </Link>
            </div>
          </div>
          <Reveal>
            <div className="studio-product-visual">
              <img src={product.card.image} alt={product.card.alt} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sp-section" id="capabilities">
        <div className="sp-wrap">
          <div className="sp-kicker">Capabilities</div>
          <h2>What the platform holds.</h2>
          <p className="sp-lead">{product.description}</p>
          <ul className="sp-caps">
            {product.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="sp-features">
            {product.features.map((feature) => (
              <Reveal key={feature.id}>
                <article className="sp-card">
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-section soft" id="how-it-works">
        <div className="sp-wrap">
          <div className="sp-kicker">How it works</div>
          <h2>A short path to a governed action.</h2>
          <ol className="sp-steps">
            {product.steps.map((step) => (
              <li key={step.id}>
                <b>{step.step}</b>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sp-section sp-final">
        <div className="sp-wrap">
          <h2>Commission {product.name} for the next system.</h2>
          <p className="sp-lead">Share the workflow, the roles, and the writes that must stay governed.</p>
          <div className="sp-actions">
            <a className="sp-btn primary" href={product.liveDemo.href} target="_blank" rel="noopener noreferrer">
              {product.liveDemo.label} ↗
            </a>
            <Link className="sp-btn secondary" to={product.primaryCta.to}>
              {product.primaryCta.label} ↗
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
