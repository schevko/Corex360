import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";

/**
 * Full-bleed closing statement with a spinning-label circular button —
 * editorial CTA in the style of the sibling studio site.
 */
export async function CircleCta() {
  const t = await getTranslations("cta");

  return (
    <section className="relative overflow-hidden border-t border-border py-32 lg:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 start-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px] rtl:translate-x-1/2"
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <Reveal>
          <h2 className="font-display text-5xl font-light leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {t("circleTitle")}
            <br />
            <span className="text-accent">{t("circleAccent")}</span>
          </h2>
        </Reveal>

        <Reveal style={{ animationDelay: "120ms" }}>
          <Link
            href="/app"
            className="group relative mt-16 grid size-44 place-items-center rounded-full border border-foreground/25 text-center transition-all duration-500 hover:scale-105 hover:border-accent sm:size-52"
          >
            {/* Spinning label ring */}
            <svg
              viewBox="0 0 100 100"
              aria-hidden
              className="animate-spin-slow absolute inset-2"
            >
              <defs>
                <path
                  id="cta-ring"
                  d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
                />
              </defs>
              <text className="fill-[var(--color-muted-2)] text-[6.5px] uppercase tracking-[0.32em]">
                <textPath href="#cta-ring">
                  COREX360 ✦ 360° ✦ COREX360 ✦ 360° ✦
                </textPath>
              </text>
            </svg>
            <span className="flex flex-col items-center gap-2 px-6">
              <span className="text-[11px] uppercase tracking-[0.2em] text-foreground">
                {t("circleAction")}
              </span>
              <ArrowUpRight
                className="size-5 text-accent transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100"
                strokeWidth={1.5}
              />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
