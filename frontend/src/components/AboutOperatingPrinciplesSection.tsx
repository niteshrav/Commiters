import { Link } from "react-router-dom";
import {
  IconGlobe,
  IconLayers,
  IconShieldCheck,
  IconWorkflow,
} from "./icons";
import {
  ABOUT_OPERATING_PRINCIPLES,
  ABOUT_PAGE_COPY,
  type AboutPrincipleIcon,
} from "../lib/aboutPageContent";
import { BRAND_CARD_HOVER_CLASSES } from "../lib/brandColorKit";

function PrincipleIcon({ icon }: { icon: AboutPrincipleIcon }) {
  const props = { width: 22, height: 22 };

  switch (icon) {
    case "mcp":
      return <IconWorkflow {...props} />;
    case "authority":
      return <IconShieldCheck {...props} />;
    case "spec":
      return <IconLayers {...props} />;
    case "async":
      return <IconGlobe {...props} />;
    default:
      return <IconWorkflow {...props} />;
  }
}

export default function AboutOperatingPrinciplesSection() {
  const { principles } = ABOUT_PAGE_COPY;

  return (
    <section
      id="principles"
      className="about-principles-section reveal-on-scroll"
      data-testid="about-principles-section"
      aria-labelledby="about-principles-title"
    >
      <div className="about-principles-header">
        <h2 id="about-principles-title" className="about-principles-title">
          {principles.title}
        </h2>
        <Link className="about-principles-view-all" to={principles.viewAllTo}>
          {principles.viewAllLabel}
        </Link>
      </div>

      <div className="about-principles-grid">
        {ABOUT_OPERATING_PRINCIPLES.map((principle) => (
          <article
            key={principle.id}
            className={`about-principle-card ${BRAND_CARD_HOVER_CLASSES}`}
            data-testid="about-principle-card"
          >
            <span className="about-principle-icon" aria-hidden>
              <PrincipleIcon icon={principle.icon} />
            </span>
            <h3 className="about-principle-card-title">{principle.title}</h3>
            <p className="about-principle-card-body">{principle.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
