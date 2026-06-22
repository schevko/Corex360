import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { DemoForm } from "@/components/marketing/demo-form";
import { CircleCta } from "@/components/marketing/circle-cta";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "demoPage" });
  return pageMetadata({
    locale,
    path: "/demo",
    title: `${t("hero.titlePre")} ${t("hero.titleEm")}`,
    description: t("hero.lead"),
  });
}

const BENEFIT_ICONS = [Sparkles, Clock, ShieldCheck] as const;

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "demoPage" });

  const trustItems = t.raw("hero.trust") as string[];
  const benefits = t.raw("benefits.items") as { title: string; desc: string }[];
  const steps = t.raw("flow.items") as { title: string; desc: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${t("hero.titlePre")} ${t("hero.titleEm")}`,
    description: t("hero.lead"),
    url: `${SITE.url}/${locale}/demo`,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero — editorial left, floating demo form right ─────────────────── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28">
        {/* Light: soft top glow + accent orb behind the card. Dark: aurora. */}
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
          className="pointer-events-none absolute -top-16 end-[6%] -z-10 size-[34rem] rounded-full bg-accent/10 blur-[130px]"
        />
        <AuroraBackground className="-z-10 hidden opacity-50 dark:block" />
        <GridBackdrop className="-z-10 hidden dark:block" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Editorial column */}
          <div>
            <Reveal>
              <Breadcrumb items={[{ label: t("label") }]} />
            </Reveal>
            <Reveal style={{ animationDelay: "70ms" }} className="mt-8 max-w-xl">
              <span className="label-eyebrow">{t("label")}</span>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block">{t("hero.titlePre")}</span>
                <span className="block font-serif font-normal italic text-foreground">
                  {t("hero.titleEm")}
                </span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                {t("hero.lead")}
              </p>
            </Reveal>

            {/* Trust checklist */}
            <Reveal style={{ animationDelay: "140ms" }}>
              <ul className="mt-9 space-y-3">
                {trustItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-accent"
                      strokeWidth={1.6}
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Floating demo request card */}
          <Reveal style={{ animationDelay: "120ms" }}>
            <DemoForm />
          </Reveal>
        </div>
      </section>

      {/* ── Why a demo — banded chapter break, three value cards ───────────── */}
      <section className="border-y border-border bg-surface-2 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            label={t("benefits.label")}
            title={t("benefits.title")}
            align="center"
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
            {benefits.map((b, i) => {
              const BIcon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <Reveal
                  key={b.title}
                  style={{ animationDelay: `${(i % 3) * 70}ms` }}
                  className="group relative flex flex-col bg-surface-2 p-7 transition-colors duration-500 hover:bg-surface sm:p-8 lg:p-10"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <span className="grid size-12 place-items-center rounded-xl border border-border bg-surface text-accent transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-accent/50 group-hover:shadow-[0_0_28px_-6px_var(--glow)]">
                    <BIcon className="size-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{b.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What happens next — numbered flow ──────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-24 lg:pt-28 lg:pb-28">
        <SectionHeading label={t("flow.label")} title={t("flow.title")} align="center" />

        <ol className="relative mt-14 ms-2 border-s border-border">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group relative ps-8 pb-9 last:pb-0"
            >
              <span className="tabular absolute -start-[14px] top-0 grid size-7 place-items-center rounded-full border border-border bg-background text-xs text-muted-2 transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent">
                {i + 1}
              </span>
              <p className="font-display text-base font-semibold tracking-tight transition-colors duration-300 group-hover:text-foreground">
                {step.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.desc}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── Closing — same spinning-circle CTA as the sibling pages ────────── */}
      <CircleCta />
    </>
  );
}
