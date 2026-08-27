import React from "react";
import { HOME_TECH_STACK_ITEMS, resolveTechIconUrl } from "../lib/homeTechStack";

export default function TechStackTicker() {
  const items = HOME_TECH_STACK_ITEMS;

  return (
    <div
      className="home-tech-ticker"
      data-testid="home-tech-ticker"
      aria-label="Technologies we use — scrolling marquee"
    >
      <div className="home-tech-ticker-viewport">
        <div className="home-tech-ticker-track">
          {items.map((tech, i) => (
            <span key={`a-${tech.slug}-${i}`} className="home-tech-ticker-item" title={tech.alt}>
              <img
                src={resolveTechIconUrl(tech)}
                alt={tech.alt}
                className="home-tech-logo-img"
                loading="lazy"
                decoding="async"
                width={44}
                height={44}
              />
            </span>
          ))}
          {items.map((tech, i) => (
            <span key={`b-${tech.slug}-${i}`} className="home-tech-ticker-item" title={tech.alt} aria-hidden="true">
              <img
                src={resolveTechIconUrl(tech)}
                alt=""
                className="home-tech-logo-img"
                loading="lazy"
                decoding="async"
                width={44}
                height={44}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
