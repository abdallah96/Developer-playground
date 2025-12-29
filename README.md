# Developer Playground

A comprehensive Next.js 14 playground showcasing components, SSR, SSG, ISR, API routes, middleware, and modern web development best practices.

## ✨ Features

### Component Library
- **7 Reusable Components**: Button, Card, Modal, Input, Dropdown, Badge, Toggle
- **Customizable Props**: Variants, sizes, states, and more
- **Storybook Integration**: Interactive component exploration
- **TypeScript Support**: Full type safety

### Next.js Feature Demos
- **SSR Page**: Server-side rendered page with live data fetching
- **SSG Page**: Static site generation with pre-rendered content
- **ISR Page**: Incremental static regeneration (10-minute revalidation)
- **API Routes**: RESTful endpoints (`/api/users`, `/api/posts`)
- **Middleware**: Authentication simulation and request handling

### Performance Optimizations
- **Lazy Loading**: Dynamic imports for heavy components
- **Image Optimization**: Using `next/image` for optimized images
- **Code Splitting**: Automatic bundle optimization
- **React Memoization**: `memo`, `useMemo`, `useCallback` for performance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd developer-playground

# Install dependencies
yarn install
```

### Development

```bash
# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Storybook

```bash
# Launch Storybook
yarn storybook
```

Storybook opens at [http://localhost:6006](http://localhost:6006).

## 📁 Project Structure

```
developer-playground/
├── .storybook/           # Storybook configuration
├── public/               # Static assets
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   │   ├── users/
│   │   │   └── posts/
│   │   ├── components/   # Component demo page
│   │   ├── demos/        # Feature demo pages
│   │   │   ├── ssr/
│   │   │   ├── ssg/
│   │   │   ├── isr/
│   │   │   ├── api/
│   │   │   ├── lazy/
│   │   │   └── protected/
│   │   ├── docs/         # Documentation page
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   └── Navigation.tsx
│   ├── middleware.ts     # Next.js middleware
│   └── stories/          # Storybook stories
├── tailwind.config.ts
└── package.json
```

## 🧩 Components

### Button
```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md" loading={false}>
  Click Me
</Button>
```

### Card
```tsx
import { Card } from "@/components/ui";

<Card variant="gradient" hoverable>
  Content
</Card>
```

### Modal
```tsx
import { Modal } from "@/components/ui";

<Modal isOpen={open} onClose={close} title="Title">
  Content
</Modal>
```

### Input
```tsx
import { Input } from "@/components/ui";

<Input label="Email" placeholder="Enter email" error="Invalid" />
```

### Dropdown
```tsx
import { Dropdown } from "@/components/ui";

<Dropdown options={options} value={value} onChange={setValue} />
```

### Badge
```tsx
import { Badge } from "@/components/ui";

<Badge variant="success" dot>Active</Badge>
```

### Toggle
```tsx
import { Toggle } from "@/components/ui";

<Toggle checked={enabled} onChange={setEnabled} label="Enable" />
```

## 🔌 API Routes

### GET /api/users
Fetch users with optional filtering.

```bash
GET /api/users?role=Developer&limit=5
```

### POST /api/users
Create a new user.

```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Developer"
}
```

### GET /api/posts
Fetch posts with optional filtering.

```bash
GET /api/posts?category=Tutorial&limit=3
```

### POST /api/posts
Create a new post.

## 🔒 Middleware

The middleware protects routes under `/demos/protected`.

Access with token:
```
/demos/protected?token=demo-secret-token
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Configure environment variables
4. Deploy

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-domain.com
API_SECRET_KEY=your-secret-key
```

## 📦 Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn storybook    # Launch Storybook
yarn build-storybook  # Build Storybook
```

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Components**: React 18
- **Documentation**: Storybook 8
- **Deployment**: Vercel-ready

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

