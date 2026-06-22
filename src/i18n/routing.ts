import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en", "ar", "ru", "fr"],
  defaultLocale: "tr",
});

export type Locale = (typeof routing.locales)[number];

/** Locales that render right-to-left. */
export const rtlLocales: Locale[] = ["ar"];
export const isRtl = (locale: string) => rtlLocales.includes(locale as Locale);
