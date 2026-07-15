import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crimevista/AppShell";
import { Panel, Chip, Btn, StatTile } from "@/components/crimevista/ui";
import { AlertTriangle, Bell, Check, Filter, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/alerts")({
  component: AlertsPage,
  head: () => ({
    meta: [
      { title: "Alerts & Notifications — CrimeVista" },
      { name: "description", content: "Emergency alerts, escalations and notifications." },
    ],
  }),
});

const ALERTS = [
  { id: "AL-9821", title: "Armed robbery reported — Koramangala PS", time: "2 min ago", sev: "Critical", ack: false },
  { id: "AL-9820", title: "Missing minor — Mysuru City", time: "18 min ago", sev: "High", ack: false },
  { id: "AL-9819", title: "AI hotspot: Vehicle theft cluster in Yeshwanthpur", time: "42 min ago", sev: "High", ack: true },
  { id: "AL-9818", title: "Suspicious activity flagged — Ballari checkpoint", time: "1h ago", sev: "Medium", ack: true },
  { id: "AL-9817", title: "Cyber fraud spike detected — 5 FIRs correlated", time: "2h ago", sev: "High", ack: false },
  { id: "AL-9816", title: "Convict movement alert — Manoj T. sighted", time: "3h ago", sev: "Critical", ack: false },
  { id: "AL-9815", title: "System notice — model v4.2 retrained successfully", time: "5h ago", sev: "Low", ack: true },
];

const sevTone = (s: string) =>
  s === "Critical" ? "danger" : s === "High" ? "warning" : s === "Medium" ? "info" : "success";

function AlertsPage() {
  return (
    <AppShell title="Alerts & Notifications" subtitle="Realtime escalations">
      <PageHeader
        title="Alerts & Notifications"
        description="12 active · 3 critical · auto-triaged by AI"
        actions={
          <>
            <Btn variant="outline" icon={Filter}>Filter</Btn>
            <Btn icon={Check}>Acknowledge All</Btn>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatTile label="Critical" value="3" tone="danger" hint="Immediate" />
        <StatTile label="High" value="9" tone="warning" hint="Under review" />
        <StatTile label="Acknowledged (24h)" value="47" tone="success" />
        <StatTile label="Avg Response" value="4m 12s" tone="info" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4 md:gap-5">
        <Panel title="Live Alert Stream" subtitle="Newest first · realtime">
          <ul className="space-y-2">
            {ALERTS.map((a) => (
              <li key={a.id} className={`panel-inset px-4 py-3 flex items-start gap-3 ${!a.ack ? "border-l-2 border-l-destructive" : ""}`}>
                <div className={`w-8 h-8 rounded-md flex items-center justify-center ${a.sev === "Critical" ? "bg-destructive/15 text-destructive" : a.sev === "High" ? "bg-warning/15 text-warning" : "bg-info/15 text-info"}`}>
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[11px] text-primary">{a.id}</span>
                    <Chip tone={sevTone(a.sev) as never}>{a.sev}</Chip>
                    {a.ack && <Chip tone="success">Acknowledged</Chip>}
                  </div>
                  <div className="text-[13px] font-medium mt-0.5">{a.title}</div>
                  <div className="text-[11px] text-secondary mt-0.5">{a.time}</div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Btn variant="outline">View</Btn>
                  {!a.ack && <Btn icon={Check}>Ack</Btn>}
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Notification Preferences" subtitle="Delivery channels">
          <ul className="space-y-2">
            {[
              ["SMS to duty officer", true],
              ["Push notifications", true],
              ["Email digest (hourly)", false],
              ["WhatsApp escalation", true],
              ["Radio dispatch", false],
            ].map(([l, on]) => (
              <li key={l as string} className="panel-inset px-3 py-2.5 flex items-center gap-3">
                <Bell className="w-4 h-4 text-secondary" />
                <span className="flex-1 text-[12.5px]">{l as string}</span>
                <label className="relative inline-flex cursor-pointer">
                  <input type="checkbox" defaultChecked={on as boolean} className="peer sr-only" />
                  <div className="w-8 h-4 bg-white/10 rounded-full peer-checked:bg-primary transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-4 panel-inset p-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
            <div className="text-[11.5px] text-secondary">Critical alerts always bypass Do Not Disturb.</div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
