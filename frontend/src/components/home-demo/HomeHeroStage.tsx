import { Link } from "react-router-dom";
import { ROUTES } from "../../lib/routes";

const CARDS = [
  {
    id: "synapse",
    to: ROUTES.synapse,
    kicker: "Workforce",
    title: "Synapse",
    body: "People, work, money",
  },
  {
    id: "cloud",
    to: ROUTES.webApplications,
    kicker: "Infrastructure",
    title: "Cloud Systems",
    body: "Spec-driven platforms",
  },
  {
    id: "terminal",
    to: ROUTES.terminal,
    kicker: "Hiring",
    title: "Terminal",
    body: "Screen, onboard, teach",
  },
] as const;

export default function HomeHeroStage() {
  return (
    <div className="hero-stage" data-testid="home-demo-hero-stage">
      <svg className="hero-stage-mesh" viewBox="0 0 1100 360" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="hero-node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2f83ff" />
            <stop offset="100%" stopColor="#0c3473" />
          </radialGradient>
        </defs>
        <g className="hero-stage-links" fill="none" stroke="#0866ff" strokeWidth="1.2" opacity="0.45">
          <path d="M180 90 C320 70 390 150 548 168" />
          <path d="M548 168 C690 150 760 90 920 110" />
          <path d="M548 168 C500 230 430 270 280 250" />
          <path d="M548 168 C640 240 760 280 900 246" />
          <path d="M280 250 C420 300 680 300 900 246" />
        </g>
        {[
          [180, 90],
          [548, 168],
          [920, 110],
          [280, 250],
          [900, 246],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="16" fill="#fff" stroke="#0866ff" strokeOpacity="0.35" />
            <circle cx={x} cy={y} r="5" fill="url(#hero-node)" />
          </g>
        ))}
        <g fill="none" stroke="#0f172a" strokeOpacity="0.18">
          <rect x="392" y="118" width="92" height="58" rx="10" />
          <path d="M408 148h60M408 158h42" />
        </g>
      </svg>
      <div className="hero-stage-cards">
        {CARDS.map((card) => (
          <Link className={`hero-float hero-float-${card.id}`} key={card.id} to={card.to}>
            <span>{card.kicker}</span>
            <strong>{card.title}</strong>
            <small>{card.body}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}
