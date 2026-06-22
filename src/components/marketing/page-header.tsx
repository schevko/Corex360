import type { ReactNode } from "react";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";

/** Shared hero header for marketing sub-pages (clears the fixed navbar). */
export function PageHeader({
  label,
  title,
  body,
  children,
}: {
  label: string;
  title: ReactNode;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-6 pt-36 pb-16 lg:pt-44 lg:pb-20">
      <AuroraBackground className="-z-10 opacity-50" />
      <GridBackdrop className="-z-10" />
      <div className="mx-auto max-w-3xl text-center">
        <span className="label-eyebrow">{label}</span>
        <h1 className="mx-auto mt-5 max-w-2xl whitespace-pre-line font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {body && <p className="mx-auto mt-5 max-w-xl text-base text-muted">{body}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
