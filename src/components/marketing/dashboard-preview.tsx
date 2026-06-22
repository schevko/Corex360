import { useTranslations } from "next-intl";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AreaChart, BarChart } from "@/components/ui/charts";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  previewKpis,
  revenueSeries,
  pipeline,
} from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export function DashboardPreview() {
  const t = useTranslations("preview");

  const kpiCards = [
    { key: "revenue", ...previewKpis.revenue },
    { key: "deals", ...previewKpis.deals },
    { key: "churn", ...previewKpis.churn },
    { key: "nps", ...previewKpis.nps },
  ] as const;

  return (
    <section id="preview" className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <SectionHeading label={t("label")} title={t("title")} body={t("body")} align="center" />

      <Reveal className="mt-14 [perspective:2000px]">
        <div className="group relative rounded-[1.75rem] border-gradient">
          {/* ambient glow under the panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -bottom-10 top-10 -z-10 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, var(--accent-2), transparent 70%)",
            }}
          />

          <div className="glass overflow-hidden rounded-[1.75rem] p-3 sm:p-4">
            {/* window chrome */}
            <div className="mb-3 flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-surface-3" />
                <span className="size-3 rounded-full bg-surface-3" />
                <span className="size-3 rounded-full bg-surface-3" />
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-muted">
                <span className="relative flex size-1.5">
                  <span className="pulse-ring absolute inset-0 text-accent" />
                  <span className="size-1.5 rounded-full bg-accent" />
                </span>
                {t("live")}
              </div>
            </div>

            <div className="grid gap-3 rounded-2xl bg-background/60 p-3 sm:p-4 lg:grid-cols-3">
              {/* KPI row spans full width */}
              <div className="grid grid-cols-2 gap-3 lg:col-span-3 lg:grid-cols-4">
                {kpiCards.map((k) => {
                  const up = k.delta >= 0;
                  return (
                    <div
                      key={k.key}
                      className="rounded-xl border border-border bg-surface/60 p-4"
                    >
                      <p className="text-xs text-muted">{t(`kpis.${k.key}`)}</p>
                      <p className="tabular mt-2 text-xl font-semibold sm:text-2xl">{k.value}</p>
                      <p
                        className={cn(
                          "mt-1.5 inline-flex items-center gap-1 text-xs",
                          up ? "text-accent" : "text-rose-400"
                        )}
                      >
                        {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
                        {up ? "+" : ""}
                        {k.delta}%
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Revenue area chart */}
              <div className="rounded-xl border border-border bg-surface/60 p-4 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{t("chartTitle")}</p>
                    <p className="text-xs text-muted-2">{t("chartSub")}</p>
                  </div>
                  <p className="tabular text-lg font-semibold text-accent">₺1.24M</p>
                </div>
                <div className="mt-4 h-40">
                  <AreaChart data={revenueSeries} />
                </div>
              </div>

              {/* Pipeline funnel */}
              <div className="rounded-xl border border-border bg-surface/60 p-4">
                <p className="text-sm font-medium">{t("kpis.deals")}</p>
                <div className="mt-4 space-y-3">
                  {pipeline.map((s) => (
                    <div key={s.stage}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted">{s.stage}</span>
                        <span className="tabular text-muted-2">{s.deals}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-3">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                          style={{ width: `${s.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* small bar chart strip */}
              <div className="rounded-xl border border-border bg-surface/60 p-4 lg:col-span-3">
                <div className="h-24">
                  <BarChart data={revenueSeries} height={96} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 text-center">
        <Link
          href="/app"
          className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm transition-colors hover:border-accent/60"
        >
          {t("openApp")}
          <ArrowUpRight className="size-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
