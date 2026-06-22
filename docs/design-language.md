# Corex360 — Tasarım Dili & Modül Sayfası Blueprint'i

> Bu doküman Corex360 pazarlama sitesinin **tasarım dilini** baştan sona tanımlar ve
> **CRM modül sayfasını referans şablon** olarak belgeler. ERP, BI ve sonraki tüm
> modül sayfaları bu blueprint'ten — ama her biri **kendine özgü dokunuşlarla** — üretilir.
>
> Kaynak gerçeği: `src/app/globals.css` (token'lar), `src/lib/site.ts` (yapı),
> `src/messages/*.json` (kopya), `src/app/[locale]/(marketing)/modules/[slug]/page.tsx` (CRM şablonu).

---

## 1. Felsefe

**Premium monokrom — sıcak fildişi.** Renkli accent yok; kontrast ve derinlik
sıcak grafit ile katman/gölge merdiveninden gelir. Apple / Linear / Vercel sadeliği.

Üç ilke:
1. **Karmaşadan düzen.** Her ekran dağınıklığı tek bir canlı gerçeklik katmanında bitirir.
2. **Sade ama derin.** Karmaşık altyapı, sade deneyim. "360°" markanın kalbidir.
3. **WebGL asla SEO'yu bloklamaz** ve sayfalar `setRequestLocale(locale)` ile RSC kalır.

İçerik sesi: **makale gibi**, kısa, dürüst, abartısız. Türkçe birincil; 5 dil (tr/en/ar/ru/fr),
AR = RTL.

---

## 2. Renk token'ları (`globals.css`)

Light varsayılan; `.dark` opt-in. Hepsi CSS değişkeni + Tailwind `@theme` köprüsü.

| Token | Light | Dark | Kullanım |
|---|---|---|---|
| `--background` | `#f3f1ea` sıcak fildişi | `#100f0d` | sayfa zemini |
| `--surface` | `#fbfaf5` | `#181714` | yükseltilmiş kart |
| `--surface-2` | `#ece9e0` | `#201e1a` | +1 katman / band |
| `--surface-3` | `#e1dcd0` | `#28251f` | +2 hover |
| `--border` | `#e0dbce` | `#2c2a25` | kıl çizgi |
| `--border-strong` | `#cdc6b6` | `#3a372f` | belirgin kenar |
| `--foreground` | `#1c1a15` | `#f1eee8` | metin |
| `--muted` / `--muted-2` | `#5f594e` / `#8a8377` | `#a09a8f` / `#6e695f` | ikincil/üçüncül |
| `--accent` | `#1c1a15` (grafit) | `#f1eee8` | vurgu = yüksek kontrast, **altın yok** |
| `--glow` / `--ring` | foreground %16 / %40 | foreground %50 / %45 | parıltı/odak |

Tailwind sınıfı olarak: `bg-background`, `bg-surface`, `bg-surface-2`, `border-border`,
`border-border-strong`, `text-foreground`, `text-muted`, `text-muted-2`, `text-accent`.

**Durum renkleri (yalnız fonksiyonel, ölçülü):** Tailwind paletinden `emerald` (aktif/başarı),
`sky` (bilgi/görüşme), `amber` (bekleyen) — her zaman `dark:` varyantıyla
(`text-emerald-600 dark:text-emerald-400`, zemin `bg-emerald-500/10`). Asla dominant değil.

---

## 3. Tipografi

- `--font-display` → Outfit (başlıklar)
- `--font-serif` → Outfit italic (vurgu kelimesi)
- `--font-sans` → Manrope (gövde) — RTL'de Arabic font öne geçer
- `--font-mono` → sayısal/tablo (`.tabular` = `tabular-nums` + mono)

Ölçek (display başlıklar):
- Hero `text-[2.8rem] sm:text-6xl lg:text-7xl`, `leading-[1.03] tracking-tight`
- Bölüm başlığı (h2) `text-3xl sm:text-4xl`, `leading-[1.1]`
- Kart başlığı (h3) `text-lg–text-xl`
- Eyebrow: `.label-eyebrow` (uppercase, `tracking-[0.24em]`, `text-muted`, `0.7rem`)

**İmza deseni:** başlık iki blok — düz `titlePre` + altında `font-serif font-normal italic`
`titleEm`. Örn. *Müşteri ilişkilerinizi* / *güçlendirin.*

---

## 4. Yerleşim & ritim

- Konteyner: `mx-auto max-w-6xl px-6` (geniş bölümler), dar metin `max-w-3xl`/`max-w-5xl`.
- Bölüm dikey boşluğu: `py-20 lg:py-28` (standart), `py-24 lg:py-28` (band'ler).
- **Katman bandı:** ayırmak istenen bölüm `border-y border-border bg-surface-2` ile ayrı
  bir katmana alınır. Band'leri **kümeleme** — aralarına varsayılan zeminli bölüm koy.
- Reveal: her blok `<Reveal>` ile sarılır (CSS scroll-timeline, sıfır JS, reduced-motion güvenli).
  Stagger: `style={{ animationDelay: \`${i*70}ms\` }}`.

---

## 5. Yüzeyler & yükseklik

- Kart: `rounded-3xl border border-border bg-surface/50` (+ `backdrop-blur-sm` istenirse).
- Tile/ikon kutusu: `rounded-xl border border-border bg-surface-2 size-9–12`, ikon `text-foreground/70`.
- Hover: `hover:border-border-strong` veya `group-hover:border-accent/40` + `shadow-[0_0_22px_-8px_var(--glow)]`.
- Köşe ölçeği: tiles `rounded-xl/2xl`, kartlar `rounded-3xl`, dev panel `rounded-[1.75rem]`.

---

## 6. İkonografi

`lucide-react` (kurulu sürüm 1.21). `strokeWidth` 1.5–1.7, boyut `size-4/5/6`.
İkonlar dizilerle **index bazlı** eşlenir (çeviri stringine göre değil) — örn.
`MGMT_ICONS`, `ACT_ICONS`, `INTEGRATION_ICONS`. Fallback hep `?? Check`/`?? Plug`.

---

## 7. Hareket (`globals.css` keyframes)

`animate-aurora` (mesh sürüklenme), `animate-spin-slow` (yörünge halkası), `animate-float`,
`pulse-ring` (canlı nokta), `.reveal` (scroll fade-rise), `page-enter`. Hepsi
`prefers-reduced-motion: reduce` altında nötrlenir.

---

## 8. Bölüm reçeteleri (yapı taşları)

Sıra: her biri yeniden kullanılabilir bir desen. Modül sayfaları bunları **harmanlayarak** kurulur.

1. **Hero (full-bleed editorial).** `min-h-[88–92svh] flex items-center justify-center`.
   Katmanlar: arka plan (foto **veya** kodlu/grafiksel motif, `dark:hidden`) → dark için
   `AuroraBackground`+`GridBackdrop` (`hidden dark:block`) → atmosfer gradyanı (kenarlardan
   sayfa rengi erir) → scrim radial (merkez net). İçerik: eyebrow + `titlePre`/serif `titleEm`
   + lead + (ops.) CTA + alt "Keşfet" scroll-cue. **Minimal: tek fotoğraf, tek fikir.**
2. **SectionHeading** (`label`/`title`/`body`, `align`) — bölüm girişleri.
3. **Anlatı + görsel** (`grid lg:grid-cols-2`) — Vizyon bölümü.
4. **Demo poster** — `<img>` doğal oranda (kırpma yok) veya `DemoVideo` (poster+modal).
5. **Özellik ızgarası** — `bg-surface-2` band, `gap-px` ile hairline-bölmeli 3 sütun tile'lar,
   ikon kutusu + başlık + açıklama, hover glow.
6. **Metrik bandı** — sol başlık + sağda `grid-cols-2/4 gap-px` büyük rakamlar (display) + etiket.
7. **Yaşam döngüsü / yolculuk** — `bg-surface-2` katman, yatay **ilerleme rayı** (gradient
   `from-border-strong to-foreground/45`) üzerinde düğümler; iç nokta indexle koyulaşır
   (ilerleme), numara + isim + açıklama.
8. **Yetenek dizini (bento)** — geniş/dar (`lg:col-span-3` / `2`) iki kart; her öğe ikon
   kutusu + isim, başlıkta sayaç (`06`/`03`) + kıl ayraç, hover tile.
9. **Entegrasyonlar** — `bg-surface-2` band, sol başlık + sağda ikon-pill ızgarası +
   dashed "ve N+ araç" tile.
10. **Sosyal kanıt** — ortalı `Quote` + büyük blockquote + yazar·şirket; altta `trustLogos`
    şeridi (opacity 60, hover 100).
11. **İlişkili modüller + güven** — `bg-surface-2` band; cross-sell kartları
    (`moduleMeta[id].href` + ikon + ArrowUpRight) + altta `certs` pill satırı (ISO/SOC2/KVKK).
12. **FAQ** — `FaqSection namespace=... keys=[...]`, FAQPage JSON-LD ile aynalı (GEO).
13. **CircleCta** — kapanış çağrısı.

---

## 9. Referans şablon: CRM modül sayfası

`modules/[slug]/page.tsx` içinde `slug === "crm"` zengin şablonu. Bölüm akışı:

```
Hero (grafiksel 360° motif / orbit görsel)
 → Vizyon (anlatı + görsel)
 → Tanıtım (demo poster)
 → Özellikler (6 tile, surface-2 band)
 → Metrikler (Rakamlarla CRM)
 → Ekranlar (showcase görsel)
 → Yaşam Döngüsü (yolculuk rayı, surface-2 band)
 → Modül İçeriği (yetenek bento)
 → Entegrasyonlar (surface-2 band)
 → Sosyal Kanıt (alıntı + güven logoları)
 → İlişkili Modüller + Güven (surface-2 band)
 → SSS (FAQPage JSON-LD)
 → CircleCta
```

JSON-LD: `BreadcrumbList` + `SoftwareApplication` + `FAQPage` (`@graph`).
Kopya namespace'i: `moduleDetail.crm.*`. Band ritmi: özellikler / döngü / entegrasyon /
ilişkili = surface-2; aralarına varsayılan zemin.

---

## 10. Modül başına bespoke yön

Tüm modüller aynı iskeleti paylaşır; **kimlik** accent rolü, hero motifi, içerik açısı ve
mikro-dokunuşlarla ayrışır. (Tema monokrom; "accent" burada **motif/ikon dili** demek, renk değil.)

### CRM — Müşteri İlişkileri  *(referans, hazır)*
- Motif: **360° müşteri-ilişki yörüngesi** (merkez müşteri + bağlı kontak düğümleri).
- Açı: lead → sadık müşteri yolculuğu, tek müşteri hafızası.
- Durum rengi vurgusu: emerald (aktif/kazanıldı).

### ERP — Operasyon & Kaynaklar  *(üretilecek)*
- Motif: **akış/hat** — depo → satın alma → üretim → finans tek hatta düğümlerle; ya da
  modüler "blok/küp" ızgarası (ikon `Boxes`). Hero grafiği: bağlı tedarik hattı.
- Açı: "departmanlar arası boşluk yok — tek canlı akış." Stok, satın alma, üretim, fatura.
- Yaşam döngüsü yerine **operasyon hattı** (Sipariş → Stok → Üretim → Sevkiyat → Fatura).
- Metrikler: stok doğruluğu, sevkiyat süresi, mutabakat. Entegrasyon: muhasebe/e-fatura/banka.
- Mikro-dokunuş: yörünge yerine **yatay konveyör/ray** animasyonu; durum rengi amber/sky.

### BI — Karar & Öngörü  *(üretilecek)*
- Motif: **canlı grafik/sinyal** — sparkline, anomali noktası, dağılım; ikon `ChartSpline`.
- Açı: "ham veriden karara." Sürükle-bırak panolar, anomali motoru, doğal dil sorgu, AI tahmin.
- Yaşam döngüsü yerine **veri akışı** (Topla → Modelle → Görselleştir → Uyar → Tahmin et).
- Metrikler: sorgu hızı, tahmin doğruluğu, tespit edilen anomali. AI öngörü kartı öne çıkar.
- Mikro-dokunuş: hero'da nabız atan veri noktaları (`pulse-ring`), hafif grafik çizgileri;
  durum rengi sky/emerald.

**Kural:** her modül en az bir **kendine özgü bölüm** kazanır (CRM=yaşam döngüsü,
ERP=operasyon hattı, BI=veri akışı) ki sayfalar şablon-kopyası gibi durmasın.

---

## 11. Kopya & i18n kuralları

- Tüm metin `messages/*.json`; kod sadece anahtar tutar. 5 dil senkron.
- İkon/sıra **index** ile; çeviri stringine asla bağlanma.
- Marka/nötr değerler çevrilmez: `Corex360`, `WhatsApp`, `360°`, marka adları.
- Sayı/yüzde yerelleştirilir (`%40` ↔ `40%` ↔ `40 %`).
- Scroll-cue / "Keşfet" gibi paylaşılan etiketler **mevcut namespace değerini** kullanır;
  yeni dil/ton uydurma (tutarlılık).

---

## 12. SEO / GEO

- Her sayfa `generateMetadata` + `pageMetadata({locale, path, title, description})`.
- Zengin sayfalar `@graph` JSON-LD (Breadcrumb + SoftwareApplication + FAQPage).
- FAQ içeriği görünür Q&A ile JSON-LD'de **aynalı** (cevap üretici motorlar için).
- `generateStaticParams` tüm locale × slug; `setRequestLocale` ilk satırda.

---

## 13. Yapılacaklar (Task 2 ilerleme)

- [x] CRM referans şablonu (zengin) + 4 ek bölüm (metrik/entegrasyon/sosyal kanıt/ilişkili).
- [x] Tasarım dili dokümantasyonu (bu dosya).
- [ ] **ERP** bespoke zengin sayfa (operasyon hattı motifi).
- [ ] **BI** bespoke zengin sayfa (veri akışı / canlı grafik motifi).
- [ ] Her ikisi için 5 dilde kopya + JSON-LD + sitemap.
