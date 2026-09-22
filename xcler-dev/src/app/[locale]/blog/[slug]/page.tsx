import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ORG_ID } from "@/lib/structuredData";
import { buildPageLinkedDataGraph } from "@/lib/pageLinkedData";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog";
import { getCanonicalPath, getLanguageAlternates } from "@/lib/canonical";

type Locale = "en" | "de";

const BASE_URL = "https://xcler.dev";
const FALLBACK_OG_IMAGE = `${BASE_URL}/og-image-v2.webp`;

const toIsoDurationMinutes = (minutes?: number) => {
  if (!Number.isFinite(minutes)) return undefined;
  const safeMinutes = Math.max(1, Math.round(minutes as number));
  return `PT${safeMinutes}M`;
};

export async function generateStaticParams(): Promise<Array<{ locale: Locale; slug: string }>> {
  return getAllBlogSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = (localeParam === "en" ? "en" : "de") as Locale;
  const post = await getBlogPost(locale, slug);

  if (!post) {
    return {
      title: "Post Not Found | XCLER",
      alternates: {
        canonical: getCanonicalPath(locale, `/blog/${slug}`),
        languages: getLanguageAlternates(`/blog/${slug}`),
      },
    };
  }

  const resolvedCanonicalSlug = locale === "de" ? post.slugDe : post.slugEn;
  const description = post.seoDescription || post.excerpt;
  const title = post.seoTitle || post.title;
  const imageUrl = post.cover ? `${BASE_URL}${post.cover}` : FALLBACK_OG_IMAGE;
  const modifiedTime = post.updatedAt || post.publishedAt;

  return {
    title: `${title} | XCLER`,
    description,
    keywords: post.tags.length ? post.tags : undefined,
    alternates: {
      canonical: getCanonicalPath(locale, `/blog/${resolvedCanonicalSlug}`),
      languages: getLanguageAlternates(`/blog/${slug}`, {
        enPath: `/blog/${post.slugEn}`,
        dePath: `/blog/${post.slugDe}`,
      }),
    },
    openGraph: {
      type: "article",
      title: `${title} | XCLER`,
      description,
      url: getCanonicalPath(locale, `/blog/${resolvedCanonicalSlug}`),
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? "en_US" : "de_DE",
      images: [{ url: imageUrl, alt: post.coverAlt || title }],
      publishedTime: post.publishedAt,
      modifiedTime,
      tags: post.tags.length ? post.tags : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | XCLER`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = (localeParam === "en" ? "en" : "de") as Locale;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const post = await getBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

  const resolvedCanonicalSlug = locale === "de" ? post.slugDe : post.slugEn;
  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.excerpt;
  const modifiedTime = post.updatedAt || post.publishedAt;
  const timeRequired = toIsoDurationMinutes(post.readingTime);
  const seoImageUrl = post.cover ? `${BASE_URL}${post.cover}` : FALLBACK_OG_IMAGE;
  const formatter = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <JsonLd
        id={`page-graph-blog-${post.id}`}
        data={buildPageLinkedDataGraph({
          locale,
          path: `/blog/${resolvedCanonicalSlug}`,
          name: seoTitle,
          description: seoDescription,
          primaryImageUrl: seoImageUrl,
          datePublished: post.publishedAt,
          dateModified: modifiedTime,
          breadcrumbs: [
            { name: "XCLER", path: "/" },
            { name: locale === "de" ? "Blog" : "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${resolvedCanonicalSlug}` },
          ],
          entities: [
            {
              "@type": "BlogPosting",
              "@id": `${BASE_URL}${getCanonicalPath(locale, `/blog/${resolvedCanonicalSlug}`)}#article`,
              headline: seoTitle,
              description: seoDescription,
              image: seoImageUrl,
              author: {
                "@type": "Person",
                name: post.author,
              },
              publisher: { "@id": ORG_ID },
              datePublished: post.publishedAt,
              dateModified: modifiedTime,
              inLanguage: locale === "de" ? "de-DE" : "en-US",
              mainEntityOfPage: {
                "@id": `${BASE_URL}${getCanonicalPath(locale, `/blog/${resolvedCanonicalSlug}`)}#webpage`,
              },
              keywords: post.tags.length ? post.tags.join(", ") : undefined,
              timeRequired,
            },
          ],
        })}
      />
      <section className="section-padding pt-32">
        <article className="container-custom max-w-3xl">
          <Link
            href="/blog"
            locale={locale}
            className="mb-8 inline-flex items-center gap-2 text-sm text-richblack/40 dark:text-cream/40 transition-colors hover:text-terracotta"
          >
            <span aria-hidden="true">←</span>
            <span>{t("backToBlog")}</span>
          </Link>

          {post.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover}
              alt={post.coverAlt}
              className="mb-10 h-auto w-full rounded-2xl border border-stone/10 dark:border-stone-dark/20 object-cover"
            />
          ) : null}

          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cream/40">
            {formatter.format(new Date(post.publishedAt))}
            {post.author ? ` · ${t("byLabel")} ${post.author}` : ""}
            {post.readingTime ? ` · ${post.readingTime} min` : ""}
          </p>

          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div
            className="prose prose-lg mt-10 max-w-none dark:prose-invert prose-headings:font-heading prose-headings:text-richblack dark:prose-headings:text-white prose-p:text-richblack/70 dark:prose-p:text-cream/70 prose-a:text-terracotta hover:prose-a:text-terracotta-light prose-img:rounded-2xl prose-strong:text-cream prose-li:text-cream/70 prose-blockquote:border-sage prose-blockquote:text-cream/80"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </section>
    </>
  );
}
