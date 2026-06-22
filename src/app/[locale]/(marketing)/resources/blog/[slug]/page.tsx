import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { SITE, blogPosts } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { BlogCover } from "@/components/marketing/blog-cover";
import { AuroraBackground, GridBackdrop } from "@/components/ui/aurora-background";
import { CircleCta } from "@/components/marketing/circle-cta";

type Block = { kind: "p" | "h" | "quote"; text: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!blogPosts.some((p) => p.slug === slug)) return {};
  const t = await getTranslations({ locale, namespace: "blog" });
  return pageMetadata({
    locale,
    path: `/resources/blog/${slug}`,
    title: t(`posts.${slug}.title`),
    description: t(`posts.${slug}.excerpt`),
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const base = `${SITE.url}/${locale}`;
  const blocks = t.raw(`posts.${slug}.blocks`) as Block[];
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${base}/resources/blog/${slug}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: base },
          { "@type": "ListItem", position: 2, name: t("crumbResources"), item: `${base}/resources` },
          { "@type": "ListItem", position: 3, name: t("label"), item: `${base}/resources/blog` },
          { "@type": "ListItem", position: 4, name: t(`posts.${slug}.title`), item: `${base}/resources/blog/${slug}` },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${base}/resources/blog/${slug}/#post`,
        headline: t(`posts.${slug}.title`),
        description: t(`posts.${slug}.excerpt`),
        datePublished: post.isoDate,
        author: { "@type": "Person", name: post.author },
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
        articleSection: t(`categories.${post.category}`),
        inLanguage: locale,
        mainEntityOfPage: `${base}/resources/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-10 sm:pt-40 lg:pt-44">
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

        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Breadcrumb
              items={[
                { label: t("crumbResources"), href: "/resources" },
                { label: t("label"), href: "/resources/blog" },
                { label: t(`posts.${slug}.title`) },
              ]}
            />
          </Reveal>
          <Reveal style={{ animationDelay: "70ms" }} className="mt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-muted-2">
              <span className="text-accent">{t(`categories.${post.category}`)}</span>
              <span aria-hidden>·</span>
              <span>{t(`posts.${slug}.date`)}</span>
              <span aria-hidden>·</span>
              <span>
                {post.readMins} {t("meta.readUnit")}
              </span>
            </div>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {t(`posts.${slug}.title`)}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              {t(`posts.${slug}.excerpt`)}
            </p>
            <p className="mt-7 text-sm text-muted-2">
              <span className="text-muted">{t("meta.by")}</span>{" "}
              <span className="font-medium text-foreground/85">{post.author}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Cover ────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6">
        <Reveal>
          <BlogCover
            slug={slug}
            className="aspect-[16/9] w-full rounded-3xl border border-border object-cover"
          />
        </Reveal>
      </section>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <article className="mx-auto max-w-[680px] px-6 py-16 lg:py-20">
        {blocks.map((b, i) => {
          if (b.kind === "h") {
            return (
              <Reveal
                as="h2"
                key={i}
                className="mt-12 font-display text-2xl font-semibold tracking-tight first:mt-0 sm:text-[1.7rem]"
              >
                {b.text}
              </Reveal>
            );
          }
          if (b.kind === "quote") {
            return (
              <Reveal
                as="blockquote"
                key={i}
                className="my-10 border-s-2 border-border-strong ps-6 font-display text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl"
              >
                {b.text}
              </Reveal>
            );
          }
          return (
            <Reveal
              as="p"
              key={i}
              className="mt-5 text-[17px] leading-[1.75] text-foreground/80"
            >
              {b.text}
            </Reveal>
          );
        })}

        <div className="mt-14 border-t border-border pt-8">
          <Link
            href="/resources/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/85"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
            {t("back")}
          </Link>
        </div>
      </article>

      {/* ── Related ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 lg:pb-28">
        <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          {t("related")}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {related.map((p, i) => (
            <Reveal key={p.slug} style={{ animationDelay: `${i * 80}ms` }}>
              <Link
                href={`/resources/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/40 transition-colors duration-500 hover:border-foreground/30 sm:flex-row"
              >
                <div className="overflow-hidden border-b border-border sm:w-2/5 sm:border-b-0 sm:border-e">
                  <BlogCover
                    slug={p.slug}
                    className="aspect-[16/10] size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-2">
                    <span className="text-accent">{t(`categories.${p.category}`)}</span>
                  </div>
                  <h3 className="mt-2.5 font-display text-base font-semibold leading-snug tracking-tight">
                    {t(`posts.${p.slug}.title`)}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-2">
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
