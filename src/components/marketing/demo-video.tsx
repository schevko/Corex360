"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";

/** Module demo player — a poster that opens a modal video. Pass `videoUrl`
 *  (YouTube/Vimeo embed or .mp4) when ready; until then the poster + play
 *  affordance stand in. */
export function DemoVideo({
  poster,
  duration,
  videoUrl,
  closeLabel = "Kapat",
  title,
}: {
  poster?: string | null;
  duration?: string;
  videoUrl?: string | null;
  closeLabel?: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isFile = videoUrl && /\.(mp4|webm|ogg|mov|m4v)$/i.test(videoUrl);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={title}
        className="group relative block aspect-video w-full overflow-hidden rounded-3xl border border-border bg-surface-2"
      >
        {poster ? (
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ backgroundImage: `url(${poster})` }}
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 120% at 50% 0%, color-mix(in srgb, var(--foreground) 7%, transparent), transparent 58%)",
            }}
          />
        )}
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-20 place-items-center rounded-full border border-border bg-surface/90 text-accent shadow-[0_0_40px_-8px_var(--glow)] backdrop-blur transition-all duration-500 group-hover:scale-110 group-hover:border-accent/50">
            <Play className="size-7 translate-x-px" fill="currentColor" strokeWidth={0} />
          </span>
        </span>
        {duration && (
          <span className="absolute bottom-4 end-4 rounded-md bg-foreground/85 px-2.5 py-1 text-xs font-medium text-background">
            {duration}
          </span>
        )}
      </button>

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
            aria-label={title}
          >
            <div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_90px_-25px_rgba(0,0,0,0.45)]"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={closeLabel}
                className="absolute end-4 top-4 z-20 grid size-9 place-items-center rounded-full border border-border bg-surface/80 text-muted backdrop-blur transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <X className="size-4" />
              </button>
              <div className="relative aspect-video w-full overflow-hidden bg-foreground/[0.06]">
                {videoUrl ? (
                  isFile ? (
                    <video
                      src={videoUrl}
                      poster={poster ?? undefined}
                      controls
                      autoPlay
                      playsInline
                      className="absolute inset-0 h-full w-full bg-black object-contain"
                    />
                  ) : (
                    <iframe
                      src={videoUrl}
                      title={title}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                    />
                  )
                ) : (
                  poster && (
                    <div
                      className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${poster})` }}
                    />
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
