import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { moduleIds, moduleMeta } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** "What Corex360 is" — three open columns, Apple-minimal: no boxes, hairline
 *  dividers, generous space, refined bronze icon, two-tone display heading. */
export function IntroPillars() {
  const t = useTranslations("modules");

  // Split the title at the comma so the second clause renders as bronze sheen.
  const seg = t("title").split(/([,،])/);

  return (
    <section className="mx-auto max-w-6xl px-6 py-28 lg:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="rule-accent" />
          <span className="label-eyebrow">{t("label")}</span>
          <span className="rule-accent rotate-180" />
        </div>
        <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.6rem]">
          {seg[0]}
          {seg[1]}
          <span className="text-aurora">{seg.slice(2).join("")}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
          {t("body")}
        </p>
      </Reveal>

      <div className="mt-20 grid gap-y-16 lg:mt-24 lg:grid-cols-3 lg:gap-y-0">
        {moduleIds.map((id, i) => {
          const meta = moduleMeta[id];
          return (
            <Reveal
              key={id}
              style={{ animationDelay: `${i * 90}ms` }}
              className={cn(
                "group relative lg:px-12",
                i > 0 && "lg:border-s lg:border-border"
              )}
            >
              <span className="inline-grid size-12 place-items-center rounded-2xl bg-surface text-accent ring-1 ring-border transition-all duration-500 group-hover:-translate-y-0.5 group-hover:ring-accent/40">
                <Icon name={meta.icon as IconName} className="size-[22px]" strokeWidth={1.5} />
              </span>

              <h3 className="mt-7 font-display text-2xl font-normal tracking-tight">
                {t(`items.${id}.name`)}
              </h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted-2">
                {t(`items.${id}.tagline`)}
              </p>
              <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted">
                {t(`items.${id}.description`)}
              </p>

              <Link
                href={meta.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors duration-300 group-hover:text-accent"
              >
                {t("explore")}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
