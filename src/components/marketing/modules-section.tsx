import { useTranslations } from "next-intl";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { moduleIds, moduleMeta } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/icon";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const ACCENT_VAR: Record<string, string> = {
  accent: "var(--accent)",
  "accent-2": "var(--accent-2)",
  "accent-3": "var(--accent-3)",
};

export function ModulesSection() {
  const t = useTranslations("modules");

  return (
    <section id="modules" className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <SectionHeading label={t("label")} title={t("title")} body={t("body")} />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {moduleIds.map((id, i) => {
          const meta = moduleMeta[id];
          const color = ACCENT_VAR[meta.accent];
          const points = t.raw(`items.${id}.points`) as string[];

          return (
            <Reveal key={id} style={{ animationDelay: `${i * 80}ms` }}>
              <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface/40 p-8 transition-colors duration-300 hover:border-border-strong">
                {/* glow blob */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: color }}
                />
                <div className="tilt-layer relative">
                  <div
                    className="grid size-12 place-items-center rounded-xl border border-border bg-surface-2"
                    style={{ boxShadow: `0 0 24px -8px ${color}` }}
                  >
                    <Icon name={meta.icon as IconName} className="size-5" style={{ color }} strokeWidth={1.6} />
                  </div>

                  <div className="mt-6 flex items-baseline gap-2">
                    <h3 className="font-display text-2xl font-semibold">{t(`items.${id}.name`)}</h3>
                    <span className="text-xs uppercase tracking-wider text-muted-2">
                      {t(`items.${id}.tagline`)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {t(`items.${id}.description`)}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <Check className="mt-0.5 size-4 shrink-0" style={{ color }} strokeWidth={2} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={meta.href}
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                    style={{ color }}
                  >
                    {t("explore")}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
