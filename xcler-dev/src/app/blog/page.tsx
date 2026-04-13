// src/app/blog/page.tsx
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | XCLER — Web Development, Automation & AI Insights",
  description:
    "Expert insights on web development, app development, WordPress, Shopify, workflow automation, and AI chatbots. Tips and guides for businesses in Germany.",
};

function getPublishedPosts() {
  const blogsFile = path.join(process.cwd(), "data", "blogs.json");
  if (!fs.existsSync(blogsFile)) return [];
  const blogs = JSON.parse(fs.readFileSync(blogsFile, "utf-8"));
  return blogs.filter((b: any) => b.published);
}

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
              Blog
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Thoughts, guides,
            <br />
            <span className="text-terracotta">and insights.</span>
          </h1>
          <p className="mt-4 text-lg text-richblack/50 dark:text-cream/50">
            Real talk about web development, automation, and building digital
            products that work.
          </p>
        </div>

        <div className="mt-16">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone/20 p-16 text-center">
              <p className="text-richblack/40 dark:text-cream/40 text-lg">
                Blog posts coming soon. Stay tuned.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 overflow-hidden transition-all duration-300 hover:border-terracotta/20 hover:shadow-lg hover:-translate-y-1">
                    <div className="h-48 bg-gradient-to-br from-stone/10 to-stone/5 flex items-center justify-center">
                      <span className="font-mono text-xs text-stone/40 uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="rounded-full bg-terracotta/10 px-2.5 py-0.5 text-xs text-terracotta">
                          {post.category}
                        </span>
                        <span className="text-xs text-richblack/30 dark:text-cream/30">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <h2 className="font-heading text-xl font-semibold group-hover:text-terracotta transition-colors">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm text-richblack/50 dark:text-cream/50 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {post.tags?.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="rounded-full bg-stone/10 px-2 py-0.5 font-mono text-[10px]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}