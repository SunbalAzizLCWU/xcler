// src/app/blog/[slug]/page.tsx
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";

function getPost(slug: string) {
  const blogsFile = path.join(process.cwd(), "data", "blogs.json");
  if (!fs.existsSync(blogsFile)) return null;
  const blogs = JSON.parse(fs.readFileSync(blogsFile, "utf-8"));
  return blogs.find((b: any) => b.slug === slug && b.published) || null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: ["XCLER"],
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // Simple markdown-to-HTML (basic)
  const htmlContent = post.content
    .replace(/^### (.*$)/gim, '<h3 class="font-heading text-xl font-semibold mt-8 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="font-heading text-2xl font-bold mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="font-heading text-3xl font-bold mt-12 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, '<code class="bg-stone/10 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\n\n/g, '</p><p class="mt-4 leading-relaxed text-richblack/70 dark:text-cream/70">')
    .replace(/^(?!<[h|p|u|o|l])(.+)/gm, '<p class="mt-4 leading-relaxed text-richblack/70 dark:text-cream/70">$1</p>');

  // JSON-LD for article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "XCLER",
      url: "https://xcler.dev",
    },
    publisher: {
      "@type": "Organization",
      name: "XCLER",
      url: "https://xcler.dev",
    },
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="section-padding pt-32">
        <div className="container-custom max-w-3xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-richblack/40 dark:text-cream/40 hover:text-terracotta transition-colors mb-8"
          >
            ← Back to Blog
          </Link>

          {/* Header */}
          <header>
            <div className="flex items-center gap-3 mb-4">
              <span className="rounded-full bg-terracotta/10 px-3 py-1 text-xs text-terracotta font-medium">
                {post.category}
              </span>
              <span className="text-sm text-richblack/40 dark:text-cream/40">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 text-lg text-richblack/50 dark:text-cream/50">
                {post.excerpt}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-stone/10 px-3 py-1 font-mono text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div
            className="mt-12 prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-richblack dark:bg-cream/5 p-8 text-center text-cream">
            <h3 className="font-heading text-2xl font-bold">
              Need help with your project?
            </h3>
            <p className="mt-2 text-cream/60">
              We&apos;re ready to build something amazing together.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3 text-white font-heading font-medium hover:bg-terracotta-light transition-colors"
            >
              Start a Project →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}