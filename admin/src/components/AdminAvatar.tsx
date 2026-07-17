import { resolveMediaUrl } from "../lib/api";
import { adminInitials } from "../lib/AdminPageContext";

type Props = {
  name: string;
  avatar?: string;
  size?: number;
  className?: string;
};

export default function AdminAvatar({ name, avatar = "", size = 40, className = "" }: Props) {
  const initials = adminInitials(name) || "A";
  const src = avatar.trim() ? resolveMediaUrl(avatar) : "";

  if (src) {
    return (
      <img
        className={`admin-avatar-img ${className}`.trim()}
        src={src}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`admin-user-avatar ${className}`.trim()}
      aria-hidden
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}
