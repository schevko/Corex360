import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import { CircleCta } from "@/components/marketing/circle-cta";
import { EditorialHero } from "@/components/marketing/editorial-hero";
import { Reveal } from "@/components/ui/reveal";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("label"),
    description: t("lead"),
  });
}

/** Founder/team photo paths — drop the files in public/team/ and they appear.
 *  Missing files degrade gracefully to the placeholder (background-image, no
 *  broken-icon). */
const FOUNDER_PHOTO: Record<string, string | null> = {
  yasin: "/team/yasin.jpg",
  sevket: "/team/sevket.png",
};

/** Elegant representative image placeholder — pass `src` once a real image
 *  exists; otherwise a labelled placeholder is shown. */
function ImageSlot({
  className,
  label,
  src,
}: {
  className?: string;
  label: string;
  src?: string | null;
}) {
  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-border bg-surface-2 bg-cover bg-center",
          className
        )}
        style={{ backgroundImage: `url(${src})` }}
      />
    );
  }
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-surface-2",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, color-mix(in srgb, var(--foreground) 5%, transparent) 0 1px, transparent 1px 22px)",
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span className="flex flex-col items-center gap-2 text-muted-2">
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="9" r="1.6" />
            <path d="M21 16l-5-5L5 21" />
          </svg>
          <span className="text-[11px] uppercase tracking-[0.18em]">{label}</span>
        </span>
      </div>
    </div>
  );
}

type Value = { title: string; desc: string };

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const values = t.raw("values.items") as Value[];

  return (
    <>
      {/* Hero — shared atmosphere hero. About keeps its taller 90svh frame, the
          muted (non-eyebrow) label and no dark-theme aurora texture. */}
      <EditorialHero
        photoSrc="/team/about-hero.png"
        eyebrow={t("label")}
        titlePre={t("titlePre")}
        titleEm={t("titleEm")}
        lead={t("lead")}
        scrollCue={t("explore")}
        eyebrowVariant="muted"
        minH="min-h-[90svh]"
        paddingBottom="pb-20"
        ambient={false}
      />

      {/* Intro — image + flowing story */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-surface-2 bg-cover bg-center"
              style={{ backgroundImage: "url(/team/team.png)" }}
            />
            <div className="absolute -bottom-6 end-6 rounded-2xl border border-border bg-surface/95 px-6 py-5 backdrop-blur-sm">
              <p className="text-aurora font-display text-3xl font-semibold tracking-tight">
                360°
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-2">
                {t("stat.label")}
              </p>
            </div>
          </Reveal>

          <Reveal style={{ animationDelay: "80ms" }}>
            <p className="text-sm font-medium text-muted">{t("story.label")}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl">
              {t("story.title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">{t("story.p1")}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">{t("story.p2")}</p>
          </Reveal>
        </div>
      </section>

      {/* Group affiliation */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal>
            <p className="text-sm font-medium text-muted">{t("group.label")}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl">
              {t("group.title")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              {t("group.body")}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {t("group.body2")}
            </p>
          </Reveal>
          <Reveal style={{ animationDelay: "80ms" }}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-2 px-8 py-14">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.5]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, color-mix(in srgb, var(--foreground) 5%, transparent) 0 1px, transparent 1px 22px)",
                }}
              />
              <div className="relative flex flex-col items-center text-center">
                <span className="font-display text-3xl font-semibold tracking-[0.04em] sm:text-4xl">
                  SAVAŞ GRUP
                </span>
                <span className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted-2">
                  Sanayi ve Ticaret A.Ş.
                </span>
                <span className="my-8 h-12 w-px bg-border" />
                <Logo size="lg" />
                <span className="mt-6 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted">
                  {t("group.tag")}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founders */}
      <section className="border-y border-border bg-surface-2 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-medium text-muted">{t("founders.label")}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl">
              {t("founders.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">{t("founders.body")}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">{t("founders.body2")}</p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {(["yasin", "sevket"] as const).map((f, i) => (
              <Reveal key={f} style={{ animationDelay: `${i * 90}ms` }}>
                <ImageSlot
                  className="aspect-[4/5]"
                  label={t("imageLabel")}
                  src={FOUNDER_PHOTO[f]}
                />
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                  {t(`founders.${f}.name`)}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {t(`founders.${f}.role`)}
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                  {t(`founders.${f}.bio`)}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ animationDelay: "220ms" }}>
            <p className="mt-14 max-w-2xl border-s-2 border-border-strong ps-5 font-display text-lg font-medium leading-relaxed text-foreground/90 sm:text-xl">
              {t("founders.close")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values + culture */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-muted">{t("values.label")}</p>
        </Reveal>

        {/* Values — equal cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal
              key={v.title}
              className="rounded-3xl border border-border bg-surface p-8"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="tabular text-xs tracking-[0.3em] text-muted-2">
                0{i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                {v.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* Team + careers — same card language, tight rhythm */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {/* Team card — large */}
          <Reveal className="lg:col-span-2">
            <div className="group relative h-full min-h-[20rem] overflow-hidden rounded-3xl border border-border">
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url(/team/ekip.png)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.15) 52%, transparent)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {t("team.title")}
                </h3>
                <p className="mt-2 text-sm text-white/75">{t("team.sub")}</p>
              </div>
            </div>
          </Reveal>

          {/* Careers card */}
          <Reveal style={{ animationDelay: "120ms" }}>
            <Link
              href="/contact"
              className="group flex h-full min-h-[20rem] flex-col justify-between rounded-3xl border border-border bg-surface p-8 transition-colors duration-500 hover:border-foreground/30 lg:p-10"
            >
              <span className="grid size-12 place-items-center rounded-full border border-border transition-colors duration-500 group-hover:border-foreground/40">
                <Users
                  className="size-5 text-muted transition-colors duration-500 group-hover:text-foreground"
                  strokeWidth={1.25}
                />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {t("team.careersTitle")}
                </h3>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-sm text-muted">{t("team.careersSub")}</p>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground rtl:-scale-x-100"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <CircleCta />
    </>
  );
}
