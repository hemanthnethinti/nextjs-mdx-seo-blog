export interface PostMeta {
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  slug: string;
  readingTime?: string;
}

export interface Post extends PostMeta {
  content: string;
}
