import React from "react";

/** Logo tagline: Commit. Code. Connect. — "Code." uses electric blue like the logo. */
export default function BrandTagline({ className }: { className?: string }) {
  return (
    <p className={["brand-tagline", className ?? ""].filter(Boolean).join(" ")} data-testid="brand-tagline">
      Commit. <span className="brand-tagline-accent">Code.</span> Connect.
    </p>
  );
}
