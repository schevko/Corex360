import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pageMetadata, buildPageJsonLd } from "@/lib/seo";
import {
  SITE,
  solutionSectors,
  solutionResources,
  solutionFaqKeys,
} from "@/lib/site";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { EditorialHero } from "@/components/marketing/editorial-hero";
import { FaqSection } from "@/components/marketing/faq-section";
import { CircleCta } from "@/components/marketing/circle-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });
  return pageMetadata({
    locale,
    path: "/solutions",
    title: t("hero.titlePre"),
    description: t("hero.lead"),
  });
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "solutions" });
  const base = `${SITE.url}/${locale}`;

  // GEO/SEO structured data — breadcrumb trail, the sector catalogue as an
  // ItemList, and the page's Q&A as a FAQPage. Shared @graph builder; AI answer
  // engines and search crawlers read these directly.
  const jsonLd = buildPageJsonLd({
    base,
    path: "/solutions",
    label: t("label"),
    list: {
      id: "sectors",
      name: t("sectors.title"),
      description: t("sectors.lead"),
      items: solutionSectors.map((s) => ({
        name: t(`sectors.items.${s.key}.title`),
        description: t(`sectors.items.${s.key}.desc`),
      })),
    },
    faq: solutionFaqKeys.map((k) => ({
      q: t(`faq.items.${k}.q`),
      a: t(`faq.items.${k}.a`),
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero — shared atmosphere hero (About/Resources sibling) ───────── */}
      <EditorialHero
        photoSrc="/team/solutions-hero.png"
        eyebrow={t("label")}
        titlePre={t("hero.titlePre")}
        titleEm={t("hero.titleEm")}
        lead={t("hero.lead")}
        scrollCue={t("hero.scrollCue")}
      />

      {/* ── Approach — asymmetric narrative: prose left, textured "core" card
            with a floating stat badge right (mirrors About Intro + Group) ─── */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <p className="text-sm font-medium text-muted">{t("approach.label")}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl">
              {t("approach.title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">{t("approach.p1")}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">{t("approach.p2")}</p>
          </Reveal>

          <Reveal style={{ animationDelay: "80ms" }} className="relative">
            <div
              className="relative min-h-[24rem] overflow-hidden rounded-3xl border border-border bg-surface-2 bg-cover bg-center"
              style={{ backgroundImage: "url(/team/solutions-core.png)" }}
            />
            {/* Floating stat badge breaks the card boundary */}
            <div className="absolute -bottom-6 end-6 rounded-2xl border border-border bg-surface/95 px-6 py-5 backdrop-blur-sm">
              <p className="text-aurora font-display text-3xl font-semibold tracking-tight">
                {t("approach.statValue")}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-2">
                {t("approach.statLabel")}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Editorial pull-quote — the philosophy in one line (mirrors About
            founders' close) */}
        <Reveal style={{ animationDelay: "160ms" }}>
          <p className="mt-16 max-w-2xl border-s-2 border-border-strong ps-5 font-display text-lg font-medium leading-relaxed text-foreground/90 sm:text-xl">
            {t("approach.quote")}
          </p>
        </Reveal>
      </section>

      {/* ── By sector — BANDED chapter break (bg-surface-2 + border-y), the
            keyword-rich SEO core (mirrors the About Founders band) ────────── */}
      <section className="border-y border-border bg-surface-2 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            label={t("sectors.label")}
            title={t("sectors.title")}
            body={t("sectors.lead")}
            align="center"
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {solutionSectors.map((s, i) => (
              <Reveal
                key={s.key}
                className="group relative flex flex-col bg-surface-2 p-8 transition-colors duration-500 hover:bg-surface lg:p-10"
                style={{ animationDelay: `${(i % 3) * 70}ms` }}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl border border-border bg-surface text-accent transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-accent/50 group-hover:shadow-[0_0_28px_-6px_var(--glow)]">
                    <Icon name={s.icon} className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="tabular text-xs tracking-[0.25em] text-muted-2">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                  {t(`sectors.items.${s.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(`sectors.items.${s.key}.desc`)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── "Don't see your sector?" — inset CTA strip after the band ─────── */}
      <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <Reveal>
          <Link
            href="/contact"
            className="group flex flex-col items-start justify-between gap-5 rounded-3xl border border-border bg-surface/40 px-8 py-8 transition-colors duration-500 hover:border-foreground/30 sm:flex-row sm:items-center lg:px-10"
          >
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("sectors.notListedTitle")}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {t("sectors.notListedDesc")}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm text-foreground/85 transition-colors group-hover:border-accent/60">
              {t("sectors.notListedCta")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* ── Resources + webinar — mixed-size grid (mirrors About Team/Careers:
            large block + smaller accent card) ────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-12 lg:py-20">
        <SectionHeading label={t("resources.label")} title={t("resources.title")} />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* Resource cards — span 2 of 3 columns */}
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:col-span-2">
            {solutionResources.map((r, i) => (
              <Reveal
                key={r.key}
                style={{ animationDelay: `${(i % 2) * 70}ms` }}
                className="bg-background"
              >
                <Link
                  href={r.href}
                  className="group flex h-full flex-col gap-4 p-7 transition-colors duration-500 hover:bg-surface lg:p-8"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent transition-all duration-500 group-hover:border-accent/50">
                    <Icon name={r.icon} className="size-5" strokeWidth={1.5} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {t(`resources.items.${r.key}.title`)}
                      </h3>
                      <ArrowUpRight className="size-4 text-muted-2 transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground rtl:-scale-x-100" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {t(`resources.items.${r.key}.desc`)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Webinar highlight — tall accent card (the size contrast) */}
          <Reveal style={{ animationDelay: "120ms" }}>
            <div className="relative flex h-full min-h-[20rem] flex-col justify-between overflow-hidden rounded-3xl border border-accent/25 bg-surface/40 p-8 lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/10 blur-[90px] rtl:-left-16 rtl:right-auto"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-surface/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-accent">
                  {t("resources.webinar.tag")}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold leading-[1.12] tracking-tight sm:text-3xl">
                  {t("resources.webinar.title")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t("resources.webinar.desc")}
                </p>
              </div>
              <Link
                href="/resources/webinar"
                className="group relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent"
              >
                {t("resources.webinar.cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — GEO Q&A, mirrored by the FAQPage structured data above ─── */}
      <FaqSection namespace="solutions.faq" keys={solutionFaqKeys} />

      {/* ── Closing — same dramatic spinning-circle CTA as About ─────────── */}
      <CircleCta />
    </>
  );
}
