"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Webinar registration form. Client-side success state for now — wire a real
 *  endpoint (or form action) into onSubmit when the backend is ready.
 *  `floating` swaps the solid card for a frosted, elevated one so it can sit
 *  inside a hero over the page background. */
export function RegistrationForm({ floating = false }: { floating?: boolean } = {}) {
  const t = useTranslations("webinar.form");
  const [done, setDone] = useState(false);

  // Shared shell so the success state matches the form card exactly.
  const shell = cn(
    "rounded-3xl border",
    floating
      ? "border-border/70 bg-surface/90 shadow-[0_50px_110px_-45px_rgba(28,26,21,0.55)] ring-1 ring-foreground/5 backdrop-blur-xl"
      : "border-border bg-surface"
  );

  if (done) {
    return (
      <div
        className={cn(
          shell,
          "flex h-full min-h-[20rem] flex-col items-center justify-center px-8 py-14 text-center"
        )}
      >
        <span className="grid size-12 place-items-center rounded-full border border-accent/40 text-accent">
          <Check className="size-6" strokeWidth={2} />
        </span>
        <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
          {t("successTitle")}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          {t("successBody")}
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-surface-2/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2 focus:border-accent/60";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className={cn(shell, "p-7 sm:p-8")}
    >
      <h3 className="font-display text-xl font-semibold tracking-tight">
        {t("title")}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t("sub")}</p>

      <div className="mt-6 space-y-3">
        <input className={inputClass} placeholder={t("name")} required autoComplete="name" />
        <input
          className={inputClass}
          type="email"
          placeholder={t("email")}
          required
          autoComplete="email"
        />
        <input
          className={inputClass}
          placeholder={t("company")}
          autoComplete="organization"
        />
      </div>

      <button
        type="submit"
        className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
      >
        {t("submit")}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted-2">{t("note")}</p>
    </form>
  );
}
