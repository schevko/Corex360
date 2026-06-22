import { useTranslations } from "next-intl";
import { ShieldCheck, Award, BadgeCheck, Lock, type LucideIcon } from "lucide-react";
import { certs } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Award,
  BadgeCheck,
  Lock,
};

/** Certification / compliance band above the footer. Real badge images go in
 *  public/certs/<slug>.svg (set `img:true` in lib/site.ts); until then a
 *  monochrome icon placeholder is shown. */
export function CertBand() {
  const t = useTranslations("certs");

  return (
    <section className="border-t border-border bg-surface/20">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Reveal className="mb-8 text-center">
          <span className="text-sm font-medium text-muted">{t("label")}</span>
        </Reveal>

        <Reveal
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          style={{ animationDelay: "80ms" }}
        >
          {certs.map((c) => {
            const Icon = ICONS[c.icon] ?? ShieldCheck;
            return (
              <div
                key={c.slug}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface/40 px-4 py-3.5 transition-colors duration-300 hover:border-border-strong"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-2 ring-1 ring-border">
                  {c.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/certs/${c.slug}.svg`}
                      alt={c.name}
                      className="size-7 object-contain"
                    />
                  ) : (
                    <Icon className="size-5 text-foreground/70" strokeWidth={1.6} />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold leading-tight">
                    {c.name}
                  </span>
                  <span className="block text-xs text-muted-2">{t(c.key)}</span>
                </span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
