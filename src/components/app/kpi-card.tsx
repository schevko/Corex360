import { TrendingUp, TrendingDown } from "lucide-react";
import { Sparkline } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  delta,
  series,
}: {
  label: string;
  value: string;
  delta: number;
  series: number[];
}) {
  const up = delta >= 0;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-5 transition-colors hover:border-border-strong">
      <div className="flex items-start justify-between">
        <p className="text-sm text-muted">{label}</p>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs",
            up ? "bg-accent/10 text-accent" : "bg-rose-500/10 text-rose-400"
          )}
        >
          {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {up ? "+" : ""}
          {delta}%
        </span>
      </div>
      <p className="tabular mt-3 text-2xl font-semibold">{value}</p>
      <div className="mt-3 -mb-1">
        <Sparkline data={series} stroke={up ? "var(--accent)" : "#fb7185"} />
      </div>
    </div>
  );
}
