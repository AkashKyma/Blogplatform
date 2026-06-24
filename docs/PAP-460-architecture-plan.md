# PAP-460 — Blog Platform Architecture Plan

## Role
Architect only. Planning artifact for Grunt. No application code implemented in this phase.

## Current Repo State
- Repository is effectively greenfield: only boilerplate files are present.
- No Next.js app, package.json, TypeScript config, Tailwind config, or source tree exist yet.
- `README.md` is already modified in the working tree before this phase; leave it untouched.

## Recommended Stack
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Static local content (JSON-backed seed data; no external APIs)
- `next/font/google` for typography
- Optional lightweight client helpers only where needed for search/filter state and dark mode

## Implementation Strategy
Build a fully static-first blog app with server-rendered routes for content pages and a small client-side filter shell on `/blog`.

### Why JSON over MDX for this ticket
- Fastest path to a reliable greenfield implementation.
- No MDX loader/plugin wiring required.
- Simplifies `npm install`, `npm run dev`, and `npm run build` acceptance criteria.
- Full article content can still be modeled as structured rich text blocks or paragraph arrays and rendered cleanly.

## Planned File/Folder Layout
```text
app/
  layout.tsx
  page.tsx
  globals.css
  about/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  blog/[slug]/not-found.tsx (optional) or rely on app/not-found.tsx
  not-found.tsx
components/
  navbar.tsx
  dark-mode-toggle.tsx
  featured-post.tsx
  post-card.tsx
  post-grid.tsx
  search-bar.tsx
  category-filter.tsx
  article-body.tsx
  related-posts.tsx
  footer.tsx
  theme-provider.tsx
  blog-filters.tsx
lib/
  posts.ts
  utils.ts
  types.ts
public/
  images/posts/*
  images/author/*
data/
  posts.json
package.json
next.config.js|mjs
tsconfig.json
postcss.config.js
tailwind.config.ts
.env.example (only if eventually needed; otherwise include empty/no-op example or omit if truly unused)
```

## Data Model
Use `data/posts.json` with at least 6 seed posts.

### Post shape
```ts
interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO or YYYY-MM-DD
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  featured?: boolean;
  content: Array<
    | { type: 'paragraph'; text: string }
    | { type: 'heading'; level: 2 | 3; text: string }
    | { type: 'quote'; text: string }
    | { type: 'list'; style: 'bullet' | 'number'; items: string[] }
  >;
}
```

### Seed content requirements
- Minimum 6 posts.
- At least 1 featured post for `/` hero.
- At least 2 categories with repeated category membership.
- At least 1 category containing 3+ posts so related-post logic can always show 2 items.
- Cover images can be simple local SVG or JPG/PNG assets in `public/images/posts`.

## Route Plan

### `/`
Server component page.
- Load all posts from `lib/posts.ts`.
- Select featured post:
  - Prefer `featured: true`.
  - Fallback to most recent post.
- Render:
  - `Navbar`
  - `FeaturedPost`
  - recent `PostGrid` with at least 4 `PostCard`s
  - `Footer`

### `/blog`
Hybrid page: server loads posts, client component handles interactive filtering.
- Server page passes all posts + category list into `BlogFilters` client component.
- `BlogFilters` owns:
  - search text state
  - selected category state
  - derived filtered list
- Render:
  - `SearchBar`
  - `CategoryFilter`
  - filtered `PostGrid`
  - empty-state copy when no posts match

### `/blog/[slug]`
Server component page with static params.
- `generateStaticParams()` from all slugs.
- Resolve post by slug from `lib/posts.ts`.
- Unknown slug -> `notFound()`.
- Render metadata header:
  - title
  - author
  - date
  - category badge
  - cover image
- Render `ArticleBody` from structured content.
- Render `RelatedPosts` using same-category posts excluding current post, capped to 2–3 items.

### `/about`
Static server page.
- Author/publication bio.
- Optional local avatar image.
- Social/profile links.
- Reuse shared layout components.

### `not-found`
Global 404 page.
- Friendly message.
- CTA back to home/blog.
- Ensures nonexistent slugs fail gracefully.

## Component Plan

### `Navbar`
- Brand/site title
- Links: Home, Blog, About
- Dark mode toggle
- Mobile-safe responsive layout

### `DarkModeToggle`
Client component.
- Uses theme provider or document class toggle.
- Persist preference in `localStorage`.
- Apply `dark` class to `html`.
- Avoid hydration flash by setting initial theme early in layout/provider.

### `FeaturedPost`
- Large hero card with cover image, category, title, excerpt, date, CTA
- Links to `/blog/[slug]`

### `PostCard`
- Cover image
- Category badge
- Title
- Excerpt
- Date
- Link wrapper to slug page

### `PostGrid`
- Responsive grid layout
- 1 col mobile, 2 col tablet, 3 col desktop
- Reusable for home, blog listing, related posts

### `SearchBar`
Client input component.
- Filters by title or excerpt, case-insensitive.
- Debounce not required; direct filter is fine for static small dataset.

### `CategoryFilter`
Client select or pill buttons.
- Includes `All` option.
- Categories derived from dataset, not hard-coded.

### `ArticleBody`
- Renders structured content blocks with `prose` typography styling.
- Supports paragraph, headings, quotes, lists.
- Keeps reader view narrow and readable.

### `RelatedPosts`
- Receives current post + all posts.
- Picks same-category posts excluding current.
- Shows at least 2 when data allows.

### `Footer`
- Minimal site footer with copyright or short tagline.

## Library/Utility Plan

### `lib/types.ts`
Shared `Post` type.

### `lib/posts.ts`
Single source of truth for content access.
- `getAllPosts()`
- `getFeaturedPost()`
- `getRecentPosts(limit?)`
- `getPostBySlug(slug)`
- `getCategories()`
- `getRelatedPosts(post, limit?)`

### `lib/utils.ts`
- Date formatting helper
- Classname merge helper if needed (`cn`)

## Styling Plan
- Tailwind CSS with neutral, typography-focused palette.
- Use `@tailwindcss/typography` if desired for article content.
- Responsive spacing and max-width containers.
- Dark mode through Tailwind `darkMode: 'class'`.
- Typography-first defaults:
  - readable line length
  - clear hierarchy
  - subdued metadata
  - high contrast in both themes

## State/Rendering Boundaries
- Keep most pages server-rendered.
- Limit client components to:
  - dark mode handling
  - blog search/filter interactivity
- This reduces complexity and build risk.

## Image Plan
- Prefer local assets in `public/images/...`.
- Use `next/image` with explicit dimensions.
- If time-constrained, SVG placeholders are acceptable and reliable.

## Accessibility/UX Notes
- Semantic landmarks (`header`, `main`, `nav`, `article`, `footer`)
- Keyboard-focusable nav and cards
- Visible focus states
- Sufficient contrast in both themes
- Form label or accessible name for search input and category selector

## Acceptance Criteria Mapping
1. `npm install`: requires full Next/Tailwind config and dependency set.
2. `npm run dev`: ensure package scripts and valid app layout.
3. `npm run build`: avoid experimental/unneeded dependencies.
4–6. Home page: featured hero + minimum 4 cards + correct links.
7–10. `/blog`: client filtering combining search + category.
11–13. `/blog/[slug]`: structured article renderer + metadata + related posts.
14. `/about`: static bio content.
15–16. Dark mode: class-based theme persisted in `localStorage` and preserved on navigation.
17. Responsive: verify 375px and 1280px layouts.
18. 404: global `not-found.tsx` + `notFound()` for missing slugs.

## Suggested Build Order for Grunt
1. Scaffold Next.js 14 + TypeScript + Tailwind.
2. Add global layout, font, theme bootstrapping, and base styles.
3. Create post dataset and typed content utilities.
4. Build shared presentational components.
5. Implement `/`, `/about`, `/blog`, `/blog/[slug]`, and `not-found`.
6. Wire interactive search/category filtering.
7. Add local images and final responsive polish.
8. Run `npm install`, `npm run build`, then `npm run dev` smoke test.

## Testing Checklist for Pedant
- Install/build/dev commands succeed.
- Home shows featured post and >=4 cards.
- Blog filters update live for search/category and combined state.
- Every card navigates to expected slug page.
- Article page renders metadata and full structured body.
- Related posts shows same-category items.
- Dark mode persists across route changes.
- Mobile and desktop screenshots/checks at 375px and 1280px.
- Invalid slug returns 404.

## Handoff Notes
- Repo is empty enough that Grunt should treat this as a fresh app scaffold.
- Do not overwrite the preexisting README modification unless specifically required.
- Prefer JSON seed content over MDX to minimize configuration risk and maximize build reliability for this ticket.
