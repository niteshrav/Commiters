import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HOME_DEMO_COPY, HOME_DEMO_PAGE_CLASS } from "../../lib/homeDemoContent";
import type { PlannerTypeId } from "../../lib/homePlannerData";
import HomeProjectPlanner, { type HomeProjectPlannerHandle } from "./HomeProjectPlanner";
import HomeServiceCarousel from "./HomeServiceCarousel";

export default function HomeDemoPage() {
  const copy = HOME_DEMO_COPY;
  const plannerRef = useRef<HomeProjectPlannerHandle>(null);
  const [toast, setToast] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);

  function pickType(id: PlannerTypeId) {
    plannerRef.current?.applyType(id);
    window.clearTimeout(toastTimer.current);
    setToast(true);
    toastTimer.current = window.setTimeout(() => setToast(false), 1800);
  }

  return (
    <div className={HOME_DEMO_PAGE_CLASS} data-testid="home-demo-page">
      <section className="hero" data-testid="home-demo-hero">
        <div className="wrap">
          <div className="eyebrow">
            <i /> {copy.hero.eyebrow}
          </div>
          <h1>
            {copy.hero.titleBefore}
            <span>{copy.hero.titleAccent}</span>
            {copy.hero.titleAfter}
          </h1>
          <p>{copy.hero.lead}</p>
          <div className="heroactions" data-testid="home-demo-hero-actions">
            <a className="btn" href={copy.hero.primaryHref}>
              {copy.hero.primaryCta} <span>↗</span>
            </a>
            <a className="btn secondary" href={copy.hero.secondaryHref}>
              {copy.hero.secondaryCta}
            </a>
          </div>
          <div className="trustline">
            {copy.hero.checks.map((check) => (
              <span key={check}>
                <b className="check">✓</b> {check}
              </span>
            ))}
          </div>
        </div>
      </section>

      <HomeServiceCarousel />

      <section className="section soft" data-testid="home-demo-problems">
        <div className="wrap problemgrid">
          <div className="stickycopy">
            <div className="kicker">{copy.problems.eyebrow}</div>
            <h2>{copy.problems.title}</h2>
            <p className="intro" style={{ margin: 0 }}>
              {copy.problems.lead}
            </p>
            <Link className="btn" to={copy.problems.ctaTo} style={{ marginTop: 23 }}>
              {copy.problems.cta} ↗
            </Link>
          </div>
          <div className="problem-list">
            {copy.problems.items.map((item) => (
              <a
                className="problem"
                href={`#${copy.finder.id}`}
                key={item.id}
                onClick={() => pickType(item.pick)}
              >
                <span className="icon">{item.num}</span>
                <span>
                  <b>{item.title}</b>
                  <p>{item.body}</p>
                </span>
                <span className="arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id={copy.needs.id} data-testid="home-demo-needs">
        <div className="wrap">
          <div className="center">
            <div className="kicker">{copy.needs.eyebrow}</div>
            <h2>{copy.needs.title}</h2>
            <p className="intro">{copy.needs.lead}</p>
          </div>
          <div className="cards">
            {copy.needs.items.map((item) => (
              <a
                className="service"
                href={`#${copy.finder.id}`}
                key={item.id}
                onClick={() => pickType(item.pick)}
              >
                <div className="icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="textlink">Explore this solution ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id={copy.finder.id} data-testid="home-demo-finder">
        <div className="wrap" id={copy.finder.legacyId}>
          <div className="center">
            <div className="kicker" style={{ color: "#8db8ff" }}>
              {copy.finder.eyebrow}
            </div>
            <h2>{copy.finder.title}</h2>
            <p className="intro">{copy.finder.lead}</p>
          </div>
          <HomeProjectPlanner ref={plannerRef} />
        </div>
      </section>

      <section className="section" id={copy.work.id} data-testid="home-demo-work">
        <div className="wrap">
          <div className="center">
            <div className="kicker">{copy.work.eyebrow}</div>
            <h2>{copy.work.title}</h2>
            <p className="intro">{copy.work.lead}</p>
          </div>
          <div className="casegrid">
            {copy.work.items.map((item) => (
              <article className="case" key={item.id}>
                <div className="casevisual">
                  <img src={item.image} srcSet={item.imageSrcSet} alt={item.alt} />
                </div>
                <div className="casebody">
                  <span className="tag">{item.kicker}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <Link className="textlink" to={item.to}>
                    {item.cta} ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="case-note">
            {copy.work.note}{" "}
            <Link className="textlink" to={copy.work.allWorkTo}>
              {copy.work.allWorkCta} ↗
            </Link>
          </p>
        </div>
      </section>

      <section className="section soft" data-testid="home-demo-products">
        <div className="wrap">
          <div className="center">
            <div className="kicker">{copy.products.eyebrow}</div>
            <h2>{copy.products.title}</h2>
            <p className="intro">{copy.products.lead}</p>
          </div>
          <div className="casegrid productgrid">
            {copy.products.items.map((item) => (
              <article className="case" key={item.id}>
                <div className="casevisual">
                  <img src={item.image} alt={item.alt} />
                </div>
                <div className="casebody">
                  <span className="tag">{item.kicker}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <Link className="textlink" to={item.to}>
                    {item.cta} ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft" id={copy.faq.id} data-testid="home-demo-faq">
        <div className="wrap faqgrid">
          <div>
            <div className="kicker">{copy.faq.eyebrow}</div>
            <h2>{copy.faq.title}</h2>
            <p className="intro" style={{ margin: 0 }}>
              {copy.faq.lead}
            </p>
            <Link className="textlink" to={copy.faq.contactTo} style={{ marginTop: 20 }}>
              {copy.faq.contactCta} ↗
            </Link>
          </div>
          <div className="faqs">
            {copy.faq.items.map((item) => (
              <details className="faq" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id={copy.cta.id} data-testid="home-demo-cta">
        <div className="wrap">
          <div className="cta">
            <div>
              <h2>{copy.cta.title}</h2>
              <p>{copy.cta.body}</p>
            </div>
            <div className="cta-actions">
              <Link className="btn" to={copy.cta.to}>
                {copy.cta.button} ↗
              </Link>
              <a className="btn wa" href={copy.cta.whatsappHref} target="_blank" rel="noopener noreferrer">
                {copy.cta.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className={`toast${toast ? " show" : ""}`} role="status">
        {copy.toast}
      </div>
    </div>
  );
}
