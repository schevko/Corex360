import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";
import { cn } from "@/lib/utils";

/**
 * Shared atmosphere hero for the editorial marketing pages (About / Solutions /
 * Resources). Renders the 3-layer photo-atmosphere stack — light-theme photo,
 * page-colour cloud, centred scrim — with the dark-theme ambient texture, the
 * centred serif-italic title and the bottom scroll cue.
 *
 * Title parts and the lead are passed pre-translated so this stays a pure
 * presentational unit and the page keeps ownership of its namespace.
 */
export function EditorialHero({
  photoSrc,
  eyebrow,
  titlePre,
  titleEm,
  lead,
  scrollCue,
  eyebrowVariant = "label",
  minH = "min-h-[88svh]",
  paddingBottom = "pb-24",
  ambient = true,
}: {
  /** Light-theme background photo, e.g. "/team/solutions-hero.png". */
  photoSrc: string;
  eyebrow: string;
  titlePre: string;
  titleEm: string;
  lead: string;
  scrollCue: string;
  /** "label" = label-eyebrow utility; "muted" = the About-style muted label. */
  eyebrowVariant?: "label" | "muted";
  /** Hero min-height utility (Solutions/Resources use 88svh, About 90svh). */
  minH?: string;
  /** Bottom padding utility (Solutions/Resources pb-24, About pb-20). */
  paddingBottom?: string;
  /** Render the dark-theme aurora + grid texture (About omits it). */
  ambient?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden px-6 pt-32",
        minH,
        paddingBottom
      )}
    >
      {/* Hero background photo (light theme) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center dark:hidden"
        style={{ backgroundImage: `url(${photoSrc})` }}
      />
      {/* Atmosphere — soft cloud of page colour drifting in from the edges &
          bottom, so the photo melts into the page */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 dark:hidden"
        style={{
          background: [
            "radial-gradient(115% 85% at 50% 42%, transparent 42%, color-mix(in srgb, var(--background) 70%, transparent) 72%, var(--background) 100%)",
            "linear-gradient(to bottom, transparent 58%, color-mix(in srgb, var(--background) 82%, transparent) 86%, var(--background) 100%)",
          ].join(", "),
        }}
      />
      {/* Scrim — keeps the centered title crisp over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(54% 48% at 50% 48%, color-mix(in srgb, var(--background) 64%, transparent) 30%, transparent 100%)",
        }}
      />
      {/* Dark theme has no photo — keep the ambient texture there */}
      {ambient && (
        <>
          <AuroraBackground className="-z-10 hidden opacity-50 dark:block" />
          <GridBackdrop className="-z-10 hidden dark:block" />
        </>
      )}

      <div className="relative max-w-3xl text-center">
        <span
          className={
            eyebrowVariant === "muted"
              ? "text-sm font-medium text-muted"
              : "label-eyebrow"
          }
        >
          {eyebrow}
        </span>
        <h1 className="mt-6 font-display text-[2.8rem] font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="block">{titlePre}</span>
          <span className="block font-serif font-normal italic text-foreground">
            {titleEm}
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {lead}
        </p>
      </div>

      <div
        aria-hidden
        className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="h-12 w-px bg-border" />
        <span className="text-[11px] uppercase tracking-[0.28em] text-muted-2">
          {scrollCue}
        </span>
      </div>
    </section>
  );
}
