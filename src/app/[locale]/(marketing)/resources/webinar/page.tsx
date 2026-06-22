import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Calendar, Clock, Radio, Gift, type LucideIcon } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { SITE, webinarBenefits, webinarFaqKeys } from "@/lib/site";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { RegistrationForm } from "@/components/marketing/registration-form";
import { FaqSection } from "@/components/marketing/faq-section";
import { CircleCta } from "@/components/marketing/circle-cta";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "webinar" });
  return pageMetadata({
    locale,
    path: "/resources/webinar",
    title: `${t("hero.titlePre")} ${t("hero.titleEm")}`,
    description: t("hero.lead"),
  });
}

export default async function WebinarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "webinar" });
  const base = `${SITE.url}/${locale}`;
  const agenda = t.raw("agenda.items") as string[];

  // The format chip carries a live pulse instead of a static icon.
  const meta: { Icon: LucideIcon; value: string; live?: boolean }[] = [
    { Icon: Calendar, value: t("meta.date") },
    { Icon: Clock, value: t("meta.time") },
    { Icon: Radio, value: t("meta.format"), live: true },
    { Icon: Gift, value: t("meta.price") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${base}/resources/webinar/#breadcrumb`,
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
            item: `${base}/resources/webinar`,
          },
        ],
      },
      {
        "@type": "Event",
        "@id": `${base}/resources/webinar/#event`,
        name: `${t("hero.titlePre")} ${t("hero.titleEm")}`,
        description: t("hero.lead"),
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        isAccessibleForFree: true,
        location: {
          "@type": "VirtualLocation",
          url: `${base}/resources/webinar`,
        },
        organizer: { "@type": "Organization", name: SITE.name, url: SITE.url },
        performer: { "@type": "Person", name: t("host.name") },
      },
      {
        "@type": "FAQPage",
        "@id": `${base}/resources/webinar/#faq`,
        mainEntity: webinarFaqKeys.map((k) => ({
          "@type": "Question",
          name: t(`faq.items.${k}.q`),
          acceptedAnswer: { "@type": "Answer", text: t(`faq.items.${k}.a`) },
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

      {/* ── Hero — two-column: editorial left, floating registration right ──── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28">
        {/* Light atmosphere — a soft warm glow at the top + an accent orb behind
            the floating card, so the hero has depth without a photo. */}
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
        {/* Dark theme keeps the ambient texture. */}
        <AuroraBackground className="-z-10 hidden opacity-50 dark:block" />
        <GridBackdrop className="-z-10 hidden dark:block" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.9fr] lg:gap-16">
          {/* Editorial column */}
          <div>
            <Reveal>
              <Breadcrumb
                items={[
                  { label: t("crumbResources"), href: "/resources" },
                  { label: t("label") },
                ]}
              />
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

            {/* Event meta — pills; the live chip pulses */}
            <Reveal style={{ animationDelay: "140ms" }}>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {meta.map(({ Icon: MetaIcon, value, live }) => (
                  <span
                    key={value}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm text-muted backdrop-blur-sm"
                  >
                    {live ? (
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/50" />
                        <span className="relative inline-flex size-2 rounded-full bg-accent" />
                      </span>
                    ) : (
                      <MetaIcon className="size-4 text-accent" strokeWidth={1.6} />
                    )}
                    {value}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Floating registration card */}
          <Reveal style={{ animationDelay: "120ms" }}>
            <RegistrationForm floating />
          </Reveal>
        </div>
      </section>

      {/* ── Why attend — banded chapter break, three value cards ──────────── */}
      <section className="border-y border-border bg-surface-2 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            label={t("benefits.label")}
            title={t("benefits.title")}
            align="center"
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
            {webinarBenefits.map((b, i) => (
              <Reveal
                key={b.key}
                style={{ animationDelay: `${(i % 3) * 70}ms` }}
                className="group relative flex flex-col bg-surface-2 p-7 transition-colors duration-500 hover:bg-surface sm:p-8 lg:p-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="grid size-12 place-items-center rounded-xl border border-border bg-surface text-accent transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-accent/50 group-hover:shadow-[0_0_28px_-6px_var(--glow)]">
                  <Icon name={b.icon} className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                  {t(`benefits.items.${b.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(`benefits.items.${b.key}.desc`)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agenda — vertical timeline ───────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-14 lg:pt-28">
        <SectionHeading
          label={t("agenda.label")}
          title={t("agenda.title")}
          align="center"
        />

        <ol className="relative mt-14 ms-2 border-s border-border">
          {agenda.map((item, i) => (
            <Reveal
              as="li"
              key={i}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group relative ps-8 pb-7 last:pb-0"
            >
              <span className="tabular absolute -start-[14px] top-0 grid size-7 place-items-center rounded-full border border-border bg-background text-xs text-muted-2 transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent">
                {i + 1}
              </span>
              <p className="text-base leading-relaxed text-foreground/85 transition-colors duration-300 group-hover:text-foreground">
                {item}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── Host ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 pb-24 lg:pb-28">
        <Reveal>
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-border bg-surface/70 p-7 sm:flex-row sm:items-center sm:gap-6 lg:p-8">
            <div
              aria-hidden
              className="size-16 shrink-0 rounded-2xl border border-border bg-surface-2 bg-cover bg-center"
              style={{ backgroundImage: "url(/team/sevket.png)" }}
            />
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-2">
                {t("host.label")}
              </p>
              <p className="mt-1.5 font-display text-lg font-semibold tracking-tight">
                {t("host.name")}
              </p>
              <p className="text-sm text-accent">{t("host.role")}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {t("host.bio")}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ — GEO Q&A, mirrored by the FAQPage structured data above ─── */}
      <FaqSection namespace="webinar.faq" keys={webinarFaqKeys} />

      {/* ── Closing — same spinning-circle CTA as the sibling pages ──────── */}
      <CircleCta />
    </>
  );
}
