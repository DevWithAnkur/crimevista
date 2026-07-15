import { Bell, Search, Moon, Menu, Cpu, Database } from "lucide-react";
import { useEffect, useState } from "react";

export function TopBar({
  title = "Good Morning, SP Vijay Kumar 👋",
  subtitle = "Here's your intelligence brief for today",
  onMenuClick,
}: {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
}) {
  const [now, setNow] = useState("");
  useEffect(() => {
    setNow(
      new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <header className="sticky top-0 z-20 h-[64px] md:h-[72px] bg-navy/90 backdrop-blur-md border-b hairline flex items-center gap-3 md:gap-4 px-3 md:px-6">
      <button
        className="lg:hidden text-secondary hover:text-foreground shrink-0"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="min-w-0 hidden sm:block">
        <h1 className="text-[15px] md:text-[17px] font-semibold leading-tight truncate">
          {title}
        </h1>
        <p className="text-[11px] md:text-[11.5px] text-secondary leading-tight mt-0.5 truncate">
          {subtitle}
          {now && <span className="hidden md:inline"> · {now}</span>}
        </p>
      </div>

      <div className="flex-1 max-w-[520px] mx-auto min-w-0">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search FIR, Case, Person..."
            className="w-full bg-navy-card border hairline rounded-md pl-9 pr-3 md:pr-14 h-9 md:h-10 text-[13px] placeholder:text-secondary/70 focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 transition"
          />
          <kbd className="hidden md:block absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] px-1.5 py-0.5 rounded panel-inset text-secondary">
            Ctrl + K
          </kbd>
        </div>
      </div>

      <div className="hidden 2xl:flex items-center gap-3 text-[11px]">
        <StatusChip icon={<span className="live-dot" />} label="LIVE" />
        <StatusChip
          icon={<Database className="w-3.5 h-3.5 text-success" />}
          label="Backend"
          value="Healthy"
        />
        <StatusChip
          icon={<Cpu className="w-3.5 h-3.5 text-info" />}
          label="AI"
          value="Online"
        />
      </div>

      <button className="hidden sm:flex w-9 h-9 rounded-md panel-inset items-center justify-center hover:text-primary transition-colors shrink-0">
        <Moon className="w-4 h-4" />
      </button>
      <button className="w-9 h-9 rounded-md panel-inset flex items-center justify-center relative hover:text-primary transition-colors shrink-0">
        <Bell className="w-4 h-4" />
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-[10px] font-mono font-semibold flex items-center justify-center">
          7
        </span>
      </button>

      <div className="hidden md:flex items-center gap-3 pl-3 border-l hairline shrink-0">
        <div className="text-right">
          <div className="text-[13px] font-semibold leading-tight">SP Vijay Kumar</div>
          <div className="text-[10.5px] text-secondary leading-tight">Karnataka Police</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/70 to-primary/30 border border-primary/50 flex items-center justify-center font-bold text-primary-foreground text-sm">
          VK
        </div>
      </div>
      <div className="md:hidden w-9 h-9 rounded-full bg-gradient-to-br from-primary/70 to-primary/30 border border-primary/50 flex items-center justify-center font-bold text-primary-foreground text-xs shrink-0">
        VK
      </div>
    </header>
  );
}

function StatusChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md panel-inset">
      {icon}
      <span className="uppercase tracking-wider text-secondary text-[10px] font-semibold">
        {label}
      </span>
      {value && <span className="text-foreground font-medium">{value}</span>}
    </div>
  );
}
