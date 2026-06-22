import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Search,
  Rocket,
  Terminal,
  BookOpen,
  Plug,
  Boxes,
  Webhook,
  ShieldCheck,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { CodeMock } from "@/components/marketing/code-mock";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";
import { CircleCta } from "@/components/marketing/circle-cta";

/** Documentation categories — copy under `docs.categories.items.<key>`. */
const CATEGORIES: { key: string; Icon: LucideIcon; count: number }[] = [
  { key: "quickstart", Icon: Rocket, count: 6 },
  { key: "api", Icon: Terminal, count: 48 },
  { key: "guides", Icon: BookOpen, count: 24 },
  { key: "integrations", Icon: Plug, count: 32 },
  { key: "sdk", Icon: Boxes, count: 9 },
  { key: "webhooks", Icon: Webhook, count: 14 },
  { key: "security", Icon: ShieldCheck, count: 11 },
  { key: "changelog", Icon: GitBranch, count: 20 },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docs" });
  return pageMetadata({
    locale,
    path: "/resources/docs",
    title: t("label"),
    description: t("hero.lead"),
  });
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docs" });
  const base = `${SITE.url}/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${base}/resources/docs/#breadcrumb`,
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
            item: `${base}/resources/docs`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${base}/resources/docs/#categories`,
        name: t("categories.title"),
        itemListElement: CATEGORIES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t(`categories.items.${c.key}.title`),
          description: t(`categories.items.${c.key}.desc`),
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

      {/* ── Hero — editorial + a docs search field ───────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-16 lg:pt-44 lg:pb-20">
        {/* Hero photo (light theme) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-center dark:hidden"
          style={{ backgroundImage: "url(/team/docs-hero.png)" }}
        />
        {/* Atmosphere — edges & bottom melt into the page colour */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 dark:hidden"
          style={{
            background: [
              "radial-gradient(120% 95% at 50% 38%, transparent 40%, color-mix(in srgb, var(--background) 70%, transparent) 72%, var(--background) 100%)",
              "linear-gradient(to bottom, transparent 52%, color-mix(in srgb, var(--background) 82%, transparent) 84%, var(--background) 100%)",
            ].join(", "),
          }}
        />
        {/* Scrim — keeps the left-aligned text crisp */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(75% 75% at 32% 50%, color-mix(in srgb, var(--background) 62%, transparent) 32%, transparent 100%)",
          }}
        />
        {/* Dark theme — ambient texture (no photo) */}
        <AuroraBackground className="-z-30 hidden opacity-50 dark:block" />
        <GridBackdrop className="-z-30 hidden dark:block" />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Breadcrumb
              items={[
                { label: t("crumbResources"), href: "/resources" },
                { label: t("label") },
              ]}
            />
          </Reveal>
          <Reveal style={{ animationDelay: "80ms" }} className="mt-8 max-w-3xl">
            <span className="label-eyebrow">{t("label")}</span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">{t("hero.titlePre")}</span>
              <span className="block font-serif font-normal italic text-foreground">
                {t("hero.titleEm")}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t("hero.lead")}
            </p>
          </Reveal>

          {/* representative search field */}
          <Reveal style={{ animationDelay: "140ms" }}>
            <div className="mt-9 flex max-w-xl items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 text-muted-2 shadow-[var(--shadow-soft)]">
              <Search className="size-4 shrink-0" strokeWidth={1.75} />
              <span className="text-sm">{t("hero.searchPlaceholder")}</span>
              <kbd className="ms-auto rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
                ⌘K
              </kbd>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Developer narrative + code window ────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm font-medium text-muted">{t("dev.label")}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl">
              {t("dev.title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              {t("dev.p1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {t("dev.p2")}
            </p>
          </Reveal>
          <Reveal style={{ animationDelay: "80ms" }}>
            <CodeMock className="w-full" />
          </Reveal>
        </div>
      </section>

      {/* ── Categories — banded index ────────────────────────────────────── */}
      <section className="border-y border-border bg-surface-2 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            label={t("categories.label")}
            title={t("categories.title")}
            body={t("categories.lead")}
            align="center"
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map(({ key, Icon, count }, i) => (
              <Reveal
                key={key}
                className="group relative flex flex-col bg-surface-2 p-7 transition-colors duration-500 hover:bg-surface lg:p-8"
                style={{ animationDelay: `${(i % 4) * 60}ms` }}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface text-accent transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-accent/50 group-hover:shadow-[0_0_28px_-6px_var(--glow)]">
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {t(`categories.items.${key}.title`)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {t(`categories.items.${key}.desc`)}
                </p>
                <span className="mt-5 text-[11px] uppercase tracking-[0.16em] text-muted-2">
                  {count} {t("categories.unit")}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CircleCta />
    </>
  );
}
