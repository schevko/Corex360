"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Inline locale row — "TR EN AR RU FR" (DK-shell style). */
export function LocaleSwitcherInline() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const current = (params.locale as string) ?? routing.defaultLocale;

  if (routing.locales.length <= 1) return null;

  function switchTo(locale: string) {
    if (locale === current) return;
    startTransition(() => {
      // @ts-expect-error -- params shape is route-dependent; next-intl handles it.
      router.replace({ pathname, params }, { locale });
    });
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs tracking-wider",
        isPending && "opacity-60"
      )}
    >
      {routing.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchTo(locale)}
          aria-current={locale === current ? "true" : undefined}
          className={cn(
            "transition-colors",
            locale === current ? "text-foreground" : "text-muted hover:text-foreground"
          )}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
