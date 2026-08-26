import { NavLink } from "react-router-dom";
import {
  SITEMAP_CARD_CLASS,
  SITEMAP_CARD_DESCRIPTION_CLASS,
  SITEMAP_CARD_HEADER_CLASS,
  SITEMAP_CARD_ICON_CLASS,
  SITEMAP_CARD_TITLE_CLASS,
  SITEMAP_CONTENT_SECTION_CLASS,
  SITEMAP_GRID_CLASS,
  SITEMAP_LINK_DESCRIPTION_CLASS,
  SITEMAP_LINK_LABEL_CLASS,
  SITEMAP_LINK_LIST_CLASS,
  SITEMAP_LINK_ROW_CLASS,
} from "../lib/sitemapPageLayout";
import { SITEMAP_PAGE_COPY, type SitemapPageIcon } from "../lib/sitemapPageContent";
import {
  IconCodeBracket,
  IconGlobe,
  IconHandshake,
  IconLayers,
  IconMapPin,
  IconShieldCheck,
  IconTarget,
  IconArrowRight,
} from "./icons";

function SitemapGroupIcon({ icon }: { icon: SitemapPageIcon }) {
  const props = { width: 20, height: 20, "aria-hidden": true as const };

  switch (icon) {
    case "company":
      return <IconGlobe {...props} />;
    case "services":
      return <IconCodeBracket {...props} />;
    case "work":
      return <IconLayers {...props} />;
    case "careers":
      return <IconHandshake {...props} />;
    case "about":
      return <IconTarget {...props} />;
    case "legal":
      return <IconShieldCheck {...props} />;
    case "local":
      return <IconMapPin {...props} />;
    default:
      return <IconGlobe {...props} />;
  }
}

export default function SitemapGroupsSection() {
  return (
    <section className={`${SITEMAP_CONTENT_SECTION_CLASS} reveal-on-scroll`} data-testid="sitemap-content-section">
      <div className={SITEMAP_GRID_CLASS} data-testid="sitemap-grid">
        {SITEMAP_PAGE_COPY.groups.map((group) => (
          <article
            key={group.id}
            className={SITEMAP_CARD_CLASS}
            data-testid={`sitemap-group-${group.id}`}
            aria-labelledby={`sitemap-group-title-${group.id}`}
          >
            <header className={SITEMAP_CARD_HEADER_CLASS}>
              <span className={SITEMAP_CARD_ICON_CLASS}>
                <SitemapGroupIcon icon={group.icon} />
              </span>
              <div>
                <h2 id={`sitemap-group-title-${group.id}`} className={SITEMAP_CARD_TITLE_CLASS}>
                  {group.title}
                </h2>
                <p className={SITEMAP_CARD_DESCRIPTION_CLASS}>{group.description}</p>
              </div>
            </header>

            <ul className={SITEMAP_LINK_LIST_CLASS}>
              {group.links.map((link) => (
                <li key={`${group.id}-${link.to}`}>
                  <NavLink to={link.to} end={link.to === "/"} className={SITEMAP_LINK_ROW_CLASS}>
                    <span className="sitemap-link-copy">
                      <span className={SITEMAP_LINK_LABEL_CLASS}>{link.label}</span>
                      {link.description ? (
                        <span className={SITEMAP_LINK_DESCRIPTION_CLASS}>{link.description}</span>
                      ) : null}
                    </span>
                    <IconArrowRight width={16} height={16} aria-hidden className="sitemap-link-arrow" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
