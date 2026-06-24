# PAP-460: Blog Platform

## ⚠️ Agent Implementation Directive

**You MUST build the COMPLETE, FULLY WORKING application described below.**

* Write ALL source code files needed to run this project (components, pages, API routes, styles, config, tests)
* Do NOT create only documentation, markdown files, README updates, or empty scaffold folders
* Do NOT leave placeholder comments like `// TODO: implement this` — write the actual implementation
* The project MUST be runnable with `npm run dev` (or the specified command) after your PR is merged
* Every acceptance criterion listed below must pass when a human tests the running app
* If an API key or env var is needed, include a `.env.example` AND fallback/mock data so the app works without it
* Commit ALL necessary files: package.json, all source files, config files, public assets

**This is a full project build, not a documentation task.**

## Problem / Overview

A clean, typography-focused blog platform built with Next.js 14 App Router and TypeScript. Content is sourced from static JSON or MDX files requiring no external API keys. Readers can browse a featured post and post grid on the home page, filter and search all posts on a dedicated blog listing page, read full articles with a distraction-free reader view, and learn about the author on an about page. The site supports dark mode toggling and is fully responsive.

## Pages / Routes

* `/` — Displays a featured/hero post at the top followed by a responsive grid of recent posts (PostGrid of PostCards). Includes the Navbar with dark mode toggle.
* `/blog` — Shows all posts in a PostGrid with a SearchBar for full-text search by title/excerpt and a CategoryFilter to filter posts by category. Results update dynamically as the user types or selects a category.
* `/blog/[slug]` — Full article reader page rendering the MDX or JSON post content via ArticleBody with clean typography. Displays post metadata (title, date, author, category) and a RelatedPosts section at the bottom showing posts in the same category.
* `/about` — Static about page describing the blog author or publication. Includes a short bio, optional avatar image, and links to social profiles.

## Data Sources

* Static Blog Posts — fallback: At least 6 seed posts stored as MDX files in /content/posts/ or as a static JSON array in /data/posts.json. Each post includes: slug, title, excerpt, date, author, category, tags, coverImage, and body content.

## Tech Stack & Solution

Next.js 14 App Router + TypeScript + Tailwind CSS

## Acceptance Criteria

1. npm install completes without errors
2. npm run dev starts the app on localhost:3000 without errors
3. npm run build completes successfully with no TypeScript or build errors
4. Home page (/) renders a FeaturedPost hero section and a PostGrid with at least 4 PostCards
5. Each PostCard displays the post title, excerpt, category badge, date, and cover image
6. Clicking a PostCard navigates to the correct /blog/\[slug] route
7. /blog page renders all seed posts in a PostGrid alongside a SearchBar and CategoryFilter
8. Typing in the SearchBar on /blog filters the visible posts in real time by title or excerpt
9. Selecting a category in CategoryFilter on /blog shows only posts matching that category
10. Combining search text and a category filter on /blog narrows results correctly
11. /blog/\[slug] renders the full article body with correct typography styling
12. /blog/\[slug] displays post title, author, date, and category
13. /blog/\[slug] shows a RelatedPosts section with at least 2 posts from the same category (when available)
14. /about page renders without errors and displays author bio text
15. Dark mode toggle in Navbar switches the site between light and dark themes
16. Dark mode preference persists on page navigation within the session
17. All pages are responsive and render correctly at 375px (mobile) and 1280px (desktop) widths
18. Navigating to a non-existent slug renders a 404 page without crashing

## Components to Build

* Navbar
* DarkModeToggle
* PostCard
* PostGrid
* CategoryFilter
* SearchBar
* ArticleBody
* RelatedPosts
* FeaturedPost
* Footer

## Integrations / APIs

* Static Blog Posts

## Implementation Notes

Dev: npm run dev
Build: npm run build
Install: npm install

User Stories:

1. As a reader, I want to see a featured post and a grid of recent posts on the home page so I can quickly find something to read.
2. As a reader, I want to search posts by keyword on the blog listing page so I can find articles on a specific topic.
3. As a reader, I want to filter posts by category so I can browse content relevant to my interests.
4. As a reader, I want to open a full article and read it in a clean, distraction-free layout.
5. As a reader, I want to see related posts at the bottom of an article so I can continue reading similar content.
6. As a reader, I want to toggle dark mode so I can read comfortably in low-light environments.
7. As a reader, I want the site to work well on mobile so I can read on any device.

***

## Definition of Done

* [ ] `npm run dev` (or equivalent) starts the app without errors
* [ ] `npm run build` completes without errors
* [ ] All routes/pages listed in the spec render correctly
* [ ] All acceptance criteria above pass when tested in browser
* [ ] No files are empty placeholders — all source code is written
* [ ] `.env.example` exists if any environment variables are needed
