import { useState, useEffect } from "react";
import { AlertTriangle, TrendingUp, Users, Shield, MapPin, Brain } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { api, type AnomalyItem } from "@/lib/api";

const FALLBACK_ITEMS = [
  { icon: AlertTriangle, tone: "text-destructive bg-destructive/15", title: "Today's Threat", body: "Elevated vehicle-theft risk in Mysuru Urban Zone-3" },
  { icon: TrendingUp, tone: "text-warning bg-warning/15", title: "Crime Spike", body: "+23% robberies detected in Koramangala over 72h" },
  { icon: Users, tone: "text-info bg-info/15", title: "Repeat Offender", body: "Raghav S. flagged across 12 open cases (3 districts)" },
  { icon: Shield, tone: "text-primary bg-primary/15", title: "Gang Activity", body: "Coordinated pattern detected in Ballari district" },
  { icon: MapPin, tone: "text-success bg-success/15", title: "Patrol Recommendation", body: "Deploy 4 units to Yeshwanthpur between 21:00-02:00" },
];

export function AiIntelligence() {
  const [items, setItems] = useState<Array<{ icon: any; tone: string; title: string; body: string }>>(FALLBACK_ITEMS);

  useEffect(() => {
    api.getAnomalies({ limit: 5 }).then((data) => {
      if (data && data.anomalies && data.anomalies.length > 0) {
        const icons = [AlertTriangle, TrendingUp, Users, Shield, MapPin];
        const tones = [
          "text-destructive bg-destructive/15",
          "text-warning bg-warning/15",
          "text-info bg-info/15",
          "text-primary bg-primary/15",
          "text-success bg-success/15"
        ];
        const mapped = data.anomalies.slice(0, 5).map((a, idx) => ({
          icon: icons[idx % icons.length],
          tone: tones[idx % tones.length],
          title: a.anomaly_type || "High Severity Alert",
          body: `${a.crime_type} in ${a.district}: ${a.reason || 'Flagged for urgent attention'}`
        }));
        setItems(mapped);
      }
    });
  }, []);

  return (
    <div className="panel p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gold-chip flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold">AI Intelligence Brief</h2>
            <p className="text-[11.5px] text-secondary">
              Model synthesis · updated live
            </p>
          </div>
        </div>
        <ConfidenceRing pct={92} />
      </div>

      <ul className="space-y-2">
        {items.map((it, idx) => (
          <li
            key={`${it.title}-${idx}`}
            className="flex items-start gap-3 panel-inset px-3 py-2.5 hover:border-primary/40 transition-colors"
          >
            <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${it.tone}`}>
              <it.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[12.5px] font-semibold">{it.title}</div>
              <div className="text-[11.5px] text-secondary leading-snug">{it.body}</div>
            </div>
          </li>
        ))}
      </ul>

      <Link to="/predictive" className="mt-4 w-full gold-chip rounded-md py-2 text-[12px] font-semibold hover:brightness-110 block text-center">
        View Full Report
      </Link>
    </div>
  );
}

function ConfidenceRing({ pct }: { pct: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <div className="relative w-14 h-14">
      <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
        <circle cx="28" cy="28" r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth="4" fill="none" />
        <circle
          cx="28"
          cy="28"
          r={r}
          stroke="var(--color-gold)"
          strokeWidth="4"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold text-primary">
        {pct}%
      </div>
    </div>
  );
}
