import { useTranslations } from "next-intl";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { moduleIds, moduleMeta } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { ModuleVisual } from "./module-visuals";
import { cn } from "@/lib/utils";

/** Editorial alternating feature rows — one per module, with a bespoke visual. */
export function ModuleShowcase() {
  const t = useTranslations("modules");

  return (
    <section id="modules" className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <div className="space-y-24 lg:space-y-32">
        {moduleIds.map((id, i) => {
          const meta = moduleMeta[id];
          const points = t.raw(`items.${id}.points`) as string[];
          const reversed = i % 2 === 1;

          return (
            <div
              key={id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Text */}
              <Reveal className={cn(reversed && "lg:order-2")}>
                <div className="flex items-baseline gap-4">
                  <span className="tabular text-xs tracking-[0.3em] text-accent">
                    0{i + 1}
                  </span>
                  <span className="label-eyebrow">{t(`items.${id}.tagline`)}</span>
                </div>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  {t(`items.${id}.name`)}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                  {t(`items.${id}.description`)}
                </p>
                <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={meta.href}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm transition-colors duration-300 hover:border-accent/60"
                >
                  {t("explore")} — {t(`items.${id}.name`)}
                  <ArrowUpRight className="size-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>

              {/* Visual */}
              <Reveal
                className={cn(reversed && "lg:order-1")}
                style={{ animationDelay: "80ms" }}
              >
                <ModuleVisual id={id} />
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
