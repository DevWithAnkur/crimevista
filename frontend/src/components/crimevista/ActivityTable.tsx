import { Search, SlidersHorizontal, Download } from "lucide-react";

const ROWS = [
  { id: "KA03-2025-0510-2456", date: "10 May 2025", type: "Theft", loc: "Koramangala, BLR", status: "Registered", tone: "text-info bg-info/15" },
  { id: "KA03-2025-0510-2455", date: "10 May 2025", type: "Robbery", loc: "Mysuru City", status: "Under Investigation", tone: "text-warning bg-warning/15" },
  { id: "KA03-2025-0510-2454", date: "10 May 2025", type: "Assault", loc: "Hubli", status: "Under Investigation", tone: "text-warning bg-warning/15" },
  { id: "KA03-2025-0510-2453", date: "10 May 2025", type: "Vehicle Theft", loc: "Yeshwanthpur, BLR", status: "Registered", tone: "text-info bg-info/15" },
  { id: "KA03-2025-0510-2452", date: "10 May 2025", type: "Cyber Crime", loc: "Whitefield, BLR", status: "Under Investigation", tone: "text-warning bg-warning/15" },
  { id: "KA03-2025-0510-2451", date: "09 May 2025", type: "Fraud", loc: "Belagavi", status: "Solved", tone: "text-success bg-success/15" },
];

export function ActivityTable() {
  return (
    <div className="panel p-5">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div>
          <h2 className="text-[15px] font-semibold">Recent FIR Activity</h2>
          <p className="text-[11.5px] text-secondary mt-0.5">
            Live feed from all Karnataka district stations
          </p>
        </div>
        <div className="flex-1" />
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            placeholder="Search FIR, name, location..."
            className="bg-navy-card border hairline rounded-md h-9 pl-8 pr-3 text-[12px] w-[240px] placeholder:text-secondary/70 focus:outline-none focus:ring-1 focus:ring-primary/60"
          />
        </div>
        <button className="h-9 px-3 panel-inset text-[12px] flex items-center gap-1.5 hover:text-primary">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
        </button>
        <button className="h-9 px-3 gold-chip rounded-md text-[12px] font-semibold flex items-center gap-1.5 hover:brightness-110">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-[12.5px] min-w-[720px]">
          <thead>
            <tr className="text-left text-[10.5px] uppercase tracking-wider text-secondary border-b hairline">
              <th className="py-2.5 pr-3 font-semibold">FIR No.</th>
              <th className="py-2.5 pr-3 font-semibold">Date</th>
              <th className="py-2.5 pr-3 font-semibold">Crime Type</th>
              <th className="py-2.5 pr-3 font-semibold">Location</th>
              <th className="py-2.5 pr-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr
                key={r.id}
                className="border-b hairline last:border-b-0 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 pr-3 font-mono text-[11.5px]">{r.id}</td>
                <td className="py-3 pr-3 text-secondary">{r.date}</td>
                <td className="py-3 pr-3 font-medium">{r.type}</td>
                <td className="py-3 pr-3 text-secondary">{r.loc}</td>
                <td className="py-3 pr-3">
                  <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded ${r.tone}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-[11.5px] text-secondary">
        <div>Showing 1–6 of 24,532 records</div>
        <div className="flex gap-1">
          {["Prev", "1", "2", "3", "…", "409", "Next"].map((p) => (
            <button
              key={p}
              className="h-7 min-w-7 px-2 panel-inset text-[11px] hover:text-primary"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
