"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/modules/crm", key: "modules" },
  { href: "/pricing", key: "pricing" },
  { href: "/resources", key: "resources" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-3 sm:pt-4">
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5",
          scrolled
            ? "glass shadow-[var(--shadow-soft)]"
            : "border border-transparent"
        )}
      >
        <Link href="/" aria-label="Corex360" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-foreground/75 transition-colors duration-200 hover:bg-surface/60 hover:text-foreground"
            >
              {t(l.key)}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <ThemeToggle />
          <LocaleSwitcher />
          <Link
            href="/app"
            className="text-sm text-foreground/75 transition-colors hover:text-foreground"
          >
            {t("signin")}
          </Link>
          <Magnetic>
            <Link
              href="/app"
              className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
            >
              {t("launchApp")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180" />
            </Link>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t("close") : t("menu")}
          className="grid size-10 place-items-center rounded-xl border border-border bg-surface/50 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass fixed inset-x-4 top-20 z-[60] rounded-2xl p-4 lg:hidden"
          >
            <div className="flex flex-col">
              {LINKS.map((l) => (
                <Link
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base text-foreground/85 transition-colors hover:bg-surface-2"
                >
                  {t(l.key)}
                </Link>
              ))}
              <div className="my-3 h-px bg-border" />
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LocaleSwitcher />
                </div>
              </div>
              <Link
                href="/app"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-sm font-medium text-background"
              >
                {t("launchApp")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
