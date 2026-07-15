import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crimevista/AppShell";
import { Panel, Chip, Btn, StatTile } from "@/components/crimevista/ui";
import { Network, Search, User, Users, Zap, Download } from "lucide-react";

export const Route = createFileRoute("/relationships")({
  component: RelPage,
  head: () => ({
    meta: [
      { title: "Relationship Intelligence — CrimeVista" },
      { name: "description", content: "Graph analytics of persons, gangs and case relationships." },
    ],
  }),
});

const PERSONS = [
  { id: "P-8842", name: "Ramesh K.", role: "Suspect", cases: 12, links: 24, risk: "Critical" },
  { id: "P-8841", name: "Suresh M.", role: "Person of Interest", cases: 8, links: 15, risk: "High" },
  { id: "P-8840", name: "Vinay R.", role: "Associate", cases: 5, links: 22, risk: "High" },
  { id: "P-8839", name: "Prakash S.", role: "Witness", cases: 3, links: 6, risk: "Low" },
  { id: "P-8838", name: "Manoj T.", role: "Suspect", cases: 9, links: 18, risk: "High" },
  { id: "P-8837", name: "Deepak N.", role: "Associate", cases: 4, links: 11, risk: "Medium" },
];

const NODES = [
  { x: 50, y: 50, r: 22, label: "Ramesh K.", tone: "danger" },
  { x: 22, y: 30, r: 14, label: "Suresh", tone: "warning" },
  { x: 78, y: 32, r: 14, label: "Vinay", tone: "warning" },
  { x: 18, y: 72, r: 12, label: "Manoj", tone: "warning" },
  { x: 82, y: 74, r: 12, label: "Deepak", tone: "info" },
  { x: 50, y: 88, r: 10, label: "Prakash", tone: "success" },
  { x: 35, y: 15, r: 8, label: "N1", tone: "info" },
  { x: 65, y: 15, r: 8, label: "N2", tone: "info" },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 3], [2, 4], [1, 6], [2, 7], [3, 5],
];

const toneColor = (t: string) =>
  ({ danger: "var(--color-destructive)", warning: "var(--color-warning)", info: "var(--color-info)", success: "var(--color-success)" } as Record<string, string>)[t];

function RelPage() {
  return (
    <AppShell title="Relationship Intelligence" subtitle="Graph analysis across cases">
      <PageHeader
        title="Relationship Intelligence"
        description="Discover hidden links between persons, gangs and cases"
        actions={
          <>
            <Btn variant="outline" icon={Download}>Export Graph</Btn>
            <Btn icon={Zap}>Run AI Analysis</Btn>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatTile label="Persons Tracked" value="12,842" hint="Across all cases" tone="info" />
        <StatTile label="Active Gangs" value="47" hint="Under surveillance" tone="danger" />
        <StatTile label="Relationships" value="34,921" hint="Graph edges" tone="gold" />
        <StatTile label="AI Confidence" value="88.6%" hint="Link prediction" tone="success" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-4 md:gap-5">
        <Panel title="Relationship Graph — Ramesh K. Network" subtitle="24 direct links · 3 clusters detected" action={<Chip tone="gold">AI</Chip>}>
          <div className="relative panel-inset aspect-[4/3] rounded-md overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {EDGES.map(([a, b], i) => (
                <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke="oklch(1 0 0 / 0.15)" strokeWidth="0.3" />
              ))}
              {NODES.map((n, i) => (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r={n.r / 4 + 2} fill={toneColor(n.tone)} opacity={0.25} />
                  <circle cx={n.x} cy={n.y} r={n.r / 6 + 1} fill={toneColor(n.tone)} />
                  <text x={n.x} y={n.y + n.r / 4 + 5} fill="oklch(0.9 0 0)" fontSize="2.4" textAnchor="middle" fontWeight="600">{n.label}</text>
                </g>
              ))}
            </svg>
            <div className="absolute top-3 right-3 panel-inset px-2 py-1.5 text-[10px] space-y-1">
              {[["Critical", "danger"], ["High", "warning"], ["Medium", "info"], ["Low", "success"]].map(([l, t]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: toneColor(t) }} />
                  {l}
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="Insights" subtitle="AI-generated relationship signals">
          <ul className="space-y-2.5">
            {[
              { i: "Ramesh K. and Suresh M. co-appear in 6 FIRs", tag: "Strong link", tone: "danger" },
              { i: "Cluster of 8 suspects operating in Ballari–Mysuru corridor", tag: "Gang pattern", tone: "warning" },
              { i: "New link discovered between Vinay R. and drug case KA-3421", tag: "New", tone: "gold" },
              { i: "Prakash S. is a common witness across 3 fraud cases", tag: "Anomaly", tone: "info" },
              { i: "Manoj T. phone records match 4 crime scenes", tag: "Evidence", tone: "danger" },
            ].map((x, i) => (
              <li key={i} className="panel-inset px-3 py-2.5 flex items-start gap-3">
                <Network className="w-4 h-4 text-primary mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px]">{x.i}</div>
                  <Chip tone={x.tone as never} className="mt-1.5">{x.tag}</Chip>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Persons of Interest" subtitle="Ranked by graph centrality">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input placeholder="Search person, alias, phone or FIR..." className="w-full panel-inset pl-9 pr-3 h-9 text-[12.5px] rounded-md focus:outline-none focus:ring-1 focus:ring-primary/60" />
          </div>
          <Btn variant="outline" icon={Users}>Filter</Btn>
        </div>
        <div className="overflow-x-auto -mx-4 md:-mx-5 px-4 md:px-5">
          <table className="w-full text-[12.5px] min-w-[700px]">
            <thead>
              <tr className="text-[10.5px] uppercase tracking-wider text-secondary text-left border-b hairline">
                <th className="py-2 font-semibold">ID</th>
                <th className="py-2 font-semibold">Name</th>
                <th className="py-2 font-semibold">Role</th>
                <th className="py-2 font-semibold">Cases</th>
                <th className="py-2 font-semibold">Links</th>
                <th className="py-2 font-semibold">Risk</th>
                <th className="py-2 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {PERSONS.map((p) => (
                <tr key={p.id} className="border-b hairline hover:bg-white/[0.03]">
                  <td className="py-2.5 font-mono text-primary">{p.id}</td>
                  <td className="py-2.5 flex items-center gap-2"><User className="w-3.5 h-3.5 text-secondary" />{p.name}</td>
                  <td className="py-2.5 text-secondary">{p.role}</td>
                  <td className="py-2.5 font-mono">{p.cases}</td>
                  <td className="py-2.5 font-mono">{p.links}</td>
                  <td className="py-2.5"><Chip tone={p.risk === "Critical" ? "danger" : p.risk === "High" ? "warning" : p.risk === "Medium" ? "info" : "success"}>{p.risk}</Chip></td>
                  <td className="py-2.5 text-right"><Btn variant="outline">Open</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
