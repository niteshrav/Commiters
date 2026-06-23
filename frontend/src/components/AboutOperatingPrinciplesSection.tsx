import { Link } from "react-router-dom";
import {
  IconBolt,
  IconCheckCircle,
  IconGlobe,
  IconShieldCheck,
} from "./icons";
import {
  ABOUT_OPERATING_PRINCIPLES,
  ABOUT_PAGE_COPY,
  type AboutPrincipleIcon,
} from "../lib/aboutPageContent";

function PrincipleIcon({ icon }: { icon: AboutPrincipleIcon }) {
  const props = { width: 22, height: 22 };

  switch (icon) {
    case "innovation":
      return <IconBolt {...props} />;
    case "quality":
      return <IconShieldCheck {...props} />;
    case "client":
      return <IconCheckCircle {...props} />;
    case "async":
      return <IconGlobe {...props} />;
    default:
      return <IconBolt {...props} />;
  }
}

export default function AboutOperatingPrinciplesSection() {
  const { principles } = ABOUT_PAGE_COPY;

  return (
    <section
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
          <article key={principle.id} className="about-principle-card" data-testid="about-principle-card">
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
