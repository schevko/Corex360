import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pageMetadata, buildPageJsonLd } from "@/lib/seo";
import {
  SITE,
  resourceCards,
  resourceUpcoming,
  resourceFaqKeys,
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
  const t = await getTranslations({ locale, namespace: "resourcesPage" });
  return pageMetadata({
    locale,
    path: "/resources",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "resourcesPage" });
  // Upcoming-strip labels are single-sourced from the existing footer namespace
  // (shared vocabulary); the webinar-strip meta now lives in resourcesPage.
  const tf = await getTranslations({ locale, namespace: "footer" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const base = `${SITE.url}/${locale}`;

  // GEO/SEO structured data — breadcrumb trail, the four live resources as an
  // ItemList (each carrying its real sub-page URL), and the page's Q&A as a
  // FAQPage. Shared @graph builder; AI answer engines read these directly.
  const jsonLd = buildPageJsonLd({
    base,
    path: "/resources",
    label: t("label"),
    list: {
      id: "resources",
      name: t("featured.title"),
      description: t("featured.lead"),
      items: resourceCards.map((r) => ({
        name: t(`items.${r.key}.title`),
        description: t(`items.${r.key}.desc`),
        url: `${base}${r.href}`,
      })),
    },
    faq: resourceFaqKeys.map((k) => ({
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

      {/* ── Hero — shared atmosphere hero (Solutions/About sibling) ───────── */}
      <EditorialHero
        photoSrc="/team/resources-hero.webp"
        eyebrow={t("label")}
        titlePre={t("hero.titlePre")}
        titleEm={t("hero.titleEm")}
        lead={t("hero.lead")}
        scrollCue={t("hero.scrollCue")}
      />

      {/* ── Learning paths — asymmetric narrative: prose left, textured "core"
            card with a floating stat badge right (mirrors Solutions approach) ─ */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <p className="text-sm font-medium text-muted">{t("paths.label")}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl">
              {t("paths.title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">{t("paths.p1")}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">{t("paths.p2")}</p>
          </Reveal>

          <Reveal style={{ animationDelay: "80ms" }} className="relative">
            <div
              className="relative min-h-[24rem] overflow-hidden rounded-3xl border border-border bg-surface-2 bg-cover bg-center"
              style={{ backgroundImage: "url(/team/resources-core.webp)" }}
            />
            {/* Floating stat badge breaks the card boundary */}
            <div className="absolute -bottom-6 end-6 rounded-2xl border border-border bg-surface/95 px-6 py-5 backdrop-blur-sm">
              <p className="text-aurora font-display text-3xl font-semibold tracking-tight">
                {t("paths.statValue")}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-2">
                {t("paths.statLabel")}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Editorial pull-quote — the philosophy in one line */}
        <Reveal style={{ animationDelay: "160ms" }}>
          <p className="mt-16 max-w-2xl border-s-2 border-border-strong ps-5 font-display text-lg font-medium leading-relaxed text-foreground/90 sm:text-xl">
            {t("paths.quote")}
          </p>
        </Reveal>
      </section>

      {/* ── Featured resources — BANDED chapter break (bg-surface-2 + border-y):
            the four LIVE sub-pages as differentiated link cards. Mirrored by the
            ItemList structured data above. ──────────────────────────────────── */}
      <section className="border-y border-border bg-surface-2 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            label={t("featured.label")}
            title={t("featured.title")}
            body={t("featured.lead")}
            align="center"
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
            {resourceCards.map((r, i) => (
              <Reveal
                key={r.key}
                style={{ animationDelay: `${(i % 2) * 70}ms` }}
                className="bg-surface-2"
              >
                <Link
                  href={r.href}
                  className="group relative flex h-full flex-col bg-surface-2 p-8 transition-colors duration-500 hover:bg-surface lg:p-10"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl border border-border bg-surface text-accent transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-accent/50 group-hover:shadow-[0_0_28px_-6px_var(--glow)]">
                      <Icon name={r.icon} className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="tabular text-xs tracking-[0.25em] text-muted-2">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {t(`items.${r.key}.title`)}
                    </h3>
                    <ArrowUpRight className="size-4 text-muted-2 transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground rtl:-scale-x-100" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {t(`items.${r.key}.desc`)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Webinar event strip — distinct event-styled treatment (date +
            "Free" meta), separate from the uniform grid ────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <Reveal>
          <Link
            href="/resources/webinar"
            className="group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-accent/25 bg-surface/40 px-8 py-10 transition-colors duration-500 hover:border-foreground/30 sm:flex-row sm:items-center lg:px-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/10 blur-[90px] rtl:-left-16 rtl:right-auto"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-surface/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-accent">
                {t("webinarStrip.tag")}
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold leading-[1.12] tracking-tight sm:text-3xl">
                {t("webinarStrip.title")}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {t("webinarStrip.desc")}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <span className="inline-flex items-center gap-2 text-sm text-muted">
                  <Icon name="Calendar" className="size-4 text-accent" strokeWidth={1.5} />
                  {t("webinarStrip.meta.date")}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-muted">
                  <Icon name="Gift" className="size-4 text-accent" strokeWidth={1.5} />
                  {t("webinarStrip.meta.price")}
                </span>
              </div>
            </div>
            <span className="relative inline-flex shrink-0 items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm text-foreground/85 transition-colors group-hover:border-accent/60">
              {t("webinarStrip.cta")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* ── More from Corex360 — a subordinate strip. Changelog & status are
            live (link + arrow); blog is still upcoming (comingSoon badge).
            Labels reuse footer.links; descriptions live in resourcesPage. ──── */}
      <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <Reveal>
          <p className="text-sm font-medium text-muted">{t("upcoming.label")}</p>
          <h2 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {t("upcoming.title")}
          </h2>

          <div className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
            {resourceUpcoming.map((u) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 ${
                        u.href ? "text-accent" : "text-muted-2"
                      }`}
                    >
                      <Icon name={u.icon} className="size-4" strokeWidth={1.5} />
                    </span>
                    {u.href ? (
                      <ArrowUpRight className="size-4 text-muted-2 transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground rtl:-scale-x-100" />
                    ) : (
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-2">
                        {tc("comingSoon")}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 font-display text-base font-medium tracking-tight">
                    {tf(`links.${u.key}`)}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {t(`upcoming.items.${u.key}.desc`)}
                  </p>
                </>
              );
              return u.href ? (
                <Link
                  key={u.key}
                  href={u.href}
                  className="group flex flex-col bg-background p-6 transition-colors duration-500 hover:bg-surface"
                >
                  {inner}
                </Link>
              ) : (
                <div key={u.key} className="flex flex-col bg-background p-6">
                  {inner}
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ── FAQ — GEO Q&A, mirrored by the FAQPage structured data above ─── */}
      <FaqSection namespace="resourcesPage.faq" keys={resourceFaqKeys} />

      {/* ── Closing — same dramatic spinning-circle CTA as Solutions/About ─── */}
      <CircleCta />
    </>
  );
}
