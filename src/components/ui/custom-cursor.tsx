"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Trailing cursor ring (fine pointers only). The native cursor stays visible;
 * the ring lags behind it and expands over interactive elements.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 260, damping: 24 });
  const sy = useSpring(my, { stiffness: 260, damping: 24 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      setHovering(
        !!(e.target as HTMLElement).closest?.("a, button, [data-cursor]")
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed start-0 top-0 z-[80] mix-blend-difference"
    >
      <motion.div
        animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 1 : 0.6 }}
        transition={{ duration: 0.22 }}
        className="-ms-3 -mt-3 size-6 rounded-full border border-white"
      />
    </motion.div>
  );
}
