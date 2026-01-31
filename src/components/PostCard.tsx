import Link from 'next/link';
import { PostMeta } from '@/types/post';
import { format } from 'date-fns';

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article
      data-testid={`post-card-${post.slug}`}
      className="card group hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'MMM dd, yyyy')}
          </time>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        
        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <Link
            href={`/posts/${post.slug}`}
            data-testid={`read-more-${post.slug}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold flex items-center gap-1 group"
          >
            Read More
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By <span className="font-medium text-gray-900 dark:text-gray-100">{post.author}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
