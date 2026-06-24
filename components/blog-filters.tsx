'use client';

import { useMemo, useState } from 'react';

import { CategoryFilter } from '@/components/category-filter';
import { PostGrid } from '@/components/post-grid';
import { SearchBar } from '@/components/search-bar';
import { Post } from '@/lib/types';

interface BlogFiltersProps {
  posts: Post[];
  categories: string[];
}

export function BlogFilters({ posts, categories }: BlogFiltersProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        query.length === 0 ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [posts, search, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-[2rem] border border-border/60 bg-surface p-5 shadow-card md:grid-cols-[1.2fr_0.8fr]">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      <div className="flex items-center justify-between gap-3 text-sm text-muted">
        <p>
          Showing <span className="font-semibold text-foreground">{filteredPosts.length}</span> of{' '}
          <span className="font-semibold text-foreground">{posts.length}</span> posts
        </p>
        {(search || selectedCategory !== 'All') && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
            className="rounded-full border border-border/70 px-4 py-2 font-medium text-foreground transition hover:bg-foreground/5"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredPosts.length > 0 ? (
        <PostGrid posts={filteredPosts} />
      ) : (
        <div className="rounded-[2rem] border border-dashed border-border/80 bg-surface px-6 py-14 text-center">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">No posts match yet</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Try a different keyword or reset the category filter to see the full archive.
          </p>
        </div>
      )}
    </div>
  );
}
