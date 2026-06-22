"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/site";
import { cn } from "@/lib/utils";

const INTERVAL = 6000;

/** Full-width hero image carousel — the designed product slides, edge to edge.
 *  CSS crossfade (active slide is visible in SSR, no JS needed → never blank).
 *  Auto-advances, pauses on hover, respects reduced-motion. */
export function HeroSlider() {
  const t = useTranslations("slider");
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = heroSlides.length;

  const to = useCallback((idx: number) => setI(((idx % n) + n) % n), [n]);
  const go = useCallback((d: number) => setI((p) => ((p + d) % n + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((p) => (p + 1) % n), INTERVAL);
    return () => clearInterval(id);
  }, [paused, n]);

  return (
    <section
      className="relative w-full overflow-hidden bg-surface-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[1672/941] w-full">
        {heroSlides.map((s, idx) => (
          <img
            key={s.key}
            src={s.src}
            alt={t(`items.${s.key}.alt`)}
            width={1672}
            height={941}
            draggable={false}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : undefined}
            className={cn(
              "absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-700 ease-out",
              idx === i ? "opacity-100" : "opacity-0",
            )}
          />
        ))}

        {/* Prev / next */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute start-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--glass-border)] bg-[var(--glass-bg)] text-foreground/80 backdrop-blur-md transition-colors hover:text-foreground sm:size-11 lg:start-5"
        >
          <ChevronLeft className="size-5 rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute end-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--glass-border)] bg-[var(--glass-bg)] text-foreground/80 backdrop-blur-md transition-colors hover:text-foreground sm:size-11 lg:end-5"
        >
          <ChevronRight className="size-5 rtl:rotate-180" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
          {heroSlides.map((s, idx) => (
            <button
              key={s.key}
              type="button"
              onClick={() => to(idx)}
              aria-label={t(`items.${s.key}.alt`)}
              aria-current={idx === i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                idx === i ? "w-8 bg-foreground" : "w-1.5 bg-foreground/35 hover:bg-foreground/60",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
