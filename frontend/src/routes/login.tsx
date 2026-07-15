import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, Lock, User, Fingerprint, KeyRound } from "lucide-react";
import { Btn, Chip } from "@/components/crimevista/ui";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — CrimeVista" },
      { name: "description", content: "Secure sign-in to the Karnataka Police AI Crime Intelligence Platform." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] bg-background text-foreground">
      {/* Left brand panel */}
      <div className="hidden lg:flex relative flex-col justify-between p-10 bg-gradient-to-br from-[oklch(0.18_0.04_255)] via-[oklch(0.22_0.05_258)] to-[oklch(0.28_0.05_258)] overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="lg1">
                <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="120" cy="120" r="120" fill="url(#lg1)" />
            <circle cx="320" cy="320" r="140" fill="url(#lg1)" />
          </svg>
        </div>
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg gold-chip flex items-center justify-center font-bold text-lg font-mono">CV</div>
          <div>
            <div className="font-bold text-[19px] leading-tight">CrimeVista</div>
            <div className="text-[11px] uppercase tracking-wider text-secondary">Government of Karnataka</div>
          </div>
        </div>
        <div className="relative space-y-4 max-w-md">
          <Chip tone="gold">Official · Karnataka State Police</Chip>
          <h2 className="text-3xl font-bold leading-tight">AI Crime Intelligence — command center</h2>
          <p className="text-[13.5px] text-secondary">
            Real-time FIR intelligence, predictive analytics, geographic hotspots and relationship graphs — unified for every district.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-4">
            {[["18,472", "FIRs today"], ["30", "Districts"], ["92.4%", "AI accuracy"]].map(([v, l]) => (
              <div key={l} className="panel-inset px-3 py-3">
                <div className="text-primary text-[20px] font-mono font-bold">{v}</div>
                <div className="text-[10.5px] uppercase tracking-wider text-secondary mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-[11px] text-secondary flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-primary" />
          Secure · TLS 1.3 · Audit-logged · v2.4.1
        </div>
      </div>

      {/* Right auth form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              navigate({ to: "/" });
            }, 700);
          }}
          className="w-full max-w-md space-y-5"
        >
          <div className="lg:hidden flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg gold-chip flex items-center justify-center font-bold font-mono">CV</div>
            <div>
              <div className="font-bold text-[17px] leading-tight">CrimeVista</div>
              <div className="text-[10.5px] uppercase tracking-wider text-secondary">Karnataka Police</div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sign in to CrimeVista</h1>
            <p className="text-[12.5px] text-secondary mt-1">
              Use your official Karnataka Police credentials.
            </p>
          </div>

          {error && <div className="panel-inset border-destructive/40 text-destructive px-3 py-2 text-[12px]">{error}</div>}

          <div className="space-y-3">
            <label className="block">
              <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold">Officer ID / Email</span>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                <input
                  required
                  defaultValue="vijay.kumar@ksp.gov.in"
                  className="w-full panel-inset pl-9 pr-3 h-11 text-[13px] rounded-md focus:outline-none focus:ring-1 focus:ring-primary/60"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold">Password</span>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                <input
                  required
                  type="password"
                  defaultValue="••••••••"
                  className="w-full panel-inset pl-9 pr-3 h-11 text-[13px] rounded-md focus:outline-none focus:ring-1 focus:ring-primary/60"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold">2FA Code</span>
              <div className="relative mt-1.5">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                <input
                  required
                  inputMode="numeric"
                  placeholder="6-digit code"
                  className="w-full panel-inset pl-9 pr-3 h-11 text-[13px] font-mono tracking-widest rounded-md focus:outline-none focus:ring-1 focus:ring-primary/60"
                />
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between text-[12px]">
            <label className="flex items-center gap-2 text-secondary">
              <input type="checkbox" className="accent-[var(--color-gold)]" /> Keep me signed in
            </label>
            <a href="#" className="text-primary hover:brightness-110">Forgot password?</a>
          </div>

          <Btn type="submit" className="w-full justify-center h-11">
            {loading ? "Signing in..." : "Sign in securely"}
          </Btn>

          <div className="flex items-center gap-2 text-[11px] text-secondary">
            <span className="flex-1 border-t hairline" />
            or
            <span className="flex-1 border-t hairline" />
          </div>

          <button
            type="button"
            className="w-full panel-inset h-11 rounded-md text-[13px] font-semibold flex items-center justify-center gap-2 hover:text-primary hover:border-primary/40"
          >
            <Fingerprint className="w-4 h-4" /> Continue with Aadhaar eKYC
          </button>

          <p className="text-[11px] text-secondary text-center">
            Unauthorized access is a punishable offence under IT Act §66.<br />
            <Link to="/" className="text-primary hover:brightness-110">Back to public site</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
