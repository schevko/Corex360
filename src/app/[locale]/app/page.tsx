import { setRequestLocale, getTranslations } from "next-intl/server";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { KpiCard } from "@/components/app/kpi-card";
import { AreaChart } from "@/components/ui/charts";
import {
  kpis,
  revenueSeries,
  revenueSeriesPrev,
  pipeline,
  recentActivity,
  topProducts,
} from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const TONE: Record<string, string> = {
  accent: "var(--accent)",
  "accent-2": "var(--accent-2)",
  "accent-3": "var(--accent-3)",
};

export default async function AppOverview({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "app" });

  const kpiList = [
    { key: "revenue", ...kpis.revenue },
    { key: "deals", ...kpis.deals },
    { key: "customers", ...kpis.customers },
    { key: "churn", ...kpis.churn },
  ] as const;

  return (
    <>
      <Topbar />

      <div className="mx-auto w-full max-w-6xl px-5 py-6 lg:px-8 lg:py-8">
        {/* Greeting */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("greeting")} 👋
            </h1>
            <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>
          </div>
          <span className="rounded-full border border-border bg-surface/50 px-3 py-1.5 text-xs text-muted">
            {t("period")}
          </span>
        </div>

        {/* Demo note */}
        <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-accent/20 bg-accent/5 px-4 py-2.5 text-sm text-muted">
          <Info className="size-4 shrink-0 text-accent" />
          {t("demoNote")}
        </div>

        {/* KPI grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiList.map((k) => (
            <KpiCard
              key={k.key}
              label={t(`kpis.${k.key}`)}
              value={k.value}
              delta={k.delta}
              series={[...k.series]}
            />
          ))}
        </div>

        {/* Charts row */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {/* Revenue */}
          <div className="rounded-2xl border border-border bg-surface/40 p-5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-normal">{t("revenueChart")}</h2>
                <p className="text-xs text-muted-2">{t("period")}</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-muted">
                  <span className="size-2 rounded-full bg-accent" /> 2026
                </span>
                <span className="flex items-center gap-1.5 text-muted-2">
                  <span className="size-2 rounded-full bg-muted-2" /> 2025
                </span>
              </div>
            </div>
            <div className="relative mt-5 h-56">
              <div className="absolute inset-0 opacity-30">
                <AreaChart data={revenueSeriesPrev} stroke="var(--muted-2)" height={224} />
              </div>
              <AreaChart data={revenueSeries} height={224} />
            </div>
          </div>

          {/* Pipeline */}
          <div className="rounded-2xl border border-border bg-surface/40 p-5">
            <h2 className="font-display text-lg font-normal">{t("pipeline")}</h2>
            <div className="mt-5 space-y-4">
              {pipeline.map((s) => (
                <div key={s.stage}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">{s.stage}</span>
                    <span className="tabular text-foreground/80">{s.deals}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-3">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: activity + top products */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {/* Recent activity */}
          <div className="rounded-2xl border border-border bg-surface/40 p-5">
            <h2 className="font-display text-lg font-normal">{t("recentActivity")}</h2>
            <ul className="mt-4 space-y-3.5">
              {recentActivity.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 size-2 shrink-0 rounded-full"
                    style={{ background: TONE[a.tone] }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{a.who}</span>{" "}
                      <span className="text-muted">{a.action}</span>
                    </p>
                  </div>
                  <span className="tabular shrink-0 text-xs text-muted-2">{a.when}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top products */}
          <div className="rounded-2xl border border-border bg-surface/40 p-5">
            <h2 className="font-display text-lg font-normal">{t("topProducts")}</h2>
            <ul className="mt-4 divide-y divide-border">
              {topProducts.map((p) => {
                const up = p.trend >= 0;
                return (
                  <li key={p.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{p.name}</p>
                      <p
                        className={cn(
                          "mt-0.5 inline-flex items-center gap-1 text-xs",
                          up ? "text-accent" : "text-rose-400"
                        )}
                      >
                        {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                        {up ? "+" : ""}
                        {p.trend}% {t("vsLastPeriod")}
                      </p>
                    </div>
                    <p className="tabular text-sm">{p.revenue}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
