"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pricingKeys } from "@/lib/site";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const t = useTranslations("pricing");
  const [yearly, setYearly] = useState(false);

  const price = (monthly: number | null) => {
    if (monthly === null) return t("custom");
    if (monthly === 0) return "₺0";
    const v = yearly ? Math.round(monthly * 10) : monthly;
    return `₺${v}`;
  };

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <SectionHeading label={t("label")} title={t("title")} body={t("body")} align="center" />

      {/* Billing toggle */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <span className={cn("text-sm", !yearly ? "text-foreground" : "text-muted")}>
          {t("monthly")}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          onClick={() => setYearly((v) => !v)}
          className="relative h-7 w-12 rounded-full border border-border bg-surface-2 transition-colors"
        >
          <span
            className={cn(
              "absolute top-1 size-5 rounded-full bg-gradient-to-br from-accent to-accent-2 transition-all duration-300",
              yearly ? "start-6" : "start-1"
            )}
          />
        </button>
        <span className={cn("text-sm", yearly ? "text-foreground" : "text-muted")}>
          {t("yearly")}
        </span>
        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
          {t("yearlyNote")}
        </span>
      </div>

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {pricingKeys.map((tier, i) => {
          const features = t.raw(`tiers.${tier.key}.features`) as string[];
          const featured = tier.featured;

          return (
            <Reveal key={tier.key} style={{ animationDelay: `${i * 80}ms` }} className="h-full">
              <TiltCard
                max={featured ? 7 : 4}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-3xl border p-8",
                  featured
                    ? "border-gradient bg-surface/60 shadow-[var(--shadow-glow)]"
                    : "border-border bg-surface/30"
                )}
              >
                {featured && (
                  <span className="absolute end-6 top-6 rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1 text-[11px] font-medium text-on-accent">
                    {t("mostPopular")}
                  </span>
                )}

                <div className="tilt-layer flex h-full flex-col">
                  <h3 className="font-display text-xl font-normal">
                    {t(`tiers.${tier.key}.name`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{t(`tiers.${tier.key}.desc`)}</p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="tabular font-display text-4xl font-semibold">
                      {price(tier.priceMonthly)}
                    </span>
                    {tier.priceMonthly !== null && tier.priceMonthly > 0 && (
                      <span className="text-sm text-muted-2">/ {t("perUserMonth")}</span>
                    )}
                  </div>

                  <Link
                    href="/app"
                    className={cn(
                      "group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300",
                      featured
                        ? "bg-foreground text-background hover:shadow-[var(--shadow-glow)]"
                        : "border border-border-strong text-foreground hover:border-accent/60"
                    )}
                  >
                    {t(`tiers.${tier.key}.cta`)}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                  </Link>

                  <ul className="mt-8 space-y-3 border-t border-border pt-6">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
