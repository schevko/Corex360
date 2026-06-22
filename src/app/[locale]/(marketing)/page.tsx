import { setRequestLocale } from "next-intl/server";
import { HeroVideo } from "@/components/marketing/hero-video";
import { QuoteMetrics } from "@/components/marketing/quote-metrics";
import { SoftwareIntro } from "@/components/marketing/software-intro";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroVideo />
      <QuoteMetrics />
      <SoftwareIntro />
    </>
  );
}
