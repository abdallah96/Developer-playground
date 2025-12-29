import { NextResponse } from "next/server";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  publishedAt: string;
  readTime: number;
  image: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt:
      "Learn how to build modern web applications with Next.js 14 and the new App Router.",
    author: "Alex Chen",
    category: "Tutorial",
    publishedAt: "2024-12-15",
    readTime: 8,
    image: "https://picsum.photos/seed/nextjs/800/400",
  },
  {
    id: 2,
    title: "Mastering React Server Components",
    excerpt:
      "Deep dive into React Server Components and how they change the way we build applications.",
    author: "Sarah Miller",
    category: "Deep Dive",
    publishedAt: "2024-12-10",
    readTime: 12,
    image: "https://picsum.photos/seed/rsc/800/400",
  },
  {
    id: 3,
    title: "Building a Design System with Tailwind CSS",
    excerpt:
      "Create a scalable and maintainable design system using Tailwind CSS utility classes.",
    author: "Emily Davis",
    category: "Design",
    publishedAt: "2024-12-05",
    readTime: 10,
    image: "https://picsum.photos/seed/tailwind/800/400",
  },
  {
    id: 4,
    title: "TypeScript Best Practices in 2024",
    excerpt:
      "Essential TypeScript patterns and practices for building type-safe applications.",
    author: "James Wilson",
    category: "Best Practices",
    publishedAt: "2024-11-28",
    readTime: 15,
    image: "https://picsum.photos/seed/typescript/800/400",
  },
  {
    id: 5,
    title: "Optimizing Next.js Performance",
    excerpt:
      "Techniques and strategies to maximize the performance of your Next.js applications.",
    author: "Michael Brown",
    category: "Performance",
    publishedAt: "2024-11-20",
    readTime: 11,
    image: "https://picsum.photos/seed/performance/800/400",
  },
  {
    id: 6,
    title: "API Design Patterns for Modern Apps",
    excerpt:
      "Best practices for designing RESTful and GraphQL APIs for modern web applications.",
    author: "Alex Chen",
    category: "Backend",
    publishedAt: "2024-11-15",
    readTime: 9,
    image: "https://picsum.photos/seed/api/800/400",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const author = searchParams.get("author");
  const limit = searchParams.get("limit");

  let filteredPosts = [...posts];

  if (category) {
    filteredPosts = filteredPosts.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (author) {
    filteredPosts = filteredPosts.filter((post) =>
      post.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (limit) {
    filteredPosts = filteredPosts.slice(0, parseInt(limit, 10));
  }

  return NextResponse.json({
    success: true,
    data: filteredPosts,
    meta: {
      total: filteredPosts.length,
      categories: [...new Set(posts.map((p) => p.category))],
      timestamp: new Date().toISOString(),
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt, author, category } = body;

    if (!title || !excerpt || !author || !category) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, excerpt, author, and category are required",
        },
        { status: 400 }
      );
    }

    const newPost: Post = {
      id: posts.length + 1,
      title,
      excerpt,
      author,
      category,
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: Math.ceil(excerpt.length / 200) + 5,
      image: `https://picsum.photos/seed/${title.toLowerCase().replace(/\s+/g, "")}/800/400`,
    };

    return NextResponse.json({
      success: true,
      data: newPost,
      message: "Post created successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}

