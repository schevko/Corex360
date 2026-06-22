import { createElement } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal (fade + rise) implemented purely in CSS via
 * `animation-timeline: view()` — no JS, so it works inside server components and
 * ships zero client weight. Falls back to "always visible" when the browser
 * lacks scroll-timeline support or the user prefers reduced motion (globals.css).
 */
export function Reveal({
  children,
  className,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Optional stagger via animation-delay (e.g. `${i * 60}ms`). */
  style?: CSSProperties;
}) {
  return createElement(
    as,
    { className: cn("reveal", className), style },
    children
  );
}
