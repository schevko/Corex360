"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    // module routes all map to the "modules" item
    if (href.startsWith("/modules")) return pathname.startsWith("/modules");
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav>
      <ul className="border-t border-border">
        {navItems.map(({ href, key }, i) => {
          const active = isActive(href);
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex items-center justify-between py-4",
                  i < navItems.length - 1 && "border-b border-border"
                )}
              >
                <span
                  className={cn(
                    "absolute -start-0.5 top-1/2 h-5 w-0.5 -translate-y-1/2 bg-gradient-to-b from-accent to-accent-2 transition-all duration-500",
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                  )}
                  aria-hidden
                />
                <span className="flex items-baseline gap-4 ps-4">
                  <span
                    className={cn(
                      "tabular text-[10px] tracking-[0.3em] transition-colors duration-300",
                      active ? "text-accent" : "text-muted-2"
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-[17px] font-normal tracking-[0.04em] transition-all duration-500",
                      active
                        ? "text-foreground"
                        : "text-muted group-hover:translate-x-1 group-hover:text-foreground rtl:group-hover:-translate-x-1"
                    )}
                  >
                    {t(key)}
                  </span>
                </span>
                <ArrowUpRight
                  className={cn(
                    "size-4 transition-all duration-300 rtl:-scale-x-100",
                    active
                      ? "text-accent"
                      : "-translate-x-1 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  )}
                  strokeWidth={1.5}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
