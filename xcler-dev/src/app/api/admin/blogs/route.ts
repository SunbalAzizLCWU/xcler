import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const blogsFile = path.join(process.cwd(), "data", "blogs.json");

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readBlogs() {
  ensureDataDir();
  if (!fs.existsSync(blogsFile)) return [];
  return JSON.parse(fs.readFileSync(blogsFile, "utf-8"));
}

function writeBlogs(blogs: any[]) {
  ensureDataDir();
  fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
}

export async function GET() {
  return NextResponse.json({ posts: readBlogs() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const blogs = readBlogs();

    const newPost = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    blogs.push(newPost);
    writeBlogs(blogs);

    return NextResponse.json({ post: newPost });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const blogs = readBlogs();

    const index = blogs.findIndex((b: any) => b.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    blogs[index] = { ...blogs[index], ...body, updatedAt: new Date().toISOString() };
    writeBlogs(blogs);

    return NextResponse.json({ post: blogs[index] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    let blogs = readBlogs();
    blogs = blogs.filter((b: any) => b.id !== id);
    writeBlogs(blogs);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}