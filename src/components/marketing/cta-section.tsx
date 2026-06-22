import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <Reveal className="relative overflow-hidden rounded-[2rem] border border-border bg-surface/30 px-6 py-20 text-center sm:px-12">
        <AuroraBackground className="-z-10 opacity-60" />
        <GridBackdrop className="-z-10" />

        <span className="label-eyebrow">{t("label")}</span>
        <h2 className="mx-auto mt-5 max-w-2xl whitespace-pre-line font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base text-muted">{t("body")}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Link
              href="/app"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
            >
              {t("primary")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </Link>
          </Magnetic>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-4 text-sm text-foreground/85 transition-colors hover:border-accent/60"
          >
            {t("secondary")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
