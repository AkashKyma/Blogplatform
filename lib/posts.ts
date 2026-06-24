import postsData from '@/data/posts.json';
import { Post } from '@/lib/types';

const posts = (postsData as Post[]).slice().sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export function getAllPosts() {
  return posts;
}

export function getFeaturedPost() {
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getRecentPosts(limit = 4, excludeSlug?: string) {
  return posts.filter((post) => post.slug !== excludeSlug).slice(0, limit);
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getCategories() {
  return Array.from(new Set(posts.map((post) => post.category))).sort();
}

export function getRelatedPosts(post: Post, limit = 2) {
  return posts
    .filter((candidate) => candidate.slug !== post.slug && candidate.category === post.category)
    .slice(0, limit);
}
