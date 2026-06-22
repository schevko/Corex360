import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { marketingPaths } from "@/lib/site";
import { SITE } from "@/lib/site";

/** All localized marketing routes with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return marketingPaths.map((path) => ({
    url: `${SITE.url}/${routing.defaultLocale}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path.startsWith("/modules") ? 0.9 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE.url}/${l}${path}`])
      ),
    },
  }));
}
