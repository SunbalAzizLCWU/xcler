import type { Metadata } from "next";
import { groq } from "next-sanity";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getCanonicalPath, getLanguageAlternates } from "@/lib/canonical";

export const revalidate = 60;
export const dynamic = "force-dynamic";

type BlogPostCard = {
  _id: string;
  title: string;
  slug?: string;
  slug_en?: { current?: string };
  slug_de?: { current?: string };
  slug_legacy?: string;
  mainImage?: unknown;
  imageAlt: string;
  excerpt: string;
  publishedAt: string;
  authorName?: string;
};

const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(_createdAt desc) {
    _id,
    "title": coalesce(select($locale == "de" => title_de, title_en), title, "Untitled"),
    "slug": coalesce(select($locale == "de" => slug_de.current, slug_en.current), select($locale == "de" => slug_en.current, slug_de.current), slug.current),
    "slug_en": slug_en,
    "slug_de": slug_de,
    "slug_legacy": slug.current,
    "mainImage": coalesce(select($locale == "de" => mainImage_de, mainImage_en), mainImage),
    "imageAlt": coalesce(select($locale == "de" => mainImage_de.alt, mainImage_en.alt), mainImage.alt, title_de, title_en, title, "Blog post image"),
    "excerpt": coalesce(select($locale == "de" => pt::text(body_de), pt::text(body_en)), pt::text(body), "")[0...180],
    "publishedAt": _createdAt,
    "authorName": author->name
  }
`;

function BlogPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="max-w-3xl">
      <div className="mb-4 flex items-center gap-4">
        <div className="line-decoration" />
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-richblack/40 dark:text-cream/40">
          {eyebrow}
        </p>
      </div>
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-richblack/50 dark:text-cream/50">
        {description}
      </p>
    </header>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getCanonicalPath(locale, "/blog"),
      languages: getLanguageAlternates("/blog"),
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const posts = await client.fetch<BlogPostCard[]>(blogPostsQuery, { locale });

  const formatter = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        <BlogPageHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        {posts.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-stone/20 dark:border-stone-dark/30 p-12 text-center">
            <p className="text-richblack/50 dark:text-cream/50">{t("emptyState")}</p>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => {
              const postSlug = locale === "de" ? post.slug_de?.current : post.slug_en?.current;
              const fallbackSlug = locale === "de" ? post.slug_en?.current : post.slug_de?.current;
              const resolvedSlug = postSlug || fallbackSlug || post.slug_legacy;

              if (!resolvedSlug) {
                return (
                  <article
                    key={post._id}
                    className="h-full overflow-hidden rounded-2xl border border-dashed border-stone/20 dark:border-stone-dark/20 bg-white dark:bg-richblack/30 p-6"
                  >
                    <p className="font-heading text-xl font-semibold">{post.title}</p>
                    <p className="mt-3 text-sm text-richblack/60 dark:text-cream/60">{post.excerpt}</p>
                    <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-richblack/40 dark:text-cream/40">Missing Slug</p>
                  </article>
                );
              }

              return (
                <Link key={post._id} href={`/blog/${post.slug}` as any} locale={locale} className="group block">
                <article className="h-full overflow-hidden rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/30 hover:shadow-xl">
                  <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-stone/20 to-stone/5 dark:from-stone-dark/20 dark:to-stone-dark/5">
                    {post.mainImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={urlFor(post.mainImage).width(960).height(560).fit("crop").quality(80).url()}
                        alt={post.imageAlt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-richblack/30 dark:text-cream/35">
                          {t("imageFallback")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-richblack/35 dark:text-cream/35">
                        {formatter.format(new Date(post.publishedAt))}
                      </p>
                      {post.authorName && (
                        <p className="text-xs text-richblack/40 dark:text-cream/40">
                          {t("byLabel")} {post.authorName}
                        </p>
                      )}
                    </div>

                    <h2 className="font-heading text-2xl font-semibold transition-colors group-hover:text-terracotta">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-richblack/60 dark:text-cream/60">
                      {post.excerpt}
                    </p>

                    <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-terracotta">
                      {t("readArticle")}
                    </p>
                  </div>
                </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}