"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className="relative grid size-9 place-items-center rounded-full border border-border bg-surface/50 text-foreground/70 transition-colors duration-300 hover:border-accent/50 hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25 }}
        >
          {isLight ? (
            <Moon className="size-4" strokeWidth={1.6} />
          ) : (
            <Sun className="size-4" strokeWidth={1.6} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
