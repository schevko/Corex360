import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { moduleIds, moduleMeta } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";

/**
 * Platform section (L-Mimarlık manifesto layout): a strong editorial slogan on
 * the left, the three modules as a numbered 01/02/03 list on the right — each a
 * "key sentence" of what Corex360 manages, with an İncele link. Premium, calm.
 */
export function Manifesto() {
  const t = useTranslations("manifesto");
  const tm = useTranslations("modules");

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 lg:py-36">
      <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        {/* Left — slogan */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="rule-accent" />
            <span className="label-eyebrow">{tm("label")}</span>
          </div>
          <p className="mt-7 font-display text-[1.85rem] font-semibold leading-[1.26] tracking-tight text-foreground sm:text-3xl lg:text-[2.5rem]">
            {t("lead")}
          </p>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted">
            {tm("body")}
          </p>
        </Reveal>

        {/* Right — three modules, numbered */}
        <div className="lg:pt-1.5">
          <ul className="divide-y divide-border border-y border-border">
            {moduleIds.map((id, i) => (
              <Reveal
                as="li"
                key={id}
                style={{ animationDelay: `${i * 80}ms` }}
                className="group"
              >
                <Link
                  href={moduleMeta[id].href}
                  className="flex gap-6 py-7 transition-colors duration-300"
                >
                  <span className="tabular pt-1 text-xs tracking-[0.3em] text-muted-2 transition-colors duration-300 group-hover:text-foreground">
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                        {tm(`items.${id}.name`)}
                      </h3>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-muted-2">
                        {tm(`items.${id}.tagline`)}
                      </span>
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                      {tm(`items.${id}.description`)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                      {tm("explore")}
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
