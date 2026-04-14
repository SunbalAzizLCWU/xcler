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
  body: unknown[];
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
    <main className="min-h-screen bg-[#121212] px-6 text-zinc-100 sm:px-8 lg:px-10">
      <article className="max-w-3xl mx-auto py-20">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-emerald-300"
        >
          <span aria-hidden="true">←</span>
          <span>{t("backToBlog")}</span>
        </Link>

        {post.mainImage ? (
          <img
            src={urlFor(post.mainImage).width(1400).height(780).fit("crop").quality(82).url()}
            alt={post.imageAlt}
            className="mb-10 h-auto w-full rounded-2xl border border-zinc-800 object-cover"
          />
        ) : null}

        <h1 className="font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
          {post.title}
        </h1>

        <div className="prose prose-invert prose-emerald mt-10 max-w-none prose-headings:font-heading prose-p:text-zinc-300 prose-a:text-emerald-300 hover:prose-a:text-emerald-200">
          <PortableText value={post.body} />
        </div>
      </article>
    </main>
  );
}