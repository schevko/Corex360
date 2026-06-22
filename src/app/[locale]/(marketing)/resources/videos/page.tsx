import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { LearnIllustration } from "@/components/marketing/learn-illustration";
import { VideoLibrary } from "@/components/marketing/video-library";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";
import { CircleCta } from "@/components/marketing/circle-cta";

/** Tutorial catalogue — the marketing video library. `img` is the designed
 *  cover (public/team/cover-<key>.png). First entry is featured; the rest are
 *  paginated. Copy under `videos.items.<key>`. */
type Video = { key: string; duration: string; img: string | null };

const VIDEOS: Video[] = [
  { key: "intro", duration: "3:48", img: "/team/cover-intro.png" },
  { key: "crm", duration: "5:12", img: "/team/cover-crm.png" },
  { key: "erp", duration: "6:30", img: "/team/cover-erp.png" },
  { key: "bi", duration: "4:05", img: "/team/cover-bi.png" },
  { key: "automation", duration: "3:21", img: "/team/cover-automation.png" },
  { key: "mobile", duration: "2:54", img: "/team/cover-mobile.png" },
  { key: "reporting", duration: "5:40", img: "/team/cover-reporting.png" },
  { key: "appointments", duration: "4:27", img: "/team/cover-appointments.png" },
  { key: "projects", duration: "5:34", img: "/team/cover-projects.png" },
  { key: "quotes", duration: "5:06", img: "/team/cover-quotes.png" },
  { key: "contracts", duration: "3:58", img: "/team/cover-contracts.png" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "videos" });
  return pageMetadata({
    locale,
    path: "/resources/videos",
    title: t("label"),
    description: t("hero.lead"),
  });
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "videos" });
  const base = `${SITE.url}/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${base}/resources/videos/#breadcrumb`,
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
            item: `${base}/resources/videos`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${base}/resources/videos/#videos`,
        name: t("label"),
        itemListElement: VIDEOS.map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t(`items.${v.key}.title`),
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

      {/* ── Hero banner — branded, photo behind the title ──────────────── */}
      <section className="relative flex min-h-[68svh] flex-col overflow-hidden px-6 pb-16 pt-32 lg:pt-36">
        <AuroraBackground className="-z-30 opacity-50" />
        <GridBackdrop className="-z-30" />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-center dark:hidden"
          style={{ backgroundImage: "url(/team/videohero.png)" }}
        />
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
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(54% 48% at 50% 52%, color-mix(in srgb, var(--background) 64%, transparent) 30%, transparent 100%)",
          }}
        />
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
            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-muted-2">
              {t("hero.meta")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Learning narrative + tutorial-player illustration ────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm font-medium text-muted">{t("learn.label")}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl">
              {t("learn.title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              {t("learn.p1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {t("learn.p2")}
            </p>
          </Reveal>
          <Reveal style={{ animationDelay: "80ms" }}>
            <LearnIllustration className="aspect-[4/3] w-full" />
          </Reveal>
        </div>
      </section>

      {/* ── Banded library — featured + paginated grid ───────────────────── */}
      <section className="border-y border-border bg-surface-2 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            label={t("libraryLabel")}
            title={t("libraryTitle")}
            align="center"
          />

          {/* Featured + paginated library + click-to-play modal */}
          <div className="mt-16">
            <VideoLibrary videos={VIDEOS} />
          </div>

          <Reveal>
            <p className="mt-12 text-center text-xs leading-relaxed text-muted-2">
              {t("disclaimer")}
            </p>
          </Reveal>
        </div>
      </section>

      <CircleCta />
    </>
  );
}
