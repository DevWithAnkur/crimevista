import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crimevista/AppShell";
import { Panel, Chip, Btn, StatTile } from "@/components/crimevista/ui";
import { Brain, Zap, TrendingUp, AlertTriangle, Play } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export const Route = createFileRoute("/predictive")({
  component: PredictivePage,
  head: () => ({
    meta: [
      { title: "Predictive Analytics — CrimeVista" },
      { name: "description", content: "AI-driven crime forecasting and hotspot prediction." },
    ],
  }),
});

const FORECAST = Array.from({ length: 14 }, (_, i) => ({
  d: `+${i + 1}d`,
  actual: i < 7 ? 210 + Math.round(Math.sin(i) * 20 + i * 4) : null,
  predicted: 220 + Math.round(Math.cos(i / 2) * 30 + i * 5),
}));

const RISK = [
  { area: "Koramangala", score: 92 },
  { area: "Mysuru City", score: 84 },
  { area: "Ballari", score: 78 },
  { area: "Yeshwanthpur", score: 71 },
  { area: "Hubli East", score: 66 },
  { area: "Mangaluru N.", score: 58 },
];

function PredictivePage() {
  return (
    <AppShell title="Predictive Analytics" subtitle="AI forecasts across Karnataka">
      <PageHeader
        title="Predictive Analytics"
        description="Model v4.2 · trained on 2.3M FIRs · 92.4% accuracy"
        actions={
          <>
            <Btn variant="outline" icon={Play}>Simulate</Btn>
            <Btn icon={Zap}>Retrain Model</Btn>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatTile label="Accuracy" value="92.4%" hint="Rolling 30 days" tone="success" />
        <StatTile label="Precision" value="88.9%" hint="High-risk class" tone="info" />
        <StatTile label="Recall" value="86.1%" hint="Coverage" tone="gold" />
        <StatTile label="Alerts Triggered" value="127" hint="Last 7 days" tone="warning" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
        <Panel title="7-day Actual vs 14-day Forecast" subtitle="City-wide FIR volume prediction" action={<Chip tone="gold">AI</Chip>}>
          <div className="h-[240px]">
            <ResponsiveContainer>
              <LineChart data={FORECAST} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 10, fill: "oklch(1 0 0 / 0.5)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "oklch(1 0 0 / 0.5)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-navy-elev)", border: "1px solid var(--color-hairline)", borderRadius: 8, fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="actual" stroke="var(--color-info)" strokeWidth={2} dot={{ r: 2 }} name="Actual" />
                <Line type="monotone" dataKey="predicted" stroke="var(--color-gold)" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 2 }} name="Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Top Predicted High-Risk Areas" subtitle="Next 72 hours">
          <div className="h-[240px]">
            <ResponsiveContainer>
              <BarChart data={RISK} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 8 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "oklch(1 0 0 / 0.5)" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="area" type="category" tick={{ fontSize: 10, fill: "oklch(1 0 0 / 0.7)" }} axisLine={false} tickLine={false} width={90} />
                <Tooltip contentStyle={{ background: "var(--color-navy-elev)", border: "1px solid var(--color-hairline)", borderRadius: 8, fontSize: 11 }} />
                <Bar dataKey="score" fill="var(--color-gold)" radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="AI Predictions" subtitle="Actionable model outputs">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {[
            { t: "Vehicle theft surge in Koramangala within 72h", c: 94, tag: "Deploy patrol", tone: "danger" },
            { t: "Cyber fraud ring active in Mysuru–Bengaluru", c: 88, tag: "Investigate", tone: "warning" },
            { t: "Gang movement predicted from Ballari to Hubli", c: 81, tag: "Alert", tone: "warning" },
            { t: "Chain snatching drop expected in Yeshwanthpur", c: 76, tag: "Info", tone: "info" },
            { t: "Narcotics hotspot forming in Mangaluru port area", c: 84, tag: "Surveil", tone: "danger" },
            { t: "Assault decline in Shivamogga (patrol impact)", c: 79, tag: "Positive", tone: "success" },
          ].map((p, i) => (
            <div key={i} className="panel-inset p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <Brain className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="flex-1 text-[12.5px] leading-snug">{p.t}</div>
              </div>
              <div className="flex items-center justify-between">
                <Chip tone={p.tone as never}>{p.tag}</Chip>
                <div className="flex items-center gap-1.5 text-[11px] text-secondary">
                  <TrendingUp className="w-3 h-3" /> {p.c}% conf
                </div>
              </div>
              <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${p.c}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Model Health" subtitle="Realtime AI system metrics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ["Inference Latency", "42ms", "info"],
            ["Predictions / min", "1,284", "gold"],
            ["Drift Score", "0.03", "success"],
            ["Anomalies", "4", "warning"],
          ].map(([l, v, t]) => (
            <StatTile key={l} label={l} value={v} tone={t as never} />
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
