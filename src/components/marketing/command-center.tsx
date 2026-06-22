import { useTranslations } from "next-intl";
import {
  MessageCircle,
  Camera,
  Share2,
  Globe,
  PhoneCall,
  MapPin,
  FolderOpen,
  Users,
  FileText,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { commandCenter } from "@/lib/demo-data";

const CHANNELS: { key: string; icon: LucideIcon }[] = [
  { key: "whatsapp", icon: MessageCircle },
  { key: "instagram", icon: Camera },
  { key: "social", icon: Share2 },
  { key: "web", icon: Globe },
  { key: "santral", icon: PhoneCall },
];
const OPS: { key: string; icon: LucideIcon }[] = [
  { key: "arac", icon: MapPin },
  { key: "dosya", icon: FolderOpen },
  { key: "crm", icon: Users },
];
const CH_ICON: Record<string, LucideIcon> = {
  whatsapp: MessageCircle,
  instagram: Camera,
  santral: PhoneCall,
};

const FLEET = [
  { plate: "34 CRX 360", loc: "Kadıköy · yolda" },
  { plate: "06 EMS 41", loc: "Çankaya · teslimat" },
];

/** "Command center" hero frame — ONE unified product window (single piece):
 *  a left rail + a workspace separated only by hairline dividers, not boxes.
 *  Static, server-rendered; bronze used sparingly (CANLI dot + one KPI). */
export function CommandCenter() {
  const t = useTranslations("commandCenter");

  return (
    <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-6 lg:-mt-20">
      <Reveal>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -bottom-8 top-10 -z-10 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(55% 50% at 50% 60%, var(--accent-2), transparent 70%)" }}
          />
          <div className="glass border-gradient overflow-hidden rounded-[1.75rem] p-2.5 sm:p-3">
            {/* window chrome */}
            <div className="mb-2.5 flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-surface-3" />
                <span className="size-2.5 rounded-full bg-surface-3" />
                <span className="size-2.5 rounded-full bg-surface-3" />
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-muted">
                <span className="relative flex size-1.5">
                  <span className="pulse-ring absolute inset-0 text-accent" />
                  <span className="size-1.5 rounded-full bg-accent" />
                </span>
                {t("live")}
              </span>
            </div>

            {/* ONE window: rail | workspace, hairline-divided */}
            <div className="grid overflow-hidden rounded-2xl border border-border bg-background/50 lg:grid-cols-[244px_1fr] lg:divide-x lg:divide-border">
              {/* LEFT RAIL */}
              <div className="border-b border-border p-5 lg:border-b-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-2">
                  {t("channelsLabel")}
                </p>
                <ul className="mt-3 space-y-0.5">
                  {CHANNELS.map(({ key, icon: Icon }) => (
                    <li key={key} className="flex items-center gap-2.5 py-1.5 text-[13px] text-foreground/80">
                      <Icon className="size-4 shrink-0 text-muted" strokeWidth={1.6} />
                      {t(`ch.${key}`)}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-muted-2">
                  {t("opsLabel")}
                </p>
                <ul className="mt-3 space-y-0.5">
                  {OPS.map(({ key, icon: Icon }) => (
                    <li key={key} className="flex items-center gap-2.5 py-1.5 text-[13px] text-foreground/80">
                      <Icon className="size-4 shrink-0 text-muted" strokeWidth={1.6} />
                      {t(`op.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* WORKSPACE — divided sections, no inner boxes */}
              <div className="divide-y divide-border">
                {/* KPI row */}
                <div className="grid grid-cols-3 divide-x divide-border">
                  {([
                    ["conv", commandCenter.kpis.conv, true],
                    ["calls", commandCenter.kpis.calls, false],
                    ["vehicles", commandCenter.kpis.vehicles, false],
                  ] as const).map(([key, val, accent]) => (
                    <div key={key} className="px-4 py-3.5">
                      <p className="text-[11px] text-muted">{t(`kpi.${key}`)}</p>
                      <p className={`tabular mt-1 text-xl font-semibold ${accent ? "text-accent" : ""}`}>{val}</p>
                    </div>
                  ))}
                </div>

                {/* Unified inbox */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{t("inboxTitle")}</p>
                    <TrendingUp className="size-3.5 text-accent" />
                  </div>
                  <ul className="mt-3.5 space-y-3">
                    {commandCenter.inbox.map((m, i) => {
                      const Icon = CH_ICON[m.ch] ?? MessageCircle;
                      return (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-surface-2 text-foreground/55">
                            <Icon className="size-3.5" strokeWidth={1.6} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] text-foreground/90">{m.name}</span>
                            <span className="block truncate text-[11px] text-muted-2">{m.text}</span>
                          </span>
                          <span className="tabular shrink-0 text-[11px] text-muted-2">{m.time}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Files (dosyalama) + Fleet */}
                <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-border">
                  <div className="border-b border-border p-5 sm:border-b-0">
                    <p className="text-sm font-medium">{t("filesTitle")}</p>
                    <ul className="mt-3.5 space-y-3">
                      {commandCenter.files.map((f, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <FileText className="size-4 shrink-0 text-muted" strokeWidth={1.6} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] text-foreground/90">{f.name}</span>
                            <span className="block text-[11px] text-muted-2">{f.meta}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{t("fleetTitle")}</p>
                      <span className="flex items-center gap-1 text-[11px] text-muted-2">
                        <span className="size-1.5 rounded-full bg-accent" />
                        {commandCenter.kpis.vehicles}
                      </span>
                    </div>
                    <ul className="mt-3.5 space-y-3">
                      {FLEET.map((v, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <MapPin className="size-4 shrink-0 text-muted" strokeWidth={1.6} />
                          <span className="min-w-0 flex-1">
                            <span className="tabular block text-[13px] text-foreground/90">{v.plate}</span>
                            <span className="block truncate text-[11px] text-muted-2">{v.loc}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Caption */}
      <Reveal className="mx-auto mt-12 max-w-2xl text-center" style={{ animationDelay: "80ms" }}>
        <h2 className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          {t("body")}
        </p>
      </Reveal>
    </section>
  );
}
