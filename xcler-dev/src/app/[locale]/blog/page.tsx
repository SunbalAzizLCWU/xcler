import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { getAllBlogMetas } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seoMeta";

export const revalidate = 3600;

type Locale = "en" | "de";

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
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-light">
          {eyebrow}
        </p>
      </div>
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/60">
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

  return buildPageMetadata({
    locale,
    path: "/blog",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (localeParam === "en" ? "en" : "de") as Locale;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const posts = getAllBlogMetas(locale);

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
          <div className="panel mt-16 border-dashed p-12 text-center">
            <p className="text-cream/55">{t("emptyState")}</p>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id + post.slug}
                href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                locale={locale}
                className="group block"
              >
                <article className="panel panel-hover h-full overflow-hidden">
                  <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-stone/20 to-stone/5">
                    {post.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.cover}
                        alt={post.coverAlt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-cream/35">
                          {t("imageFallback")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-cream/35">
                        {formatter.format(new Date(post.publishedAt))}
                      </p>
                      {post.author && (
                        <p className="text-xs text-cream/40">
                          {t("byLabel")} {post.author}
                        </p>
                      )}
                    </div>

                    <h2 className="font-heading text-2xl font-semibold transition-colors group-hover:text-sage">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-cream/60">
                      {post.excerpt}
                    </p>

                    <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-sage">
                      {t("readArticle")}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
