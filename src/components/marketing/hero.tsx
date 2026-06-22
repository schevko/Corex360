"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Magnetic } from "@/components/ui/magnetic";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** Ultra-minimal Apple-style typographic hero. No 3D, no clutter — just type,
 *  one faint warm glow and a calm scroll cue. */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-32 text-center">
      {/* one faint, static warm glow — calm, motionless */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] -z-10 h-[75vmin] w-[75vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[130px] dark:opacity-[0.12]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <div className="mx-auto max-w-3xl">
        {/* Eyebrow — the pillars, stated plainly */}
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/40 px-4 py-1.5 text-xs tracking-[0.18em] text-muted backdrop-blur"
        >
          <span className="relative flex size-1.5">
            <span className="pulse-ring absolute inset-0 text-accent" />
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          {t("eyebrow")}
        </motion.div>

        {/* Headline — Bir işletmeyi · 360° · yönetin. */}
        <h1 className="mt-9 font-display font-semibold leading-[0.96] tracking-tight text-[3rem] sm:text-7xl lg:text-[5.75rem]">
          <motion.span custom={1} variants={fade} initial="hidden" animate="show" className="block">
            {t("titlePre")}
          </motion.span>
          <motion.span
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="block py-1 text-aurora"
          >
            {t("titleAccent")}
          </motion.span>
          <motion.span custom={3} variants={fade} initial="hidden" animate="show" className="block">
            {t("titlePost")}
          </motion.span>
        </h1>

        {/* Body */}
        <motion.p
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {t("body")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={5}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <Link
              href="/app"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180" />
            </Link>
          </Magnetic>
          <Link
            href="/#preview"
            className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-4 text-sm text-foreground/85 transition-colors duration-300 hover:border-accent/60"
          >
            <Play className="size-3.5 text-accent" fill="currentColor" />
            {t("ctaSecondary")}
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-9 left-1/2 -translate-x-1/2"
      >
        <span className="relative flex h-12 w-px bg-border">
          <span className="scroll-dot absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-foreground/60" />
        </span>
      </div>
    </section>
  );
}
