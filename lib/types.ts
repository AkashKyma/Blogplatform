export type ContentBlock =
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'heading';
      level: 2 | 3;
      text: string;
    }
  | {
      type: 'quote';
      text: string;
    }
  | {
      type: 'list';
      style: 'bullet' | 'number';
      items: string[];
    };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  featured?: boolean;
  content: ContentBlock[];
}
