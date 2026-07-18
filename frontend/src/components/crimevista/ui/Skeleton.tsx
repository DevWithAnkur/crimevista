import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white/5", className)}
      {...props}
    />
  );
}

export function KpiSkeleton() {
  return (
    <div className="panel-inset p-3 md:p-3.5 space-y-3">
      <div className="flex items-start justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
      <div>
        <Skeleton className="h-7 w-20 mb-1.5" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}
