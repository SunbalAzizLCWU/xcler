import type { Metadata } from "next";
import { groq, PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type SanityBlogPost = {
  _id: string;
  title: string;
  slug: string;
  mainImage?: unknown;
  imageAlt: string;
  body: Array<Record<string, unknown>>;
};

const postBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    "title": select($locale == "de" => coalesce(title_de, title_en), coalesce(title_en, title_de)),
    "slug": slug.current,
    mainImage,
    "imageAlt": coalesce(mainImage.alt, title_en, title_de, "Blog post image"),
    "body": select($locale == "de" => body_de, body_en)
  }
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await client.fetch<SanityBlogPost | null>(postBySlugQuery, { slug, locale });

  if (!post) {
    return {
      title: "Post Not Found | XCLER",
    };
  }

  return {
    title: `${post.title} | XCLER`,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  const post = await client.fetch<SanityBlogPost | null>(postBySlugQuery, { slug, locale });
  if (!post) {
    notFound();
  }

  return (
    <section className="section-padding pt-32">
      <article className="container-custom max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-richblack/40 dark:text-cream/40 transition-colors hover:text-terracotta"
        >
          <span aria-hidden="true">←</span>
          <span>{t("backToBlog")}</span>
        </Link>

        {post.mainImage ? (
          <img
            src={urlFor(post.mainImage).width(1400).height(780).fit("crop").quality(82).url()}
            alt={post.imageAlt}
            className="mb-10 h-auto w-full rounded-2xl border border-stone/10 dark:border-stone-dark/20 object-cover"
          />
        ) : null}

        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {post.title}
        </h1>

        <div className="prose prose-lg mt-10 max-w-none dark:prose-invert prose-headings:font-heading prose-headings:text-richblack dark:prose-headings:text-white prose-p:text-richblack/70 dark:prose-p:text-cream/70 prose-a:text-terracotta hover:prose-a:text-terracotta-light">
          <PortableText value={post.body as any} />
        </div>
      </article>
    </section>
  );
}