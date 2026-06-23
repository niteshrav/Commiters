import { IconBolt } from "./icons";

export default function FounderAvailabilityBadge() {
  return (
    <aside className="founder-availability-badge" data-testid="founder-availability-badge" aria-label="Reply time">
      <IconBolt width={18} height={18} aria-hidden />
      <div>
        <strong>Replies in 4hrs</strong>
        <span className="muted">IST · UTC+5:30</span>
      </div>
    </aside>
  );
}
