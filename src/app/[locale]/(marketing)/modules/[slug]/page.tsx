import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Check,
  ArrowUpRight,
  UserRound,
  Workflow,
  FileText,
  CalendarCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  Contact,
  Target,
  FileSignature,
  LifeBuoy,
  ListTodo,
  Video,
  CalendarClock,
  Quote,
  MessageCircle,
  Mail,
  Calendar,
  Calculator,
  FormInput,
  PhoneCall,
  Plug,
  Boxes,
  ChartSpline,
  ShieldCheck,
  Award,
  BadgeCheck,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SITE, moduleIds, moduleMeta, certs, trustLogos, type ModuleId } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Icon, type IconName } from "@/components/ui/icon";
import { PageHeader } from "@/components/marketing/page-header";
import { FeaturesSection } from "@/components/marketing/features-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ImageSlot } from "@/components/ui/image-slot";
import { CircleCta } from "@/components/marketing/circle-cta";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";
import { Reveal } from "@/components/ui/reveal";

const ACCENT_VAR: Record<string, string> = {
  accent: "var(--accent)",
  "accent-2": "var(--accent-2)",
  "accent-3": "var(--accent-3)",
};

/** Modules with a built rich detail page (the marketing template). */
const RICH = new Set(["crm"]);

const CRM_FEATURES: { key: string; Icon: LucideIcon }[] = [
  { key: "card360", Icon: UserRound },
  { key: "pipeline", Icon: Workflow },
  { key: "quote", Icon: FileText },
  { key: "activity", Icon: CalendarCheck },
  { key: "ai", Icon: Sparkles },
  { key: "lifecycle", Icon: TrendingUp },
];

const CRM_FAQ = ["integration", "migration", "mobile", "ai", "security"] as const;

/* Per-item icons for the "inside the module" directory, by array index. */
const MGMT_ICONS: LucideIcon[] = [UsersRound, Contact, Target, FileText, FileSignature, LifeBuoy];
const ACT_ICONS: LucideIcon[] = [ListTodo, Video, CalendarClock];

/* Integration tiles + compliance badges + cross-sell modules. */
const INTEGRATION_ICONS: LucideIcon[] = [MessageCircle, Mail, Calendar, Calculator, FormInput, PhoneCall];
const CERT_ICONS: Record<string, LucideIcon> = { ShieldCheck, Award, BadgeCheck, Lock };
const RELATED: { id: ModuleId; Icon: LucideIcon }[] = [
  { id: "erp", Icon: Boxes },
  { id: "bi", Icon: ChartSpline },
];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    moduleIds.map((slug) => ({ locale, slug }))
  );
}

function isModuleId(s: string): s is ModuleId {
  return (moduleIds as readonly string[]).includes(s);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (RICH.has(slug)) {
    const t = await getTranslations({ locale, namespace: "moduleDetail" });
    return pageMetadata({
      locale,
      path: `/modules/${slug}`,
      title: `${t(`${slug}.titlePre`)} ${t(`${slug}.titleEm`)}`,
      description: t(`${slug}.lead`),
    });
  }

  if (!isModuleId(slug)) return {};
  const t = await getTranslations({ locale, namespace: "modules" });
  return pageMetadata({
    locale,
    path: `/modules/${slug}`,
    title: `${t(`items.${slug}.name`)} — ${t(`items.${slug}.tagline`)}`,
    description: t(`items.${slug}.description`),
  });
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  /* ── Rich detail / marketing page (CRM template) ─────────────────────── */
  if (slug === "crm") {
    const t = await getTranslations({ locale, namespace: "moduleDetail" });
    const mgmt = t.raw("crm.groups.management.items") as string[];
    const acts = t.raw("crm.groups.activities.items") as string[];
    const stages = t.raw("crm.lifecycle.stages") as { name: string; desc: string }[];
    const metrics = t.raw("crm.metrics.items") as { value: string; label: string }[];
    const integrations = t.raw("crm.integrations.items") as string[];
    const related = t.raw("crm.related.items") as { name: string; desc: string }[];
    const base = `${SITE.url}/${locale}`;
    const crmJsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "@id": `${base}/modules/crm/#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE.name, item: base },
            { "@type": "ListItem", position: 2, name: t("crumb"), item: `${base}/modules` },
            { "@type": "ListItem", position: 3, name: "CRM", item: `${base}/modules/crm` },
          ],
        },
        {
          "@type": "SoftwareApplication",
          "@id": `${base}/modules/crm/#app`,
          name: "Corex360 CRM",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, iOS, Android",
          description: t("crm.lead"),
          featureList: CRM_FEATURES.map((f) => t(`crm.features.${f.key}.title`)),
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
        },
        {
          "@type": "FAQPage",
          "@id": `${base}/modules/crm/#faq`,
          mainEntity: CRM_FAQ.map((k) => ({
            "@type": "Question",
            name: t(`crm.faq.items.${k}.q`),
            acceptedAnswer: { "@type": "Answer", text: t(`crm.faq.items.${k}.a`) },
          })),
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(crmJsonLd) }}
        />
        {/* Hero — minimal full-bleed editorial (Apple-style): one photograph,
            one idea, centred type. No chrome. */}
        <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden px-6 pb-24 pt-32">
          {/* CRM hero visual — customer-relationship orbit (light theme) */}
          <div
            aria-hidden
            className="absolute inset-0 -z-20 bg-cover bg-center dark:hidden"
            style={{ backgroundImage: "url(/team/92d57436-ccab-4cdc-bce9-5bfcba651d59.png)" }}
          />
          {/* Dark-theme ambiance */}
          <AuroraBackground className="-z-20 hidden opacity-40 dark:block" />
          <GridBackdrop className="-z-20 hidden dark:block" />
          {/* Atmosphere — page colour drifts in from every edge so the frame is borderless */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 dark:hidden"
            style={{
              background: [
                "radial-gradient(120% 92% at 50% 40%, transparent 34%, color-mix(in srgb, var(--background) 72%, transparent) 68%, var(--background) 100%)",
                "linear-gradient(to bottom, transparent 52%, color-mix(in srgb, var(--background) 84%, transparent) 84%, var(--background) 100%)",
              ].join(", "),
            }}
          />
          {/* Scrim — keeps the centred title crisp over the photograph */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(58% 52% at 50% 46%, color-mix(in srgb, var(--background) 72%, transparent) 24%, transparent 100%)",
            }}
          />

          <Reveal className="relative max-w-3xl text-center">
            <span className="text-sm font-medium text-muted">{t("crm.category")}</span>
            <h1 className="mt-6 font-display text-[2.8rem] font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">{t("crm.titlePre")}</span>
              <span className="block font-serif font-normal italic text-foreground">
                {t("crm.titleEm")}
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t("crm.lead")}
            </p>
          </Reveal>

          {/* Scroll cue */}
          <div
            aria-hidden
            className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
          >
            <span className="h-12 w-px bg-border" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-muted-2">
              {t("explore")}
            </span>
          </div>
        </section>

        {/* Vision — narrative + image */}
        <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="rule-accent" />
                <span className="label-eyebrow">{t("crm.vision.label")}</span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
                {t("crm.vision.title")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                {t("crm.vision.p1")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {t("crm.vision.p2")}
              </p>
              <p className="mt-8 border-s-2 border-border-strong ps-5 font-display text-lg font-medium leading-relaxed text-foreground/90 sm:text-xl">
                {t("crm.vision.quote")}
              </p>
            </Reveal>
            <Reveal style={{ animationDelay: "80ms" }}>
              <ImageSlot
                src="/team/56f43cd7-7079-4416-83c6-03e21f50ca54.png"
                label={t("imageLabel")}
                className="aspect-[4/3] w-full"
              />
            </Reveal>
          </div>
        </section>

        {/* Demo video */}
        <section id="demo" className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="label-eyebrow">{t("crm.demoLabel")}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
              {t("crm.demoTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {t("crm.demoSub")}
            </p>
          </Reveal>
          <Reveal className="mt-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team/m/crm-demo.png"
              alt={t("crm.demoTitle")}
              className="w-full select-none rounded-3xl border border-border shadow-[var(--shadow-soft)]"
              draggable={false}
            />
          </Reveal>
        </section>

        {/* Features */}
        <section className="border-y border-border bg-surface-2 py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              label={t("crm.featuresLabel")}
              title={t("crm.featuresTitle")}
              align="center"
            />
            <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {CRM_FEATURES.map(({ key, Icon: FIcon }, i) => (
                <Reveal
                  key={key}
                  className="group relative flex flex-col bg-surface-2 p-8 transition-colors duration-500 hover:bg-surface lg:p-9"
                  style={{ animationDelay: `${(i % 3) * 60}ms` }}
                >
                  <span className="grid size-12 place-items-center rounded-xl border border-border bg-surface text-accent transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-accent/50 group-hover:shadow-[0_0_28px_-6px_var(--glow)]">
                    <FIcon className="size-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                    {t(`crm.features.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t(`crm.features.${key}.desc`)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Outcome metrics */}
        <section className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <span className="label-eyebrow">{t("crm.metrics.label")}</span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
                {t("crm.metrics.title")}
              </h2>
            </Reveal>
            <Reveal
              style={{ animationDelay: "80ms" }}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4"
            >
              {metrics.map((m) => (
                <div key={m.label} className="bg-surface-2 p-6 text-center sm:p-7">
                  <div className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {m.value}
                  </div>
                  <div className="mt-2 text-xs leading-snug text-muted">{m.label}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Showcase — product screens */}
        <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <SectionHeading
            label={t("crm.showcase.label")}
            title={t("crm.showcase.title")}
            body={t("crm.showcase.sub")}
            align="center"
          />
          <Reveal className="mt-12">
            <ImageSlot
              src="/team/m/crm-showcase.png"
              label={t("imageLabel")}
              className="aspect-video w-full"
            />
          </Reveal>
        </section>

        {/* Customer lifecycle — connected journey on a raised layer */}
        <section className="border-y border-border bg-surface-2 py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              label={t("crm.lifecycle.label")}
              title={t("crm.lifecycle.title")}
              body={t("crm.lifecycle.lead")}
            />
            <div className="relative mt-16">
              {/* progression track — lead → loyal */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-[9px] hidden h-px bg-gradient-to-r from-border-strong/50 via-border-strong to-foreground/45 lg:block"
              />
              <ol className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
                {stages.map((s, i) => {
                  const fill = 0.3 + (i / (stages.length - 1)) * 0.65;
                  return (
                    <Reveal
                      as="li"
                      key={s.name}
                      style={{ animationDelay: `${i * 70}ms` }}
                      className="group relative"
                    >
                      <span className="relative z-10 flex size-[18px] items-center justify-center rounded-full border border-border-strong bg-surface shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <span
                          className="size-2 rounded-full bg-foreground"
                          style={{ opacity: fill }}
                        />
                      </span>
                      <span className="mt-6 block tabular text-xs tracking-[0.22em] text-muted-2">
                        0{i + 1}
                      </span>
                      <h3 className="mt-2.5 font-display text-lg font-semibold tracking-tight">
                        {s.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                    </Reveal>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* Inside the module — capability directory */}
        <section id="inside" className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <SectionHeading label={t("crm.insideLabel")} title={t("crm.insideTitle")} />
          <div className="mt-14 grid gap-5 lg:grid-cols-5">
            {/* Customer management — wide */}
            <Reveal className="lg:col-span-3">
              <div className="h-full rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur-sm sm:p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {t("crm.groups.management.label")}
                  </h3>
                  <span className="tabular text-xs text-muted-2">
                    {String(mgmt.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-4 grid gap-1 border-t border-border/60 pt-3 sm:grid-cols-2">
                  {mgmt.map((it, i) => {
                    const ItemIcon = MGMT_ICONS[i] ?? Check;
                    return (
                      <li key={it}>
                        <div className="group/it flex items-center gap-3.5 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-surface-2/60">
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-border bg-surface text-foreground/70 transition-all duration-300 group-hover/it:border-accent/40 group-hover/it:text-foreground group-hover/it:shadow-[0_0_22px_-8px_var(--glow)]">
                            <ItemIcon className="size-4" strokeWidth={1.6} />
                          </span>
                          <span className="text-[15px] text-foreground/90">{it}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            {/* Activities — narrow */}
            <Reveal style={{ animationDelay: "80ms" }} className="lg:col-span-2">
              <div className="h-full rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur-sm sm:p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {t("crm.groups.activities.label")}
                  </h3>
                  <span className="tabular text-xs text-muted-2">
                    {String(acts.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-4 grid gap-1 border-t border-border/60 pt-3">
                  {acts.map((it, i) => {
                    const ItemIcon = ACT_ICONS[i] ?? Check;
                    return (
                      <li key={it}>
                        <div className="group/it flex items-center gap-3.5 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-surface-2/60">
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-border bg-surface text-foreground/70 transition-all duration-300 group-hover/it:border-accent/40 group-hover/it:text-foreground group-hover/it:shadow-[0_0_22px_-8px_var(--glow)]">
                            <ItemIcon className="size-4" strokeWidth={1.6} />
                          </span>
                          <span className="text-[15px] text-foreground/90">{it}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Integrations */}
        <section className="border-y border-border bg-surface-2 py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <span className="label-eyebrow">{t("crm.integrations.label")}</span>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
                  {t("crm.integrations.title")}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                  {t("crm.integrations.sub")}
                </p>
              </Reveal>
              <Reveal style={{ animationDelay: "80ms" }}>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {integrations.map((name, i) => {
                    const IntIcon = INTEGRATION_ICONS[i] ?? Plug;
                    return (
                      <div
                        key={name}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors duration-300 hover:border-border-strong"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-foreground/70">
                          <IntIcon className="size-4" strokeWidth={1.6} />
                        </span>
                        <span className="truncate text-sm font-medium text-foreground/90">{name}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-center rounded-2xl border border-dashed border-border-strong/60 p-4 text-center text-sm text-muted-2">
                    {t("crm.integrations.more")}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="mx-auto max-w-5xl px-6 py-24 lg:py-28">
          <Reveal className="text-center">
            <span className="label-eyebrow">{t("crm.proof.label")}</span>
            <Quote
              className="mx-auto mt-6 size-8 text-border-strong"
              fill="currentColor"
              strokeWidth={0}
            />
            <blockquote className="mx-auto mt-5 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-foreground/90 sm:text-[2rem]">
              {t("crm.proof.quote")}
            </blockquote>
            <div className="mt-7 text-sm text-muted">
              <span className="font-semibold text-foreground/90">{t("crm.proof.author")}</span>
              <span className="mx-2 text-border-strong">·</span>
              {t("crm.proof.company")}
            </div>
          </Reveal>
          <Reveal style={{ animationDelay: "120ms" }} className="mt-16">
            <p className="text-center text-[11px] uppercase tracking-[0.22em] text-muted-2">
              {t("crm.proof.trustLabel")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {trustLogos.map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={l.slug}
                  src={`/logos/${l.slug}.png`}
                  alt={l.name}
                  className="h-7 w-auto object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-8"
                  draggable={false}
                />
              ))}
            </div>
          </Reveal>
        </section>

        {/* Related modules + compliance */}
        <section className="border-t border-border bg-surface-2 py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              label={t("crm.related.label")}
              title={t("crm.related.title")}
              body={t("crm.related.sub")}
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {RELATED.map(({ id, Icon: ModIcon }, i) => {
                const r = related[i];
                return (
                  <Reveal key={id} style={{ animationDelay: `${i * 80}ms` }}>
                    <Link
                      href={moduleMeta[id].href}
                      className="group flex h-full items-start gap-5 rounded-3xl border border-border bg-surface p-7 transition-colors duration-300 hover:border-foreground/30 lg:p-8"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-foreground/80">
                        <ModIcon className="size-6" strokeWidth={1.5} />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-display text-xl font-semibold tracking-tight">{r.name}</h3>
                          <ArrowUpRight className="size-5 shrink-0 text-muted-2 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground rtl:-scale-x-100" />
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{r.desc}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
            <Reveal style={{ animationDelay: "160ms" }} className="mt-12 border-t border-border pt-10">
              <p className="text-center text-[11px] uppercase tracking-[0.22em] text-muted-2">
                {t("crm.related.trustLabel")}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {certs.map((c) => {
                  const CIcon = CERT_ICONS[c.icon] ?? ShieldCheck;
                  return (
                    <span
                      key={c.slug}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground/80"
                    >
                      <CIcon className="size-4 text-foreground/55" strokeWidth={1.6} />
                      {c.name}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ — GEO Q&A, mirrored by the FAQPage structured data */}
        <FaqSection namespace="moduleDetail.crm.faq" keys={CRM_FAQ} />

        <CircleCta />
      </>
    );
  }

  /* ── Legacy pillar pages (ERP / BI) ──────────────────────────────────── */
  if (!isModuleId(slug)) notFound();

  const t = await getTranslations({ locale, namespace: "modules" });
  const meta = moduleMeta[slug];
  const color = ACCENT_VAR[meta.accent];
  const points = t.raw(`items.${slug}.points`) as string[];
  const others = moduleIds.filter((m) => m !== slug);

  return (
    <>
      <PageHeader
        label={t(`items.${slug}.tagline`)}
        title={
          <>
            <span className="inline-flex items-center gap-3">
              <span
                className="grid size-12 place-items-center rounded-xl border border-border bg-surface-2 sm:size-14"
                style={{ boxShadow: `0 0 30px -8px ${color}` }}
              >
                <Icon name={meta.icon as IconName} className="size-6" style={{ color }} strokeWidth={1.6} />
              </span>
            </span>
            <span className="mt-4 block">{t(`items.${slug}.name`)}</span>
          </>
        }
        body={t(`items.${slug}.description`)}
      >
        <Link
          href="/app"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:shadow-[var(--shadow-glow)]"
        >
          {t("explore")}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </PageHeader>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((p, i) => (
            <Reveal
              key={p}
              style={{ animationDelay: `${(i % 2) * 70}ms` }}
              className="flex items-start gap-3 rounded-2xl border border-border bg-surface/30 p-5"
            >
              <Check className="mt-0.5 size-5 shrink-0" style={{ color }} strokeWidth={2} />
              <span className="text-sm text-foreground/90">{p}</span>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {others.map((m) => (
            <Link
              key={m}
              href={moduleMeta[m].href}
              className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground/85 transition-colors hover:border-accent/50"
            >
              <Icon
                name={moduleMeta[m].icon as IconName}
                className="size-4"
                style={{ color: ACCENT_VAR[moduleMeta[m].accent] }}
                strokeWidth={1.6}
              />
              {t(`items.${m}.name`)}
              <ArrowUpRight className="size-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <FeaturesSection />
      <CtaSection />
    </>
  );
}
