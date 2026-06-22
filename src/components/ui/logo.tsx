import { cn } from "@/lib/utils";

/**
 * Corex360 official wordmark (from COREX360 LOGO.pdf). Two theme-tinted PNGs:
 * the bright/platinum version shows on the dark theme, the graphite version on
 * light — toggled purely via the `light:` CSS variant so it works in both
 * server and client components.
 */
export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  const h = size === "lg" ? "h-7" : "h-[22px]";
  return (
    <span className={cn("inline-flex select-none items-center", className)}>
      {/* light theme (default) */}
      <img
        src="/logo-light.png"
        alt="Corex360"
        className={cn(h, "block w-auto dark:hidden")}
        draggable={false}
      />
      {/* dark theme */}
      <img
        src="/logo-dark.png"
        alt="Corex360"
        className={cn(h, "hidden w-auto dark:block")}
        draggable={false}
      />
    </span>
  );
}
