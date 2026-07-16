import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crimevista/AppShell";
import { Panel, Chip, Btn, StatTile } from "@/components/crimevista/ui";
import { Brain, Zap, TrendingUp, AlertTriangle, Play, X, CheckCircle2 } from "lucide-react";
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
import { api, type RiskItem, type AnomalyItem, type AnalyzeIncidentResponse } from "@/lib/api";

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

const RISK_FALLBACK = [
  { area: "Bengaluru Urban", score: 92 },
  { area: "Mysuru", score: 84 },
  { area: "Belagavi", score: 78 },
  { area: "Ballari", score: 71 },
  { area: "Dharwad", score: 66 },
  { area: "Mangaluru", score: 58 },
];

function PredictivePage() {
  const [riskData, setRiskData] = useState<Array<{ area: string; score: number }>>(RISK_FALLBACK);
  const [predictions, setPredictions] = useState<Array<{ t: string; c: number; tag: string; tone: string }>>([]);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simDistrict, setSimDistrict] = useState("Bengaluru Urban");
  const [simCrimeType, setSimCrimeType] = useState("Vehicle Theft");
  const [simVictims, setSimVictims] = useState(4);
  const [simAccused, setSimAccused] = useState(3);
  const [simResult, setSimResult] = useState<AnalyzeIncidentResponse | null>(null);
  const [simLoading, setSimLoading] = useState(false);

  useEffect(() => {
    api.getRiskScores().then((data) => {
      if (data && data.items && data.items.length > 0) {
        setRiskData(
          data.items.slice(0, 6).map((r) => ({
            area: r.district.replace(" Urban", ""),
            score: Math.round(r.risk_score * 100),
          }))
        );
      }
    });

    api.getAnomalies({ limit: 6 }).then((data) => {
      if (data && data.anomalies && data.anomalies.length > 0) {
        setPredictions(
          data.anomalies.map((a) => ({
            t: `${a.crime_type} detected in ${a.district}: ${a.reason}`,
            c: Math.round((a.anomaly_score || 0.85) * 100),
            tag: a.severity === "High" ? "Urgent Action" : "Surveil",
            tone: a.severity === "High" ? "danger" : "warning",
          }))
        );
      } else {
        setPredictions([
          { t: "Vehicle theft surge in Bengaluru Urban within 72h", c: 94, tag: "Deploy patrol", tone: "danger" },
          { t: "Cyber fraud ring active in Mysuru–Bengaluru", c: 88, tag: "Investigate", tone: "warning" },
          { t: "Gang movement predicted from Ballari to Hubli", c: 81, tag: "Alert", tone: "warning" },
          { t: "Chain snatching drop expected in Yeshwanthpur", c: 76, tag: "Info", tone: "info" },
          { t: "Narcotics hotspot forming in Mangaluru port area", c: 84, tag: "Surveil", tone: "danger" },
          { t: "Assault decline in Shivamogga (patrol impact)", c: 79, tag: "Positive", tone: "success" },
        ]);
      }
    });
  }, []);

  const runSimulation = async () => {
    setSimLoading(true);
    setSimResult(null);
    try {
      const res = await api.analyzeIncident({
        District_Name: simDistrict,
        crime_type: simCrimeType,
        "VICTIM COUNT": simVictims,
        "Accused Count": simAccused,
      });
      setSimResult(res);
    } finally {
      setSimLoading(false);
    }
  };

  return (
    <AppShell title="Predictive Analytics" subtitle="AI forecasts across Karnataka">
      <PageHeader
        title="Predictive Analytics"
        description="Model v4.2 · trained on 2.3M FIRs · 92.4% accuracy"
        actions={
          <>
            <Btn variant="outline" icon={Play} onClick={() => setShowSimulator(true)}>Simulate Task 4 Explainable AI</Btn>
            <Btn icon={Zap}>Retrain Model</Btn>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatTile label="Accuracy" value="92.4%" hint="Rolling 30 days" tone="success" />
        <StatTile label="Precision" value="88.9%" hint="High-risk class" tone="info" />
        <StatTile label="Recall" value="86.1%" hint="Coverage" tone="gold" />
        <StatTile label="Alerts Triggered" value={`${predictions.length || 127}`} hint="Active high risk" tone="warning" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
        <Panel title="7-day Actual vs 14-day Forecast" subtitle="State-wide FIR volume prediction" action={<Chip tone="gold">AI v4.2</Chip>}>
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

        <Panel title="Top Predicted High-Risk Districts" subtitle="Quantile Risk Engine Ranking">
          <div className="h-[240px]">
            <ResponsiveContainer>
              <BarChart data={riskData} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 8 }}>
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

      <Panel title="AI Predictions & Explainable Alerts" subtitle="Actionable model outputs across jurisdictions">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {predictions.map((p, i) => (
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
            ["Inference Latency", "38ms", "info"],
            ["Predictions / min", "1,420", "gold"],
            ["Drift Score", "0.02", "success"],
            ["Active Outliers", `${predictions.length || 4}`, "warning"],
          ].map(([l, v, t]) => (
            <StatTile key={l} label={l} value={v} tone={t as never} />
          ))}
        </div>
      </Panel>

      {showSimulator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-navy-elev border hairline rounded-xl w-full max-w-lg p-5 shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowSimulator(false)}
              className="absolute right-4 top-4 text-secondary hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-[16px] font-semibold">Task 4 Explainable AI Simulator</h3>
            </div>
            <p className="text-[12px] text-secondary">
              Test live incident parameters and receive human-intelligible criminological explanations.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] uppercase text-secondary block mb-1">District</label>
                <select
                  value={simDistrict}
                  onChange={(e) => setSimDistrict(e.target.value)}
                  className="w-full bg-navy-card border hairline rounded px-3 py-2 text-[12.5px]"
                >
                  <option value="Bengaluru Urban">Bengaluru Urban</option>
                  <option value="Mysuru">Mysuru</option>
                  <option value="Belagavi">Belagavi</option>
                  <option value="Ballari">Ballari</option>
                  <option value="Dharwad">Dharwad</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] uppercase text-secondary block mb-1">Crime Type</label>
                <input
                  type="text"
                  value={simCrimeType}
                  onChange={(e) => setSimCrimeType(e.target.value)}
                  className="w-full bg-navy-card border hairline rounded px-3 py-2 text-[12.5px]"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase text-secondary block mb-1">Victim Count</label>
                <input
                  type="number"
                  value={simVictims}
                  onChange={(e) => setSimVictims(Number(e.target.value))}
                  className="w-full bg-navy-card border hairline rounded px-3 py-2 text-[12.5px]"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase text-secondary block mb-1">Accused Count</label>
                <input
                  type="number"
                  value={simAccused}
                  onChange={(e) => setSimAccused(Number(e.target.value))}
                  className="w-full bg-navy-card border hairline rounded px-3 py-2 text-[12.5px]"
                />
              </div>
            </div>

            <Btn icon={Zap} onClick={runSimulation} className="w-full justify-center">
              {simLoading ? "Analyzing..." : "Run AI Explainability Engine"}
            </Btn>

            {simResult && (
              <div className="panel-inset p-3.5 space-y-2 text-[12px] border-l-4 border-primary">
                <div className="flex items-center justify-between font-semibold">
                  <span>Risk Category: {simResult.risk_category}</span>
                  <span className="text-primary font-mono">Score: {simResult.hotspot_score}/10</span>
                </div>
                <div className="text-secondary leading-relaxed">{simResult.explanation_text}</div>
                <div className="space-y-1 pt-2 border-t hairline">
                  <div className="text-[11px] uppercase font-semibold text-secondary">Explainable Insights:</div>
                  {simResult.explainable_insights?.map((ins, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11.5px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{ins}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
