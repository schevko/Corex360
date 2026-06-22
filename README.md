# Corex360

Birleşik **CRM · ERP · İş Zekâsı** SaaS platformu için premium pazarlama sitesi + uygulama iskeleti.
L Mimarlık'ın minimal estetiğinden ilham alan, daha gelişmiş **"Obsidian Aurora"** tasarım dili.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-değişkeni tabanlı tasarım token'ları)
- **next-intl** — 5 dil: `tr` (varsayılan) · `en` · `fr` · `ru` · `ar` (RTL)
- **React Three Fiber + three + drei** — WebGL hero sahnesi (lazy-load, SSR fallback)
- **motion** (Framer Motion) — mikro etkileşimler
- **lucide-react** — ikonlar

## Komutlar

```bash
npm run dev        # geliştirme sunucusu
npm run build      # üretim derlemesi (52 sayfa SSG)
npm start          # üretim sunucusu
npm run typecheck  # tsc --noEmit
```

## Yapı

```
src/
  app/
    [locale]/
      layout.tsx            # html, fontlar, sağlayıcılar, JSON-LD, global efektler
      (marketing)/          # public, statik (SSG) — SEO/GEO
        page.tsx            # hero · modüller · dashboard önizleme · özellikler · fiyat · SSS · CTA
        modules/[slug]/     # crm / erp / bi detay
        pricing · about · contact · resources
      app/                  # dashboard iskeleti (noindex)
    robots.ts · sitemap.ts · manifest.ts · llms.txt · icon.svg
  components/
    three/        # WebGL hero (client-only, lazy)
    marketing/    # navbar, hero, modüller, dashboard önizleme, fiyat, sss, footer ...
    app/          # sidebar, topbar, KPI kart
    ui/           # aurora bg, tilt, magnetic, charts (SVG), reveal, grain, cursor ...
    theme/        # koyu/açık tema
  i18n/ · lib/ · messages/  # 5 dil JSON (her biri 175 anahtar)
```

## Tasarım & performans ilkeleri

- **WebGL ≠ SEO riski**: 3D sahne `dynamic(ssr:false)` ile yalnızca istemcide; tüm metin/içerik SSR'da render edilir, Google + LLM'ler tam görür.
- **Tüm pazarlama sayfaları statik (SSG)** — ışık hızında, her dilde prerender.
- **GEO**: `llms.txt` makine-dostu site haritası + zengin JSON-LD (`SoftwareApplication`).
- **Erişilebilirlik**: `prefers-reduced-motion` tüm animasyonları nötralize eder; klavye odak halkaları.
- **Efektler**: aurora mesh, film grain, custom cursor, scroll progress, 3D tilt kartlar, magnetic butonlar, scroll-driven reveal (CSS `animation-timeline`).

## Notlar

- Marka/iletişim sabitleri: `src/lib/site.ts`
- Çeviriler: `src/messages/*.json` (parite: 5 dil × 175 anahtar)
- Demo veriler (dashboard): `src/lib/demo-data.ts`
- `app/` uygulaması şu an örnek verilerle çalışan bir **iskelet**tir (auth/DB sonraki faz).
