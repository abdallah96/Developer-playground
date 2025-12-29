import Link from "next/link";
import { Card, Badge } from "@/components/ui";

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: `
## Installation

Clone the repository and install dependencies:

\`\`\`bash
git clone <repository-url>
cd developer-playground
yarn install
\`\`\`

## Development

Start the development server:

\`\`\`bash
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Storybook

Launch Storybook for component exploration:

\`\`\`bash
yarn storybook
\`\`\`

Storybook will open at [http://localhost:6006](http://localhost:6006).
    `,
  },
  {
    id: "components",
    title: "Component Library",
    content: `
## Available Components

The component library includes 7 reusable, customizable components:

### Button
A versatile button with multiple variants, sizes, and states.

\`\`\`tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md" loading={false}>
  Click Me
</Button>
\`\`\`

**Props:**
- \`variant\`: "primary" | "secondary" | "outline" | "ghost" | "danger"
- \`size\`: "sm" | "md" | "lg"
- \`loading\`: boolean
- \`leftIcon\` / \`rightIcon\`: ReactNode
- \`fullWidth\`: boolean

### Card
A container component with glass morphism styling.

\`\`\`tsx
import { Card } from "@/components/ui";

<Card variant="gradient" hoverable header={<Title />} footer={<Actions />}>
  Content here
</Card>
\`\`\`

### Modal
An accessible dialog component with portal rendering.

\`\`\`tsx
import { Modal } from "@/components/ui";

<Modal isOpen={open} onClose={close} title="Dialog Title">
  Modal content
</Modal>
\`\`\`

### Input
A form input with labels, validation, and icons.

\`\`\`tsx
import { Input } from "@/components/ui";

<Input label="Email" error="Invalid email" leftIcon={<Icon />} />
\`\`\`

### Dropdown
A select component with custom styling.

\`\`\`tsx
import { Dropdown } from "@/components/ui";

<Dropdown
  options={[{ value: "1", label: "Option 1" }]}
  value={selected}
  onChange={setSelected}
/>
\`\`\`

### Badge
Status indicators and labels.

\`\`\`tsx
import { Badge } from "@/components/ui";

<Badge variant="success" dot>Active</Badge>
\`\`\`

### Toggle
A switch component for boolean values.

\`\`\`tsx
import { Toggle } from "@/components/ui";

<Toggle checked={enabled} onChange={setEnabled} label="Enable" />
\`\`\`
    `,
  },
  {
    id: "api-routes",
    title: "API Routes",
    content: `
## Available Endpoints

### GET /api/users

Fetch user data with optional filtering.

**Query Parameters:**
- \`role\`: Filter by user role
- \`limit\`: Limit number of results

**Response:**
\`\`\`json
{
  "success": true,
  "data": [...users],
  "meta": { "total": 5, "timestamp": "..." }
}
\`\`\`

### POST /api/users

Create a new user.

**Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Developer"
}
\`\`\`

### GET /api/posts

Fetch blog posts with optional filtering.

**Query Parameters:**
- \`category\`: Filter by category
- \`author\`: Filter by author name
- \`limit\`: Limit number of results

### POST /api/posts

Create a new post.

**Body:**
\`\`\`json
{
  "title": "Post Title",
  "excerpt": "Post excerpt...",
  "author": "Author Name",
  "category": "Tutorial"
}
\`\`\`
    `,
  },
  {
    id: "rendering",
    title: "Rendering Strategies",
    content: `
## Server-Side Rendering (SSR)

The SSR page fetches fresh data on every request using \`cache: "no-store"\`.

\`\`\`tsx
async function fetchData() {
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}
\`\`\`

## Static Site Generation (SSG)

SSG pages are pre-rendered at build time. Default behavior in Next.js 14.

\`\`\`tsx
// No special configuration needed
// Page is static by default
export default function StaticPage() {
  return <Content />;
}
\`\`\`

## Incremental Static Regeneration (ISR)

ISR pages regenerate after a specified time period.

\`\`\`tsx
// Revalidate every 10 minutes (600 seconds)
export const revalidate = 600;

export default async function ISRPage() {
  const data = await fetchData();
  return <Content data={data} />;
}
\`\`\`
    `,
  },
  {
    id: "middleware",
    title: "Middleware",
    content: `
## Authentication Middleware

The middleware protects routes under \`/demos/protected\`.

**How it works:**
1. Checks for \`token\` query parameter
2. Checks for \`auth-token\` cookie
3. Redirects to login if neither exists

**Valid token:** \`demo-secret-token\`

**Example access:**
\`\`\`
/demos/protected?token=demo-secret-token
\`\`\`

## API Middleware

All API routes get custom headers:
- \`x-api-version\`: API version
- \`x-request-id\`: Unique request identifier
    `,
  },
  {
    id: "deployment",
    title: "Deployment",
    content: `
## Deploy to Vercel

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy!

## Environment Variables

Create a \`.env.local\` file:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3000
API_SECRET_KEY=your-secret-key
\`\`\`

For production, set these in your Vercel project settings.

## Build Commands

\`\`\`bash
# Build for production
yarn build

# Start production server
yarn start

# Build Storybook
yarn build-storybook
\`\`\`
    `,
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="section-container">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <h2 className="font-display text-sm font-semibold text-midnight-400 uppercase tracking-wider mb-4">
                Documentation
              </h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block px-3 py-2 rounded-lg text-sm text-midnight-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-white/5">
                <h3 className="text-sm font-semibold text-midnight-400 mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/components"
                    className="block text-sm text-midnight-300 hover:text-white transition-colors"
                  >
                    → Component Demo
                  </Link>
                  <Link
                    href="/demos/api"
                    className="block text-sm text-midnight-300 hover:text-white transition-colors"
                  >
                    → API Playground
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          <main>
            <div className="mb-12">
              <Badge variant="info" className="mb-4">
                Documentation
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                Developer Playground
              </h1>
              <p className="text-lg text-midnight-300 max-w-2xl">
                Complete documentation for using the component library, API routes,
                and deploying your application.
              </p>
            </div>

            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <Card variant="elevated">
                    <h2 className="font-display text-2xl font-semibold mb-6 pb-4 border-b border-white/5">
                      {section.title}
                    </h2>
                    <div className="prose prose-invert prose-midnight max-w-none">
                      <div
                        className="text-midnight-300 space-y-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3 [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-midnight-200 [&_code]:text-sm [&_pre]:bg-black/30 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_strong]:text-white [&_a]:text-midnight-400 [&_a]:underline [&_a]:hover:text-white"
                        dangerouslySetInnerHTML={{
                          __html: section.content
                            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                            .replace(/`([^`]+)`/g, '<code>$1</code>')
                            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                            .replace(/## (.*)/g, '<h2>$1</h2>')
                            .replace(/### (.*)/g, '<h3>$1</h3>')
                            .replace(/\n\n/g, '</p><p>')
                            .replace(/^(.*)$/gm, (match) => {
                              if (match.startsWith('<') || match.startsWith('-')) return match;
                              return match;
                            })
                            .replace(/- (.*)/g, '<li>$1</li>')
                            .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>'),
                        }}
                      />
                    </div>
                  </Card>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

