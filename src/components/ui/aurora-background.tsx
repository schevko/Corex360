import { cn } from "@/lib/utils";

/**
 * Ambient aurora mesh — three blurred gradient orbs drifting behind content.
 * Pure CSS (no JS), GPU-cheap, and disabled under reduced-motion via globals.css.
 * Render it once near the top of a section with `absolute inset-0 -z-10`.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="animate-aurora absolute -left-[10%] top-[-20%] h-[55vmax] w-[55vmax] rounded-full opacity-[0.16] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, var(--accent), transparent 62%)",
        }}
      />
      <div
        className="animate-aurora absolute right-[-15%] top-[6%] h-[48vmax] w-[48vmax] rounded-full opacity-[0.12] blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at center, var(--accent-2), transparent 60%)",
          animationDelay: "-9s",
          animationDuration: "32s",
        }}
      />
      <div
        className="animate-aurora absolute bottom-[-25%] left-[20%] h-[46vmax] w-[46vmax] rounded-full opacity-[0.1] blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at center, var(--accent-3), transparent 60%)",
          animationDelay: "-16s",
          animationDuration: "38s",
        }}
      />
    </div>
  );
}

/** Subtle dotted grid backdrop — the "data canvas" texture. */
export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]",
        className
      )}
      style={{
        backgroundImage:
          "radial-gradient(color-mix(in srgb, var(--foreground) 14%, transparent) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    />
  );
}
