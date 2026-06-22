"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import {
  UsersRound,
  Building2,
  Contact,
  ListChecks,
  FileText,
  Car,
  MapPin,
  Sparkles,
  MessageSquare,
  MessageSquareText,
  Globe,
  Newspaper,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  UsersRound,
  Building2,
  Contact,
  ListChecks,
  FileText,
  Car,
  MapPin,
  Sparkles,
  MessageSquare,
  MessageSquareText,
  Globe,
  Newspaper,
};

type Item = { key: string; icon: string; img?: string; href?: string };
type Category = { cat: string; items: Item[] };

/** Category-tabbed module catalogue. Only the active category renders, so the
 *  page stays short and only its card images load (natural lazy-loading). */
export function ModuleTabs({ catalog }: { catalog: Category[] }) {
  const t = useTranslations("modulesPage");
  const [active, setActive] = useState(0);
  const items = catalog[active]?.items ?? [];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {catalog.map((c, i) => (
          <button
            key={c.cat}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
              i === active
                ? "bg-foreground text-background"
                : "border border-border text-muted hover:border-foreground/40 hover:text-foreground"
            )}
          >
            {t(`categories.${c.cat}`)}
          </button>
        ))}
      </div>

      {/* Active category grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:gap-6"
        >
          {items.map(({ key, icon, img, href }) => {
            const Icon = ICONS[icon];
            return img ? (
              <Link
                key={key}
                href={href ?? "/contact"}
                aria-label={t(`items.${key}.title`)}
                className="group block overflow-hidden rounded-[1.75rem] transition-transform duration-500 hover:-translate-y-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${t(`items.${key}.title`)} — ${t(`items.${key}.desc`)}`}
                  loading="lazy"
                  className="w-full select-none"
                  draggable={false}
                />
              </Link>
            ) : (
              <Link
                key={key}
                href={href ?? "/contact"}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface/40 p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-surface hover:shadow-[var(--shadow-soft)] lg:p-10"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-24 size-52 rounded-full bg-accent/[0.07] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl border border-border bg-surface-2 text-accent transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-accent/50 group-hover:shadow-[0_0_30px_-6px_var(--glow)]">
                    {Icon && <Icon className="size-6" strokeWidth={1.5} />}
                  </span>
                  <ArrowUpRight className="size-5 text-muted-2 transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground rtl:-scale-x-100" />
                </div>
                <h3 className="relative mt-7 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="relative mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                  {t(`items.${key}.desc`)}
                </p>
              </Link>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
