import { useState, useEffect } from "react";
import { Panel, Chip, Btn } from "./ui";
import { Skeleton } from "./ui/Skeleton";
import { Map, AlertTriangle, Info, MapPin } from "lucide-react";
import { api, type PatrolRecommendation } from "@/lib/api";

export function PatrolRecommendationPanel() {
  const [recommendations, setRecommendations] = useState<PatrolRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.getPatrolRecommendations().then((data) => {
      if (isMounted) {
        setRecommendations(data.recommendations || []);
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  const getTone = (priority: string) => {
    switch (priority) {
      case "Critical": return "danger";
      case "High": return "warning";
      case "Medium": return "info";
      default: return "neutral";
    }
  };

  const getIcon = (priority: string) => {
    switch (priority) {
      case "Critical": return <AlertTriangle className="w-4 h-4 text-danger" />;
      case "High": return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "Medium": return <Info className="w-4 h-4 text-info" />;
      default: return <MapPin className="w-4 h-4 text-secondary" />;
    }
  };

  return (
    <Panel 
      title="Predictive Patrol Zones" 
      subtitle="AI-recommended deployment based on recent incident density"
      action={<Btn variant="outline" size="sm" icon={Map}>View on Map</Btn>}
    >
      <div className="space-y-3">
        {loading ? (
          <>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-6 text-secondary text-sm">
            No active patrol recommendations at this time.
          </div>
        ) : (
          recommendations.slice(0, 4).map((rec) => (
            <div key={rec.zone_id} className="panel-inset p-3.5 flex flex-col md:flex-row gap-3 md:items-center">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  {getIcon(rec.priority)}
                  <span className="font-semibold text-sm">Zone {rec.zone_id} • {rec.district}</span>
                  <Chip tone={getTone(rec.priority) as any}>{rec.priority}</Chip>
                </div>
                <p className="text-xs text-secondary leading-relaxed pl-6">
                  {rec.rationale}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-4 pl-6 md:pl-0 border-l border-white/5">
                <div className="text-center px-4">
                  <div className="text-lg font-bold text-primary">{rec.incident_count}</div>
                  <div className="text-[10px] uppercase tracking-wider text-secondary">Incidents</div>
                </div>
                <Btn variant="primary" size="sm">Dispatch</Btn>
              </div>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}
