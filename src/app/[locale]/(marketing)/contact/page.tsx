import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { SITE, offices } from "@/lib/site";
import { ContactMap } from "@/components/marketing/contact-map";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("nav.contact"),
    description: t("contactPage.subtitle"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  // LocalBusiness structured data — both offices, for local SEO/GEO.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    location: offices.map((o) => ({
      "@type": "Place",
      name: t(`contactPage.offices.${o.key}.name`),
      address: {
        "@type": "PostalAddress",
        streetAddress: t(`contactPage.offices.${o.key}.address`),
        addressLocality: "İstanbul",
        addressCountry: "TR",
      },
      geo: { "@type": "GeoCoordinates", latitude: o.lat, longitude: o.lng },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Heading removed from view (user request); kept for SEO/accessibility. */}
      <h1 className="sr-only">
        {t("contactPage.title")} {t("contactPage.titleAccent")}
      </h1>

      <ContactMap />
    </>
  );
}
