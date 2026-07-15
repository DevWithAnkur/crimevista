import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  hint?: string;
  icon: LucideIcon;
  tone?: "gold" | "info" | "danger" | "success" | "warning";
}

const TONE: Record<NonNullable<KpiCardProps["tone"]>, string> = {
  gold: "text-primary bg-primary/12 border-primary/30",
  info: "text-info bg-info/12 border-info/30",
  danger: "text-destructive bg-destructive/15 border-destructive/40",
  success: "text-success bg-success/12 border-success/30",
  warning: "text-warning bg-warning/12 border-warning/30",
};

export function KpiCard({
  label,
  value,
  delta,
  trend = "up",
  hint,
  icon: Icon,
  tone = "gold",
}: KpiCardProps) {
  return (
    <div className="panel px-5 py-4 group hover:-translate-y-0.5 hover:border-primary/40 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "w-11 h-11 rounded-lg border flex items-center justify-center",
            TONE[tone],
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        {delta && (
          <span
            className={cn(
              "flex items-center gap-1 text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded",
              trend === "up"
                ? "text-success bg-success/12"
                : "text-destructive bg-destructive/12",
            )}
          >
            {trend === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {delta}
          </span>
        )}
      </div>
      <div className="mt-3.5">
        <div className="text-[11.5px] uppercase tracking-wider text-secondary font-medium">
          {label}
        </div>
        <div className="mt-1 text-[28px] leading-none font-mono font-bold tracking-tight">
          {value}
        </div>
        {hint && (
          <div className="text-[11px] text-secondary mt-1.5">{hint}</div>
        )}
      </div>
    </div>
  );
}
