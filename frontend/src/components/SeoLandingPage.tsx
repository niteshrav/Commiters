import React from "react";
import { Link } from "react-router-dom";
import Reveal from "./motion/Reveal";
import { usePageSeo, SITE_ORIGIN } from "../hooks/usePageSeo";
import type { SeoLandingPageContent } from "../lib/seoLandingUdaipurContent";
import { seoLandingServiceSchema } from "../lib/seoLandingUdaipurContent";

type Props = {
  content: SeoLandingPageContent;
};

export default function SeoLandingPage({ content }: Props) {
  usePageSeo({
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    path: content.path,
    structuredData: seoLandingServiceSchema(content, SITE_ORIGIN),
  });

  return (
    <div className="seo-landing-page" data-testid={content.testId}>
      <section className="seo-landing-hero">
        <Reveal>
          <p className="seo-landing-kicker">{content.hero.kicker}</p>
          <h1>{content.hero.title}</h1>
          <p className="seo-landing-subtext">{content.hero.subtext}</p>
        </Reveal>
      </section>

      {content.sections.map((section) => (
        <section key={section.title} className="seo-landing-section">
          <Reveal>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            {section.bullets?.length ? (
              <ul className="seo-landing-list">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </section>
      ))}

      <section className="seo-landing-faq" aria-labelledby="seo-landing-faq-title">
        <Reveal>
          <h2 id="seo-landing-faq-title">Frequently asked questions</h2>
          <dl className="seo-landing-faq-list">
            {content.faqs.map((faq) => (
              <div key={faq.question} className="seo-landing-faq-item">
                <dt>{faq.question}</dt>
                <dd>{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="seo-landing-cta" aria-labelledby="seo-landing-cta-title">
        <Reveal>
          <h2 id="seo-landing-cta-title">{content.cta.title}</h2>
          <p>{content.cta.subtext}</p>
          <div className="seo-landing-cta-actions">
            <Link className="btn btn-primary" to={content.cta.primaryHref}>
              {content.cta.primaryLabel}
            </Link>
            <Link className="btn btn-secondary" to={content.cta.secondaryHref}>
              {content.cta.secondaryLabel}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
