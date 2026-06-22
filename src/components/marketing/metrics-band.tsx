import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const KEYS = ["founded", "teams", "countries", "uptime"] as const;

export function MetricsBand() {
  const t = useTranslations("metrics");

  return (
    <section className="border-y border-border bg-surface/20">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <Reveal className="mb-12 flex items-center justify-center gap-3 text-center">
          <span className="rule-accent" />
          <span className="label-eyebrow">{t("title")}</span>
          <span className="rule-accent rotate-180" />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {KEYS.map((k, i) => (
            <Reveal
              key={k}
              style={{ animationDelay: `${i * 80}ms` }}
              className={cn(
                "px-4 py-6 text-center",
                i % 2 === 1 && "border-s border-border", // mobile divider
                i > 0 && "lg:border-s lg:border-border" // desktop dividers
              )}
            >
              <p className="text-aurora font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                {t(`items.${k}.value`)}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
                {t(`items.${k}.label`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
