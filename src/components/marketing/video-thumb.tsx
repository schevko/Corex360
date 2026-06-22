import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/** Video poster — the designed cover image when `src` is set (already includes
 *  its own play button & duration, so just placed, not enlarged), otherwise a
 *  monochrome placeholder with a play button + duration overlay. */
export function VideoThumb({
  duration,
  src,
  large,
}: {
  duration: string;
  src?: string | null;
  large?: boolean;
}) {
  if (src) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface-2">
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${src})` }}
        />
      </div>
    );
  }

  return (
    <div className="group/v relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 120% at 50% 0%, color-mix(in srgb, var(--foreground) 7%, transparent), transparent 58%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, color-mix(in srgb, var(--foreground) 4%, transparent) 0 1px, transparent 1px 20px)",
        }}
      />
      <span className="absolute inset-0 grid place-items-center">
        <span
          className={cn(
            "grid place-items-center rounded-full border border-border bg-surface/90 text-accent backdrop-blur transition-all duration-500 group-hover/v:scale-110 group-hover/v:border-accent/50 group-hover/v:shadow-[0_0_34px_-6px_var(--glow)]",
            large ? "size-20" : "size-14"
          )}
        >
          <Play
            className={cn("translate-x-px", large ? "size-7" : "size-5")}
            fill="currentColor"
            strokeWidth={0}
          />
        </span>
      </span>
      <span className="absolute bottom-3 end-3 rounded-md bg-foreground/85 px-2 py-0.5 text-xs font-medium text-background">
        {duration}
      </span>
    </div>
  );
}
