import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crimevista/AppShell";
import { Panel, Chip, Btn, StatTile } from "@/components/crimevista/ui";
import {
  FileText,
  Filter,
  Download,
  Plus,
  Search,
  MoreHorizontal,
  ChevronDown,
  Eye,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/fir")({
  component: FirPage,
  head: () => ({
    meta: [
      { title: "FIR Intelligence — CrimeVista" },
      {
        name: "description",
        content: "Search, triage and analyse First Information Reports across Karnataka.",
      },
    ],
  }),
});

const FIRS = [
  { id: "FIR-2026-018472", ps: "Koramangala PS", type: "Vehicle Theft", area: "Bengaluru Urban", officer: "Insp. R. Sharma", status: "Under Investigation", priority: "High", time: "2h ago" },
  { id: "FIR-2026-018471", ps: "Mysuru City PS", type: "Burglary", area: "Mysuru", officer: "SI. K. Naidu", status: "Filed", priority: "Medium", time: "3h ago" },
  { id: "FIR-2026-018470", ps: "Hubli East PS", type: "Cyber Fraud", area: "Dharwad", officer: "Insp. A. Iyer", status: "Forwarded", priority: "High", time: "5h ago" },
  { id: "FIR-2026-018469", ps: "Ballari PS", type: "Assault", area: "Ballari", officer: "SI. M. Rao", status: "Under Investigation", priority: "Critical", time: "6h ago" },
  { id: "FIR-2026-018468", ps: "Yeshwanthpur PS", type: "Chain Snatching", area: "Bengaluru Urban", officer: "Insp. P. Menon", status: "Closed", priority: "Low", time: "8h ago" },
  { id: "FIR-2026-018467", ps: "Mangaluru North PS", type: "Drug Peddling", area: "Dakshina Kannada", officer: "Insp. V. Shetty", status: "Under Investigation", priority: "High", time: "10h ago" },
  { id: "FIR-2026-018466", ps: "Shivamogga PS", type: "Kidnapping", area: "Shivamogga", officer: "DySP. L. Kumar", status: "Forwarded", priority: "Critical", time: "12h ago" },
  { id: "FIR-2026-018465", ps: "Tumakuru PS", type: "Vehicle Theft", area: "Tumakuru", officer: "SI. B. Prasad", status: "Filed", priority: "Medium", time: "14h ago" },
];

const TREND = Array.from({ length: 30 }, (_, i) => ({
  d: `D${i + 1}`,
  v: 180 + Math.round(Math.sin(i / 3) * 40 + i * 1.5),
}));

const priorityTone = (p: string) =>
  p === "Critical" ? "danger" : p === "High" ? "warning" : p === "Medium" ? "info" : "success";

const statusTone = (s: string) =>
  s === "Closed" ? "success" : s === "Under Investigation" ? "warning" : s === "Forwarded" ? "info" : "default";

function FirPage() {
  return (
    <AppShell title="FIR Intelligence" subtitle="Search, triage and act on FIRs">
      <PageHeader
        title="FIR Intelligence"
        description="18,472 FIRs indexed · realtime sync with district registries"
        actions={
          <>
            <Btn variant="outline" icon={Download}>Export</Btn>
            <Btn icon={Plus}>New FIR</Btn>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatTile label="Today" value="245" hint="+12.5%" tone="info" />
        <StatTile label="Open" value="1,482" hint="Under investigation" tone="warning" />
        <StatTile label="Closed (30d)" value="3,910" hint="+8.1%" tone="success" />
        <StatTile label="Critical" value="47" hint="Immediate action" tone="danger" />
      </div>

      <Panel title="30-Day FIR Volume" subtitle="Aggregated across all districts">
        <div className="h-[200px] md:h-[220px]">
          <ResponsiveContainer>
            <AreaChart data={TREND} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
              <defs>
                <linearGradient id="firg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-gold)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-gold)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 10, fill: "oklch(1 0 0 / 0.5)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "oklch(1 0 0 / 0.5)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--color-navy-elev)", border: "1px solid var(--color-hairline)", borderRadius: 8, fontSize: 11 }} />
              <Area type="monotone" dataKey="v" stroke="var(--color-gold)" fill="url(#firg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel
        title="All FIRs"
        subtitle="Filter, sort and drill into any First Information Report"
        action={<Chip tone="gold">Live sync</Chip>}
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input
              placeholder="Search FIR ID, station, area, officer..."
              className="w-full panel-inset pl-9 pr-3 h-9 text-[12.5px] rounded-md focus:outline-none focus:ring-1 focus:ring-primary/60"
            />
          </div>
          {["Priority", "District", "Status", "Type"].map((f) => (
            <button key={f} className="panel-inset px-3 h-9 text-[12px] rounded-md flex items-center gap-1.5 hover:text-primary">
              <Filter className="w-3.5 h-3.5" />
              {f}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-4 md:-mx-5 px-4 md:px-5">
          <table className="w-full text-[12.5px] min-w-[900px]">
            <thead>
              <tr className="text-[10.5px] uppercase tracking-wider text-secondary text-left border-b hairline">
                <th className="py-2 pr-3 font-semibold">FIR ID</th>
                <th className="py-2 pr-3 font-semibold">Type</th>
                <th className="py-2 pr-3 font-semibold">Station</th>
                <th className="py-2 pr-3 font-semibold">District</th>
                <th className="py-2 pr-3 font-semibold">Officer</th>
                <th className="py-2 pr-3 font-semibold">Priority</th>
                <th className="py-2 pr-3 font-semibold">Status</th>
                <th className="py-2 pr-3 font-semibold">Filed</th>
                <th className="py-2 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {FIRS.map((f) => (
                <tr key={f.id} className="border-b hairline hover:bg-white/[0.03] transition-colors">
                  <td className="py-2.5 pr-3 font-mono text-primary">{f.id}</td>
                  <td className="py-2.5 pr-3 flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-secondary" />{f.type}</td>
                  <td className="py-2.5 pr-3">{f.ps}</td>
                  <td className="py-2.5 pr-3 text-secondary">{f.area}</td>
                  <td className="py-2.5 pr-3 text-secondary">{f.officer}</td>
                  <td className="py-2.5 pr-3"><Chip tone={priorityTone(f.priority) as never}>{f.priority}</Chip></td>
                  <td className="py-2.5 pr-3"><Chip tone={statusTone(f.status) as never}>{f.status}</Chip></td>
                  <td className="py-2.5 pr-3 text-secondary font-mono text-[11px]">{f.time}</td>
                  <td className="py-2.5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button className="panel-inset w-7 h-7 rounded flex items-center justify-center hover:text-primary"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="panel-inset w-7 h-7 rounded flex items-center justify-center hover:text-primary"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-[11.5px] text-secondary">
          <div>Showing 1–8 of 18,472</div>
          <div className="flex items-center gap-1.5">
            <Btn variant="outline">Previous</Btn>
            <Btn variant="outline">Next</Btn>
          </div>
        </div>
      </Panel>
    </AppShell>
  );
}
