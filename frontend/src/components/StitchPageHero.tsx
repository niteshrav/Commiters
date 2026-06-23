import type { ReactNode } from "react";

type Props = {
  kicker?: string;
  title: ReactNode;
  subtext: string;
  className?: string;
};

export default function StitchPageHero({ kicker, title, subtext, className }: Props) {
  return (
    <section
      className={`stitch-page-hero reveal-on-scroll ${className ?? ""}`.trim()}
      data-testid="stitch-page-hero"
    >
      <div className="container stitch-page-hero-inner">
        {kicker ? <span className="stitch-page-kicker">{kicker}</span> : null}
        <h1 className="stitch-page-title typography-display">{title}</h1>
        <p className="stitch-page-subtext typography-body">{subtext}</p>
        <hr className="stitch-page-divider" />
      </div>
    </section>
  );
}
