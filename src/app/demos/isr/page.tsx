import Image from "next/image";
import { Card, Badge } from "@/components/ui";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  inStock: boolean;
  image: string;
}

function generateProducts(): Product[] {
  const categories = ["Electronics", "Clothing", "Books", "Home", "Sports"];
  const adjectives = ["Premium", "Classic", "Modern", "Essential", "Deluxe"];
  const nouns = ["Widget", "Gadget", "Device", "Tool", "Item"];

  return Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `${adjectives[i % adjectives.length]} ${nouns[i % nouns.length]} ${i + 1}`,
    description: `High-quality ${nouns[i % nouns.length].toLowerCase()} designed for everyday use with premium materials and excellent durability.`,
    price: Math.floor(Math.random() * 200) + 20 + Math.random(),
    category: categories[i % categories.length],
    rating: Math.floor(Math.random() * 2) + 3 + Math.random(),
    inStock: Math.random() > 0.3,
    image: `https://picsum.photos/seed/product${i + 1}${Date.now()}/400/300`,
  }));
}

export const revalidate = 120;

export default function ISRPage() {
  const products = generateProducts();
  const generatedAt = new Date().toISOString();
  const nextRevalidation = new Date(Date.now() + 120000).toISOString();

  return (
    <div className="min-h-screen py-12">
      <div className="section-container">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="warning" dot>Auto-refresh</Badge>
            <Badge variant="default">ISR</Badge>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Incremental Static Regeneration
          </h1>
          <p className="text-lg text-midnight-300 max-w-2xl mb-6">
            This page regenerates every 2 minutes. It combines the speed of static
            pages with the freshness of dynamic content.
          </p>

          <Card variant="outline" padding="sm">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-midnight-400">Generated:</span>
                <code className="font-mono text-midnight-200 bg-white/5 px-2 py-1 rounded">
                  {generatedAt}
                </code>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-midnight-400">Next update:</span>
                <code className="font-mono text-midnight-200 bg-white/5 px-2 py-1 rounded">
                  {nextRevalidation}
                </code>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold mb-4">
            How ISR Works
          </h2>
          <Card variant="gradient">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-ember-500/30 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Initial Build</h3>
                  <p className="text-sm text-midnight-400">
                    Page is pre-rendered at build time
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-ember-500/30 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Serve Cached</h3>
                  <p className="text-sm text-midnight-400">
                    Cached version served to users
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-ember-500/30 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Revalidate</h3>
                  <p className="text-sm text-midnight-400">
                    After 2 min, page regenerates
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-ember-500/30 flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Update Cache</h3>
                  <p className="text-sm text-midnight-400">
                    New version replaces old cache
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <h2 className="font-display text-2xl font-semibold mb-6">
          Product Catalog
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <Card
              key={product.id}
              variant="elevated"
              hoverable
              padding="none"
              className="overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="relative h-40">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="error">Out of Stock</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="default" size="sm">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-xs">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-1 truncate">
                  {product.title}
                </h3>
                <p className="text-midnight-400 text-xs mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.inStock && (
                    <Badge variant="success" size="sm" dot>
                      In Stock
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card variant="outline">
            <h3 className="font-semibold mb-3">Code Example</h3>
            <pre className="font-mono text-sm text-midnight-300 bg-black/30 p-4 rounded-lg overflow-x-auto">
{`// Set revalidation period (in seconds)
export const revalidate = 120; // 2 minutes

export default async function ISRPage() {
  // This data will be fetched at build time
  // and revalidated every 2 minutes
  const products = await fetchProducts();
  
  return <ProductGrid products={products} />;
}

// You can also use revalidatePath() or revalidateTag()
// for on-demand revalidation via API routes`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}

