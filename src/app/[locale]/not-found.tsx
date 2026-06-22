import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 text-center">
      <AuroraBackground className="-z-10 opacity-60" />
      <div>
        <p className="font-display text-[7rem] font-semibold leading-none tracking-tight text-aurora sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold">{t("title")}</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">{t("body")}</p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:shadow-[var(--shadow-glow)]"
        >
          {t("home")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
