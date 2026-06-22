import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { SITE, changelogReleases, changelogTagKeys } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";
import { CircleCta } from "@/components/marketing/circle-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "changelog" });
  return pageMetadata({
    locale,
    path: "/resources/changelog",
    title: `${t("hero.titlePre")} ${t("hero.titleEm")}`,
    description: t("hero.lead"),
  });
}

// Monochrome severity pills — hierarchy by weight, not hue. `satisfies` keeps
// this exhaustive against the change-type union.
const TAG_CLASS = {
  new: "bg-accent text-on-accent",
  improved: "border border-border-strong text-foreground/80",
  fixed: "border border-border bg-surface-2 text-muted-2",
} satisfies Record<"new" | "improved" | "fixed", string>;

const PILL =
  "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em]";

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "changelog" });
  const base = `${SITE.url}/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${base}/resources/changelog/#breadcrumb`,
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
            item: `${base}/resources/changelog`,
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

      {/* ── Hero — title, lead, release count + a tag legend ──────────────── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-12 sm:pt-40 lg:pt-44 lg:pb-16">
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

        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Breadcrumb
              items={[
                { label: t("crumbResources"), href: "/resources" },
                { label: t("label") },
              ]}
            />
          </Reveal>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-12">
            {/* Text + meta */}
            <div>
              <Reveal style={{ animationDelay: "70ms" }} className="max-w-xl">
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

              {/* Meta — release count + tag legend */}
              <Reveal style={{ animationDelay: "140ms" }}>
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <span className="inline-flex items-baseline gap-2">
                    <span className="tabular font-display text-2xl font-semibold tracking-tight">
                      {changelogReleases.length}
                    </span>
                    <span className="text-sm text-muted">{t("shipped")}</span>
                  </span>
                  <span aria-hidden className="hidden h-5 w-px bg-border sm:block" />
                  <div className="flex flex-wrap items-center gap-2">
                    {changelogTagKeys.map((type) => (
                      <span key={type} className={`${PILL} ${TAG_CLASS[type]}`}>
                        {t(`tags.${type}`)}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Release-graph art (decorative) — light/dark variants, lg only */}
            <Reveal style={{ animationDelay: "120ms" }} className="hidden lg:block">
              <img
                src="/team/changelog-art-light.webp"
                alt=""
                aria-hidden
                className="w-full dark:hidden"
              />
              <img
                src="/team/changelog-art-dark.webp"
                alt=""
                aria-hidden
                className="hidden w-full dark:block"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Releases — two-column: sticky version meta left, changes right ──── */}
      <section className="mx-auto max-w-5xl px-6 pb-24 lg:pb-28">
        {changelogReleases.map((r, ri) => (
          <div
            key={r.key}
            className="grid gap-x-10 gap-y-5 border-t border-border py-12 first:border-t-0 first:pt-2 lg:grid-cols-[210px_1fr] lg:gap-x-16 lg:py-16"
          >
            {/* Version meta — sticks while its changes scroll past (lg+) */}
            <div className="self-start lg:sticky lg:top-28">
              <div className="flex items-center gap-2.5">
                <span className="tabular font-display text-3xl font-semibold tracking-tight">
                  v{r.version}
                </span>
                {ri === 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-surface/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-accent">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {t("latest")}
                  </span>
                )}
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-2">
                {t(`releases.${r.key}.date`)}
              </p>
            </div>

            {/* Changes */}
            <Reveal style={{ animationDelay: `${(ri % 3) * 60}ms` }}>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                {t(`releases.${r.key}.title`)}
              </h2>
              <ul className="mt-6 space-y-4">
                {r.items.map((it) => (
                  <li key={it.key} className="flex items-start gap-3.5">
                    <span className={`mt-0.5 ${PILL} ${TAG_CLASS[it.type]}`}>
                      {t(`tags.${it.type}`)}
                    </span>
                    <span className="text-[15px] leading-relaxed text-muted">
                      {t(`releases.${r.key}.items.${it.key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </section>

      <CircleCta />
    </>
  );
}
