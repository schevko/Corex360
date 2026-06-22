import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Play } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { StudioPoster } from "@/components/marketing/studio-poster";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";
import { CircleCta } from "@/components/marketing/circle-cta";

/** Customer testimonial videos — copy lives under `stories.items.<key>`; the
 *  poster images are studio interview shots dropped in public/team. */
const TESTIMONIALS = [
  { key: "logistics", img: "/team/testimonial-1.png" },
  { key: "retail", img: "/team/testimonial-2.png" },
  { key: "construction", img: "/team/testimonial-3.png" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stories" });
  return pageMetadata({
    locale,
    path: "/resources/stories",
    title: t("label"),
    description: t("hero.lead"),
  });
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "stories" });
  const base = `${SITE.url}/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${base}/resources/stories/#breadcrumb`,
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
            item: `${base}/resources/stories`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${base}/resources/stories/#testimonials`,
        name: t("testimonialsTitle"),
        itemListElement: TESTIMONIALS.map(({ key }, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t(`items.${key}.sector`),
          description: t(`items.${key}.quote`),
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero banner — branded, editorial (About-caliber) ─────────────── */}
      <section className="relative flex min-h-[72svh] flex-col overflow-hidden px-6 pb-16 pt-32 lg:pt-36">
        {/* Hero photo (light theme) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-center dark:hidden"
          style={{ backgroundImage: "url(/team/stories-hero.png)" }}
        />
        {/* Atmosphere — soft cloud of page colour from the edges & bottom */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 dark:hidden"
          style={{
            background: [
              "radial-gradient(115% 85% at 50% 42%, transparent 42%, color-mix(in srgb, var(--background) 70%, transparent) 72%, var(--background) 100%)",
              "linear-gradient(to bottom, transparent 58%, color-mix(in srgb, var(--background) 82%, transparent) 86%, var(--background) 100%)",
            ].join(", "),
          }}
        />
        {/* Scrim — keeps the title crisp over the photo */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(54% 48% at 50% 52%, color-mix(in srgb, var(--background) 64%, transparent) 30%, transparent 100%)",
          }}
        />
        {/* Dark theme has no photo — keep the ambient texture */}
        <AuroraBackground className="-z-10 hidden opacity-50 dark:block" />
        <GridBackdrop className="-z-10 hidden dark:block" />
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <Breadcrumb
              items={[
                { label: t("crumbResources"), href: "/resources" },
                { label: t("label") },
              ]}
            />
          </Reveal>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Reveal className="max-w-3xl text-center">
            <span className="label-eyebrow">{t("label")}</span>
            <h1 className="mt-6 font-display text-[2.8rem] font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">{t("hero.titlePre")}</span>
              <span className="block font-serif font-normal italic text-foreground">
                {t("hero.titleEm")}
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t("hero.lead")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Narrative — the importance we place on our customers ─────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading label={t("care.label")} title={t("care.title")} />
          <Reveal style={{ animationDelay: "80ms" }} className="lg:pt-2">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {t("care.p1")}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {t("care.p2")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonial videos — banded, prominent, alternating descent ──── */}
      <section className="border-y border-border bg-surface-2 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            label={t("testimonialsLabel")}
            title={t("testimonialsTitle")}
            align="center"
          />

          <div className="mt-16 flex flex-col gap-16 lg:mt-20 lg:gap-24">
            {TESTIMONIALS.map(({ key, img }, i) => (
              <Reveal key={key}>
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={cn(i % 2 === 1 && "lg:order-last")}>
                    <StudioPoster
                      src={img}
                      duration={t(`items.${key}.duration`)}
                      tag={t("videoTag")}
                    />
                  </div>
                  <div>
                    <span className="label-eyebrow">{t(`items.${key}.sector`)}</span>
                    <p className="mt-5 font-display text-2xl font-medium leading-[1.3] tracking-tight text-foreground/90 sm:text-[1.7rem]">
                      &ldquo;{t(`items.${key}.quote`)}&rdquo;
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <span className="text-aurora font-display text-lg font-semibold">
                        {t(`items.${key}.metric`)}
                      </span>
                      <span className="h-4 w-px bg-border-strong" />
                      <span className="text-sm font-medium text-accent">
                        {t(`items.${key}.author`)}
                      </span>
                    </div>
                    <Link
                      href="/contact"
                      className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent"
                    >
                      <Play className="size-4" fill="currentColor" strokeWidth={0} />
                      {t("watch")} · {t(`items.${key}.duration`)}
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-16 text-center text-xs leading-relaxed text-muted-2">
              {t("disclaimer")}
            </p>
          </Reveal>
        </div>
      </section>

      <CircleCta />
    </>
  );
}
