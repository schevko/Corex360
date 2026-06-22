import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import {
  SITE,
  statusServices,
  statusOverall,
  statusResponseSeries,
} from "@/lib/site";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { AreaChart, Donut } from "@/components/ui/charts";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";
import { CircleCta } from "@/components/marketing/circle-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "status" });
  return pageMetadata({
    locale,
    path: "/resources/status",
    title: t("label"),
    description: t("hero.lead"),
  });
}

// Live "operational" pulse.
function Pulse({ className = "size-2.5" }: { className?: string }) {
  return (
    <span className={`relative flex ${className}`}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/50" />
      <span className={`relative inline-flex rounded-full bg-accent ${className}`} />
    </span>
  );
}

export default async function StatusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "status" });
  const base = `${SITE.url}/${locale}`;

  const metrics = [
    { key: "uptime", value: statusOverall.uptime },
    { key: "response", value: `${statusOverall.responseMs} ms` },
    { key: "services", value: String(statusServices.length) },
    { key: "incidents", value: String(statusOverall.incidents) },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${base}/resources/status/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: base },
          {
            "@type": "ListItem",
            position: 2,
            name: t("crumbResources"),
            item: `${base}/resources`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: t("label"),
            item: `${base}/resources/status`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero — title + live "all operational" banner ─────────────────── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-14 sm:pt-40 lg:pt-44 lg:pb-16">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 dark:hidden"
          style={{
            background:
              "radial-gradient(70% 55% at 50% -5%, color-mix(in srgb, var(--surface) 92%, transparent), transparent 68%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 end-[8%] -z-10 size-[30rem] rounded-full bg-accent/10 blur-[130px]"
        />
        <AuroraBackground className="-z-10 hidden opacity-50 dark:block" />
        <GridBackdrop className="-z-10 hidden dark:block" />

        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Breadcrumb
              items={[
                { label: t("crumbResources"), href: "/resources" },
                { label: t("label") },
              ]}
            />
          </Reveal>
          <Reveal style={{ animationDelay: "70ms" }} className="mt-8 max-w-3xl">
            <span className="label-eyebrow">{t("label")}</span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">{t("hero.titlePre")}</span>
              <span className="block font-serif font-normal italic text-foreground">
                {t("hero.titleEm")}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t("hero.lead")}
            </p>
          </Reveal>

          <Reveal style={{ animationDelay: "140ms" }}>
            <div className="mt-9 inline-flex items-center gap-3 rounded-2xl border border-border bg-surface/70 px-5 py-3 backdrop-blur-sm">
              <Pulse />
              <div>
                <p className="font-display text-sm font-semibold tracking-tight">
                  {t("overall.ok")}
                </p>
                <p className="text-xs text-muted-2">{t("overall.updated")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Headline metrics — Tesla-dashboard stat band ─────────────────── */}
      <section className="border-y border-border bg-surface-2 py-6 lg:py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal
                key={m.key}
                style={{ animationDelay: `${(i % 4) * 60}ms` }}
                className="bg-surface-2 p-8 lg:p-10"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-2">
                  {t(`metrics.${m.key}.label`)}
                </p>
                <p className="tabular mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  {m.value}
                </p>
                <p className="mt-2 text-sm text-muted">{t(`metrics.${m.key}.sub`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Response-time chart ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 lg:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted">{t("chart.label")}</p>
                <p className="tabular mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {statusOverall.responseMs} ms
                </p>
              </div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-2">
                {t("chart.sub")}
              </p>
            </div>
            <div className="mt-6 h-40 sm:h-48">
              <AreaChart data={statusResponseSeries} height={200} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Per-service gauges ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-16 lg:pb-20">
        <SectionHeading
          label={t("servicesSection.label")}
          title={t("servicesSection.title")}
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {statusServices.map((s, i) => (
            <Reveal
              key={s.key}
              style={{ animationDelay: `${(i % 3) * 60}ms` }}
              className="flex items-center gap-5 bg-surface-2 p-7 lg:p-8"
            >
              <div className="relative shrink-0">
                <Donut value={s.uptimeValue} size={84} />
                <span className="tabular absolute inset-0 grid place-items-center font-display text-[13px] font-semibold tracking-tight">
                  {s.uptime}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Icon name={s.icon} className="size-4 text-accent" strokeWidth={1.6} />
                  <p className="font-display text-base font-medium tracking-tight">
                    {t(`services.${s.key}.name`)}
                  </p>
                </div>
                <p className="mt-1 truncate text-sm text-muted">
                  {t(`services.${s.key}.desc`)}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-2">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {t("operational")}
                  </span>
                  <span className="tabular">{s.responseMs} ms</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 90-day uptime bar + incidents ────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 lg:pb-28">
        <Reveal>
          <div className="rounded-3xl border border-border bg-surface/40 p-6 lg:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium">{t("uptime.label")}</p>
              <p className="text-sm text-muted-2">{t("uptime.value")}</p>
            </div>
            <div aria-hidden className="mt-5 flex items-end gap-[2px]">
              {Array.from({ length: 90 }).map((_, i) => (
                <span
                  key={i}
                  className="h-8 flex-1 rounded-[2px] bg-accent/25 transition-colors hover:bg-accent/50"
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted-2">
              <span>{t("uptime.start")}</span>
              <span>{t("uptime.end")}</span>
            </div>
          </div>
        </Reveal>

        <Reveal style={{ animationDelay: "100ms" }}>
          <div className="mt-12">
            <p className="text-sm font-medium text-muted">{t("incidents.label")}</p>
            <h2 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {t("incidents.title")}
            </h2>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-surface/40 p-6">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-accent/40 text-accent">
                <Check className="size-4" strokeWidth={2} />
              </span>
              <p className="text-sm leading-relaxed text-muted">{t("incidents.none")}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <CircleCta />
    </>
  );
}
