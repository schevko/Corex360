import { useTranslations } from "next-intl";
import { trustLogos } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";

/** Real client logos, uniform light monochrome — calm trust wall. */
export function TrustStrip() {
  const t = useTranslations("trust");

  return (
    <section className="border-y border-border bg-surface/15">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <Reveal className="text-center">
          <p className="label-eyebrow">{t("label")}</p>
        </Reveal>
        <Reveal
          className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
          style={{ animationDelay: "80ms" }}
        >
          {trustLogos.map((logo) => (
            <div key={logo.slug} className="flex items-center justify-center">
              <img
                src={`/logos/${logo.slug}.png`}
                alt={logo.name}
                title={logo.name}
                className="h-8 w-auto max-w-[140px] object-contain opacity-55 transition-opacity duration-300 hover:opacity-100"
                draggable={false}
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
