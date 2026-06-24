# PAP-460 Blog Platform

A clean, typography-focused blog platform built with Next.js 14 App Router, TypeScript, and Tailwind CSS. Content is sourced from local JSON data, so the app runs without external APIs or environment variables.

## What was built

For ticket **PAP-460**, the implementation includes:

- A responsive home page with:
  - a featured post hero
  - a grid of recent posts
- A dedicated `/blog` archive page with:
  - real-time keyword search by title and excerpt
  - category filtering
  - combined search + category narrowing
- Individual `/blog/[slug]` article pages with:
  - full article reader layout
  - title, author, date, and category metadata
  - related posts from the same category
- An `/about` page with author bio and social links
- A dark mode toggle in the navbar with session persistence via `localStorage`
- A graceful 404 experience for unknown blog slugs
- Seed content for at least six posts using static local data

## Tech stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- `@tailwindcss/typography`

## Project structure

```text
app/
  about/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  globals.css
  layout.tsx
  not-found.tsx
  page.tsx
components/
  article-body.tsx
  blog-filters.tsx
  category-filter.tsx
  dark-mode-toggle.tsx
  featured-post.tsx
  footer.tsx
  navbar.tsx
  post-card.tsx
  post-grid.tsx
  related-posts.tsx
  search-bar.tsx
data/
  posts.json
lib/
  posts.ts
  types.ts
  utils.ts
public/
  images/author/
  images/posts/
```

## Setup

Install dependencies:

```bash
npm install
```

## Run locally

Start the development server:

```bash
npm run dev
```

Then open <http://localhost:3000>.

## Build for production

```bash
npm run build
```

## Content model

Posts are stored in `data/posts.json` and include:

- `slug`
- `title`
- `excerpt`
- `date`
- `author`
- `category`
- `tags`
- `coverImage`
- `featured`
- `content`

The article body is rendered from structured content blocks, which keeps the site static-first and easy to maintain.

## Key behavior

### Home page

- Picks a featured post for the hero section
- Shows four recent posts beneath it

### Blog archive

- Filters posts in real time as the reader types
- Filters by category
- Supports combining both filters at once
- Shows an empty state when no posts match

### Article pages

- Uses static params generated from post slugs
- Renders post metadata and cover image
- Shows related posts from the same category
- Calls `notFound()` for missing slugs

### Dark mode

- Toggle lives in the navbar
- Theme is applied with a `dark` class on the document root
- Preference is stored in `localStorage`
- Preference persists while navigating during the session

## Notes for deployment / PR review

- No external API keys are required
- No `.env` file is needed for the current implementation
- Static local assets are used for author and post imagery
- The app is intended to satisfy the PAP-460 acceptance criteria around install, dev, build, responsiveness, filtering, article rendering, and 404 handling
