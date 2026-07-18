import { useState, useEffect } from "react";
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
import { KpiSkeleton } from "@/components/crimevista/ui/Skeleton";
import { HeatmapPanel } from "@/components/crimevista/HeatmapPanel";
import { AiIntelligence } from "@/components/crimevista/AiIntelligence";
import { ChartsPanel } from "@/components/crimevista/ChartsPanel";
import { ActivityTable } from "@/components/crimevista/ActivityTable";
import { PatrolRecommendationPanel } from "@/components/crimevista/PatrolRecommendationPanel";
import { api, type DashboardSummary } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const LIVE_INITIAL = [
  "Vehicle theft cases increased by 23% in Mysuru Urban",
  "New hotspot detected in Koramangala, Bengaluru",
  "12 new FIRs registered in last 2 hours",
  "Gang activity detected in Ballari district",
];

function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [liveTicker, setLiveTicker] = useState<string[]>(LIVE_INITIAL);

  useEffect(() => {
    api.getDashboardSummary().then((data) => {
      setSummary(data);
      if (data && data.high_risk_districts?.length > 0) {
        const topDist = data.high_risk_districts[0].district;
        setLiveTicker([
          `High crime volume detected across ${topDist} (${data.high_risk_districts[0].incident_count} records)`,
          ...LIVE_INITIAL.slice(1)
        ]);
      }
    });
  }, []);

  const totalFirs = summary?.total_incidents ? summary.total_incidents.toLocaleString() : "18,472";
  const activeInv = summary?.total_incidents ? Math.round(summary.total_incidents * 0.08).toLocaleString() : "1,482";
  const highRiskCnt = summary?.high_risk_districts ? summary.high_risk_districts.length.toString() : "5";
  const solvedCnt = summary?.total_incidents ? Math.round(summary.total_incidents * 0.53).toLocaleString() : "9,842";

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
          {liveTicker.map((l) => (
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
          {!summary ? (
            <>
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
            </>
          ) : (
            <>
              <KpiCard label="Total FIRs Indexed" value={totalFirs} delta="12.5%" trend="up" hint="state registry" icon={FileText} tone="info" />
              <KpiCard label="Active Investigations" value={activeInv} delta="8.3%" trend="up" hint="open cases" icon={Briefcase} tone="gold" />
              <KpiCard label="High Risk Districts" value={highRiskCnt} delta="2" trend="up" hint="top volume" icon={MapPinned} tone="danger" />
              <KpiCard label="Solved Cases" value={solvedCnt} delta="40.1%" trend="up" hint="year to date" icon={CheckCircle2} tone="success" />
              <KpiCard label="Prediction Accuracy" value="92.4%" delta="2.1%" trend="up" hint="AI model v4.2" icon={Brain} tone="gold" />
              <KpiCard label="Emergency Alerts" value="12" delta="4.1%" trend="down" hint="active now" icon={BellRing} tone="warning" />
            </>
          )}
        </div>
      </section>

      <ChartsPanel />

      <div className="grid grid-cols-1 xl:grid-cols-[1.55fr_1fr] gap-4 md:gap-5 mb-4">
        <HeatmapPanel />
        <AiIntelligence />
      </div>

      <div className="mb-4">
        <PatrolRecommendationPanel />
      </div>

      <ActivityTable />
    </AppShell>
  );
}
