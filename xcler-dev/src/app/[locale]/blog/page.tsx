import type { Metadata } from "next";
import { groq } from "next-sanity";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type BlogPostCard = {
  _id: string;
  title: string;
  slug: string;
  mainImage?: unknown;
  imageAlt: string;
  excerpt: string;
  publishedAt: string;
  authorName?: string;
};

const blogPostsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    "title": select($locale == "de" => coalesce(title_de, title_en), coalesce(title_en, title_de)),
    "slug": slug.current,
    mainImage,
    "imageAlt": coalesce(mainImage.alt, title_en, title_de, "Blog post image"),
    "excerpt": select($locale == "de" => pt::text(body_de), pt::text(body_en))[0...180],
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
    <header className="mx-auto max-w-3xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">{eyebrow}</p>
      <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-white md:text-6xl">{title}</h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
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
    <main className="min-h-screen bg-[#121212] text-zinc-100">
      <section className="section-padding">
        <div className="container-custom">
          <BlogPageHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />

          {posts.length === 0 ? (
            <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 p-12 text-center">
              <p className="text-zinc-400">{t("emptyState")}</p>
            </div>
          ) : (
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`} className="group block">
                  <article className="h-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/75 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/70 hover:shadow-[0_12px_35px_rgba(16,185,129,0.15)]">
                    <div className="relative h-52 w-full overflow-hidden bg-zinc-950">
                      {post.mainImage ? (
                        <img
                          src={urlFor(post.mainImage).width(960).height(560).fit("crop").quality(80).url()}
                          alt={post.imageAlt}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
                          <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
                            {t("imageFallback")}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                          {formatter.format(new Date(post.publishedAt))}
                        </p>
                        {post.authorName && (
                          <p className="text-xs text-zinc-500">
                            {t("byLabel")} {post.authorName}
                          </p>
                        )}
                      </div>

                      <h2 className="font-heading text-2xl font-semibold text-zinc-100 transition-colors group-hover:text-emerald-300">
                        {post.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>

                      <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-emerald-400/85">
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
    </main>
  );
}