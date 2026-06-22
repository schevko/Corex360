/* ============================================================================
   COREX360 — site constants & structural content
   Translatable copy lives in messages/*.json; this file holds brand constants,
   icon keys, ordering and any non-localized structure referenced by both the
   marketing site and the app skeleton.
   ========================================================================== */

import type { IconName } from "@/components/ui/icon";

export const SITE = {
  name: "Corex360",
  url: "https://corex360.com",
  email: "merhaba@corex360.com",
  phone: "0216 475 39 37",
  twitter: "@corex360",
  // 1200×630 OG fallback (replace with a generated card later).
  ogImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=72",
} as const;

/** Left-sidebar primary navigation (numbered, DK-shell style). */
export const navItems: { href: string; key: string }[] = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/solutions", key: "solutions" },
  { href: "/modules", key: "modules" },
  { href: "/pricing", key: "pricing" },
  { href: "/resources", key: "current" },
  { href: "/contact", key: "contact" },
];

/** Primary product modules — the "360" surface. */
export const moduleIds = ["crm", "erp", "bi"] as const;
export type ModuleId = (typeof moduleIds)[number];

export const moduleMeta: Record<
  ModuleId,
  { icon: string; accent: "accent" | "accent-2" | "accent-3"; href: string }
> = {
  crm: { icon: "Users", accent: "accent", href: "/modules/crm" },
  erp: { icon: "Boxes", accent: "accent-2", href: "/modules/erp" },
  bi: { icon: "ChartSpline", accent: "accent-3", href: "/modules/bi" },
};

/** Feature grid — icon + message key per card. */
export const featureKeys = [
  { key: "realtime", icon: "Radio" },
  { key: "ai", icon: "Sparkles" },
  { key: "automation", icon: "Workflow" },
  { key: "security", icon: "ShieldCheck" },
  { key: "integrations", icon: "Plug" },
  { key: "global", icon: "Globe" },
] as const;

/** Pricing tiers — message key + structural meta. */
export const pricingKeys = [
  { key: "starter", featured: false, priceMonthly: 0 },
  { key: "growth", featured: true, priceMonthly: 49 },
  { key: "enterprise", featured: false, priceMonthly: null },
] as const;

/** FAQ items by message key. */
export const faqKeys = ["data", "migration", "security", "pricing", "support", "ai"] as const;

/** Solutions — industries Corex360 ships configured flows for (by-sector view).
 *  Copy lives under the `solutions.sectors.items.<key>` message namespace. */
export const solutionSectors: { key: string; icon: IconName }[] = [
  { key: "logistics", icon: "Truck" },
  { key: "construction", icon: "HardHat" },
  { key: "hospitality", icon: "Hotel" },
  { key: "health", icon: "Stethoscope" },
  { key: "retail", icon: "Store" },
  { key: "education", icon: "GraduationCap" },
];

/** Solutions — resource links shown beside the sector grid.
 *  Copy lives under `solutions.resources.items.<key>`. */
export const solutionResources: { key: string; icon: IconName; href: string }[] = [
  { key: "stories", icon: "ChartSpline", href: "/resources/stories" },
  { key: "videos", icon: "PlayCircle", href: "/resources/videos" },
  { key: "docs", icon: "BookOpen", href: "/resources/docs" },
  { key: "support", icon: "Headphones", href: "/contact" },
];

/** Solutions FAQ — message keys (GEO: rendered as FAQPage structured data). */
export const solutionFaqKeys = ["sectors", "notListed", "adapt", "data", "migrate"] as const;

/** Resources hub — the four live sub-pages, surfaced as featured cards.
 *  Copy lives under `resourcesPage.items.<key>`. */
export const resourceCards: { key: string; icon: IconName; href: string }[] = [
  { key: "docs", icon: "BookOpen", href: "/resources/docs" },
  { key: "videos", icon: "PlayCircle", href: "/resources/videos" },
  { key: "stories", icon: "ChartSpline", href: "/resources/stories" },
  { key: "webinar", icon: "Radio", href: "/resources/webinar" },
];

/** Resources hub — "more" row. Items with an `href` render as live link cards;
 *  any without one show a comingSoon badge. Labels come from footer.links.<key>;
 *  descriptions from resourcesPage.upcoming.items.<key>.desc. Guides & API are
 *  intentionally excluded — they are docs categories. (All three are live now.) */
export const resourceUpcoming: { key: string; icon: IconName; href?: string }[] = [
  { key: "blog", icon: "Newspaper", href: "/resources/blog" },
  { key: "changelog", icon: "GitBranch", href: "/resources/changelog" },
  { key: "status", icon: "Activity", href: "/resources/status" },
];

/** Blog — sample posts (newest first). Body/title/excerpt/date copy lives under
 *  `blog.posts.<slug>`; `category` keys into `blog.categories.<key>`; `author`
 *  is a literal name; `isoDate` feeds BlogPosting datePublished. Covers:
 *  public/team/blog/<slug>-{light,dark}.webp. */
export const blogCategoryKeys = ["vision", "product", "engineering", "operations"] as const;
export type BlogCategory = (typeof blogCategoryKeys)[number];
export const blogPosts: {
  slug: string;
  category: BlogCategory;
  author: string;
  isoDate: string;
  readMins: number;
}[] = [
  { slug: "tek-cati-altinda-360", category: "vision", author: "Şevket Erer", isoDate: "2026-06-15", readMins: 6 },
  { slug: "omnichannel-gelen-kutusu", category: "product", author: "Şevket Erer", isoDate: "2026-05-28", readMins: 5 },
  { slug: "multi-tenant-mimari", category: "engineering", author: "Şevket Erer", isoDate: "2026-05-12", readMins: 8 },
  { slug: "saha-ekipleri-arac-takip", category: "operations", author: "Şevket Erer", isoDate: "2026-04-30", readMins: 5 },
];

/** Resources hub FAQ — message keys (rendered as FAQPage structured data). */
export const resourceFaqKeys = ["where", "free", "languages", "webinar"] as const;

/** Webinar — "why attend" value props. Copy under `webinar.benefits.items.<key>`. */
export const webinarBenefits: { key: string; icon: IconName }[] = [
  { key: "practical", icon: "Workflow" },
  { key: "interactive", icon: "Users" },
  { key: "recording", icon: "PlayCircle" },
];

/** Webinar FAQ — message keys (rendered as FAQPage structured data). */
export const webinarFaqKeys = ["who", "recording", "cost", "questions"] as const;

/** Changelog — sample release history. Copy (date, title, item text) lives under
 *  `changelog.releases.<key>`; tag labels under `changelog.tags.<type>`. Each
 *  change is typed for a monochrome severity pill. Newest first. */
export const changelogReleases: {
  key: string;
  version: string;
  items: { type: "new" | "improved" | "fixed"; key: string }[];
}[] = [
  {
    key: "r24",
    version: "2.4",
    items: [
      { type: "new", key: "fleet" },
      { type: "new", key: "drive" },
      { type: "improved", key: "inbox" },
      { type: "fixed", key: "reports" },
    ],
  },
  {
    key: "r23",
    version: "2.3",
    items: [
      { type: "new", key: "whatsapp" },
      { type: "improved", key: "pipeline" },
      { type: "fixed", key: "invoices" },
    ],
  },
  {
    key: "r22",
    version: "2.2",
    items: [
      { type: "new", key: "bi" },
      { type: "improved", key: "performance" },
      { type: "fixed", key: "calendar" },
    ],
  },
];

/** Change-type pills, in display order. Labels under `changelog.tags.<type>`. */
export const changelogTagKeys = ["new", "improved", "fixed"] as const;

/** System status — monitored services. Copy under `status.services.<key>`;
 *  uptime/response are sample data shown as-is (uptimeValue feeds the Donut
 *  gauge). All operational in the skeleton. */
export const statusServices: {
  key: string;
  icon: IconName;
  uptime: string;
  uptimeValue: number;
  responseMs: number;
}[] = [
  { key: "api", icon: "Plug", uptime: "99.99%", uptimeValue: 99.99, responseMs: 96 },
  { key: "app", icon: "LayoutDashboard", uptime: "99.98%", uptimeValue: 99.98, responseMs: 142 },
  { key: "inbox", icon: "Radio", uptime: "99.97%", uptimeValue: 99.97, responseMs: 180 },
  { key: "database", icon: "Boxes", uptime: "100%", uptimeValue: 100, responseMs: 41 },
  { key: "drive", icon: "Package", uptime: "99.99%", uptimeValue: 99.99, responseMs: 88 },
  { key: "bi", icon: "ChartSpline", uptime: "99.96%", uptimeValue: 99.96, responseMs: 210 },
];

/** Status — headline dashboard metrics + a deterministic 24h response series
 *  (ms) feeding the AreaChart. Sample data for the skeleton. */
export const statusOverall = { uptime: "99.98%", responseMs: 126, incidents: 0 } as const;
export const statusResponseSeries = [
  132, 128, 135, 141, 138, 130, 126, 122, 129, 144, 150, 158, 148, 139, 133, 127,
  124, 131, 137, 142, 136, 129, 125, 128,
];

/** Number of FAQ / feature etc. used for sitemap & llms.txt fan-out. */
export const marketingPaths = [
  "",
  "/modules/crm",
  "/modules/erp",
  "/modules/bi",
  "/pricing",
  "/about",
  "/solutions",
  "/contact",
  "/resources",
  "/resources/docs",
  "/resources/videos",
  "/resources/stories",
  "/resources/webinar",
  "/resources/changelog",
  "/resources/status",
  "/resources/blog",
  "/resources/blog/tek-cati-altinda-360",
  "/resources/blog/omnichannel-gelen-kutusu",
  "/resources/blog/multi-tenant-mimari",
  "/resources/blog/saha-ekipleri-arac-takip",
] as const;

/** Certification / compliance badges shown in the band above the footer.
 *  Drop real badge images into public/certs/<slug>.(svg|png) and set `img: true`
 *  on the item; until then a monochrome icon placeholder is shown. */
export const certs = [
  { slug: "iso27001", name: "ISO 27001", key: "infosec", icon: "ShieldCheck", img: false },
  { slug: "iso9001", name: "ISO 9001", key: "quality", icon: "Award", img: false },
  { slug: "soc2", name: "SOC 2 Type II", key: "compliance", icon: "BadgeCheck", img: false },
  { slug: "kvkk", name: "KVKK", key: "dataprotection", icon: "Lock", img: false },
] as const;

/** Homepage hero carousel — designed product slides (1672×941, optimized WebP
 *  in public/product). Localized alt text lives under `slider.items.<key>.alt`. */
export const heroSlides = [
  { key: "overview", src: "/product/hero-overview.webp" },
  { key: "crm", src: "/product/hero-crm.webp" },
  { key: "omnichannel", src: "/product/hero-omnichannel.webp" },
] as const;

/** Physical offices shown on the contact map. Coordinates are structural;
 *  localized name/tag/address live under `contactPage.offices.<key>`. */
export const offices = [
  { key: "itu", lat: 41.1056, lng: 29.0233, primary: true },
  { key: "sancaktepe", lat: 41.0007, lng: 29.2314, primary: false },
] as const;

export type OfficeKey = (typeof offices)[number]["key"];

/** Social links (brand-level, not localized). */
export const socialLinks = [
  { name: "x", href: "https://x.com/corex360" },
  { name: "linkedin", href: "https://www.linkedin.com/company/corex360" },
  { name: "github", href: "https://github.com/corex360" },
  { name: "youtube", href: "https://youtube.com/@corex360" },
] as const;

/** Real client/partner logos (processed to uniform light monochrome PNGs in
 *  public/logos). Shown on the trust strip. */
export const trustLogos = [
  { slug: "toki", name: "TOKİ" },
  { slug: "emlak-konut", name: "Emlak Konut" },
  { slug: "ems-yapi", name: "EMS Yapı" },
  { slug: "mbd", name: "MBD İnşaat" },
  { slug: "seba", name: "SEBA İnşaat" },
  { slug: "losev", name: "LÖSEV" },
] as const;
