"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Demo request form. Client-side success state for now — wire a real endpoint
 *  (or server action) into onSubmit when the backend is ready.
 *  Frosted, elevated card so it can float inside the hero over the page glow. */
export function DemoForm() {
  const t = useTranslations("demoPage.form");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const modules = ["crm", "erp", "bi", "all"] as const;
  const sizes = ["s", "m", "l", "xl"] as const;

  const shell =
    "rounded-3xl border border-border/70 bg-surface/90 shadow-[0_50px_110px_-45px_rgba(28,26,21,0.55)] ring-1 ring-foreground/5 backdrop-blur-xl";

  if (status === "done") {
    return (
      <div
        className={cn(
          shell,
          "flex h-full min-h-[26rem] flex-col items-center justify-center px-8 py-16 text-center"
        )}
      >
        <span className="grid size-14 place-items-center rounded-full border border-accent/40 text-accent">
          <Check className="size-7" strokeWidth={2} />
        </span>
        <h3 className="mt-7 font-display text-2xl font-semibold tracking-tight">
          {t("successTitle")}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          {t("successBody")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 text-xs font-medium uppercase tracking-[0.16em] text-muted-2 transition-colors hover:text-foreground"
        >
          {t("successAgain")}
        </button>
      </div>
    );
  }

  const label = "mb-1.5 block text-xs font-medium tracking-wide text-muted-2";
  const field =
    "w-full rounded-xl border border-border bg-surface-2/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2 focus:border-accent/60";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("sending");
        // Simulated submit — replace with a real request when the API is ready.
        window.setTimeout(() => setStatus("done"), 650);
      }}
      className={cn(shell, "p-7 sm:p-8")}
    >
      <h3 className="font-display text-xl font-semibold tracking-tight">
        {t("title")}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t("sub")}</p>

      <div className="mt-7 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="df-name" className={label}>
              {t("name")}
            </label>
            <input
              id="df-name"
              className={field}
              placeholder={t("namePh")}
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="df-company" className={label}>
              {t("company")}
            </label>
            <input
              id="df-company"
              className={field}
              placeholder={t("companyPh")}
              required
              autoComplete="organization"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="df-email" className={label}>
              {t("email")}
            </label>
            <input
              id="df-email"
              type="email"
              className={field}
              placeholder={t("emailPh")}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="df-phone" className={label}>
              {t("phone")}
            </label>
            <input
              id="df-phone"
              type="tel"
              dir="ltr"
              className={field}
              placeholder={t("phonePh")}
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="df-module" className={label}>
              {t("module")}
            </label>
            <select id="df-module" className={cn(field, "appearance-none")} defaultValue="all">
              {modules.map((m) => (
                <option key={m} value={m}>
                  {t(`modules.${m}`)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="df-size" className={label}>
              {t("size")}
            </label>
            <select id="df-size" className={cn(field, "appearance-none")} defaultValue="m">
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {t(`sizes.${s}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="df-message" className={label}>
            {t("message")}
          </label>
          <textarea
            id="df-message"
            rows={3}
            className={cn(field, "resize-none")}
            placeholder={t("messagePh")}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:shadow-[var(--shadow-glow)] disabled:opacity-70"
      >
        {status === "sending" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            {t("submit")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
          </>
        )}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted-2">{t("note")}</p>
    </form>
  );
}
