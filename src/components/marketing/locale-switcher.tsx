"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  tr: "Türkçe",
  en: "English",
  fr: "Français",
  ru: "Русский",
  ar: "العربية",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const switchTo = (next: string) => {
    setOpen(false);
    // @ts-expect-error -- params shape is route-dependent; next-intl handles it.
    router.replace({ pathname, params }, { locale: next });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-full border border-border bg-surface/50 px-3 py-2 text-xs uppercase tracking-wider text-foreground/70 transition-colors duration-300 hover:border-accent/50 hover:text-foreground"
      >
        <Globe className="size-3.5" strokeWidth={1.6} />
        {locale}
      </button>

      {open && (
        <div className="glass absolute end-0 z-50 mt-2 w-40 overflow-hidden rounded-xl p-1.5 text-sm">
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-start transition-colors duration-200 hover:bg-surface-2",
                l === locale ? "text-foreground" : "text-muted"
              )}
            >
              {LABELS[l]}
              {l === locale && <Check className="size-3.5 text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
