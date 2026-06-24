import { PostGrid } from '@/components/post-grid';
import { Post } from '@/lib/types';

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-border/60 pt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Related posts</h2>
        <p className="mt-2 text-sm text-muted">
          Keep reading with more stories from the same category.
        </p>
      </div>
      <PostGrid posts={posts} />
    </section>
  );
}
