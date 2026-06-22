import { Play, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** A monochrome "tutorial player" mockup for the learning section — a video
 *  panel with a progress bar above a short lesson playlist. Pure markup, no
 *  asset needed; swap for a real <ImageSlot src> if a photo arrives. */
const LESSONS = [
  { done: false, active: true, w: "w-3/4", t: "3:48" },
  { done: true, active: false, w: "w-2/3", t: "5:12" },
  { done: true, active: false, w: "w-1/2", t: "6:30" },
] as const;

export function LearnIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-surface-2 p-5 sm:p-6",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-14 size-44 rounded-full bg-accent/10 blur-[80px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, color-mix(in srgb, var(--foreground) 4%, transparent) 0 1px, transparent 1px 22px)",
        }}
      />

      <div className="relative flex h-full flex-col gap-4">
        {/* video player */}
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-surface">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(110% 110% at 50% 0%, color-mix(in srgb, var(--foreground) 6%, transparent), transparent 60%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
            <span className="rounded-full border border-border bg-surface/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted backdrop-blur">
              Corex360 · Ders 01
            </span>
            <span className="rounded-md bg-foreground/85 px-2 py-0.5 text-[10px] font-medium text-background">
              3:48
            </span>
          </div>

          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full border border-border bg-surface/90 text-accent shadow-[0_0_30px_-6px_var(--glow)]">
              <Play className="size-6 translate-x-px" fill="currentColor" strokeWidth={0} />
            </span>
          </span>

          <div className="absolute inset-x-3 bottom-3">
            <div className="relative h-1 rounded-full bg-border">
              <div className="absolute inset-y-0 start-0 w-2/5 rounded-full bg-accent" />
              <span className="absolute -top-1 start-[40%] size-3 -translate-x-1/2 rounded-full border border-accent bg-surface rtl:translate-x-1/2" />
            </div>
          </div>
        </div>

        {/* lesson playlist */}
        <div className="space-y-2">
          {LESSONS.map((l, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                l.active ? "border-accent/40 bg-surface" : "border-border bg-surface/40"
              )}
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full border",
                  l.active
                    ? "border-accent/50 text-accent"
                    : "border-border text-muted-2"
                )}
              >
                {l.done ? (
                  <Check className="size-3" strokeWidth={2.2} />
                ) : (
                  <Play className="size-3 translate-x-px" fill="currentColor" strokeWidth={0} />
                )}
              </span>
              <span
                className={cn(
                  "h-2 rounded-full",
                  l.active ? "bg-foreground/25" : "bg-border",
                  l.w
                )}
              />
              <span className="ms-auto text-[10px] tabular-nums text-muted-2">
                {l.t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
