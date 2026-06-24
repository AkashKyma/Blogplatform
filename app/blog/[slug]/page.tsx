import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ArticleBody } from '@/components/article-body';
import { RelatedPosts } from '@/components/related-posts';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post not found | Paperclip Journal'
    };
  }

  return {
    title: `${post.title} | Paperclip Journal`,
    description: post.excerpt
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <article className="mx-auto max-w-4xl">
        <div className="mb-10 space-y-5">
          <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {post.category}
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground [font-family:var(--font-display)] sm:text-5xl">
            {post.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span>{post.author}</span>
            <span aria-hidden="true">•</span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>

        <div className="relative mb-10 aspect-[16/8] overflow-hidden rounded-[2rem] border border-border/60 bg-surface shadow-card">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="rounded-[2rem] border border-border/60 bg-surface px-6 py-8 shadow-card sm:px-10 sm:py-10">
          <ArticleBody content={post.content} />
        </div>

        <RelatedPosts posts={relatedPosts} />
      </article>
    </div>
  );
}
