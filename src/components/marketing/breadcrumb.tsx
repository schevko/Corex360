import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb trail for sub-pages — the deterministic "simple return".
 * The leading arrow links back to the parent (the last crumb that has an href),
 * regardless of how the visitor arrived. Pair with BreadcrumbList JSON-LD on
 * the page for GEO/SEO.
 */
export function Breadcrumb({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  const parent = [...items].reverse().find((c) => c.href);

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-3", className)}
    >
      {parent?.href && (
        <Link
          href={parent.href}
          aria-label={parent.label}
          className="group inline-flex size-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </Link>
      )}
      <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-2">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-2">
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {c.label}
                </Link>
              ) : (
                <span className={last ? "text-foreground/70" : undefined}>
                  {c.label}
                </span>
              )}
              {!last && (
                <span aria-hidden className="text-border-strong">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
