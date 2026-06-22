import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

const KEYS = ["founded", "teams", "countries", "uptime"] as const;

/** Board motto + stats — soft, harmonious band (same palette, gentle fades). */
export function QuoteMetrics() {
  const t = useTranslations("metrics");
  const q = useTranslations("quote");

  return (
    <section className="border-y border-border bg-surface-2 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="flex items-center gap-2.5 text-xs uppercase tracking-[0.22em] text-muted-2">
            <span className="size-1.5 rounded-full bg-muted-2" />
            {q("source")}
          </p>
          <p className="mt-7 max-w-3xl font-display text-3xl font-semibold leading-[1.16] tracking-tight sm:text-4xl lg:text-[3rem]">
            {q("text")}
          </p>
        </Reveal>

        <Reveal
          style={{ animationDelay: "80ms" }}
          className="mt-14 flex flex-wrap items-baseline gap-x-12 gap-y-5 border-t border-border pt-10"
        >
          {KEYS.map((k) => (
            <span key={k} className="flex items-baseline gap-2.5">
              <span className="tabular text-2xl font-semibold sm:text-3xl">
                {t(`items.${k}.value`)}
              </span>
              <span className="text-sm text-muted">{t(`items.${k}.label`)}</span>
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
