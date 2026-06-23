import { HOME_TRUST_COUNTRIES } from "../lib/siteTrustContent";

export default function TrustStrip() {
  return (
    <div className="trust-strip" data-testid="trust-strip">
      <span className="trust-strip__label">Clients across</span>
      <ul className="trust-strip__countries">
        {HOME_TRUST_COUNTRIES.map((country) => (
          <li key={country}>{country}</li>
        ))}
      </ul>
      <span className="trust-strip__badge">Replies in 4hrs</span>
    </div>
  );
}
