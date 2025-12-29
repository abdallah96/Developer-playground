import Image from "next/image";
import { Card, Badge } from "@/components/ui";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  publishedAt: string;
  readTime: number;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt:
      "Exploring emerging technologies and trends that will shape how we build for the web in the coming years.",
    author: "Alex Chen",
    category: "Trends",
    publishedAt: "2024-12-20",
    readTime: 8,
    image: "https://picsum.photos/seed/future/800/400",
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    excerpt:
      "A comprehensive guide to React Server Components and how they revolutionize React applications.",
    author: "Sarah Miller",
    category: "React",
    publishedAt: "2024-12-15",
    readTime: 12,
    image: "https://picsum.photos/seed/react/800/400",
  },
  {
    id: 3,
    title: "Building Accessible Web Applications",
    excerpt:
      "Best practices and techniques for creating inclusive digital experiences for all users.",
    author: "Emily Davis",
    category: "Accessibility",
    publishedAt: "2024-12-10",
    readTime: 10,
    image: "https://picsum.photos/seed/a11y/800/400",
  },
  {
    id: 4,
    title: "CSS Architecture in Large Projects",
    excerpt:
      "Strategies for organizing and scaling CSS in enterprise-level applications.",
    author: "James Wilson",
    category: "CSS",
    publishedAt: "2024-12-05",
    readTime: 9,
    image: "https://picsum.photos/seed/css/800/400",
  },
  {
    id: 5,
    title: "Testing Modern JavaScript Applications",
    excerpt:
      "A practical guide to unit testing, integration testing, and E2E testing strategies.",
    author: "Michael Brown",
    category: "Testing",
    publishedAt: "2024-11-30",
    readTime: 14,
    image: "https://picsum.photos/seed/testing/800/400",
  },
  {
    id: 6,
    title: "GraphQL vs REST: When to Use Each",
    excerpt:
      "Comparing two popular API paradigms and understanding their strengths and weaknesses.",
    author: "Alex Chen",
    category: "API",
    publishedAt: "2024-11-25",
    readTime: 11,
    image: "https://picsum.photos/seed/graphql/800/400",
  },
];

export default function SSGPage() {
  const buildTime = new Date().toISOString();
  const categories = [...new Set(blogPosts.map((post) => post.category))];

  return (
    <div className="min-h-screen py-12">
      <div className="section-container">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="success" dot>Pre-rendered</Badge>
            <Badge variant="default">SSG</Badge>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Static Site Generation
          </h1>
          <p className="text-lg text-midnight-300 max-w-2xl mb-6">
            This page was pre-rendered at build time. The content is static and served
            instantly from the edge without any server-side processing.
          </p>

          <Card variant="outline" padding="sm">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-midnight-400">Generated at build:</span>
                <code className="font-mono text-midnight-200 bg-white/5 px-2 py-1 rounded">
                  {buildTime}
                </code>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-midnight-400">Posts:</span>
                <code className="font-mono text-midnight-200 bg-white/5 px-2 py-1 rounded">
                  {blogPosts.length}
                </code>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold mb-4">
            How SSG Works
          </h2>
          <Card variant="gradient">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-jade-500/30 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Build Time</h3>
                  <p className="text-sm text-midnight-400">
                    Page is rendered during the build process
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-jade-500/30 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Static HTML</h3>
                  <p className="text-sm text-midnight-400">
                    HTML is cached on the CDN edge
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-jade-500/30 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Instant Delivery</h3>
                  <p className="text-sm text-midnight-400">
                    Served instantly with no computation
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-midnight-400">Categories:</span>
            {categories.map((category) => (
              <Badge key={category} variant="default">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              variant="elevated"
              hoverable
              padding="none"
              className="overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="info">{post.category}</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-midnight-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-midnight-500">
                  <span>By {post.author}</span>
                  <div className="flex items-center gap-3">
                    <span>{post.publishedAt}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card variant="outline">
            <h3 className="font-semibold mb-3">Code Example</h3>
            <pre className="font-mono text-sm text-midnight-300 bg-black/30 p-4 rounded-lg overflow-x-auto">
{`// In Next.js 14 App Router, pages are SSG by default
// Just export a regular component without any data fetching

const blogPosts = [
  { id: 1, title: "...", excerpt: "..." },
  // Static data defined at build time
];

export default function SSGPage() {
  return <BlogList posts={blogPosts} />;
}

// For dynamic routes, use generateStaticParams:
export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}

