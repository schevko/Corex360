import { cn } from "@/lib/utils";

/**
 * Image area that shows the picture when `src` is set, otherwise an elegant
 * labelled placeholder (no broken-image state). Drop a file in public/ and pass
 * its path to fill the slot.
 */
export function ImageSlot({
  src,
  label,
  className,
}: {
  src?: string | null;
  label?: string;
  className?: string;
}) {
  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-border bg-surface-2 bg-cover bg-center",
          className
        )}
        style={{ backgroundImage: `url(${src})` }}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-surface-2",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, color-mix(in srgb, var(--foreground) 5%, transparent) 0 1px, transparent 1px 22px)",
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span className="flex flex-col items-center gap-2 text-muted-2">
          <svg
            viewBox="0 0 24 24"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="9" r="1.6" />
            <path d="M21 16l-5-5L5 21" />
          </svg>
          {label && (
            <span className="text-[11px] uppercase tracking-[0.18em]">{label}</span>
          )}
        </span>
      </div>
    </div>
  );
}
