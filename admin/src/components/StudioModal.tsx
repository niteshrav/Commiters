import { useEffect, type PropsWithChildren, type ReactNode } from "react";
import MaterialIcon from "./MaterialIcon";

type Props = {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  footer: ReactNode;
  children: ReactNode;
};

export default function StudioModal({ open, title, subtitle, onClose, footer, children }: Props) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="studio-modal-backdrop" onClick={onClose} role="presentation">
      <div className="studio-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="studio-modal-title">
        <div className="studio-modal-header">
          <div>
            <h3 id="studio-modal-title">{title}</h3>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <button type="button" className="studio-modal-close" aria-label="Close" onClick={onClose}>
            <MaterialIcon name="close" />
          </button>
        </div>
        <div className="studio-modal-body custom-scrollbar">{children}</div>
        <div className="studio-modal-footer">{footer}</div>
      </div>
    </div>
  );
}

export function StudioPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="studio-page-header">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function StudioPrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
}: PropsWithChildren<{ onClick?: () => void; type?: "button" | "submit"; disabled?: boolean }>) {
  return (
    <button className="studio-btn studio-btn--primary" type={type} onClick={onClick} disabled={disabled}>
      <MaterialIcon name="add" />
      {children}
    </button>
  );
}

export function StudioStatusBadge({ published, label }: { published: boolean; label: string }) {
  return (
    <span className={`studio-status${published ? " studio-status--published" : " studio-status--draft"}`}>
      <span className="studio-status-dot" aria-hidden />
      {label}
    </span>
  );
}

export function StudioIconButton({
  icon,
  label,
  onClick,
  tone = "default",
}: {
  icon: string;
  label: string;
  onClick: () => void;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      className={`studio-icon-btn${tone === "danger" ? " studio-icon-btn--danger" : ""}`}
      aria-label={label}
      onClick={onClick}
    >
      <MaterialIcon name={icon} />
    </button>
  );
}
