import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { moduleIds, faqKeys, featureKeys, SITE } from "@/lib/site";

/**
 * llms.txt — a concise, link-rich map for AI/LLM crawlers (Generative Engine
 * Optimization). Mirrors the human site in a machine-friendly outline.
 */
export async function GET() {
  const t = await getTranslations({ locale: routing.defaultLocale });
  const L = (path: string) => `${SITE.url}/${routing.defaultLocale}${path}`;

  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${t("meta.description")}`,
    "",
    `${SITE.name}, CRM, ERP ve iş zekâsını tek bir gerçek zamanlı, yapay zekâ destekli platformda birleştirir. Diller: ${routing.locales.join(", ")}.`,
    "",
    "## Modüller",
    ...moduleIds.map(
      (id) =>
        `- [${t(`modules.items.${id}.name`)}](${L(`/modules/${id}`)}): ${t(`modules.items.${id}.description`)}`
    ),
    "",
    "## Öne çıkan özellikler",
    ...featureKeys.map(
      (f) => `- ${t(`features.items.${f.key}.title`)}: ${t(`features.items.${f.key}.description`)}`
    ),
    "",
    "## Fiyatlandırma",
    `- [${t("pricing.title")}](${L("/pricing")}): ${t("pricing.body")}`,
    `  - ${t("pricing.tiers.starter.name")}: ${t("pricing.tiers.starter.desc")}`,
    `  - ${t("pricing.tiers.growth.name")}: ${t("pricing.tiers.growth.desc")}`,
    `  - ${t("pricing.tiers.enterprise.name")}: ${t("pricing.tiers.enterprise.desc")}`,
    "",
    "## Sık sorulan sorular",
    ...faqKeys.map((k) => `- ${t(`faq.items.${k}.q`)} — ${t(`faq.items.${k}.a`)}`),
    "",
    "## Sayfalar",
    `- [${t("nav.about")}](${L("/about")})`,
    `- [${t("nav.resources")}](${L("/resources")})`,
    `- [${t("nav.contact")}](${L("/contact")})`,
    "",
    "## İletişim",
    `- ${SITE.email} · ${t("common.phone")} · ${t("common.address")}`,
    "",
    "## Diller",
    `- ${routing.locales.join(", ")} (hreflang ile)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
