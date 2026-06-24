import { BlogFilters } from '@/components/blog-filters';
import { getAllPosts, getCategories } from '@/lib/posts';

export const metadata = {
  title: 'Blog | Paperclip Journal',
  description: 'Browse the full archive, filter by category, and search by keyword.'
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Archive</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground [font-family:var(--font-display)] sm:text-5xl">
          Find the piece you need
        </h1>
        <p className="mt-4 text-base leading-8 text-muted">
          Search by topic, scan categories, and move through the full collection without
          leaving the page.
        </p>
      </div>

      <div className="mt-10">
        <BlogFilters posts={posts} categories={categories} />
      </div>
    </div>
  );
}
