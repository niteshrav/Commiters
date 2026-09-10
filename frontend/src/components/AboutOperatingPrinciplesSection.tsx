import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconLock,
  IconShieldCheck,
  IconLayers,
  IconWorkflow,
} from "./icons";
import {
  ABOUT_OPERATING_PRINCIPLES,
  ABOUT_PAGE_COPY,
  type AboutPrincipleIcon,
} from "../lib/aboutPageContent";

function PrincipleIcon({ icon }: { icon: AboutPrincipleIcon }) {
  const props = { width: 16, height: 16 };

  switch (icon) {
    case "mcp":
      return <IconWorkflow {...props} />;
    case "authority":
      return <IconShieldCheck {...props} />;
    case "spec":
      return <IconLayers {...props} />;
    case "async":
      return <IconLock {...props} />;
    default:
      return <IconWorkflow {...props} />;
  }
}

export default function AboutOperatingPrinciplesSection() {
  const { principles } = ABOUT_PAGE_COPY;

  return (
    <section
      id="principles"
      className="about-principles-section about-principles-section--values reveal-on-scroll"
      data-testid="about-principles-section"
      aria-labelledby="about-principles-title"
    >
      <div className="about-principles-inner">
        <div className="about-principles-intro">
          <header className="about-principles-header">
            <p className="about-principles-kicker">{principles.kicker}</p>
            <h2 id="about-principles-title" className="about-principles-title">
              {principles.titleLead}
              <span className="about-principles-title-accent">{principles.titleAccent}</span>
            </h2>
            <p className="about-principles-subtext">{principles.subtext}</p>
          </header>

          <Link className="about-principles-view-all" to={principles.viewAllTo}>
            {principles.viewAllLabel}
            <IconArrowRight width={14} height={14} aria-hidden />
          </Link>
        </div>

        <div className="about-principles-grid">
          {ABOUT_OPERATING_PRINCIPLES.map((principle) => (
            <article
              key={principle.id}
              className={`about-principle-card about-principle-card--${principle.tone}`}
              data-testid="about-principle-card"
            >
              <span className={`about-principle-icon about-principle-icon--${principle.tone}`} aria-hidden>
                <PrincipleIcon icon={principle.icon} />
              </span>
              <h3 className="about-principle-card-title">{principle.title}</h3>
              <p className="about-principle-card-body">{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
