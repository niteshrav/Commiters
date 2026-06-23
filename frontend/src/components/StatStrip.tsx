import type { TrustStat } from "../lib/siteTrustContent";

type Props = { stats: TrustStat[] };

export default function StatStrip({ stats }: Props) {
  return (
    <div className="stat-strip" data-testid="stat-strip" role="group" aria-label="Studio highlights">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-strip__item">
          <span className="stat-strip__value">{stat.value}</span>
          <span className="stat-strip__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
