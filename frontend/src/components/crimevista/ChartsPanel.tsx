import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TREND = [
  { d: "Mon", fir: 210, solved: 160 },
  { d: "Tue", fir: 245, solved: 190 },
  { d: "Wed", fir: 232, solved: 175 },
  { d: "Thu", fir: 268, solved: 210 },
  { d: "Fri", fir: 289, solved: 224 },
  { d: "Sat", fir: 312, solved: 246 },
  { d: "Sun", fir: 278, solved: 231 },
];

const CATEGORY = [
  { c: "Theft", v: 72 },
  { c: "Robbery", v: 68 },
  { c: "Burglary", v: 56 },
  { c: "Assault", v: 45 },
  { c: "Cyber", v: 35 },
  { c: "Fraud", v: 29 },
];

const AXIS = { stroke: "oklch(1 0 0 / 0.35)", fontSize: 10 };
const TOOL = {
  contentStyle: {
    background: "var(--color-navy-elev)",
    border: "1px solid var(--color-hairline)",
    borderRadius: 8,
    fontSize: 11,
  },
  labelStyle: { color: "var(--color-text-secondary)" },
};

export function ChartsPanel() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div className="panel p-5">
        <ChartHead
          title="FIR Trend — Last 7 Days"
          subtitle="Registrations vs resolutions across Karnataka"
          badge="+12.5%"
        />
        <div className="h-[260px] mt-3">
          <ResponsiveContainer>
            <AreaChart data={TREND} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-gold)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-gold)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-info)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-info)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
              <XAxis dataKey="d" tick={AXIS} axisLine={false} tickLine={false} />
              <YAxis tick={AXIS} axisLine={false} tickLine={false} />
              <Tooltip {...TOOL} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area
                type="monotone"
                dataKey="fir"
                name="FIRs"
                stroke="var(--color-gold)"
                strokeWidth={2}
                fill="url(#g1)"
              />
              <Area
                type="monotone"
                dataKey="solved"
                name="Solved"
                stroke="var(--color-info)"
                strokeWidth={2}
                fill="url(#g2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel p-5">
        <ChartHead
          title="Top Predicted Crime Categories"
          subtitle="Next-7-day predictive model output"
          badge="AI · 92.4%"
        />
        <div className="h-[260px] mt-3">
          <ResponsiveContainer>
            <BarChart
              data={CATEGORY}
              layout="vertical"
              margin={{ top: 8, right: 16, bottom: 0, left: 8 }}
            >
              <CartesianGrid stroke="oklch(1 0 0 / 0.06)" horizontal={false} />
              <XAxis type="number" tick={AXIS} axisLine={false} tickLine={false} />
              <YAxis
                dataKey="c"
                type="category"
                tick={AXIS}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip {...TOOL} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
              <Bar dataKey="v" fill="var(--color-gold)" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ChartHead({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge: string;
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-[14px] font-semibold">{title}</h3>
        <p className="text-[11.5px] text-secondary mt-0.5">{subtitle}</p>
      </div>
      <span className="gold-chip text-[10.5px] px-2 py-1 rounded font-mono font-semibold">
        {badge}
      </span>
    </div>
  );
}
