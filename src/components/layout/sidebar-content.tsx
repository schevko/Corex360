"use client";

import { useTranslations } from "next-intl";
import { Phone, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { SidebarNav } from "./sidebar-nav";
import { LocaleSwitcherInline } from "./locale-switcher-inline";
import { SocialIcon } from "@/components/ui/social-icon";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { socialLinks } from "@/lib/site";

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("common");
  const tn = useTranslations("nav");
  const tf = useTranslations("footer");
  const phoneDigits = t("phone").replace(/[^\d+]/g, "");

  return (
    <div className="relative flex min-h-full flex-col px-8 py-10 lg:px-10 lg:py-12">
      <Link href="/" onClick={onNavigate} aria-label="Corex360">
        <Logo size="lg" />
      </Link>

      <p className="mt-5 text-sm leading-relaxed text-muted-2">{t("tagline")}</p>

      <div className="mt-10 flex-1 lg:mt-12">
        <SidebarNav onNavigate={onNavigate} />
      </div>

      {/* Phone + primary CTA — twin pills */}
      <div className="space-y-3 border-t border-border pt-6">
        <a
          href={`tel:${phoneDigits}`}
          className="group flex items-center justify-center gap-3 rounded-full border border-border bg-surface/40 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-accent/50"
        >
          <Phone
            className="size-4 text-accent transition-transform duration-300 group-hover:-rotate-12"
            strokeWidth={1.6}
          />
          <span dir="ltr" className="tracking-wide">
            {t("phone")}
          </span>
        </a>

        <Link
          href="/demo"
          onClick={onNavigate}
          className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-foreground px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-background transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
        >
          <Sparkles className="size-4" strokeWidth={1.6} />
          {tn("getDemo")}
        </Link>
      </div>

      {/* Theme + language + social + legal cluster */}
      <div className="mt-8 flex flex-col items-center gap-6 border-t border-border pt-7">
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="h-4 w-px bg-border" aria-hidden />
          <LocaleSwitcherInline />
        </div>

        <div className="flex items-center gap-5">
          {socialLinks.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={name}
              className="text-foreground/35 transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
            >
              <SocialIcon name={name} className="size-4" />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-[10px] font-semibold tracking-wide text-muted-2">
            {tf("copyright", { year: 2026 })}
          </p>
          <p className="text-[10px] tracking-wide text-muted-2">
            <Link
              href="/legal/privacy"
              onClick={onNavigate}
              className="transition-colors duration-300 hover:text-foreground"
            >
              {tf("privacy")}
            </Link>
            {" · "}
            <Link
              href="/legal/terms"
              onClick={onNavigate}
              className="transition-colors duration-300 hover:text-foreground"
            >
              {tf("terms")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
