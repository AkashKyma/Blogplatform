import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group h-full rounded-[2rem] border border-border/60 bg-surface shadow-card transition duration-200 hover:-translate-y-1 hover:border-foreground/15">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[2rem]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div className="flex h-full flex-col px-5 py-5 sm:px-6">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            <span className="rounded-full bg-foreground/5 px-3 py-1 text-[0.7rem] text-accent">
              {post.category}
            </span>
            <span>{formatDate(post.date)}</span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground [font-family:var(--font-display)]">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">{post.excerpt}</p>

          <div className="mt-6 text-sm font-medium text-accent">Read article →</div>
        </div>
      </Link>
    </article>
  );
}
