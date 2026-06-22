import { useTranslations } from "next-intl";
import { featureKeys } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <AuroraBackground className="-z-10 opacity-40" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label={t("label")}
          title={t("title")}
          body={t("body")}
          align="center"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((f, i) => (
            <Reveal
              key={f.key}
              className="group relative flex flex-col bg-background p-8 transition-colors duration-500 hover:bg-surface lg:p-10"
              style={{ animationDelay: `${(i % 3) * 70}ms` }}
            >
              {/* top brass accent line on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-border bg-surface-2 text-accent transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-accent/50 group-hover:shadow-[0_0_28px_-6px_var(--glow)]">
                  <Icon name={f.icon as IconName} className="size-5" strokeWidth={1.5} />
                </span>
                <span className="tabular text-xs tracking-[0.25em] text-muted-2">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-normal">
                {t(`items.${f.key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(`items.${f.key}.description`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
