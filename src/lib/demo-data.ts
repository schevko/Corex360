/* Sample data powering the marketing dashboard preview and the app skeleton.
   Deterministic (no RNG) so SSR and client render identically. */

export const revenueSeries = [
  42, 48, 45, 53, 58, 55, 64, 72, 69, 78, 85, 96,
];

export const revenueSeriesPrev = [
  38, 41, 44, 46, 49, 52, 55, 58, 60, 63, 66, 71,
];

export const monthsShort = [
  "Oca", "Şub", "Mar", "Nis", "May", "Haz",
  "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara",
];

export type PipelineStage = { stage: string; value: number; deals: number };

export const pipeline: PipelineStage[] = [
  { stage: "Lead", value: 100, deals: 248 },
  { stage: "Qualified", value: 72, deals: 164 },
  { stage: "Proposal", value: 48, deals: 92 },
  { stage: "Negotiation", value: 31, deals: 54 },
  { stage: "Won", value: 22, deals: 38 },
];

export type Product = { name: string; revenue: string; trend: number; spark: number[] };

export const topProducts: Product[] = [
  { name: "Corex CRM Pro", revenue: "₺412K", trend: 12.4, spark: [12, 14, 13, 16, 18, 17, 21] },
  { name: "Analytics Add-on", revenue: "₺286K", trend: 8.1, spark: [8, 9, 11, 10, 12, 14, 15] },
  { name: "ERP Logistics", revenue: "₺198K", trend: -2.3, spark: [16, 15, 14, 15, 13, 12, 12] },
  { name: "AI Forecast", revenue: "₺164K", trend: 23.7, spark: [4, 6, 7, 9, 12, 15, 19] },
];

export type Activity = { who: string; action: string; when: string; tone: "accent" | "accent-2" | "accent-3" };

export const recentActivity: Activity[] = [
  { who: "Ada Yılmaz", action: "Meridian fırsatını kazandı · ₺84K", when: "2dk", tone: "accent" },
  { who: "Otomasyon", action: "12 fatura otomatik gönderildi", when: "18dk", tone: "accent-2" },
  { who: "Kerem Aksoy", action: "Yeni müşteri ekledi · Stratus A.Ş.", when: "1sa", tone: "accent-3" },
  { who: "AI Forecast", action: "Q3 gelir tahmini güncellendi", when: "3sa", tone: "accent" },
];

/** KPI cards: value + delta% + a small series for the sparkline. */
export const kpis = {
  revenue: { value: "₺1.24M", delta: 18.2, series: [42, 48, 45, 53, 58, 64, 72, 96] },
  deals: { value: "38", delta: 9.4, series: [22, 25, 24, 28, 30, 33, 35, 38] },
  customers: { value: "412", delta: 6.1, series: [360, 372, 380, 388, 395, 402, 408, 412] },
  churn: { value: "%1.8", delta: -0.4, series: [3.1, 2.9, 2.6, 2.4, 2.2, 2.0, 1.9, 1.8] },
} as const;

/** Command-center hero frame — illustrative unified-inbox / fleet / files data. */
export const commandCenter = {
  kpis: { conv: 18, calls: 42, vehicles: 7 },
  inbox: [
    { ch: "whatsapp", name: "Recai Can", text: "Fiyat teklifi alabilir miyim?", time: "2dk" },
    { ch: "instagram", name: "@studio.mim", text: "Havuz simülatörü detayı?", time: "11dk" },
    { ch: "santral", name: "+90 532 •• ••", text: "Gelen çağrı · 03:24", time: "26dk" },
  ],
  files: [
    { name: "Sözleşme — Stratus A.Ş.", meta: "PDF · 2,1 MB" },
    { name: "Teklif — Meridian", meta: "PDF · 840 KB" },
  ],
} as const;

export const previewKpis = {
  revenue: { value: "₺1.24M", delta: 18.2 },
  deals: { value: "38", delta: 9.4 },
  churn: { value: "%1.8", delta: -0.4 },
  nps: { value: "72", delta: 5.0 },
} as const;
