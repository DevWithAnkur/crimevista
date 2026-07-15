import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Briefcase,
  MapPinned,
  CheckCircle2,
  Brain,
  BellRing,
  ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/crimevista/AppShell";
import { KpiCard } from "@/components/crimevista/KpiCard";
import { HeatmapPanel } from "@/components/crimevista/HeatmapPanel";
import { AiIntelligence } from "@/components/crimevista/AiIntelligence";
import { ChartsPanel } from "@/components/crimevista/ChartsPanel";
import { ActivityTable } from "@/components/crimevista/ActivityTable";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const LIVE = [
  "Vehicle theft cases increased by 23% in Mysuru Urban",
  "New hotspot detected in Koramangala, Bengaluru",
  "12 new FIRs registered in last 2 hours",
  "Gang activity detected in Ballari district",
];

function Dashboard() {
  return (
    <AppShell
      title="Good Morning, SP Vijay Kumar 👋"
      subtitle="Here's your intelligence brief for today"
    >
      <div className="panel px-4 py-2.5 flex items-center gap-4 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <span className="live-dot" />
          <span className="text-[11px] uppercase tracking-wider font-semibold text-destructive">
            Live
          </span>
        </div>
        <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-thin text-[12px] text-secondary whitespace-nowrap">
          {LIVE.map((l) => (
            <span key={l} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {l}
            </span>
          ))}
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11.5px] uppercase tracking-wider font-semibold text-secondary">
            Today's Overview
          </h2>
          <button className="text-[11.5px] text-primary flex items-center hover:brightness-110">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
          <KpiCard label="Today's FIRs" value="245" delta="12.5%" trend="up" hint="vs yesterday" icon={FileText} tone="info" />
          <KpiCard label="Active Investigations" value="1,482" delta="8.3%" trend="up" hint="30 districts" icon={Briefcase} tone="gold" />
          <KpiCard label="High Risk Districts" value="8" delta="2" trend="up" hint="this week" icon={MapPinned} tone="danger" />
          <KpiCard label="Solved Cases" value="9,842" delta="40.1%" trend="up" hint="year to date" icon={CheckCircle2} tone="success" />
          <KpiCard label="Prediction Accuracy" value="92.4%" delta="2.1%" trend="up" hint="AI model v4" icon={Brain} tone="gold" />
          <KpiCard label="Emergency Alerts" value="23" delta="4.1%" trend="down" hint="active now" icon={BellRing} tone="warning" />
        </div>
      </section>

      <ChartsPanel />

      <div className="grid grid-cols-1 xl:grid-cols-[1.55fr_1fr] gap-4 md:gap-5">
        <HeatmapPanel />
        <AiIntelligence />
      </div>

      <ActivityTable />
    </AppShell>
  );
}
