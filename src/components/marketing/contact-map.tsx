"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import { offices, SITE } from "@/lib/site";

/**
 * Contact centrepiece — a full-bleed monochrome map hero. The map is melted
 * into the page with an Atelier-style atmosphere layer (radial + linear washes
 * of the page background, à la the About hero) so it never reads as a hard
 * rectangle, and the frosted contact form floats on top of it. The two offices
 * (İTÜ Teknokent HQ + Sancaktepe) live in a clean band below and re-centre the
 * map on select. Maps are self-hosted static OSM tiles (no iframe / consent /
 * tile-policy issues). SSR-safe; only interactivity hydrates.
 */
export function ContactMap() {
  const t = useTranslations("contactPage");

  const [activeKey, setActiveKey] = useState<(typeof offices)[number]["key"]>(
    offices[0].key,
  );
  const active = offices.find((o) => o.key === activeKey) ?? offices[0];

  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${active.lat},${active.lng}`;
  const waNum = SITE.phone.replace(/[^\d]/g, "");
  const activeName = t(`offices.${active.key}.name`);

  const channels = [
    { icon: Mail, label: t("channels.email"), value: SITE.email, href: `mailto:${SITE.email}` },
    {
      icon: Phone,
      label: t("channels.phone"),
      value: SITE.phone,
      href: `tel:${SITE.phone.replace(/[^\d+]/g, "")}`,
    },
    { icon: MessageCircle, label: t("channels.whatsapp"), value: SITE.phone, href: `https://wa.me/${waNum}` },
    { icon: Clock, label: t("channels.hours"), value: t("channels.hoursValue"), href: undefined },
  ];

  return (
    <section className="pb-16 lg:pb-24">
      {/* ── Full-bleed map hero — the form floats over it; an atmosphere layer
            melts the map into the page (About-hero technique). ───────────── */}
      <div className="relative w-full overflow-hidden">
        {/* Map (self-hosted static OSM, grayscale → warm monochrome). */}
        {offices.map((o) => (
          <img
            key={o.key}
            src={`/map/${o.key}.webp`}
            alt={t("mapAria", { name: t(`offices.${o.key}.name`) })}
            width={1920}
            height={820}
            loading="lazy"
            draggable={false}
            className={`absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-700 ease-out [filter:grayscale(1)_contrast(1.16)_brightness(0.98)] dark:[filter:grayscale(1)_invert(0.93)_hue-rotate(180deg)_contrast(0.9)] ${
              o.key === activeKey ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Centre location marker — map is pre-centred on the active office. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="relative grid place-items-center text-foreground">
            <span className="pulse-ring absolute size-6" />
            <span className="size-3.5 rounded-full bg-foreground shadow-[0_0_0_4px_var(--background),0_6px_14px_-4px_rgba(0,0,0,0.5)]" />
          </span>
        </div>

        {/* Atmosphere layer — radial + linear washes of the page background melt
            the map into the page (edges + top/bottom) and keep a soft scrim. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              "radial-gradient(125% 95% at 50% 44%, transparent 36%, color-mix(in srgb, var(--background) 58%, transparent) 70%, var(--background) 100%)",
              "linear-gradient(to bottom, color-mix(in srgb, var(--background) 36%, transparent) 0%, transparent 15%, transparent 72%, color-mix(in srgb, var(--background) 86%, transparent) 92%, var(--background) 100%)",
            ].join(", "),
          }}
        />

        {/* Active-office pill. */}
        <div className="absolute start-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-[var(--glass-bg)] px-3.5 py-1.5 text-xs font-medium shadow-[var(--shadow-soft)] backdrop-blur-md">
          <span className="relative flex size-2 text-accent">
            <span className="pulse-ring absolute inset-0" />
            <span className="size-2 rounded-full bg-current" />
          </span>
          <span className="tracking-tight">{activeName}</span>
        </div>

        {/* OSM attribution (required by the tile usage policy). */}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-3 start-5 z-10 rounded-md bg-[var(--glass-bg)] px-2 py-0.5 text-[0.62rem] text-muted-2 backdrop-blur-sm transition-colors hover:text-muted"
        >
          © OpenStreetMap
        </a>

        {/* The frosted form, floating on the map. */}
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center justify-center px-5 py-12 sm:min-h-[600px] sm:px-7 lg:min-h-[720px] lg:justify-end lg:px-9 lg:py-16">
          <div className="relative w-full max-w-[400px]">
            {/* Soft cloud puffs behind the card (monochrome, gently floating). */}
            <div aria-hidden className="pointer-events-none absolute -inset-x-5 -top-7 bottom-3 -z-10">
              <div className="animate-float absolute left-3 top-3 size-28 rounded-full bg-surface/70 blur-2xl" />
              <div className="animate-float absolute right-2 top-0 size-36 rounded-full bg-surface/60 blur-2xl [animation-delay:-2.5s]" />
              <div className="animate-float absolute inset-x-6 bottom-0 h-40 rounded-full bg-surface/70 blur-3xl [animation-delay:-1.2s]" />
            </div>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* ── Offices — clean band below the map ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-7 lg:px-9 lg:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label-eyebrow">{t("offices.eyebrow")}</span>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("offices.title")}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{t("offices.lead")}</p>
          </div>
          <a
            href={directionsHref}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:border-accent/60 hover:text-foreground"
          >
            <Navigation className="size-4" strokeWidth={1.8} />
            {t("offices.directions")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
          </a>
        </div>

        {/* Office selector — re-centres the map above. */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {offices.map((o) => {
            const isActive = o.key === activeKey;
            return (
              <button
                key={o.key}
                type="button"
                onClick={() => setActiveKey(o.key)}
                aria-pressed={isActive}
                className={`group flex items-start gap-4 rounded-2xl border p-5 text-start transition-all duration-300 ${
                  isActive
                    ? "border-accent/70 bg-surface shadow-[var(--shadow-soft)]"
                    : "border-border bg-surface/40 hover:border-border-strong hover:bg-surface/70"
                }`}
              >
                <span
                  className={`mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl border transition-colors ${
                    isActive
                      ? "border-transparent bg-foreground text-background"
                      : "border-border bg-surface-2 text-accent"
                  }`}
                >
                  <MapPin className="size-5" strokeWidth={1.7} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-base font-semibold tracking-tight">
                      {t(`offices.${o.key}.name`)}
                    </span>
                    {isActive && (
                      <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-muted">
                        {t("offices.active")}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted-2">
                    {t(`offices.${o.key}.tag`)}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                    {t(`offices.${o.key}.address`)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Channels */}
        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-border pt-7 sm:grid-cols-4">
          {channels.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
                  <Icon className="size-4" strokeWidth={1.7} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.7rem] uppercase tracking-[0.12em] text-muted-2">
                    {label}
                  </span>
                  <span className="block truncate text-sm text-foreground/90" dir="ltr">
                    {value}
                  </span>
                </span>
              </>
            );
            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface/60"
              >
                {inner}
              </a>
            ) : (
              <div key={label} className="flex items-center gap-3 rounded-xl p-2">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** The frosted-glass message form (client success state; wire a real endpoint
 *  into onSubmit when the backend lands). */
function ContactForm() {
  const t = useTranslations("contactPage.form");
  const ts = useTranslations("contactPage.subjects");
  const [done, setDone] = useState(false);

  const subjectKeys = ["demo", "sales", "support", "partnership", "other"] as const;
  const inputClass =
    "cx-field w-full rounded-xl border border-border-strong/50 bg-surface-2/40 px-4 py-3 text-sm text-foreground transition-all duration-200 placeholder:text-muted-2 hover:border-border-strong focus:bg-surface";

  return (
    <div className="relative rounded-[1.9rem] border border-[color:var(--glass-border)] bg-[var(--glass-bg)] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl backdrop-saturate-150 sm:p-7">
      {done ? (
        <div className="flex flex-col items-center justify-center px-2 py-16 text-center">
          <span className="grid size-12 place-items-center rounded-full border border-accent/40 text-accent">
            <Check className="size-6" strokeWidth={2} />
          </span>
          <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
            {t("successTitle")}
          </h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{t("successBody")}</p>
          <button
            type="button"
            onClick={() => setDone(false)}
            className="mt-6 text-sm font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {t("again")}
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <span className="label-eyebrow">{t("eyebrow")}</span>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{t("title")}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{t("sub")}</p>

          <div className="mt-5 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">{t("name")}</span>
                <input className={inputClass} placeholder={t("name")} required autoComplete="name" />
              </label>
              <label className="block">
                <span className="sr-only">{t("phone")}</span>
                <input
                  className={inputClass}
                  type="tel"
                  placeholder={t("phone")}
                  autoComplete="tel"
                  dir="ltr"
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">{t("email")}</span>
                <input
                  className={inputClass}
                  type="email"
                  placeholder={t("email")}
                  required
                  autoComplete="email"
                  dir="ltr"
                />
              </label>
              <label className="block">
                <span className="sr-only">{t("company")}</span>
                <input
                  className={inputClass}
                  placeholder={t("company")}
                  autoComplete="organization"
                />
              </label>
            </div>
            {/* Subject — native <details> dropdown (opens with zero JS). */}
            <details className="cx-select group relative">
              <summary
                aria-label={t("subject")}
                className={`${inputClass} flex cursor-pointer select-none items-center justify-between gap-2`}
              >
                <span className="truncate">
                  {subjectKeys.map((k) => (
                    <span key={k} data-opt={k} className="cx-opt">
                      {ts(k)}
                    </span>
                  ))}
                </span>
                <ChevronDown
                  className="cx-chevron size-4 shrink-0 text-muted transition-transform duration-200"
                  strokeWidth={1.8}
                />
              </summary>
              <div className="animate-pop-in absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-[var(--shadow-glow)]">
                {subjectKeys.map((k) => (
                  <label
                    key={k}
                    onClick={(e) => {
                      const d = e.currentTarget.closest("details");
                      if (d) d.open = false;
                    }}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground has-[:checked]:text-foreground"
                  >
                    <span>{ts(k)}</span>
                    <input
                      type="radio"
                      name="subject"
                      value={k}
                      defaultChecked={k === "demo"}
                      className="peer sr-only"
                    />
                    <Check
                      className="size-4 shrink-0 text-accent opacity-0 transition-opacity peer-checked:opacity-100"
                      strokeWidth={2}
                    />
                  </label>
                ))}
              </div>
            </details>
            <label className="block">
              <span className="sr-only">{t("message")}</span>
              <textarea
                className={`${inputClass} min-h-[96px] resize-y`}
                placeholder={t("message")}
                required
                rows={3}
              />
            </label>
          </div>

          <button
            type="submit"
            className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]"
          >
            {t("submit")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
          </button>

          <p className="mt-3.5 text-xs leading-relaxed text-muted-2">{t("note")}</p>
        </form>
      )}
    </div>
  );
}
