"use client";

import { useState, useEffect } from "react";

type SanitySlug = {
  current?: string;
};

interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  slug_de?: SanitySlug;
  slug_en?: SanitySlug;
  slug_legacy?: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    metaTitle: "",
    metaDescription: "",
    published: false,
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    const method = currentPost.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/blogs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentPost),
    });

    if (res.ok) {
      const data = await res.json();
      if (currentPost.id) {
        setPosts(posts.map((p) => (p.id === data.post.id ? data.post : p)));
      } else {
        setPosts([...posts, data.post]);
      }
      setIsEditing(false);
      setCurrentPost({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        tags: [],
        metaTitle: "",
        metaDescription: "",
        published: false,
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const res = await fetch("/api/admin/blogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const addTag = () => {
    if (tagInput.trim() && !currentPost.tags?.includes(tagInput.trim())) {
      setCurrentPost((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const getDisplaySlug = (post: BlogPost) => {
    return (
      post.slug_de?.current ||
      post.slug_en?.current ||
      post.slug_legacy ||
      post.slug ||
      "Missing Slug"
    );
  };

  const removeTag = (tag: string) => {
    setCurrentPost((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag) || [],
    }));
  };

  if (isEditing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-bold">
            {currentPost.id ? "Edit Post" : "New Blog Post"}
          </h1>
          <button
            onClick={() => setIsEditing(false)}
            className="text-sm text-richblack/50 dark:text-cream/50 hover:text-terracotta"
          >
            ← Back to list
          </button>
        </div>

        <div className="space-y-6 max-w-3xl">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={currentPost.title || ""}
              onChange={(e) => {
                setCurrentPost((prev) => ({
                  ...prev,
                  title: e.target.value,
                  slug: generateSlug(e.target.value),
                  metaTitle: prev.metaTitle || e.target.value,
                }));
              }}
              className="w-full rounded-xl border border-stone/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-terracotta"
              placeholder="Your Blog Post Title"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-2">
              URL Slug
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-richblack/40 dark:text-cream/40">
                xcler.dev/blog/
              </span>
              <input
                type="text"
                value={currentPost.slug || ""}
                onChange={(e) =>
                  setCurrentPost((prev) => ({
                    ...prev,
                    slug: e.target.value,
                  }))
                }
                className="flex-1 rounded-xl border border-stone/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-terracotta"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>
            <select
              value={currentPost.category || ""}
              onChange={(e) =>
                setCurrentPost((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-stone/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-terracotta"
            >
              <option value="">Select category</option>
              <option value="web-development">Web Development</option>
              <option value="app-development">App Development</option>
              <option value="wordpress">WordPress</option>
              <option value="shopify">Shopify</option>
              <option value="automation">Automation</option>
              <option value="ai">AI & Chatbots</option>
              <option value="business">Business Tips</option>
              <option value="case-study">Case Study</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {currentPost.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-stone/10 px-3 py-1 text-xs"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-terracotta hover:text-terracotta-dark"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 rounded-xl border border-stone/20 bg-transparent px-4 py-2 text-sm outline-none focus:border-terracotta"
                placeholder="Add a tag and press Enter"
              />
              <button
                onClick={addTag}
                className="rounded-xl bg-stone/10 px-4 py-2 text-sm hover:bg-stone/20 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Excerpt (short description)
            </label>
            <textarea
              rows={2}
              value={currentPost.excerpt || ""}
              onChange={(e) =>
                setCurrentPost((prev) => ({
                  ...prev,
                  excerpt: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-stone/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-terracotta resize-none"
              placeholder="A brief summary of the post..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Content (Markdown supported)
            </label>
            <textarea
              rows={15}
              value={currentPost.content || ""}
              onChange={(e) =>
                setCurrentPost((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-stone/20 bg-transparent px-4 py-3 font-mono text-sm outline-none focus:border-terracotta resize-y"
              placeholder="Write your blog post content here... Markdown is supported."
            />
          </div>

          {/* SEO Section */}
          <div className="border-t border-stone/10 pt-6">
            <h3 className="font-heading text-lg font-semibold mb-4">
              🔍 SEO Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Meta Title
                  <span className="text-richblack/30 dark:text-cream/30 ml-2">
                    ({(currentPost.metaTitle || "").length}/60)
                  </span>
                </label>
                <input
                  type="text"
                  value={currentPost.metaTitle || ""}
                  onChange={(e) =>
                    setCurrentPost((prev) => ({
                      ...prev,
                      metaTitle: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-stone/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-terracotta"
                  maxLength={60}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Meta Description
                  <span className="text-richblack/30 dark:text-cream/30 ml-2">
                    ({(currentPost.metaDescription || "").length}/160)
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={currentPost.metaDescription || ""}
                  onChange={(e) =>
                    setCurrentPost((prev) => ({
                      ...prev,
                      metaDescription: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-stone/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-terracotta resize-none"
                  maxLength={160}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentPost((prev) => ({ ...prev, published: true }));
                setTimeout(handleSave, 100);
              }}
              className="rounded-xl bg-terracotta px-8 py-3 text-white font-heading font-medium hover:bg-terracotta-dark transition-colors"
            >
              Publish
            </button>
            <button
              onClick={() => {
                setCurrentPost((prev) => ({ ...prev, published: false }));
                setTimeout(handleSave, 100);
              }}
              className="rounded-xl border border-stone/20 px-8 py-3 font-heading font-medium hover:border-terracotta transition-colors"
            >
              Save Draft
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-bold">Blog Posts</h1>
        <button
          onClick={() => {
            setCurrentPost({
              title: "",
              slug: "",
              excerpt: "",
              content: "",
              category: "",
              tags: [],
              metaTitle: "",
              metaDescription: "",
              published: false,
            });
            setIsEditing(true);
          }}
          className="rounded-xl bg-terracotta px-6 py-2.5 text-white text-sm font-heading font-medium hover:bg-terracotta-dark transition-colors"
        >
          + New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone/20 p-12 text-center">
          <p className="text-richblack/40 dark:text-cream/40">
            No blog posts yet. Create your first post to start building SEO
            authority.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-stone/10 dark:border-stone-dark/10 p-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{post.title}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      post.published
                        ? "bg-sage/10 text-sage"
                        : "bg-stone/10 text-stone"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-sm text-richblack/40 dark:text-cream/40 mt-1">
                  /blog/{getDisplaySlug(post)} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCurrentPost(post);
                    setIsEditing(true);
                  }}
                  className="rounded-lg px-3 py-1.5 text-xs border border-stone/20 hover:border-terracotta transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="rounded-lg px-3 py-1.5 text-xs border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}