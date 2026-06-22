import { Play } from "lucide-react";

/**
 * Representative testimonial-video poster — a stylised studio interview scene
 * (host + customer silhouettes, Corex360 backdrop, studio lighting) in the
 * monochrome Aurora style. A tasteful placeholder until real video thumbnails
 * are dropped in; swap the whole component for an <img> poster when they exist.
 */
export function StudioPoster({
  duration,
  tag,
  src,
}: {
  duration: string;
  tag: string;
  /** Real poster image (already includes the studio scene, brand & play
   *  button). When set, it replaces the stylised fallback below. */
  src?: string;
}) {
  if (src) {
    return (
      <div className="group/v relative aspect-video w-full overflow-hidden rounded-3xl border border-border bg-surface-2">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/v:scale-[1.04]"
          style={{ backgroundImage: `url(${src})` }}
        />
      </div>
    );
  }

  return (
    <div className="group/v relative aspect-video w-full overflow-hidden rounded-3xl border border-border bg-surface-3">
      {/* studio backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--surface-2) 0%, var(--surface-3) 100%)",
        }}
      />
      {/* two soft studio spotlights */}
      <div
        aria-hidden
        className="absolute -top-6 left-[31%] h-2/3 w-2/5 -translate-x-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--foreground) 9%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-6 left-[69%] h-2/3 w-2/5 -translate-x-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--foreground) 9%, transparent), transparent 70%)",
        }}
      />
      {/* brand wordmark fixed on the backdrop */}
      <span
        aria-hidden
        className="absolute left-1/2 top-[13%] -translate-x-1/2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-foreground/[0.16]"
      >
        Corex360
      </span>

      {/* host + customer silhouettes */}
      <svg
        viewBox="0 0 320 180"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 h-full w-full text-foreground/[0.17]"
        aria-hidden
      >
        <line
          x1="44"
          y1="170"
          x2="276"
          y2="170"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.55"
        />
        <g fill="currentColor">
          {/* host */}
          <circle cx="113" cy="88" r="15" />
          <path d="M89 180 C89 135 95 120 113 120 C131 120 137 135 137 180 Z" />
          {/* customer */}
          <circle cx="207" cy="88" r="15" />
          <path d="M183 180 C183 135 189 120 207 120 C225 120 231 135 231 180 Z" />
        </g>
      </svg>

      {/* tag */}
      <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted backdrop-blur">
        <span className="size-1.5 rounded-full bg-accent" />
        {tag}
      </span>

      {/* play */}
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-16 place-items-center rounded-full border border-border bg-surface/90 text-accent backdrop-blur transition-all duration-500 group-hover/v:scale-110 group-hover/v:border-accent/50 group-hover/v:shadow-[0_0_36px_-6px_var(--glow)] sm:size-20">
          <Play className="size-6 translate-x-px sm:size-7" fill="currentColor" strokeWidth={0} />
        </span>
      </span>

      {/* duration */}
      <span className="absolute bottom-4 end-4 inline-flex items-center gap-1.5 rounded-md bg-foreground/85 px-2.5 py-1 text-xs font-medium text-background">
        <Play className="size-3" fill="currentColor" strokeWidth={0} />
        {duration}
      </span>
    </div>
  );
}
