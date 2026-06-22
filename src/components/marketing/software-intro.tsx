import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

/** Concise, SEO-friendly "what the software is" section — real keyword-rich
 *  copy + capability chips. Distinct, calm, harmonious with the palette. */
export function SoftwareIntro() {
  const t = useTranslations("intro");
  const tm = useTranslations("modules");
  const tc = useTranslations("commandCenter");

  const chips = [
    tm("items.crm.name"),
    tm("items.erp.name"),
    tm("items.bi.name"),
    tc("ch.whatsapp"),
    tc("ch.instagram"),
    tc("ch.web"),
    tc("ch.santral"),
    tc("op.arac"),
    tc("op.dosya"),
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <Reveal className="max-w-3xl">
        <p className="text-sm font-medium text-muted">{t("label")}</p>
        <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.7rem]">
          {t("title")}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted">{t("body")}</p>
      </Reveal>

      <Reveal
        className="mt-10 flex flex-wrap gap-2.5"
        style={{ animationDelay: "80ms" }}
      >
        {chips.map((c) => (
          <span
            key={c}
            className="rounded-full border border-border bg-surface/40 px-4 py-2 text-sm text-foreground/80"
          >
            {c}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
