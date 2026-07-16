import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crimevista/AppShell";
import { Panel, Chip, Btn, StatTile } from "@/components/crimevista/ui";
import { Users, Settings, Key, Database, Cpu, Plus, Search, Shield, Activity } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Administration — CrimeVista" },
      { name: "description", content: "User roles, permissions and system administration." },
    ],
  }),
});

const USERS = [
  { name: "SP Vijay Kumar", email: "vijay.kumar@ksp.gov.in", role: "State Admin", zone: "State HQ", status: "Active" },
  { name: "DySP L. Kumar", email: "l.kumar@ksp.gov.in", role: "Zone Commander", zone: "Shivamogga", status: "Active" },
  { name: "Insp. R. Sharma", email: "r.sharma@ksp.gov.in", role: "Investigator", zone: "Bengaluru Urban", status: "Active" },
  { name: "SI K. Naidu", email: "k.naidu@ksp.gov.in", role: "Officer", zone: "Mysuru", status: "Suspended" },
  { name: "Insp. A. Iyer", email: "a.iyer@ksp.gov.in", role: "Investigator", zone: "Dharwad", status: "Active" },
  { name: "DySP M. Rao", email: "m.rao@ksp.gov.in", role: "Zone Commander", zone: "Ballari", status: "Active" },
];

function AdminPage() {
  return (
    <AppShell title="Administration" subtitle="Users, roles and system health">
      <PageHeader
        title="Administration"
        description="Manage users, permissions, integrations and platform health"
        actions={
          <>
            <Btn variant="outline" icon={Settings}>System Settings</Btn>
            <Btn icon={Plus}>Add User</Btn>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatTile label="Users" value="1,842" hint="+24 this month" tone="info" />
        <StatTile label="Active Roles" value="14" tone="gold" />
        <StatTile label="API Keys" value="27" hint="7 rotating" tone="warning" />
        <StatTile label="System Uptime" value="99.98%" hint="30-day" tone="success" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-4 md:gap-5">
        <Panel title="Users & Roles" subtitle="Manage officer accounts" action={<Chip tone="gold">RBAC</Chip>}>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input placeholder="Search user or role..." className="w-full panel-inset pl-9 pr-3 h-9 text-[12.5px] rounded-md focus:outline-none focus:ring-1 focus:ring-primary/60" />
            </div>
            <Btn variant="outline" icon={Shield}>Roles</Btn>
          </div>
          <div className="overflow-x-auto -mx-4 md:-mx-5 px-4 md:px-5">
            <table className="w-full text-[12.5px] min-w-[600px]">
              <thead>
                <tr className="text-[10.5px] uppercase tracking-wider text-secondary text-left border-b hairline">
                  <th className="py-2 font-semibold">User</th>
                  <th className="py-2 font-semibold">Role</th>
                  <th className="py-2 font-semibold">Zone</th>
                  <th className="py-2 font-semibold">Status</th>
                  <th className="py-2 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {USERS.map((u) => (
                  <tr key={u.email} className="border-b hairline hover:bg-white/[0.03]">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/60 to-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                          {u.name.split(" ").slice(-1)[0][0]}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{u.name}</div>
                          <div className="text-[10.5px] text-secondary truncate">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5"><Chip tone="gold">{u.role}</Chip></td>
                    <td className="py-2.5 text-secondary">{u.zone}</td>
                    <td className="py-2.5"><Chip tone={u.status === "Active" ? "success" : "danger"}>{u.status}</Chip></td>
                    <td className="py-2.5 text-right"><Btn variant="outline">Manage</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-4 md:space-y-5">
          <Panel title="System Health" subtitle="Realtime infrastructure">
            <ul className="space-y-2">
              {[
                { i: Database, l: "Primary DB", v: "Healthy", t: "success" },
                { i: Cpu, l: "AI Inference", v: "42ms avg", t: "info" },
                { i: Activity, l: "Ingestion Queue", v: "0 backlog", t: "success" },
                { i: Key, l: "Auth Service", v: "OK", t: "success" },
              ].map((x) => (
                <li key={x.l} className="panel-inset px-3 py-2.5 flex items-center gap-3">
                  <x.i className="w-4 h-4 text-primary" />
                  <span className="flex-1 text-[12.5px]">{x.l}</span>
                  <Chip tone={x.t as never}>{x.v}</Chip>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Integrations" subtitle="Connected data sources">
            <ul className="space-y-2">
              {[
                ["CCTNS Registry", true],
                ["ICJS Court System", true],
                ["Aadhaar Verify", true],
                ["Vehicle Registry (VAHAN)", true],
                ["Telecom CDR", false],
              ].map(([l, on]) => (
                <li key={l as string} className="panel-inset px-3 py-2.5 flex items-center gap-3">
                  <Users className="w-4 h-4 text-secondary" />
                  <span className="flex-1 text-[12.5px]">{l as string}</span>
                  <Chip tone={on ? "success" : "default"}>{on ? "Connected" : "Off"}</Chip>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <Panel title="Audit Log" subtitle="Last 6 privileged actions">
        <ul className="space-y-1.5">
          {[
            "SP Vijay Kumar changed role for Insp. R. Sharma → Investigator · 2h ago",
            "DySP M. Rao exported case C-3418 evidence bundle · 4h ago",
            "System rotated API key for CCTNS integration · 8h ago",
            "SI K. Naidu account suspended by DySP L. Kumar · 1d ago",
            "AI model v4.2 promoted to production by admin · 1d ago",
            "New user provisioned: Insp. B. Rao (Belagavi) · 2d ago",
          ].map((l, i) => (
            <li key={i} className="panel-inset px-3 py-2 text-[12px] text-secondary flex items-center gap-2">
              <span className="live-dot" style={{ background: "var(--color-info)" }} />
              {l}
            </li>
          ))}
        </ul>
      </Panel>
    </AppShell>
  );
}
