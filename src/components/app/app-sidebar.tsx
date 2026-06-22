"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  BarChart3,
  Zap,
  Settings,
  ArrowLeft,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";

const NAV: { key: string; icon: LucideIcon; active?: boolean }[] = [
  { key: "overview", icon: LayoutDashboard, active: true },
  { key: "customers", icon: Users },
  { key: "sales", icon: ShoppingCart },
  { key: "inventory", icon: Package },
  { key: "analytics", icon: BarChart3 },
  { key: "automation", icon: Zap },
  { key: "settings", icon: Settings },
];

export function AppSidebar() {
  const t = useTranslations("app");
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/app">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="grid size-9 place-items-center rounded-lg border border-border"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-40 flex w-64 flex-col border-e border-border bg-surface/40 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        )}
      >
        <div className="px-6 py-6">
          <Link href="/app" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map(({ key, icon: Icon, active }) => (
            <Link
              key={key}
              href="/app"
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200",
                active
                  ? "bg-surface-2 text-foreground"
                  : "text-muted hover:bg-surface/60 hover:text-foreground"
              )}
            >
              <Icon
                className={cn("size-[18px]", active && "text-accent")}
                strokeWidth={1.7}
              />
              {t(`nav.${key}`)}
              {active && (
                <span className="ms-auto h-1.5 w-1.5 rounded-full bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        <div className="space-y-3 border-t border-border px-3 py-4">
          <div className="flex items-center justify-between px-3">
            <span className="text-xs text-muted-2">Corex360</span>
            <ThemeToggle />
          </div>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface/60 hover:text-foreground"
          >
            <ArrowLeft className="size-[18px] rtl:rotate-180" strokeWidth={1.7} />
            {t("backToSite")}
          </Link>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
