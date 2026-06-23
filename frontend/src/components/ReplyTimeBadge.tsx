export default function ReplyTimeBadge() {
  return (
    <p className="reply-time-badge" data-testid="reply-time-badge" role="status">
      <span className="reply-time-badge__icon" aria-hidden>
        ✓
      </span>
      Usually replies within 4 hours
    </p>
  );
}
