import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function Panel({
  children,
  className,
  title,
  subtitle,
  action,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <section className={cn("panel p-4 md:p-5", className)}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
          <div className="min-w-0">
            {title && (
              <h3 className="text-[14px] md:text-[15px] font-semibold truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[11.5px] text-secondary mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export function Chip({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "gold" | "success" | "warning" | "danger" | "info";
  className?: string;
}) {
  const tones = {
    default: "bg-white/5 text-secondary border-white/10",
    gold: "bg-primary/15 text-primary border-primary/30",
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    danger: "bg-destructive/15 text-destructive border-destructive/30",
    info: "bg-info/15 text-info border-info/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded border",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Btn({
  children,
  variant = "primary",
  icon: Icon,
  className,
  onClick,
  type,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const v = {
    primary:
      "bg-primary text-primary-foreground hover:brightness-110 shadow-[var(--shadow-gold)]",
    ghost: "text-secondary hover:text-foreground hover:bg-white/5",
    outline: "panel-inset hover:border-primary/40 hover:text-primary",
  }[variant];
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[12.5px] font-semibold transition-all",
        v,
        className,
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

export function StatTile({
  label,
  value,
  hint,
  tone = "gold",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "gold" | "info" | "success" | "warning" | "danger";
}) {
  const dot = {
    gold: "bg-primary",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
  }[tone];
  return (
    <div className="panel-inset px-4 py-3">
      <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-wider text-secondary font-semibold">
        <span className={cn("w-1.5 h-1.5 rounded-full", dot)} />
        {label}
      </div>
      <div className="mt-1.5 text-[22px] font-mono font-bold tracking-tight">
        {value}
      </div>
      {hint && <div className="text-[11px] text-secondary mt-0.5">{hint}</div>}
    </div>
  );
}
