import { TrendingUp } from "lucide-react";
import { AreaChart } from "@/components/ui/charts";
import { revenueSeries } from "@/lib/demo-data";
import type { ModuleId } from "@/lib/site";

/* Bespoke glass mini-mockups for the module showcase. Pure server components,
   illustrative sample data (like the dashboard preview). */

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative [perspective:1800px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(55% 50% at 50% 50%, var(--accent-2), transparent 70%)",
        }}
      />
      <div className="glass border-gradient overflow-hidden rounded-3xl p-4">
        <div className="rounded-2xl bg-background/50 p-4">{children}</div>
      </div>
    </div>
  );
}

function Chrome({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-surface-3" />
        <span className="size-2.5 rounded-full bg-surface-3" />
        <span className="size-2.5 rounded-full bg-surface-3" />
      </div>
      <span className="flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted">
        <span className="size-1.5 rounded-full bg-accent" />
        {title}
      </span>
    </div>
  );
}

function CrmVisual() {
  const cols = [
    { name: "Lead", chips: ["Stratus A.Ş. · ₺48K", "Halka · ₺22K"] },
    { name: "Teklif", chips: ["Meridian · ₺84K", "Orbit · ₺31K"] },
    { name: "Kazanıldı", chips: ["Vektör · ₺120K"] },
  ];
  return (
    <Panel>
      <Chrome title="CRM" />
      <div className="grid grid-cols-3 gap-2.5">
        {cols.map((c) => (
          <div key={c.name}>
            <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-2">{c.name}</p>
            <div className="space-y-2">
              {c.chips.map((chip) => (
                <div
                  key={chip}
                  className="rounded-lg border border-border bg-surface/70 px-2.5 py-2 text-[11px] leading-tight text-foreground/85"
                >
                  {chip}
                </div>
              ))}
              <div className="rounded-lg border border-dashed border-border/70 px-2.5 py-2 text-[11px] text-muted-2">
                +
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ErpVisual() {
  const items = [
    { n: "SKU-114", lvl: 82 },
    { n: "SKU-220", lvl: 46 },
    { n: "SKU-309", lvl: 91 },
    { n: "SKU-417", lvl: 18 },
    { n: "SKU-528", lvl: 63 },
    { n: "SKU-636", lvl: 74 },
  ];
  return (
    <Panel>
      <Chrome title="ERP" />
      <div className="grid grid-cols-3 gap-2.5">
        {items.map((it) => (
          <div key={it.n} className="rounded-xl border border-border bg-surface/70 p-2.5">
            <p className="tabular text-[10px] text-muted-2">{it.n}</p>
            <p className="tabular mt-1 text-sm font-semibold">{it.lvl}%</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${it.lvl}%`,
                  background:
                    it.lvl < 25 ? "var(--accent-2)" : "linear-gradient(90deg,var(--accent),var(--accent-3))",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-accent/25 bg-accent/5 px-3 py-2 text-[11px] text-muted">
        <span className="size-1.5 rounded-full bg-accent" />
        SKU-417 · düşük stok uyarısı
      </div>
    </Panel>
  );
}

function BiVisual() {
  return (
    <Panel>
      <Chrome title="BI" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-muted">Aylık gelir</p>
          <p className="tabular text-2xl font-semibold">₺1.24M</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] text-accent">
          <TrendingUp className="size-3" /> +18.2%
        </span>
      </div>
      <div className="mt-3 h-28">
        <AreaChart data={revenueSeries} height={112} stroke="var(--accent)" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {[
          { k: "Tahmin Q3", v: "₺1.5M" },
          { k: "Anomali", v: "0" },
        ].map((m) => (
          <div key={m.k} className="rounded-lg border border-border bg-surface/70 px-3 py-2">
            <p className="text-[10px] text-muted-2">{m.k}</p>
            <p className="tabular text-sm">{m.v}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function ModuleVisual({ id }: { id: ModuleId }) {
  if (id === "crm") return <CrmVisual />;
  if (id === "erp") return <ErpVisual />;
  return <BiVisual />;
}
