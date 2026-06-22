import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { ModuleTabs } from "@/components/marketing/module-tabs";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";
import { CircleCta } from "@/components/marketing/circle-cta";

/** Module catalogue — 5 categories × 4. Icon names (mapped client-side) +
 *  designed card images (public/team/h/<key>.webp, lazy-loaded per tab).
 *  Copy under `modulesPage.items.<key>`. */
const CATALOG: {
  cat: string;
  items: { key: string; icon: string; img?: string; href?: string }[];
}[] = [
  {
    cat: "ik-musteri",
    items: [
      { key: "crm", icon: "Contact", img: "/team/h/crm.webp", href: "/modules/crm" },
      { key: "erp", icon: "Building2", img: "/team/h/erp.webp" },
      { key: "ikpdks", icon: "UsersRound", img: "/team/h/ikpdks.webp" },
      { key: "drive", icon: "FileText", img: "/team/h/drive.webp" },
    ],
  },
  {
    cat: "ticaret-finans",
    items: [
      { key: "eticaret", icon: "FileText", img: "/team/h/eticaret.webp" },
      { key: "muhasebe", icon: "FileText", img: "/team/h/muhasebe.webp" },
      { key: "stok", icon: "Building2", img: "/team/h/stok.webp" },
      { key: "finansrapor", icon: "FileText", img: "/team/h/finansrapor.webp" },
    ],
  },
  {
    cat: "operasyon-takip",
    items: [
      { key: "aractakip", icon: "Car", img: "/team/h/aractakip.webp" },
      { key: "canlitakip", icon: "MapPin", img: "/team/h/canlitakip.webp" },
      { key: "gorevtakip", icon: "ListChecks", img: "/team/h/gorevtakip.webp" },
      { key: "takvim", icon: "ListChecks", img: "/team/h/takvim.webp" },
    ],
  },
  {
    cat: "satis-katalog",
    items: [
      { key: "teklif", icon: "FileText", img: "/team/h/teklif.webp" },
      { key: "sozlesme", icon: "FileText", img: "/team/h/sozlesme.webp" },
      { key: "katalog", icon: "Newspaper", img: "/team/h/katalog.webp" },
      { key: "simulator", icon: "Sparkles", img: "/team/h/simulator.webp" },
    ],
  },
  {
    cat: "iletisim-web",
    items: [
      { key: "santral", icon: "MessageSquare", img: "/team/h/santral.webp" },
      { key: "mesaj", icon: "MessageSquare", img: "/team/h/mesaj.webp" },
      { key: "mail", icon: "MessageSquareText", img: "/team/h/mail.webp" },
      { key: "web", icon: "Globe", img: "/team/h/web.webp" },
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "modulesPage" });
  return pageMetadata({
    locale,
    path: "/modules",
    title: t("label"),
    description: t("hero.lead"),
  });
}

export default async function ModulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "modulesPage" });
  const base = `${SITE.url}/${locale}`;
  const features = t.raw("why.features") as string[];
  const allKeys = CATALOG.flatMap((c) => c.items.map((i) => i.key));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${base}/modules/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: base },
          { "@type": "ListItem", position: 2, name: t("label"), item: `${base}/modules` },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${base}/modules/#catalog`,
        name: t("label"),
        itemListElement: allKeys.map((key, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t(`items.${key}.title`),
          description: t(`items.${key}.desc`),
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

      {/* ── Hero — image background + atmosphere + scroll cue ─────────────── */}
      <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center">
        {/* Hero background — floating UI panels (light theme) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-center dark:hidden"
          style={{ backgroundImage: "url(/team/modules-hero.png)" }}
        />
        {/* Atmosphere — edges & bottom melt into the page (same as Solutions hero) */}
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
        {/* Scrim — keeps the centred title crisp */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 48% at 50% 48%, color-mix(in srgb, var(--background) 58%, transparent) 34%, transparent 100%)",
          }}
        />
        {/* Dark theme — ambient texture (no photo) */}
        <AuroraBackground className="-z-10 hidden opacity-50 dark:block" />
        <GridBackdrop className="-z-10 hidden dark:block" />

        <Reveal className="max-w-4xl">
          <span className="label-eyebrow">{t("label")}</span>
          <h1 className="mt-7 font-display text-[3.4rem] font-semibold leading-[0.98] tracking-[-0.02em] sm:text-7xl lg:text-[5.5rem]">
            <span className="block">{t("hero.titlePre")}</span>
            <span className="block font-serif font-normal italic text-foreground">
              {t("hero.titleEm")}
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {t("hero.lead")}
          </p>
          <p className="mt-9 inline-flex items-center rounded-full border border-border bg-surface/60 px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-muted backdrop-blur">
            {t("hero.stat")}
          </p>
        </Reveal>

        <div
          aria-hidden
          className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="h-12 w-px bg-border" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted-2">
            {t("hero.scrollCue")}
          </span>
        </div>
      </section>

      {/* ── Catalogue — category tabs (short page, lazy images) ──────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <ModuleTabs catalog={CATALOG} />
      </section>

      {/* ── The Corex360 difference ──────────────────────────────────────── */}
      <section className="border-y border-border bg-surface-2 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-surface/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-accent">
              {t("why.label")}
            </span>
            <h2 className="mx-auto mt-7 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("why.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {t("why.body")}
            </p>
          </Reveal>

          <Reveal style={{ animationDelay: "80ms" }}>
            <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div
                  key={f}
                  className="flex flex-col items-center gap-4 bg-surface-2 px-6 py-9 text-center transition-colors duration-500 hover:bg-surface"
                >
                  <span className="grid size-9 place-items-center rounded-full border border-accent/40 text-accent">
                    <Check className="size-4" strokeWidth={2.4} />
                  </span>
                  <span className="text-sm font-medium leading-snug text-foreground/90">
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal style={{ animationDelay: "140ms" }}>
            <Link
              href="/contact"
              className="group mt-12 inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-medium text-foreground/85 transition-colors hover:border-accent/60"
            >
              {t("why.cta")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CircleCta />
    </>
  );
}
