import { STITCH_COPY } from "../lib/stitchDesign";

export default function EngineeringPrecisionBadge() {
  return (
    <span className="stitch-precision-badge" data-testid="engineering-precision-badge">
      <span className="stitch-precision-badge-dot" aria-hidden />
      {STITCH_COPY.engineeringPrecision}
    </span>
  );
}
