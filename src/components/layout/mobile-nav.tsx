"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { SidebarContent } from "./sidebar-content";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Smart reveal: hide on scroll-down, slide back on scroll-up.
  useEffect(() => {
    if (open) return;
    let lastY = window.scrollY;
    const THRESHOLD = 10;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 72) setHidden(false);
      else if (y - lastY > THRESHOLD) setHidden(true);
      else if (lastY - y > THRESHOLD) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, pathname]);

  return (
    <>
      {/* Fixed (not sticky) so it floats over the full-bleed hero instead of
          pushing it down — otherwise topbar + 100svh hero overflows the screen
          and the hero's bottom CTA is hidden on first paint. */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md transition-transform duration-300 ease-out will-change-transform lg:hidden",
          hidden && "-translate-y-full"
        )}
      >
        <Link href="/" aria-label="Corex360">
          <Logo />
        </Link>
        <button
          type="button"
          aria-label={t("menu")}
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="grid size-10 place-items-center rounded-full border border-border text-foreground"
        >
          <Menu className="size-5" strokeWidth={1.5} />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <div className="lg:hidden">
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 end-0 z-50 w-[min(22rem,86vw)] overflow-y-auto border-s border-border bg-background"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                aria-label={t("close")}
                onClick={() => setOpen(false)}
                className="absolute end-5 top-7 z-10 grid size-9 place-items-center rounded-full border border-border text-foreground"
              >
                <X className="size-4" strokeWidth={1.5} />
              </button>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
