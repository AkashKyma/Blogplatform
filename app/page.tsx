import { FeaturedPost } from '@/components/featured-post';
import { PostGrid } from '@/components/post-grid';
import { getFeaturedPost, getRecentPosts } from '@/lib/posts';

export default function HomePage() {
  const featuredPost = getFeaturedPost();
  const recentPosts = getRecentPosts(4, featuredPost.slug);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <FeaturedPost post={featuredPost} />

      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Recent writing
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground [font-family:var(--font-display)]">
            Essays on thoughtful software and publishing
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Browse the latest stories on design systems, editorial craft, and shipping small
            products with confidence.
          </p>
        </div>
        <PostGrid posts={recentPosts} />
      </section>
    </div>
  );
}
