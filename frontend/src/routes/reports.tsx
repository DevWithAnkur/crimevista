import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crimevista/AppShell";
import { Panel, Chip, Btn, StatTile } from "@/components/crimevista/ui";
import { FileBarChart2, Download, Calendar, FileText, Filter } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
  head: () => ({
    meta: [
      { title: "Reports & Analytics — CrimeVista" },
      { name: "description", content: "Analytical reports and exports across Karnataka." },
    ],
  }),
});

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m, i) => ({
  m,
  filed: 2200 + i * 80 + (i % 2 ? 120 : 0),
  solved: 1600 + i * 70,
}));

const MIX = [
  { name: "Theft", value: 32, c: "var(--color-gold)" },
  { name: "Cyber", value: 22, c: "var(--color-info)" },
  { name: "Assault", value: 18, c: "var(--color-destructive)" },
  { name: "Fraud", value: 14, c: "var(--color-warning)" },
  { name: "Other", value: 14, c: "var(--color-success)" },
];

const SAVED = [
  { name: "Monthly SP Briefing", type: "Auto · PDF", scope: "State", updated: "2h ago" },
  { name: "District Performance Scorecard", type: "Auto · XLSX", scope: "All Districts", updated: "1d ago" },
  { name: "Cyber Crime Deep-Dive", type: "Manual", scope: "Bengaluru Urban", updated: "3d ago" },
  { name: "Predictive Model Audit", type: "Auto · PDF", scope: "State", updated: "5d ago" },
  { name: "Officer KPI Report", type: "Manual", scope: "Mysuru Zone", updated: "1w ago" },
];

function ReportsPage() {
  return (
    <AppShell title="Reports & Analytics" subtitle="Analytical exports">
      <PageHeader
        title="Reports & Analytics"
        description="Build, schedule and export command-ready intelligence reports"
        actions={
          <>
            <Btn variant="outline" icon={Calendar}>Date range</Btn>
            <Btn icon={FileBarChart2}>New Report</Btn>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatTile label="Reports Generated" value="1,284" hint="This month" tone="gold" />
        <StatTile label="Auto-Scheduled" value="42" hint="Active jobs" tone="info" />
        <StatTile label="Downloads" value="7,821" hint="Last 30d" tone="success" />
        <StatTile label="Distribution Lists" value="18" tone="warning" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-4 md:gap-5">
        <Panel title="FIRs Filed vs Solved" subtitle="Monthly · state-wide">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={MONTHS} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: "oklch(1 0 0 / 0.5)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "oklch(1 0 0 / 0.5)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-navy-elev)", border: "1px solid var(--color-hairline)", borderRadius: 8, fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="filed" fill="var(--color-gold)" radius={[4, 4, 0, 0]} barSize={16} name="Filed" />
                <Bar dataKey="solved" fill="var(--color-info)" radius={[4, 4, 0, 0]} barSize={16} name="Solved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Category Mix" subtitle="Share of total FIRs (YTD)">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={MIX} innerRadius={55} outerRadius={90} paddingAngle={2} dataKey="value">
                  {MIX.map((s, i) => <Cell key={i} fill={s.c} stroke="var(--color-navy-card)" strokeWidth={2} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-navy-elev)", border: "1px solid var(--color-hairline)", borderRadius: 8, fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel
        title="Saved Reports"
        subtitle="Automated and manual analytical outputs"
        action={<Btn variant="outline" icon={Filter}>Filter</Btn>}
      >
        <div className="overflow-x-auto -mx-4 md:-mx-5 px-4 md:px-5">
          <table className="w-full text-[12.5px] min-w-[700px]">
            <thead>
              <tr className="text-[10.5px] uppercase tracking-wider text-secondary text-left border-b hairline">
                <th className="py-2 font-semibold">Report</th>
                <th className="py-2 font-semibold">Type</th>
                <th className="py-2 font-semibold">Scope</th>
                <th className="py-2 font-semibold">Updated</th>
                <th className="py-2 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {SAVED.map((r) => (
                <tr key={r.name} className="border-b hairline hover:bg-white/[0.03]">
                  <td className="py-2.5 flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-primary" />{r.name}</td>
                  <td className="py-2.5"><Chip tone="info">{r.type}</Chip></td>
                  <td className="py-2.5 text-secondary">{r.scope}</td>
                  <td className="py-2.5 text-secondary">{r.updated}</td>
                  <td className="py-2.5 text-right">
                    <div className="inline-flex gap-1.5">
                      <Btn variant="outline">Preview</Btn>
                      <Btn icon={Download}>PDF</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
