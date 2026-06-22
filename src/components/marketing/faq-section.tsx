"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqKeys } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/**
 * Accordion FAQ. Defaults to the global `faq` namespace + faqKeys, but any page
 * can reuse it for its own Q&A by passing a nested `namespace`
 * (e.g. "solutions.faq") and the matching `keys`.
 */
export function FaqSection({
  namespace = "faq",
  keys = faqKeys,
}: {
  namespace?: string;
  keys?: readonly string[];
} = {}) {
  const t = useTranslations(namespace);
  const [open, setOpen] = useState<string | null>(keys[0] ?? null);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
      <SectionHeading label={t("label")} title={t("title")} align="center" />

      <div className="mt-12 divide-y divide-border border-y border-border">
        {keys.map((key) => {
          const isOpen = open === key;
          return (
            <div key={key}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : key)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-start"
              >
                <span className="font-display text-lg font-semibold">
                  {t(`items.${key}.q`)}
                </span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border border-border transition-all duration-300",
                    isOpen && "rotate-45 border-accent/60 text-accent"
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pe-12 text-sm leading-relaxed text-muted">
                      {t(`items.${key}.a`)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
