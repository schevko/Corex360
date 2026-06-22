"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const HERO_VIDEO_SRC = "/videos/corex360-hero.mp4";

export function HeroVideo() {
  const t = useTranslations("hero");

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      <div className="relative h-full w-full">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Corex360 platform preview"
        />

        {/* Bottom scrim — fades black up into the video so the explore button
            stays legible over bright frames. Mobile-only, matches the CTA. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-5 h-40 bg-linear-to-t from-black/70 via-black/30 to-transparent sm:hidden"
        />

        {/* Mobile-only "explore" affordance — nudges the page down by one
            viewport so the content below the full-bleed hero is discoverable. */}
        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          aria-label={t("explore")}
          className="group absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/25 bg-black/30 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors duration-300 hover:border-white/50 hover:bg-black/50 sm:hidden"
        >
          {t("explore")}
          <ChevronDown
            className="size-4 animate-bounce"
            strokeWidth={1.8}
            aria-hidden
          />
        </button>
      </div>
    </section>
  );
}
