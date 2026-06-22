import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { SocialIcon } from "@/components/ui/social-icon";
import { socialLinks } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tm = useTranslations("modules");
  const tc = useTranslations("common");
  const year = 2026;
  const phoneDigits = tc("phone").replace(/[^\d+]/g, "");

  const columns: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: tn("solutions"),
      links: [
        { label: tm("items.crm.name"), href: "/modules/crm" },
        { label: tm("items.erp.name"), href: "/modules/erp" },
        { label: tm("items.bi.name"), href: "/modules/bi" },
        { label: tn("solutions"), href: "/solutions" },
        { label: t("links.pricing"), href: "/pricing" },
      ],
    },
    {
      title: t("resources"),
      links: [
        { label: t("links.blog"), href: "/resources/blog" },
        { label: t("links.docs"), href: "/resources/docs" },
        { label: t("links.changelog"), href: "/resources/changelog" },
        { label: t("links.status"), href: "/resources/status" },
      ],
    },
    {
      title: t("company"),
      links: [
        { label: t("links.about"), href: "/about" },
        { label: t("links.careers"), href: "/about" },
        { label: tn("current"), href: "/resources" },
        { label: t("links.contact"), href: "/contact" },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: t("privacy"), href: "/" },
        { label: t("terms"), href: "/" },
        { label: t("kvkk"), href: "/" },
        { label: t("cookies"), href: "/" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {t("tagline")}
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={`tel:${phoneDigits}`}
                className="flex items-center gap-2.5 text-muted transition-colors hover:text-foreground"
              >
                <Phone className="size-4 text-foreground/60" strokeWidth={1.6} />
                <span dir="ltr">{tc("phone")}</span>
              </a>
              <a
                href={`mailto:${tc("email")}`}
                className="flex items-center gap-2.5 text-muted transition-colors hover:text-foreground"
              >
                <Mail className="size-4 text-foreground/60" strokeWidth={1.6} />
                {tc("email")}
              </a>
              <p className="flex items-center gap-2.5 text-muted">
                <MapPin className="size-4 text-foreground/60" strokeWidth={1.6} />
                {tc("address")}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={name}
                  className="grid size-9 place-items-center rounded-lg border border-border bg-surface/40 text-muted-2 transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
                >
                  <SocialIcon name={name} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label-eyebrow">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-14 flex flex-col gap-5 border-t border-border pt-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">{t("newsletter")}</h3>
            <p className="mt-1 max-w-md text-sm text-muted">{t("newsletterBody")}</p>
          </div>
          <form className="flex w-full max-w-sm items-center gap-2 rounded-full border border-border bg-surface p-1.5 focus-within:border-accent/50">
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-2"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              {t("subscribe")}
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 text-xs text-muted-2 sm:flex-row">
          <p>{t("copyright", { year })}</p>
          <p className="flex items-center gap-1.5">
            {t("madeIn")}
          </p>
        </div>
      </div>
    </footer>
  );
}
