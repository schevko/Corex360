import type { Metadata } from "next";
import { Outfit, Manrope, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, isRtl } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Grain } from "@/components/ui/grain";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Preloader } from "@/components/ui/preloader";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400"],
  variable: "--font-arabic",
  display: "swap",
  // Only the Arabic locale renders these glyphs — don't preload on tr/en/ru/fr.
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: t("title"),
      template: `%s · ${SITE.name}`,
    },
    description: t("description"),
    applicationName: SITE.name,
    keywords: [
      "CRM",
      "ERP",
      "iş zekası",
      "business intelligence",
      "SaaS",
      "Corex360",
      "satış yönetimi",
      "stok yönetimi",
      "veri analitiği",
    ],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
        "x-default": `/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      siteName: SITE.name,
      locale,
      type: "website",
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: t("ogAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      site: SITE.twitter,
      images: [SITE.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#org`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/icon.svg`,
        email: SITE.email,
        sameAs: [
          "https://x.com/corex360",
          "https://www.linkedin.com/company/corex360",
          "https://github.com/corex360",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: t("description"),
        inLanguage: routing.locales,
        publisher: { "@id": `${SITE.url}/#org` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE.url}/#app`,
        name: SITE.name,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "CRM, ERP, Business Intelligence",
        operatingSystem: "Web, iOS, Android",
        description: t("description"),
        url: SITE.url,
        publisher: { "@id": `${SITE.url}/#org` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: tc("tagline"),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "1280",
        },
      },
    ],
  };

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      className={`${outfit.variable} ${manrope.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('cx-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Preloader />
            <Grain />
            <CustomCursor />
            <ScrollProgress />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
