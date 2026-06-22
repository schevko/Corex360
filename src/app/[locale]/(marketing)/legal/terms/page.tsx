import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/marketing/legal-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return pageMetadata({
    locale,
    path: "/legal/terms",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "terms" });

  const sections = t.raw("sections") as LegalSection[];

  return (
    <LegalPage
      label={t("label")}
      title={t("title")}
      updatedLabel={t("updatedLabel")}
      updated={t("updated")}
      intro={t("intro")}
      sections={sections}
    />
  );
}
