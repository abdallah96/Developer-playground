import Link from "next/link";

const features = [
  {
    title: "Component Library",
    description: "5+ reusable React components with customizable props and Storybook integration.",
    href: "/components",
    icon: "🧩",
    gradient: "from-midnight-500 to-midnight-400",
  },
  {
    title: "SSR Demo",
    description: "Server-side rendered page fetching live data on each request.",
    href: "/demos/ssr",
    icon: "⚡",
    gradient: "from-ember-500 to-ember-400",
  },
  {
    title: "SSG Demo",
    description: "Static site generation with pre-rendered content at build time.",
    href: "/demos/ssg",
    icon: "📄",
    gradient: "from-jade-500 to-jade-400",
  },
  {
    title: "ISR Demo",
    description: "Incremental static regeneration with 2-minute revalidation.",
    href: "/demos/isr",
    icon: "🔄",
    gradient: "from-midnight-400 to-ember-400",
  },
  {
    title: "CSR Demo",
    description: "Client-side rendering with data fetching in the browser.",
    href: "/demos/csr",
    icon: "💻",
    gradient: "from-ember-400 to-jade-400",
  },
  {
    title: "API Routes",
    description: "Serverless API endpoints returning JSON data.",
    href: "/demos/api",
    icon: "🔌",
    gradient: "from-jade-400 to-midnight-400",
  },
  {
    title: "Documentation",
    description: "Learn how to use components, API routes, and deploy the project.",
    href: "/docs",
    icon: "📚",
    gradient: "from-jade-400 to-midnight-400",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="section-container py-20 lg:py-32">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-jade-400 animate-pulse" />
            <span className="text-sm font-medium text-midnight-200">Next.js 14 + React 18</span>
          </div>
          
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Developer
            <span className="block gradient-text">Playground</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-midnight-300 max-w-2xl mx-auto mb-10 animate-slide-up animate-delay-100">
            A comprehensive showcase of Next.js 14 features, reusable components, 
            and modern web development best practices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-200">
            <Link
              href="/components"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-midnight-500 to-midnight-600 text-white font-semibold hover:from-midnight-400 hover:to-midnight-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-midnight-500/25"
            >
              Explore Components
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 rounded-xl glass glass-hover font-semibold"
            >
              Read Documentation
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group p-6 rounded-2xl glass glass-hover card-shine animate-slide-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-midnight-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-midnight-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container py-20 border-t border-white/5">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["Next.js 14", "React 18", "TypeScript", "Tailwind CSS 3", "Storybook"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full glass text-sm font-medium text-midnight-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

