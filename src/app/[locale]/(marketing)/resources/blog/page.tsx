import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import { SITE, blogPosts } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { BlogCover } from "@/components/marketing/blog-cover";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";
import { CircleCta } from "@/components/marketing/circle-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return pageMetadata({
    locale,
    path: "/resources/blog",
    title: `${t("hero.titlePre")} ${t("hero.titleEm")}`,
    description: t("hero.lead"),
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const base = `${SITE.url}/${locale}`;

  const [featured, ...rest] = blogPosts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${base}/resources/blog/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: base },
          { "@type": "ListItem", position: 2, name: t("crumbResources"), item: `${base}/resources` },
          { "@type": "ListItem", position: 3, name: t("label"), item: `${base}/resources/blog` },
        ],
      },
      {
        "@type": "Blog",
        "@id": `${base}/resources/blog/#blog`,
        name: `${t("hero.titlePre")} ${t("hero.titleEm")}`,
        description: t("hero.lead"),
        blogPost: blogPosts.map((p) => ({
          "@type": "BlogPosting",
          headline: t(`posts.${p.slug}.title`),
          description: t(`posts.${p.slug}.excerpt`),
          datePublished: p.isoDate,
          author: { "@type": "Person", name: p.author },
          url: `${base}/resources/blog/${p.slug}`,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-12 sm:pt-40 lg:pt-44 lg:pb-16">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 dark:hidden"
          style={{
            background:
              "radial-gradient(70% 55% at 50% -5%, color-mix(in srgb, var(--surface) 92%, transparent), transparent 68%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 end-[8%] -z-10 size-[30rem] rounded-full bg-accent/10 blur-[130px]"
        />
        <AuroraBackground className="-z-10 hidden opacity-50 dark:block" />
        <GridBackdrop className="-z-10 hidden dark:block" />

        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Breadcrumb
              items={[
                { label: t("crumbResources"), href: "/resources" },
                { label: t("label") },
              ]}
            />
          </Reveal>
          <Reveal style={{ animationDelay: "70ms" }} className="mt-8 max-w-2xl">
            <span className="label-eyebrow">{t("label")}</span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">{t("hero.titlePre")}</span>
              <span className="block font-serif font-normal italic text-foreground">
                {t("hero.titleEm")}
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              {t("hero.lead")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured (newest) ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-12 lg:pb-16">
        <Reveal>
          <Link
            href={`/resources/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-border bg-surface/40 transition-colors duration-500 hover:border-foreground/30 lg:grid-cols-2"
          >
            <div className="relative overflow-hidden border-b border-border lg:border-b-0 lg:border-e">
              <BlogCover
                slug={featured.slug}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-muted-2">
                <span className="rounded-full border border-accent/30 bg-surface/60 px-2.5 py-0.5 text-accent">
                  {t("meta.featured")}
                </span>
                <span>{t(`categories.${featured.category}`)}</span>
                <span aria-hidden>·</span>
                <span>{t(`posts.${featured.slug}.date`)}</span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold leading-[1.12] tracking-tight sm:text-3xl lg:text-[2.1rem]">
                {t(`posts.${featured.slug}.title`)}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                {t(`posts.${featured.slug}.excerpt`)}
              </p>
              <div className="mt-7 flex items-center gap-2 text-sm font-medium text-foreground/85">
                {t("meta.read")}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
                <span className="ms-auto text-xs text-muted-2">
                  {featured.readMins} {t("meta.readUnit")}
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ── Rest of the posts ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 lg:pb-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} style={{ animationDelay: `${(i % 3) * 70}ms` }}>
              <Link
                href={`/resources/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/40 transition-colors duration-500 hover:border-foreground/30"
              >
                <div className="overflow-hidden border-b border-border">
                  <BlogCover
                    slug={p.slug}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-muted-2">
                    <span className="text-accent">{t(`categories.${p.category}`)}</span>
                    <span aria-hidden>·</span>
                    <span>{t(`posts.${p.slug}.date`)}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight">
                    {t(`posts.${p.slug}.title`)}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {t(`posts.${p.slug}.excerpt`)}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4 text-xs text-muted-2">
                    <span>
                      {p.readMins} {t("meta.readUnit")}
                    </span>
                    <ArrowUpRight className="size-4 transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground rtl:-scale-x-100" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CircleCta />
    </>
  );
}
