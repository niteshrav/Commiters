type Props = {
  name: string;
  filled?: boolean;
  className?: string;
};

export default function MaterialIcon({ name, filled = false, className = "" }: Props) {
  return (
    <span
      className={`material-symbols-outlined ${className}`.trim()}
      aria-hidden
      style={filled ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" } : undefined}
    >
      {name}
    </span>
  );
}
