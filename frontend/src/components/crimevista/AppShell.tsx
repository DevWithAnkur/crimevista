import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar mobileOpen={open} onClose={() => setOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={title} subtitle={subtitle} onMenuClick={() => setOpen(true)} />
        <main className="flex-1 px-3 sm:px-4 md:px-6 py-4 md:py-5 max-w-[1920px] w-full mx-auto space-y-4 md:space-y-5">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 md:gap-4">
      <div className="min-w-0">
        <h1 className="text-[20px] md:text-[24px] font-bold tracking-tight truncate">
          {title}
        </h1>
        {description && (
          <p className="text-[12px] md:text-[13px] text-secondary mt-1">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
