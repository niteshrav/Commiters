import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  centered?: boolean;
  className?: string;
  /** Dark navy hero per website review v2. */
  variant?: "default" | "navy";
  /** Optional block below the glass card (e.g. home metrics). */
  companion?: React.ReactNode;
}>;

export default function PageHeroImmersive({
  children,
  centered = false,
  className,
  variant = "default",
  companion,
}: Props) {
  const variantClass = variant === "navy" ? "premium-hero--navy" : "";
  return (
    <section
      className={`hero premium-hero premium-hero--immersive reveal-on-scroll ${variantClass} ${centered ? "hero-centered" : ""} ${className ?? ""}`.trim()}
      data-testid="page-hero-premium"
    >
      <div className="premium-hero-backdrop" data-testid="premium-hero-backdrop" aria-hidden />
      <div className={`premium-hero-shell ${centered ? "premium-hero-shell--centered" : ""}`.trim()}>
        <div className="premium-hero-glass premium-hero-glass--page">{children}</div>
        {companion}
      </div>
    </section>
  );
}
