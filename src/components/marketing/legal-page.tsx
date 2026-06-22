import { Reveal } from "@/components/ui/reveal";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";

/** A single legal section: heading + an ordered list of paragraphs.
 *  A paragraph beginning with "• " renders as a bullet item. */
export type LegalSection = {
  heading: string;
  body: string[];
};

/**
 * Shared editorial layout for long-form legal pages (Privacy, Terms).
 * Numbered sections, generous reading measure, anchored headings so the
 * table of contents on the side can deep-link. Matches the "Obsidian Aurora"
 * type system used across the marketing surface.
 */
export function LegalPage({
  label,
  title,
  updatedLabel,
  updated,
  intro,
  sections,
}: {
  label: string;
  title: string;
  updatedLabel: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  const slug = (i: number) => `madde-${i + 1}`;

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-12 lg:pt-44 lg:pb-16">
        <AuroraBackground className="-z-10 opacity-40" />
        <GridBackdrop className="-z-10" />
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="label-eyebrow">{label}</span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs text-muted-2 backdrop-blur-sm">
              {updatedLabel}: <span className="text-foreground/80">{updated}</span>
            </p>
            <p className="mt-7 text-base leading-relaxed text-muted">{intro}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Body — TOC + sections ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-28 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
          {/* Sticky table of contents (desktop) */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28">
              <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted-2">
                {label}
              </p>
              <ol className="space-y-2.5 border-s border-border">
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#${slug(i)}`}
                      className="-ms-px flex gap-2.5 border-s border-transparent ps-4 text-sm leading-snug text-muted transition-colors duration-300 hover:border-accent hover:text-foreground"
                    >
                      <span className="tabular text-xs text-muted-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Sections */}
          <div className="min-w-0 max-w-2xl">
            <ol className="space-y-12">
              {sections.map((s, i) => (
                <li key={s.heading} id={slug(i)} className="scroll-mt-28">
                  <Reveal>
                  <h2 className="flex items-baseline gap-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    <span className="tabular text-sm font-normal text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </h2>
                  <div className="mt-4 space-y-3.5">
                    {s.body.map((p, j) =>
                      p.startsWith("• ") ? (
                        <p
                          key={j}
                          className="relative ps-5 text-[15px] leading-relaxed text-muted before:absolute before:inset-s-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-accent/60"
                        >
                          {p.slice(2)}
                        </p>
                      ) : (
                        <p key={j} className="text-[15px] leading-relaxed text-muted">
                          {p}
                        </p>
                      )
                    )}
                  </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
