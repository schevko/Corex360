import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/** Consistent section eyebrow + title + lede block. */
export function SectionHeading({
  label,
  title,
  body,
  align = "left",
  className,
}: {
  label: string;
  title: ReactNode;
  body?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className="rule-accent" />
        <span className="label-eyebrow">{label}</span>
      </div>
      <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.9rem]">
        {title}
      </h2>
      {body && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {body}
        </p>
      )}
    </Reveal>
  );
}
