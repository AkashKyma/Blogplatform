import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface FeaturedPostProps {
  post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="grid gap-8 rounded-[2rem] border border-border/60 bg-surface p-6 shadow-card lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
      <div className="flex flex-col justify-center">
        <span className="inline-flex w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Featured post
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-foreground [font-family:var(--font-display)] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>{post.author}</span>
          <span aria-hidden="true">•</span>
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">•</span>
          <span>{post.category}</span>
        </div>
        <div className="mt-8">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-surface transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Read the featured story
          </Link>
        </div>
      </div>

      <Link href={`/blog/${post.slug}`} className="group relative block min-h-[320px] overflow-hidden rounded-[1.5rem]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </Link>
    </section>
  );
}
