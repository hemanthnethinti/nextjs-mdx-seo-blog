# ModernBlog - Next.js SEO Blog Platform

A production-ready, high-performance blog platform built with Next.js 16, TypeScript, Tailwind CSS, and MDX. This project implements static site generation, dark mode support, pagination, SEO optimization, and complete Docker containerization.

## Project Overview

ModernBlog is a complete blogging solution designed with modern web development practices. It combines the speed of static site generation with the flexibility of MDX for rich content creation. All pages are pre-rendered at build time, ensuring exceptional performance and SEO benefits.

### Key Capabilities

- Static Site Generation (SSG) for optimal performance
- MDX-based content with Markdown and React component support
- Comprehensive SEO optimization with meta tags, sitemap, and RSS feed
- Dark mode support with persistent theme preference
- Responsive design that works across all devices
- Production-ready Docker containerization
- TypeScript for type safety throughout the application
- Pagination support for blog listing
- Image optimization with automatic format conversion
- Syntax highlighting for code blocks
- Reading time calculation for articles

## Technology Stack

- **Framework**: Next.js 16.1.6 (Pages Router)
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.1
- **Content**: MDX with gray-matter for frontmatter parsing
- **SEO**: next-seo for meta tag management
- **Syntax Highlighting**: Prism React Renderer
- **Containerization**: Docker with Alpine Linux base
- **Node.js**: Version 22 LTS (minimum 20.9.0)
- **Package Manager**: npm (minimum 10.9.0)

## Architectural Decisions

### 1. Static Site Generation (SSG)

All pages are pre-built at compile time using Next.js `getStaticProps` and `getStaticPaths`. This approach provides:

- Instant page loads with minimal latency
- Improved SEO through complete server-side rendering
- Reduced server load and infrastructure costs
- Better user experience with consistent performance
- CDN-friendly static files that cache effectively

### 2. MDX for Content

MDX allows writing blog posts in Markdown while incorporating React components. Benefits include:

- Familiar Markdown syntax for content creators
- Ability to embed interactive components
- Type-safe frontmatter with TypeScript
- Automatic transformation to optimized React components

### 3. File-based Routing

Next.js Pages Router automatically creates routes from the file structure:

- `/pages/index.tsx` -> `/`
- `/pages/blog/index.tsx` -> `/blog`
- `/pages/posts/[slug].tsx` -> `/posts/{slug}`

This eliminates the need for explicit route configuration.

### 4. Component-Driven Architecture

Reusable components ensure consistent UI and easier maintenance:

- Layout wrapper with Navbar and Footer
- PostCard for blog previews
- Theme toggle for dark mode
- Pagination controls
- Custom MDX renderers for rich content

### 5. Docker Containerization

Multi-stage Docker build optimizes the production image:

- First stage: Build the Next.js application
- Second stage: Copy only production artifacts
- Alpine Linux with Node.js 22 base reduces image size
- Non-root user execution for security
- Health checks for monitoring

## Project Structure

```
nextjs-mdx-seo-blog/
├── posts/                          # Blog post source files
│   ├── getting-started-with-nextjs-14.mdx
│   ├── mastering-typescript-advanced-types.mdx
│   ├── responsive-layouts-tailwind.mdx
│   ├── modern-react-patterns.mdx
│   ├── seo-optimization-guide.mdx
│   └── docker-containerization-guide.mdx
│
├── public/                         # Static assets and generated files
│   ├── sitemap.xml                (auto-generated)
│   └── rss.xml                    (auto-generated)
│
├── scripts/                        # Build-time scripts
│   ├── generate-sitemap.js        # Creates sitemap.xml
│   └── generate-rss.js            # Creates RSS feed
│
├── src/
│   ├── components/                # Reusable React components
│   │   ├── Footer.tsx             # Footer with quick links
│   │   ├── Layout.tsx             # Main layout wrapper
│   │   ├── MDXComponents.tsx       # Custom MDX renderers
│   │   ├── Navbar.tsx             # Navigation bar
│   │   ├── Pagination.tsx         # Pagination controls
│   │   ├── PostCard.tsx           # Blog post preview card
│   │   └── ThemeToggle.tsx        # Dark mode toggle
│   │
│   ├── lib/                       # Utility functions
│   │   └── posts.ts               # Post loading and metadata
│   │
│   ├── pages/                     # Next.js pages and routes
│   │   ├── _app.tsx               # App wrapper and SEO config
│   │   ├── _document.tsx          # HTML document setup
│   │   ├── 404.tsx                # Custom error page
│   │   ├── index.tsx              # Homepage with featured posts
│   │   ├── blog/
│   │   │   ├── index.tsx          # Blog listing page 1
│   │   │   └── [page].tsx         # Dynamic paginated pages
│   │   └── posts/
│   │       └── [slug].tsx         # Individual blog post page
│   │
│   ├── styles/                    # Stylesheets
│   │   └── globals.css            # Global styles and components
│   │
│   └── types/                     # TypeScript type definitions
│       └── post.ts                # Blog post interface
│
├── .dockerignore                  # Files to exclude from Docker image
├── .env.example                   # Environment variable template
├── eslint.config.mjs              # ESLint flat configuration
├── .gitignore                     # Git ignore rules
├── docker-compose.yml             # Docker Compose configuration
├── Dockerfile                     # Multi-stage Docker build
├── next.config.js                 # Next.js configuration
├── package.json                   # Project dependencies
├── package-lock.json              # Locked dependency versions
├── postcss.config.js              # PostCSS configuration for Tailwind
├── tailwind.config.js             # Tailwind CSS theme
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## Installation and Setup

### Prerequisites

- Node.js 22 LTS recommended (minimum 20.9.0)
- npm 10.9.0 or higher
- npm or yarn package manager
- Docker and Docker Compose (for containerized deployment)
- Git for version control

### Local Development Environment

1. **Clone the repository**

```bash
git clone <repository-url>
cd nextjs-mdx-seo-blog
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
BASE_URL=http://localhost:3000
NODE_ENV=development
PORT=3000
```

4. **Start the development server**

```bash
npm run dev
```

The application will be available at http://localhost:3000. The development server includes hot module replacement for instant code changes.

### Available npm Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production application
- `npm start` - Run production build (requires `npm run build` first)
- `npm run lint` - Run ESLint to check code quality
- `npm run generate:sitemap` - Create sitemap.xml
- `npm run generate:rss` - Create RSS feed

## Docker Deployment

### Quick Start with Docker Compose

The recommended way to deploy this application:

```bash
# Build and start the application
docker compose up --build -d

# Check container status
docker compose ps

# View application logs
docker compose logs -f web

# Stop the application
docker compose down
```

The application will be available at http://localhost:3000.

### Docker Architecture

**Dockerfile Features:**

- Multi-stage build strategy reduces final image size
- Node.js 22 on Alpine Linux as base image for minimal footprint
- Build stage compiles Next.js and installs production dependencies
- Runtime stage includes only necessary files and assets
- Non-root user execution improves security posture
- Health checks every 30 seconds to monitor application status
- Graceful shutdown with proper signal handling

**docker-compose.yml Configuration:**

- Service name: `web`
- Port mapping: 3000:3000
- Environment variables from `.env`
- Health check configuration with startup period
- Automatic restart on failure

### Manual Docker Commands

```bash
# Build Docker image
docker build -t nextjs-blog:latest .

# Run Docker container
docker run -p 3000:3000 -e NODE_ENV=production nextjs-blog:latest

# Check container health status
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### Docker Troubleshooting

If the container shows as unhealthy despite working correctly:

1. Check logs: `docker compose logs web`
2. Test manually: `curl http://localhost:3000`
3. Verify port availability: The port 3000 should not be in use by other applications
4. Increase health check timeout in `docker-compose.yml` if needed

## Vercel Deployment (CI/CD)

### Recommended Order (Do this first to last)

1. Local quality checks:

- `npm ci`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

2. Docker validation (local):

- Start Docker Desktop
- `docker compose build`
- `docker compose up -d`
- `docker compose ps`
- `docker compose down`

3. CI/CD wiring (GitHub):

- Ensure [`.github/workflows/vercel-ci-cd.yml`](.github/workflows/vercel-ci-cd.yml) exists
- Add GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

4. Vercel project setup:

- Import repo in Vercel
- Build command: `npm run build`
- Install command: `npm ci`
- Add env vars: `BASE_URL`, `NODE_ENV=production`

5. Final deploy flow:

- Push to `main` for production deploy
- Open PR for preview deploy

This repository includes GitHub Actions + Vercel CLI deployment via [`.github/workflows/vercel-ci-cd.yml`](.github/workflows/vercel-ci-cd.yml).

### Required GitHub Secrets

Add these in GitHub → Settings → Secrets and variables → Actions:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### How the pipeline works

- Pull requests to `main`: runs lint + typecheck + build, then deploys a Vercel Preview and comments the URL on the PR.
- Pushes to `main`: runs lint + typecheck + build, then deploys to Vercel Production.

### Vercel Project Settings

- Build Command: `npm run build`
- Install Command: `npm ci`
- Framework Preset: `Next.js`

Set environment variables in Vercel:

- `BASE_URL=https://your-production-domain`
- `NODE_ENV=production`

Do not set `PORT` in Vercel; Vercel injects it automatically.

## Content Management

### Creating a New Blog Post

Blog posts are MDX files stored in the `/posts` directory.

1. Create a new file in `/posts/`:

```bash
# Example: /posts/my-new-article.mdx
```

2. Add frontmatter and content:

```mdx
---
title: "My New Article Title"
date: "2024-01-31"
author: "Your Name"
tags: ["Tag1", "Tag2", "Tag3"]
excerpt: "A brief summary of your article. This appears in search results and social media previews."
---

# My New Article Title

Write your article content here using Markdown syntax.

## Section Heading

You can include multiple sections and organize your content logically.

### Subsection

Add code examples with syntax highlighting:

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

Use bold **text** and _italic text_ for emphasis.

Create lists:

- First item
- Second item
- Third item

Include links:

[Link to example.com](https://example.com)

Embed images:

![Alt text describing the image](/image-path.jpg)
```

3. Rebuild the application:

```bash
npm run build
```

The new post will automatically appear in blog listings and be included in sitemap and RSS feeds.

### Frontmatter Fields

| Field   | Type                | Required | Description                                    |
| ------- | ------------------- | -------- | ---------------------------------------------- |
| title   | string              | Yes      | Post title shown in listings and page header   |
| date    | string (YYYY-MM-DD) | Yes      | Publication date for sorting                   |
| author  | string              | Yes      | Author name displayed with the post            |
| tags    | array of strings    | Yes      | Categories for content organization            |
| excerpt | string              | Yes      | Summary used in meta descriptions and previews |

### MDX Component Support

Any React component can be used in MDX files:

```mdx
<CustomComponent prop="value">Content inside component</CustomComponent>
```

Pre-configured components:

- **Code blocks** with Prism syntax highlighting
- **Images** optimized with next/image
- **Headings** styled with Tailwind utilities
- **Lists** with consistent styling
- **Links** with proper styling and accessibility

## SEO Configuration

### Meta Tags and Open Graph

Every page includes comprehensive meta tags for search engines and social media:

- Title and description tags
- Open Graph metadata (og:title, og:description, og:image, og:url)
- Twitter Card tags (twitter:card, twitter:creator)
- Canonical URLs to prevent duplicate indexing
- Robots meta tags for search engine directives

Configured globally in `/src/pages/_app.tsx` and overridden per-page as needed.

### Sitemap Generation

The sitemap is automatically generated during the build process at `/public/sitemap.xml`.

The sitemap includes:

- Homepage
- Blog listing page
- All individual blog posts
- Proper priority and change frequency values
- Valid XML structure for search engines

Access the sitemap at: `http://localhost:3000/sitemap.xml`

### RSS Feed Generation

An RSS 2.0 feed is automatically generated at `/public/rss.xml`.

The feed includes:

- All blog posts with full content
- Publication dates
- Author information
- Category tags
- Links to blog posts

Subscribe or read the feed at: `http://localhost:3000/rss.xml`

### Performance Optimization

- Static pages load from cached assets
- Images automatically converted to optimized WebP format
- Automatic code splitting reduces JavaScript bundle
- CSS is optimized and minified
- Next.js automatically handles responsive images

## Customization Guide

### Styling and Theme

The project uses Tailwind CSS for styling. Customize the design through:

**Global Styles** (`src/styles/globals.css`):

- Custom utility classes
- Base element styles
- Global animations

**Theme Configuration** (`tailwind.config.js`):

- Color palette
- Typography settings
- Spacing and sizing
- Dark mode configuration

**Component Styles:**

Each component uses Tailwind utility classes. Modify class names to change appearance.

### Site Configuration

Update site information in several locations:

**Next.js Configuration** (`next.config.js`):

```javascript
const nextConfig = {
  // Add custom Next.js configuration
};
```

**Site Metadata** (`src/pages/_app.tsx`):

```typescript
// Update default SEO configuration
<DefaultSeo
  title="Your Site Title"
  description="Your site description"
  // ... other config
/>
```

### Environment Variables

Edit `.env` to customize behavior:

- `BASE_URL` - Your production domain for meta tags
- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port (default: 3000)

## Testing and Verification

### Core Requirements Implementation

All required data-testid attributes are implemented for automated testing:

**Homepage (`/`):**

- `data-testid="post-list"` - Main post list container
- `data-testid="post-card-{slug}"` - Individual post cards
- `data-testid="read-more-{slug}"` - Read more buttons

**Blog Listing (`/blog` and `/blog/[page]`):**

- `data-testid="post-list"` - Post list container
- `data-testid="pagination"` - Pagination controls wrapper
- `data-testid="pagination-prev"` - Previous page button
- `data-testid="pagination-next"` - Next page button
- `data-testid="pagination-page-{n}"` - Individual page links

**Blog Post (`/posts/[slug]`):**

- `data-testid="blog-post"` - Main article container
- `data-testid="post-title"` - Article title
- `data-testid="post-content"` - Article content
- `data-testid="reading-time"` - Reading time estimate
- `data-testid="code-block"` - Code blocks with syntax highlighting
- `data-testid="optimized-image"` - Optimized images

**Navigation:**

- `data-testid="theme-toggle"` - Dark mode toggle button

**Error Page (`/404`):**

- `data-testid="not-found-message"` - 404 error message

### Manual Testing Checklist

- [ ] Homepage loads and displays featured posts
- [ ] Blog listing page works with pagination
- [ ] Click a post and verify content renders correctly
- [ ] Toggle dark mode and verify theme persists
- [ ] Visit a non-existent URL and see custom 404 page
- [ ] View page source and verify meta tags are present
- [ ] Visit `/sitemap.xml` and verify XML structure
- [ ] Visit `/rss.xml` and verify RSS 2.0 format
- [ ] Test responsive design on mobile devices
- [ ] Verify code blocks have syntax highlighting

### Automated Testing

Test suites will verify:

- All required data-testid attributes are present
- DOM structure matches expected layout
- Meta tags contain correct values
- Sitemap.xml is valid and complete
- RSS feed is valid and parseable
- Application builds without errors
- Application starts and serves requests correctly

## Submission Requirements

This project is ready for submission with the following contents:

### Required Files

- [x] **README.md** - Comprehensive project documentation with setup, architecture, and usage instructions
- [x] **Dockerfile** - Multi-stage production build configuration
- [x] **docker-compose.yml** - Docker Compose service definition
- [x] **.env.example** - Environment variable template
- [x] **/src** - Complete application source code
- [x] **/posts** - 6 sample blog posts in MDX format
- [x] **package.json** - Project dependencies and scripts

### Running the Application

Single command to build and run:

```bash
docker compose up --build -d
```

The application will be available at http://localhost:3000

### Code Quality

- TypeScript for full type safety
- ESLint for code consistency
- Tailwind CSS for maintainable styling
- Component-based architecture
- Separation of concerns (pages, components, utilities, types)

## Git Repository Instructions

1. Initialize a Git repository:

```bash
git init
git add .
git commit -m "Initial commit: ModernBlog platform"
```

2. Add a remote repository:

```bash
git remote add origin <your-repository-url>
```

3. Push to GitHub or similar platform:

```bash
git push -u origin main
```

4. Ensure the repository includes:

```
- All source code files
- Complete README.md
- Dockerfile and docker-compose.yml
- .env.example file
- .gitignore with node_modules excluded
- package.json and package-lock.json
```

5. Share the public repository link for evaluation

## Production Deployment

### Pre-deployment Checklist

- [ ] Update `BASE_URL` in `.env` to production domain
- [ ] Review and update site metadata in `_app.tsx`
- [ ] Ensure all blog posts are finalized
- [ ] Test the build locally: `npm run build`
- [ ] Verify sitemap and RSS are generated

### Deployment Options

**Option 1: Docker (Recommended)**

```bash
docker build -t blog:latest .
docker run -p 3000:3000 -e NODE_ENV=production blog:latest
```

**Option 2: Vercel (Next.js Hosting)**

```bash
npm install -g vercel
vercel deploy
```

**Option 3: Traditional Server**

```bash
npm ci
npm run build
npm start
```

### Performance Optimization

The application includes several built-in optimizations:

- Static pages serve instantly from cache
- Images automatically converted to modern formats
- CSS and JavaScript automatically minified
- Code splitting reduces initial payload
- Next.js handles responsive images automatically

## Project Statistics

- **Blog Posts**: 6 sample articles
- **Components**: 7 reusable React components
- **Pages**: 7 Next.js pages (including dynamic routes)
- **TypeScript**: 100% coverage across source files
- **Dependencies**: Minimal core dependencies, all production-critical

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

## Project Features Summary

This implementation demonstrates:

- Modern React patterns with Next.js
- Static site generation for performance
- TypeScript for code safety
- Responsive design principles
- SEO best practices
- Docker containerization
- MDX content management
- Component architecture
- Build automation
- Production readiness

---

Built with Next.js, TypeScript, Tailwind CSS, and Docker.

Last updated: January 31, 2024
