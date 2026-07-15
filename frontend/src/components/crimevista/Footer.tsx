import { Globe, ShieldCheck, Lock, Radio, Sparkles } from "lucide-react";

const ITEMS = [
  { icon: Globe, title: "Multi-language Support", body: "22+ Indian Official Languages" },
  { icon: ShieldCheck, title: "Role Based Access", body: "Secure access for different roles" },
  { icon: Lock, title: "Secure & Compliant", body: "All data is encrypted and secure" },
  { icon: Radio, title: "Real-time Intelligence", body: "Live updates and instant alerts" },
  { icon: Sparkles, title: "AI Powered Insights", body: "Smart predictions and analytics" },
];

export function Footer() {
  return (
    <footer className="mt-6 panel px-6 py-5">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
        {ITEMS.map((it) => (
          <div key={it.title} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-md gold-chip flex items-center justify-center shrink-0">
              <it.icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[12.5px] font-semibold">{it.title}</div>
              <div className="text-[11px] text-secondary">{it.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t hairline flex flex-wrap items-center justify-between gap-2 text-[11px] text-secondary">
        <div>© {new Date().getFullYear()} Karnataka State Police · CrimeVista Platform</div>
        <div className="font-mono">Build v2.4.1 · Region: IN-KA · Uptime 99.98%</div>
      </div>
    </footer>
  );
}
