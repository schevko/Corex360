"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./logo";

/**
 * Brief brand-mark preloader. Shows once per session (sessionStorage), then
 * curtains away. Reduced-motion users skip it instantly.
 */
export function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("cx-loaded")) return;
    setShow(true);
    sessionStorage.setItem("cx-loaded", "1");
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[95] grid place-items-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5"
          >
            <Logo size="lg" className="scale-110" />
            <span className="relative flex h-px w-28 overflow-hidden bg-border">
              <span className="absolute inset-y-0 left-0 w-1/3 animate-marquee bg-gradient-to-r from-transparent via-foreground to-transparent" />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
