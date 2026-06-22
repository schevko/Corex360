import { setRequestLocale } from "next-intl/server";
import { HeroSlider } from "@/components/marketing/hero-slider";
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
      <HeroSlider />
      <QuoteMetrics />
      <SoftwareIntro />
    </>
  );
}
