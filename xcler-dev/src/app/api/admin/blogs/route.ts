import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAllBlogMetas } from "@/lib/blog";

const blogsFile = path.join(process.cwd(), "data", "blogs.json");

type BlogRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
};

type BlogRequestBody = Partial<BlogRecord> & {
  id?: string;
};

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readBlogs() {
  ensureDataDir();
  if (!fs.existsSync(blogsFile)) return [];
  return JSON.parse(fs.readFileSync(blogsFile, "utf-8")) as BlogRecord[];
}

function writeBlogs(blogs: BlogRecord[]) {
  ensureDataDir();
  fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
}

export async function GET() {
  const en = getAllBlogMetas("en");
  const posts = en.map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: "",
    category: "blog",
    tags: post.tags,
    metaTitle: post.seoTitle,
    metaDescription: post.seoDescription,
    published: true,
    createdAt: post.publishedAt,
    updatedAt: post.updatedAt || post.publishedAt,
    slug_de: { current: post.slugDe },
    slug_en: { current: post.slugEn },
  }));

  // Merge optional local admin drafts if present.
  const local = readBlogs();
  return NextResponse.json({ posts: [...posts, ...local] });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BlogRequestBody;
    const blogs = readBlogs();

    const newPost: BlogRecord = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    blogs.push(newPost);
    writeBlogs(blogs);

    return NextResponse.json({ post: newPost });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as BlogRequestBody;
    const blogs = readBlogs();

    const index = blogs.findIndex((b) => b.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    blogs[index] = { ...blogs[index], ...body, updatedAt: new Date().toISOString() } as BlogRecord;
    writeBlogs(blogs);

    return NextResponse.json({ post: blogs[index] });
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = (await request.json()) as { id?: string };
    let blogs = readBlogs();
    blogs = blogs.filter((b) => b.id !== id);
    writeBlogs(blogs);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
