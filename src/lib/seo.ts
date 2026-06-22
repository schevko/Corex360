import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { SITE } from "./site";

/**
 * Builds a localized Metadata object for a sub-page: canonical + hreflang
 * alternates + Open Graph, all derived from the path (without locale prefix).
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  /** Path without locale prefix, e.g. "/pricing". Use "" for home. */
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `/${locale}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
        "x-default": `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      title: `${title} · ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      locale,
      type: "website",
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE.name}`,
      description,
      images: [SITE.ogImage],
    },
  };
}

/**
 * Builds the GEO/SEO structured-data @graph shared by the editorial hub pages
 * (Solutions / Resources): a BreadcrumbList trail, the page's catalogue as an
 * ItemList, and its Q&A as a FAQPage. AI answer engines and search crawlers read
 * these directly. Returns a JSON-serialisable object for an ld+json script.
 */
export function buildPageJsonLd({
  base,
  path,
  label,
  list,
  faq,
}: {
  /** Locale-prefixed origin, e.g. `${SITE.url}/${locale}`. */
  base: string;
  /** Page path without locale prefix, e.g. "/resources". */
  path: string;
  /** Breadcrumb leaf label for this page. */
  label: string;
  /** The page's primary catalogue, rendered as an ItemList. */
  list: {
    /** Fragment id, e.g. "sectors" or "resources". */
    id: string;
    name: string;
    description: string;
    items: { name: string; description: string; url?: string }[];
  };
  /** The page's FAQ entries. */
  faq: { q: string; a: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${base}${path}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: base },
          {
            "@type": "ListItem",
            position: 2,
            name: label,
            item: `${base}${path}`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${base}${path}/#${list.id}`,
        name: list.name,
        description: list.description,
        itemListElement: list.items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          description: item.description,
          ...(item.url ? { url: item.url } : {}),
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${path}/#faq`,
        mainEntity: faq.map((entry) => ({
          "@type": "Question",
          name: entry.q,
          acceptedAnswer: { "@type": "Answer", text: entry.a },
        })),
      },
    ],
  };
}
