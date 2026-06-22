"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Play, X, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { VideoThumb } from "./video-thumb";

type Video = {
  key: string;
  duration: string;
  img: string | null;
  /** Embed URL (YouTube/Vimeo) — plays in the modal when set, else the cover
   *  poster is shown. */
  videoUrl?: string | null;
};

const PER_PAGE = 6;

export function VideoLibrary({ videos }: { videos: Video[] }) {
  const t = useTranslations("videos");
  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState<Video | null>(null);

  const [featured, ...rest] = videos;
  const pageCount = Math.ceil(rest.length / PER_PAGE);
  const shown = rest.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  // Close on Esc + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Featured tutorial */}
      <Reveal>
        <button
          type="button"
          onClick={() => setOpen(featured)}
          className="group grid w-full cursor-pointer gap-6 text-start lg:grid-cols-[1.45fr_1fr] lg:gap-10"
        >
          <div className="aspect-video lg:aspect-auto lg:min-h-[21rem]">
            <VideoThumb large duration={featured.duration} src={featured.img} />
          </div>
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-surface/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-accent">
              {t("featuredTag")}
            </span>
            <span className="mt-5 label-eyebrow">{t("items.intro.category")}</span>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-[1.14] tracking-tight sm:text-3xl">
              {t("items.intro.title")}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t("items.intro.desc")}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
              <Play className="size-4" fill="currentColor" strokeWidth={0} />
              {t("watch")} · {featured.duration}
            </span>
          </div>
        </button>
      </Reveal>

      {/* Library grid */}
      <div className="mt-12 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {shown.map((v, i) => (
          <Reveal key={v.key} style={{ animationDelay: `${(i % 3) * 70}ms` }}>
            <button
              type="button"
              onClick={() => setOpen(v)}
              className="group block w-full cursor-pointer text-start"
            >
              <VideoThumb duration={v.duration} src={v.img} />
              <div className="mt-4">
                <span className="label-eyebrow">{t(`items.${v.key}.category`)}</span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                  {t(`items.${v.key}.title`)}
                </h3>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="mt-14 flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-current={i === page ? "page" : undefined}
              aria-label={`${i + 1}`}
              className={cn(
                "grid size-9 place-items-center rounded-full text-sm font-medium tabular-nums transition-colors",
                i === page
                  ? "bg-foreground text-background"
                  : "border border-border text-muted hover:border-foreground/40 hover:text-foreground"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* ── Modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={t(`items.${open.key}.title`)}
          >
            <div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setOpen(null)}
            />
            <motion.div
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_90px_-25px_rgba(0,0,0,0.45)]"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label={tNav("close")}
                className="absolute end-4 top-4 z-20 grid size-9 place-items-center rounded-full border border-border bg-surface/80 text-muted backdrop-blur transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <X className="size-4" />
              </button>

              <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
                {/* LEFT — tags / info */}
                <div className="order-2 flex flex-col gap-5 p-7 lg:order-1 lg:p-9">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-surface-2 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-accent">
                    {t(`items.${open.key}.category`)}
                  </span>
                  <h3 className="font-display text-2xl font-semibold leading-[1.16] tracking-tight">
                    {t(`items.${open.key}.title`)}
                  </h3>
                  {open.key === "intro" && (
                    <p className="text-sm leading-relaxed text-muted">
                      {t("items.intro.desc")}
                    </p>
                  )}

                  <div className="mt-auto space-y-5 pt-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted">
                        {t(`items.${open.key}.category`)}
                      </span>
                      <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted">
                        {t("label")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-2">
                      <span className="inline-flex items-center gap-1.5">
                        <Play className="size-3" fill="currentColor" strokeWidth={0} />
                        {open.duration}
                      </span>
                      <span className="h-3 w-px bg-border" />
                      <span>Corex360</span>
                    </div>
                    <Link
                      href="/app"
                      className="group inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
                    >
                      {tCta("primary")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>

                {/* RIGHT — video player (plays right here) */}
                <div className="order-1 lg:order-2">
                  <div className="relative aspect-video w-full overflow-hidden bg-foreground/[0.06]">
                    {open.videoUrl ? (
                      /\.(mp4|webm|ogg|mov|m4v)$/i.test(open.videoUrl) ? (
                        <video
                          key={open.key}
                          src={open.videoUrl}
                          poster={open.img ?? undefined}
                          controls
                          autoPlay
                          playsInline
                          className="absolute inset-0 h-full w-full bg-black object-contain"
                        />
                      ) : (
                        <iframe
                          src={open.videoUrl}
                          title={t(`items.${open.key}.title`)}
                          className="absolute inset-0 h-full w-full"
                          allow="autoplay; encrypted-media; fullscreen"
                          allowFullScreen
                        />
                      )
                    ) : (
                      open.img && (
                        <div
                          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${open.img})` }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
