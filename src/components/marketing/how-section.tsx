import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Step = { no: string; title: string; desc: string };

/** Three-step "how it works" — a clear, professional process narrative. */
export function HowSection() {
  const t = useTranslations("how");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/20 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading label={t("label")} title={t("title")} body={t("body")} align="center" />

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* connective line on desktop */}
          <div
            aria-hidden
            className="absolute inset-x-12 top-9 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent md:block"
          />
          {steps.map((s, i) => (
            <Reveal key={s.no} style={{ animationDelay: `${i * 100}ms` }} className="relative text-center">
              <div className="mx-auto grid size-18 place-items-center">
                <span className="relative grid size-16 place-items-center rounded-full border border-border bg-background">
                  <span className="tabular font-display text-lg font-semibold text-accent">
                    {s.no}
                  </span>
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-normal">{s.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
