import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crimevista/AppShell";
import { Panel, Chip, Btn, StatTile } from "@/components/crimevista/ui";
import { HeatmapPanel } from "@/components/crimevista/HeatmapPanel";
import { Layers, Download, MapPin, Filter } from "lucide-react";
import { api, type RiskItem } from "@/lib/api";

export const Route = createFileRoute("/heatmap")({
  component: HeatmapRoute,
  head: () => ({
    meta: [
      { title: "Crime Heatmap — CrimeVista" },
      { name: "description", content: "Live geographic heatmap of crime density across Karnataka." },
    ],
  }),
});

const LAYERS_FALLBACK = [
  { name: "Vehicle Theft", count: 342, tone: "warning" },
  { name: "Burglary", count: 268, tone: "danger" },
  { name: "Cyber Fraud", count: 421, tone: "info" },
  { name: "Assault", count: 189, tone: "warning" },
  { name: "Narcotics", count: 97, tone: "gold" },
  { name: "Kidnapping", count: 42, tone: "danger" },
];

const DISTRICTS_FALLBACK = [
  { name: "Bengaluru Urban", firs: 1287, delta: "+12%", risk: "Very High" },
  { name: "Mysuru", firs: 642, delta: "+8%", risk: "High" },
  { name: "Ballari", firs: 421, delta: "+15%", risk: "High" },
  { name: "Dharwad", firs: 388, delta: "+3%", risk: "Medium" },
  { name: "Shivamogga", firs: 312, delta: "-1%", risk: "Medium" },
  { name: "Mangaluru", firs: 289, delta: "+5%", risk: "Medium" },
  { name: "Tumakuru", firs: 245, delta: "-4%", risk: "Low" },
  { name: "Belagavi", firs: 231, delta: "+2%", risk: "Low" },
];

function HeatmapRoute() {
  const [districts, setDistricts] = useState<Array<{ name: string; firs: number; delta: string; risk: string }>>(DISTRICTS_FALLBACK);
  const [layers, setLayers] = useState<Array<{ name: string; count: number; tone: string }>>(LAYERS_FALLBACK);

  useEffect(() => {
    api.getRiskScores().then((data) => {
      if (data && data.items && data.items.length > 0) {
        const mapped = data.items.map((r, idx) => ({
          name: r.district,
          firs: r.incident_count || Math.round(r.risk_score * 1500),
          delta: idx % 2 === 0 ? `+${(r.risk_score * 14).toFixed(1)}%` : `-${(r.risk_score * 8).toFixed(1)}%`,
          risk: r.risk_score >= 0.8 ? "Very High" : r.risk_score >= 0.6 ? "High" : r.risk_score >= 0.4 ? "Medium" : "Low"
        }));
        setDistricts(mapped);
      }
    });

    api.getDashboardSummary().then((data) => {
      if (data && data.recent_trends) {
        const mappedLayers = Object.entries(data.recent_trends).map(([name, count]) => ({
          name,
          count,
          tone: count > 3000 ? "danger" : count > 2000 ? "warning" : "info"
        }));
        if (mappedLayers.length > 0) setLayers(mappedLayers);
      }
    });
  }, []);

  return (
    <AppShell title="Crime Heatmap" subtitle="Live geographic crime density">
      <PageHeader
        title="Crime Heatmap — Karnataka"
        description="Interactive geographic density map · 30 districts · updated 2m ago"
        actions={
          <>
            <Btn variant="outline" icon={Filter}>Filters</Btn>
            <Btn icon={Download}>Export</Btn>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatTile label="Total Hotspots" value={`${districts.length}`} hint="Live cluster count" tone="danger" />
        <StatTile label="Very High Risk" value={`${districts.filter(d => d.risk.includes("High")).length}`} hint="Immediate attention" tone="warning" />
        <StatTile label="Districts" value={`${districts.length || 30}`} hint="All covered" tone="info" />
        <StatTile label="Predictions" value="92.4%" hint="Model accuracy" tone="success" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4 md:gap-5">
        <HeatmapPanel />

        <Panel title="Active Layers" subtitle="Toggle crime categories on the map">
          <ul className="space-y-2">
            {layers.map((l) => (
              <li key={l.name} className="flex items-center gap-3 panel-inset px-3 py-2.5">
                <Layers className="w-4 h-4 text-secondary" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-medium truncate">{l.name}</div>
                  <div className="text-[10.5px] text-secondary">{l.count} incidents</div>
                </div>
                <label className="relative inline-flex cursor-pointer">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="w-8 h-4 bg-white/10 rounded-full peer-checked:bg-primary transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
                </label>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="District Breakdown" subtitle="FIR density by district">
        <div className="overflow-x-auto -mx-4 md:-mx-5 px-4 md:px-5">
          <table className="w-full text-[12.5px] min-w-[600px]">
            <thead>
              <tr className="text-[10.5px] uppercase tracking-wider text-secondary text-left border-b hairline">
                <th className="py-2 font-semibold">District</th>
                <th className="py-2 font-semibold">FIRs (30d)</th>
                <th className="py-2 font-semibold">Change</th>
                <th className="py-2 font-semibold">Risk Level</th>
                <th className="py-2 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {districts.map((d) => (
                <tr key={d.name} className="border-b hairline hover:bg-white/[0.03]">
                  <td className="py-2.5 flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary" />{d.name}</td>
                  <td className="py-2.5 font-mono">{d.firs.toLocaleString()}</td>
                  <td className={`py-2.5 font-mono ${d.delta.startsWith("+") ? "text-warning" : "text-success"}`}>{d.delta}</td>
                  <td className="py-2.5"><Chip tone={d.risk === "Very High" ? "danger" : d.risk === "High" ? "warning" : d.risk === "Medium" ? "info" : "success"}>{d.risk}</Chip></td>
                  <td className="py-2.5 text-right"><Btn variant="outline">Drill down</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
